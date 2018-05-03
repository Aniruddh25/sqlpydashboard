
(function (ML, undefined) {
    "use strict";

    var writeError = (function () {
        var writeEntryFunction = ML.exists("Diagnostics.Log.writeEntry");
        if (writeEntryFunction) {
            return function (data) {
                var message = data && data.toString();
                try {
                    writeEntryFunction("ML.Internal.RpcServer", message, ML.Diagnostics.LogEntryLevel.error);
                } catch (e) {
                    // nothing more to do here
                }
            };
        } else {
            return function () { };
        }
    })(),
        implNamespace = ML.Namespace.define("Impl");

    function getTargetFunctionByName(funcName, rootDispatchObject) {
        if (typeof funcName === "string") {
            var segments = funcName.split("."),
                target,
                index,
                value;

            // Needs at least one non empty segment
            if ((segments.length >= 1) && (segments[0].length > 0)) {
                target = rootDispatchObject;
                for (index = 1; index < segments.length; index++) {
                    value = segments[index];
                    if ((target !== null) && (typeof target === "object") && (value in target)) {
                        target = target[value];
                    } else {
                        return null;
                    }
                }

                if (typeof target === "function") {
                    return target;
                }
            }
        }

        return null;
    }

    function rpcServerReceiveFromPostMessageTransport(data) {
        // TODO: check access, enforce security, determine if the frame making the call has the rights ...
        try {
            var message = JSON.parse(data);

            // Dispatch based on verb
            switch (message.verb) {
                case ML.Internal.Rpc.OperationType.OneWay:
                    rpcDispatchOneWay(message);
                    break;

                case ML.Internal.Rpc.OperationType.AsyncRequestResponse:
                    rpcDispatchRequestResponse(message);
                    break;

                case ML.Internal.Rpc.OperationType.AsyncDuplex:
                    rpcDispatchDuplex(message);
                    break;

                default:
                    throw "RpcServer: Unknown Rpc method";
            }
        }
        catch (e) {
            writeError(e);
        }
    }

    function rpcServerInvokeClientCallbackWithPostMessageTransport(message) {
        // TODO: Actually post a message instead of a direct function call
        ML.Internal.Rpc.RpcClient.rpcClientReceiveFromPostMessageTransport(JSON.stringify(message));
    }

    function rpcDispatchOneWay(message) {
        var functionToInvoke = getTargetFunctionByName(message.funcName, implNamespace);
        // TODO: Do we need to call back the Rpc client with "Rpc.Function.Not.Found" ?
        if (functionToInvoke) {
            try {
                // TODO: Is "this" the right context to invoke? Most likely not
                functionToInvoke.apply(this, message.args);
            }
            catch (e) {
                writeError(e);
            }
        }
    }

    function rpcDispatchRequestResponse(message) {
        var functionToInvoke = getTargetFunctionByName(message.funcName, implNamespace),
            callbackProxy,
            args;

        // TODO: pass exception back "Rpc.Function.Not.Found"
        if (functionToInvoke) {
            try {
                callbackProxy = createRequestResponseCallbackProxy(message.callbackRef);
                args = message.args;
                args.unshift(callbackProxy);
                // TODO: Is "this" the right context to invoke? Most likely not
                functionToInvoke.apply(this, args);
            }
            catch (e) {
                // Should we pass the exception back to callback or can this be marshaled over "result"
                writeError(e);
            }
        }
    }

    function rpcDispatchDuplex(message) {
        var functionToInvoke = getTargetFunctionByName(message.funcName, implNamespace),
            callbackProxy,
            args;

        // TODO: pass exception back "Rpc.Function.Not.Found"
        if (functionToInvoke) {
            try {
                callbackProxy = createDuplexCallbackProxy(message.callbackRef);
                args = message.args;
                args.unshift(callbackProxy);
                // TODO: Is "this" the right context to invoke? Most likely not
                functionToInvoke.apply(this, args);
            }
            catch (e) {
                // Should we pass the exception back to callback or can this be marshaled over "result"
                writeError(e);
            }
        }
    }

    function createRequestResponseCallbackProxy(callbackId) {
        var isPromiseProxy = (callbackId.indexOf("rpc_otc_prom") !== -1);
        if (isPromiseProxy) {
            return (function () {
                function invokePromiseProxy(callType, callData) {
                    var responseMessage = {
                        verb: ML.Internal.Rpc.OperationType.AsyncRequestResponse,
                        callbackRef: callbackId,
                        result: {
                            type: callType,
                            data: callData
                        }
                    };
                    rpcServerInvokeClientCallbackWithPostMessageTransport(responseMessage);
                }

                return {
                    complete: function (data) {
                        invokePromiseProxy(ML.Internal.Rpc.PromiseOperationType.Complete, data);
                    },
                    error: function (data) {
                        invokePromiseProxy(ML.Internal.Rpc.PromiseOperationType.Error, data);
                    },
                    progress: function (data) {
                        invokePromiseProxy(ML.Internal.Rpc.PromiseOperationType.Progress, data);
                    }
                };
            })();
        } else {
            return function (response) {
                var responseMessage = {
                    verb: ML.Internal.Rpc.OperationType.AsyncRequestResponse,
                    callbackRef: callbackId,
                    result: response
                };
                rpcServerInvokeClientCallbackWithPostMessageTransport(responseMessage);
            };
        }
    }

    function createDuplexCallbackProxy(callbackId) {
        return {
            invokeCallback: function (response) {
                var responseMessage = {
                    verb: ML.Internal.Rpc.OperationType.AsyncDuplex,
                    callbackRef: callbackId,
                    result: response
                };
                rpcServerInvokeClientCallbackWithPostMessageTransport(responseMessage);
            },
            releaseCallback: function () {
                var responseMessage = {
                    verb: ML.Internal.Rpc.OperationType.AsyncDuplexEnd,
                    callbackRef: callbackId
                };
                rpcServerInvokeClientCallbackWithPostMessageTransport(responseMessage);
            }
        };
    }

    ML.Namespace.defineWithParent(ML, "Internal.Rpc", {
        RpcServer: {
            // TODO: Remove this when the iframe post message is wired
            rpcServerReceiveFromPostMessageTransport: rpcServerReceiveFromPostMessageTransport
        }
    });
})(ML);


(function (ML, undefined) {
    "use strict";

    var requestResponseCallbacks,
        longStandingCallbacks;

    // Request/Response callbacks - The Rpc server calls them back exactly once and they are released
    requestResponseCallbacks = (function () {
        var registeredCallbacks = {};

        function registerCallback(userCallback, isPromiseProxy) {
            if (typeof userCallback !== "function") {
                throw "userCallback must be a function";
            }
            if (typeof isPromiseProxy !== "boolean") {
                throw "isPromiseProxy must be a boolean";
            }
            var callbackId = "rpc_otc_" + (isPromiseProxy ? "prom" : "cb") + "_" + ML.Internal.Rpc.generateID();
            registeredCallbacks[callbackId] = userCallback;
            return callbackId;
        }

        function invokeCallbackByIdAndRelease(callbackId, result) {
            if (callbackId in registeredCallbacks) {
                var callback = registeredCallbacks[callbackId];
                delete registeredCallbacks[callbackId];
                callback.call(this, result);
            } else {
                throw "Callback callbackId could not be found";
            }
        }

        return {
            registerCallback: registerCallback,
            invokeCallbackByIdAndRelease: invokeCallbackByIdAndRelease
        };
    })();

    // Long standing callbacks - The Rpc server calls them several times - they tend to be registered for a longer time
    longStandingCallbacks = (function () {
        var registeredCallbacks = {};

        function registerCallback(userCallback) {
            if (typeof userCallback !== "function") {
                throw "userCallback must be a function";
            }
            var callbackId = "rpc_lsc_" + ML.Internal.Rpc.generateID();
            registeredCallbacks[callbackId] = userCallback;
            return callbackId;
        }

        function invokeCallbackById(callbackId, result) {
            if (callbackId in registeredCallbacks) {
                var callback = registeredCallbacks[callbackId];
                callback.call(this, result);
            } else {
                throw "Callback callbackId could not be found";
            }
        }

        function releaseCallbackById(callbackId) {
            if (callbackId in registeredCallbacks) {
                delete registeredCallbacks[callbackId];
            }
        }

        return {
            registerCallback: registerCallback,
            invokeCallbackById: invokeCallbackById,
            releaseCallbackById: releaseCallbackById
        };
    })();

    function rpcInvokeWithPostMessageTransport(message) {
        // TODO: Remove this direct call and replace with an actual iframe postMessage
        ML.Internal.Rpc.RpcServer.rpcServerReceiveFromPostMessageTransport(JSON.stringify(message));
    }

    function rpcClientReceiveFromPostMessageTransport(data) {
        // TODO: This is an incoming message for an extension - do we need security checks?
        try {
            var message = JSON.parse(data);

            // Dispatch based on verb
            switch (message.verb) {
                case ML.Internal.Rpc.OperationType.AsyncRequestResponse:
                case ML.Internal.Rpc.OperationType.AsyncDuplex:
                    invokeClientCallback(message);
                    break;

                case ML.Internal.Rpc.OperationType.AsyncDuplexEnd:
                    releaseClientCallback(message);
                    break;

                default:
                    throw "RpcClient: Unknown Rpc method";
            }
        }
        catch (e) {
            // CONSIDER: Logging that we received a message which was malformed

            // Prevent silent failures that cost partners hours
            ML.Diagnostics.Log.writeEntry("ML.Internal.RpcClient", e.toString(), ML.Diagnostics.LogEntryLevel.error);

            // JSGOUPIL: don't swallow the error here
            throw e;
        }
    }

    function invokeClientCallback(message) {
        switch (message.verb) {
            case ML.Internal.Rpc.OperationType.AsyncRequestResponse:
                requestResponseCallbacks.invokeCallbackByIdAndRelease(message.callbackRef, message.result);
                break;

            case ML.Internal.Rpc.OperationType.AsyncDuplex:
                longStandingCallbacks.invokeCallbackById(message.callbackRef, message.result);
                break;
        }
    }

    function releaseClientCallback(message) {
        longStandingCallbacks.releaseCallbackById(message.callbackRef);
    }

    function rpcInvokeRequestResponseInternal(functionName, resultCallback, isPromiseProxy, argsArray) {
        var callbackId = requestResponseCallbacks.registerCallback(resultCallback, isPromiseProxy),
            message = {
                verb: ML.Internal.Rpc.OperationType.AsyncRequestResponse,
                funcName: functionName,
                args: argsArray,
                callbackRef: callbackId
            };

        rpcInvokeWithPostMessageTransport(message);
    }

    // ------------------------------------------------------------------------
    // Public methods
    // ------------------------------------------------------------------------

    function rpcInvokeOneWay(functionName, args) {
        var argsArray = [].slice.call(arguments),
            message;
        argsArray.splice(0, 1);
        message = {
            verb: ML.Internal.Rpc.OperationType.OneWay,
            funcName: functionName,
            args: argsArray
        };

        rpcInvokeWithPostMessageTransport(message);
    }

    function rpcInvokeRequestResponse(functionName, resultCallback, args) {
        var argsArray = [].slice.call(arguments);
        argsArray.splice(0, 1);
        rpcInvokeRequestResponseInternal(functionName, resultCallback, false, argsArray);
    }

    function rpcInvokeRequestResponseWithPromise(functionName, args) {
        var argsArray = [].slice.call(arguments);
        argsArray.splice(0, 1);

        return new ML.Promise(function (complete, error, progress) {
            var promiseProxy = function (result) {
                switch (result.type) {
                    case ML.Internal.Rpc.PromiseOperationType.Complete:
                        complete(result.data);
                        break;
                    case ML.Internal.Rpc.PromiseOperationType.Error:
                        error(result.data);
                        break;
                    case ML.Internal.Rpc.PromiseOperationType.Progress:
                        progress(result.data);
                        break;
                }
            };

            rpcInvokeRequestResponseInternal(functionName, promiseProxy, true, argsArray);
        });
    }

    function rpcInvokeDuplex(functionName, longStandingCallback, args) {
        var callbackId = longStandingCallbacks.registerCallback(longStandingCallback),
            argsArray = [].slice.call(arguments),
            message;

        argsArray.splice(0, 2);
        message = {
            verb: ML.Internal.Rpc.OperationType.AsyncDuplex,
            funcName: functionName,
            args: argsArray,
            callbackRef: callbackId
        };

        rpcInvokeWithPostMessageTransport(message);
    }

    ML.Namespace.defineWithParent(ML, "Internal.Rpc", {
        RpcClient: {
            rpcInvokeOneWay: rpcInvokeOneWay,
            rpcInvokeRequestResponse: rpcInvokeRequestResponse,
            rpcInvokeRequestResponseWithPromise: rpcInvokeRequestResponseWithPromise,
            rpcInvokeDuplex: rpcInvokeDuplex,

            // TODO: Remove this from the public surface when we use iframes
            rpcClientReceiveFromPostMessageTransport: rpcClientReceiveFromPostMessageTransport
        }
    });

})(ML);
/// <dependency type="js" file="ML.js" />

(function ($, ml, global, undefined) {
    "use strict";

    var messagePrefix = "__FXCOMMUNICATION__",
        registeredWorkers = {},
        isValidSource = function (frame, messageEvent) {
            // If the message comes from the parent, we trust it, because we know it, we registered to it
            if (messageEvent.source === global.parent) {
                return true;
            }

            if (registeredWorkers[frame.source]) {
                if (registeredWorkers[frame.source].origin === messageEvent.origin) {
                    return true;
                }
            }

            return false;
        },
        receiver = null,
        /// <disable>JS2076.IdentifierIsMiscased</disable> // Those variables are classes and we override some properties to it
        CommunicationReceiver, CommunicationSender;
    /// <enable>JS2076.IdentifierIsMiscased</enable>

    function validateString(value, name) {
        if (typeof value !== "string" || !/^([A-Za-z0-9_-])*$/.test(value)) {
            throw name + " must be a string containing letters, numbers, underscore or dash.";
        }
    }

    function saveLastMessage(frame, message, messageEvent) {
        var worker = registeredWorkers[frame.source];
        if (worker) {
            worker.lastMessage = message;
            worker.timeStamp = messageEvent.timeStamp;
            worker.messageEvent = messageEvent;
        }
    }

    CommunicationReceiver = function (channelName, options) {
        /// <summary>
        /// Constructor, creates a receiver with its channelName with name and options.
        /// &#10;Use ML.Communication.Receiver.create
        /// </summary>
        /// <param name="channelName" type="String">Channel Name</param>
        /// <param name="options" type="Object">Options</param>

        var callbacks = {
            data: $.Callbacks(),
            error: $.Callbacks(),
            relay: $.Callbacks()
        }, that = this,
            callbacksProtocol = {},
            messageHandler = function (messageEvent) {
                var data = messageEvent.data,
                    firstFrameIndex,
                    frame,
                    message;

                if (data.substr(0, messagePrefix.length) === messagePrefix) {
                    data = data.substr(messagePrefix.length);
                } else {
                    // We received a message which we do not handle
                    return;
                }

                // Parse only the first frame
                firstFrameIndex = data.indexOf("}") + 1;
                frame = JSON.parse(data.substr(0, firstFrameIndex));
                message = data.substr(firstFrameIndex);

                // Check if message is an object? otherwise throw?
                if (frame.destination !== "" && frame.destination !== channelName) {
                    callbacks.relay.fireWith(that, [frame, message, messageEvent]);
                } else {
                    if (isValidSource(frame, messageEvent)) {
                        callbacks.data.fireWith(that, [frame, message, messageEvent]);
                    } else {
                        // We accept only REGISTER from here, you need to register if you want to talk
                        if (frame.protocol === "REGISTER") {
                            callbacks.data.fireWith(that, [frame, message, messageEvent]);
                        } else {
                            callbacks.error.fireWith(that, [frame, message, messageEvent]);
                        }
                    }
                }
            },
            isRegistered = false;

        this.destroy = function () {
            if (global.removeEventListener) {
                global.removeEventListener("message", messageHandler, false);
            } else {
                global.detachEvent("onmessage", messageHandler);
            }
        };

        this.on = function (name, callback) {
            /// <summary>
            /// Listens to specific events happening on the channel. Supported event names are:
            /// &#10; * data: any valid data designated to this channel
            /// &#10; * error: any invalid data
            /// &#10; * relay: any valid data not designated for this channel
            /// </summary>
            /// <param name="name" type="String">Event name</param>
            /// <param name="callback" type="Function">The callback</param>

            if (!callbacks[name]) {
                throw "This event name is not supported";
            }

            callbacks[name].add(callback);
        };

        this.off = function (name, callback) {
            /// <summary>
            /// Stops listening to specific events happening on the channel.
            /// &#10;For supported event names, see on function.
            /// </summary>
            /// <param name="name" type="String">Event name</param>
            /// <param name="callback" type="Function">The callback</param>

            if (!callbacks[name]) {
                throw "This event name is not supported";
            }

            callbacks[name].remove(callback);
        };

        this.bind = function (protocol, callback) {
            /// <summary>Binds a specific callback on a protocol name.</summary>
            /// <param name="protocol" type="String">The protocol</param>
            /// <param name="callback" type="Function">The callback</param>

            var callbackProtocol = callbacksProtocol[protocol] = callbacksProtocol[protocol] || $.Callbacks();
            callbackProtocol.add(callback);
        };

        this.unbind = function (protocol, callback) {
            /// <summary>Unbinds a specific callback from a protocol name.</summary>
            /// <param name="protocol" type="String">The protocol</param>
            /// <param name="callback" type="Function">The callback</param>

            if (callbacksProtocol[protocol]) {
                callbacksProtocol[protocol].remove(callback);
            }
        };

        this.getChannelName = function () {
            /// <summary>Gets the current channel name.</summary>
            /// <returns type="String" />

            return channelName;
        };

        this.register = function () {
            /// <summary>Registers the channel to its frame and starts listening to cross iFrame messages.</summary>

            // Register the listener name with the parent
            if (!isRegistered) {
                isRegistered = true;
                var sender = new CommunicationSender("");

                // We register to ourself, so nobody can take this name from us
                sender._setHandle(global);
                sender.send("REGISTER");

                /// <disable>JS2031.UseStrictEqualityOperators</disable> // IE8 returns proxy windows constantly, must use weak
                // Register to the parent right now, because the other calls need to go in order on the stack
                if (global.parent != global) {
                    sender = new CommunicationSender("");
                    sender.send("REGISTER");
                }
            }
        };

        this.isRegistered = function () {
            /// <summary>Returns if the current channel is registered.</summary>
            /// <returns type="Boolean" />

            return isRegistered;
        };

        this.on("data", function (frame) {
            if (callbacksProtocol[frame.protocol]) {
                callbacksProtocol[frame.protocol].fireWith(this, [].slice.call(arguments));
            }
        });

        if (global.addEventListener) {
            global.addEventListener("message", messageHandler, false);
        } else {
            // IE8 will be on the same callstack and synchronous.
            // It's not possible to put a setTimeout here because the COM object messageHandler get GC-ed.
            global.attachEvent("onmessage", messageHandler);
        }
    };

    CommunicationReceiver.create = function (channelName, options) {
        /// <summary>
        /// Creates a Communication.Receiver associated with the current frame.
        /// You can only have one receiver per frame.
        /// </summary>
        /// <param name="channelName" type="String">Channel name</param>
        /// <param name="options" type="Object">Options</param>
        /// <returns type="ML.Communication.Receiver">Returns the server listener</returns>

        if (receiver) {
            throw "You can create only one server listener.";
        }

        validateString(channelName, "channelName");

        receiver = new CommunicationReceiver(channelName, options);
        receiver.on("relay", function (frame, message, messageEvent) {
            /// <disable>JS2031.UseStrictEqualityOperators</disable> // IE8 returns proxy windows constantly, must use weak

            var sender;

            // We don't relay if we are the parent and we don't know the destination
            if (global.parent == global && !registeredWorkers[frame.destination]) {
                throw "The destination is not found.";
            }

            sender = new CommunicationSender(frame.destination);
            sender._setSource(frame.source);
            sender._sendRaw(messageEvent.data);
        });
        receiver.bind("REGISTER", function (frame, message, messageEvent) {
            var worker;

            if (frame.source in registeredWorkers) {
                // If we have the same origin, we allow to continue, otherwise we throw
                if (!isValidSource(frame, messageEvent)) {
                    // TODO Trigger an error
                    return;
                }
            }

            worker = registeredWorkers[frame.source] = {};
            worker.handle = messageEvent.source;
            worker.origin = messageEvent.origin;
        });
        receiver.bind("REGISTER", function (frame, message, messageEvent) {
            /// <disable>JS2031.UseStrictEqualityOperators</disable> // IE8 returns proxy windows constantly, must use weak

            var sender;

            // We want to register above until we hit the top
            // If the messageEvent is from us, we already tried to register to the parent
            if (global.parent != global && messageEvent.source != global) {
                sender = new CommunicationSender(frame.destination);
                sender._setSource(frame.source);
                sender._sendRaw(messageEvent.data);
            }
        });
        receiver.on("data", function (frame, message, messageEvent) {
            saveLastMessage(message, messageEvent);
        });

        return receiver;
    };

    CommunicationReceiver.destroy = function () {
        /// <summary>
        /// Destroys the current listener.
        /// </summary>

        if (receiver) {
            registeredWorkers = {};
            receiver.destroy();
            receiver = null;
        }
    };

    CommunicationReceiver.getReceiver = function () {
        /// <summary>
        /// Gets the current listener.
        /// </summary>
        /// <returns type="ML.Communication.Receiver" />

        return receiver;
    };

    CommunicationSender = function (destination) {
        /// <summary>
        /// Constructor, creates a sender communication to talk to a specific destination.
        /// </summary>
        /// <param name="destination" type="String">Destination</param>

        var handle = global.parent,
            source;

        validateString(destination, "destination");

        if (!receiver || !receiver.isRegistered()) {
            throw "You must setup a server listener to talk with someone.";
        }

        source = receiver.getChannelName();

        if (registeredWorkers[destination]) {
            handle = registeredWorkers[destination].handle;
        }

        this.send = function (protocol, message) {
            /// <summary>
            /// Sends a message filtered with a specific protocol to the server.
            /// </summary>
            /// <param name="protocol" type="String">Protocol</param>
            /// <param name="message" type="String">Message to send</param>

            var frame = {
                source: source,
                destination: destination,
                protocol: protocol
            }, data;

            validateString(protocol, "protocol");

            message = message || "";
            data = JSON.stringify(frame) + message;
            this._sendRaw(messagePrefix + data);
        };

        this._setSource = function (newSource) {
            source = newSource;
        };

        this._setHandle = function (newHandle) {
            handle = newHandle;
        };

        this._sendRaw = function (data) {
            try {
                handle.postMessage(data, "*");
            } catch (e) {
                if (e && typeof e.message === "string" && e.message.trim() === "Operation aborted") {
                    if (global.console && global.console.error) {
                        global.console.error("An error occurred when using postMessage. This is most likely due to an IE10 bug. Please refer to the documentation how to fix this.");
                    }
                } else {
                    throw e;
                }
            }
        };
    };

    /// <disable>JS2076.IdentifierIsMiscased</disable> // Receiver and Sender are class names
    ml.Namespace.defineWithParent(ML, "Communication", {
        Receiver: CommunicationReceiver,
        Sender: CommunicationSender
    });
    /// <enable>JS2076.IdentifierIsMiscased</enable>
})(jQuery, ML, this);

(function (ml, $, global, undefined) {
    "use strict";

    var getGuid = function () {
        return newGuid().replace(/-/g, "_");
    }, jsonProcessors = [], processReleaseArgumentsHandle = null;

    // Generated non-zero octect sequences for use with GUID generation
    function oct(length) {
        if (!length) {
            return (Math.floor(Math.random() * 0x10)).toString(16);
        }
        var result = "",
        i;
        for (i = 0; i < length; i++) {
            result += oct();
        }
        return result;
    }

    function newGuid  () {
        /// <summary>Returns a GUID such as xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.</summary>
        /// <returns type="String" />

        // c.f. rfc4122 (UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
        // "Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively"
        var clockSequenceHi = 128 + Math.floor(Math.random() * 64).toString(16);
        return oct(8) + "-" + oct(4) + "-4" + oct(3) + "-" + clockSequenceHi + oct(2) + "-" + oct(12);
    };

    function JsonProcessor() {
        /// <summary>JsonProcessor used when analyzing receiving and sending data.</summary>
        /// <field name="canHandleReplacer" type="Function">Function receiving a value which indicates if it can handle the replacer (before sending)</field>
        /// <field name="canHandleReviver" type="Function">Function receiving a value which indiciates if it can handle the reviver (after receiving)</field>
        /// <field name="handleReplacer" type="Function">Function handling the value for replacement</field>
        /// <field name="handleReviver" type="Function">Function handling the value for reviving</field>

        this.canHandleReplacer = function (value) { return false; };
        this.canHandleReviver = function (value) { return false; };
        this.handleReplacer = function (value) { return value; };
        this.handleReviver = function (value) { return value; };
    }

    function findProcessor(method, item) {
        var i, len = jsonProcessors.length;
        for (i = 0; i < len; i++) {
            if (jsonProcessors[i][method](item)) {
                return jsonProcessors[i];
            }
        }

        return null;
    }

    function jsonReplacerPreProcess(item) {
        var i, replacer;
        for (i in item) {
            if (item.hasOwnProperty(i)) {
                replacer = findProcessor("canHandleReplacer", item[i]);

                if (replacer) {
                    item[i] = replacer.handleReplacer(item[i]);
                } else if (typeof item[i] === "object") {
                    jsonReplacerPreProcess(item[i]);
                }
            }
        }
    }

    function jsonReplacer(item) {
        jsonReplacerPreProcess(item);

        return function (key, value) {
            var id;
            if (typeof value === "function") {
                id = getGuid();
                value.__guid = id;
                ml.Communication.Receiver.getReceiver().addMethod(id, value, { hidden: true });
                return { "##rpc_function##": id };
            }

            return value;
        };
    }

    function jsonReviver(destination, releaseArguments) {
        return function (key, value) {
            var reviver = findProcessor("canHandleReviver", value),
                returnFunction;

            if (reviver) {
                return reviver.handleReviver(value);
            } else if (value && value["##rpc_function##"]) {
                returnFunction = function () {
                    var sender = new ml.Communication.Sender(destination),
                        method = sender.getMethod(value["##rpc_function##"]),
                        ret = method.apply(null, [].slice.call(arguments));
                    sender.close();
                    return ret;
                };

                returnFunction.__guid = value["##rpc_function##"];
                releaseArguments[value["##rpc_function##"]] = { release: true, destination: destination, temp: returnFunction };

                return returnFunction;
            }

            return value;
        };
    }

    function processReleaseArguments(receiver) {
        // We wrap this into a setTimeout so we call it only once for all hold/release arguments we do
        global.clearTimeout(processReleaseArgumentsHandle);
        processReleaseArgumentsHandle = global.setTimeout(function () {
            var argumentsPerDestination = {},
                i, sender;

            for (i in receiver._releaseArguments) {
                if (receiver._releaseArguments.hasOwnProperty(i)) {
                    if (receiver._releaseArguments[i].release) {
                        if (!argumentsPerDestination[receiver._releaseArguments[i].destination]) {
                            argumentsPerDestination[receiver._releaseArguments[i].destination] = [];
                        }
                        argumentsPerDestination[receiver._releaseArguments[i].destination].push(i);

                        /// <disable>JS2078.DoNotDeleteObjectProperties</disable> // We created the guid, let's delete it now
                        delete receiver._releaseArguments[i].temp.__guid;
                        delete receiver._releaseArguments[i];
                        /// <enable>JS2078.DoNotDeleteObjectProperties</enable>
                    }
                }
            }

            for (i in argumentsPerDestination) {
                if (argumentsPerDestination.hasOwnProperty(i)) {
                    sender = new ml.Communication.Sender(i);
                    sender.send("RPC_RELEASE", JSON.stringify(argumentsPerDestination[i]));
                    sender.close();
                }
            }
        }, 1);
    }

    function onRpc(frame, message, messageEvent) {
        var messageObject = JSON.parse(message, jsonReviver(frame.source, this._releaseArguments)),
            methodObject = this._listeningMethods[messageObject.method],
            sender, returnValue;
        if (!methodObject) {
            throw "Callback not found - " + messageObject.method;
        }

        try {
            // TODO Channel will come soon
            returnValue = { status: "done", value: methodObject.callback.apply({ receiver: this, channel: null }, messageObject.args) };
        } catch (ex) {
            this.releaseArgument(messageObject.args);
            returnValue = { status: "throw", exception: ex };
        }

        // If we were sync, we call back the sender
        if (messageObject.handle) {
            sender = new ml.Communication.Sender(frame.source);
            sender.getMethod(messageObject.handle).invokeAsync(returnValue);
            sender.close();
        }

        // We release
        processReleaseArguments(this);
    }

    function onRpcRelease(frame, message, messageEvent) {
        var messageObject = JSON.parse(message), i;

        for (i = 0; i < messageObject.length; i++) {
            this.removeMethod(messageObject[i]);
            /// <disable>JS2078.DoNotDeleteObjectProperties</disable>
            delete messageObject[i].__guid;
            /// <enable>JS2078.DoNotDeleteObjectProperties</enable>
        }
    }

    function populateSendingDeferred(sendingDeferred, args, position) {
        var variableRecoveryDeferred = $.Deferred();
        args[position].done(function (value) {
            args[position] = value;
            variableRecoveryDeferred.resolve();
        });
        sendingDeferred.push(variableRecoveryDeferred.promise());
    }

    function processQueue(rpcFrame, client) {
        var dependentArgs = [], i = rpcFrame.args.length - 1;

        for (; i >= 0; i--) {
            if (rpcFrame.args[i] && rpcFrame.args[i]["##rpc_handle##"]) {
                dependentArgs.push(rpcFrame.args[i]);
            }
        }

        return $.when.apply(this, dependentArgs)
            .done(function () {
                var sendingDeferred = [], i = rpcFrame.args.length - 1;

                // Replace the deferred objects by their real value
                for (; i >= 0; i--) {
                    if (rpcFrame.args[i] && rpcFrame.args[i]["##rpc_handle##"]) {
                        populateSendingDeferred(sendingDeferred, rpcFrame.args, i);
                    }
                }

                $.when.apply(this, sendingDeferred).done(function () {
                    client.send("RPC", JSON.stringify(rpcFrame, jsonReplacer(rpcFrame)));
                });
            });
    }

    function addToQueue(rpcFrame, client) {
        var handle = getGuid(),
            receiver = ml.Communication.Receiver.getReceiver(),
            deferred = $.Deferred(),
            promise = deferred.promise(),
            executeNextItem = function () {
                client._latestDeferred = deferred;
                receiver.addMethod(handle, function (result) {
                    receiver.removeMethod(handle);

                    switch (result.status) {
                        case "done":
                            deferred.resolveWith(this, [result.value]);
                            break;
                        case "throw":
                            deferred.rejectWith(this, [result]);
                            break;
                    }
                }, { hidden: true });

                rpcFrame.handle = handle;
                processQueue(rpcFrame, client)
                    .fail(function () {
                        deferred.rejectWith(this, [{ status: "dependent" }]);
                    });
            };

        // We attach a handle because we want to wait for only those if you use it as an argument.
        promise["##rpc_handle##"] = handle;

        client._syncQueue = client._syncQueue.pipe(function () {
            executeNextItem();

            return deferred;
        }, function (result) {
            if (result.status === "abort") {
                return deferred.rejectWith(this, [{ status: "abort" }]);
            }

            executeNextItem();
            return deferred;
        });

        promise.fail(function () {
            // Deactivate all pending callbacks
            var deactivateCallbacks = function (arg) {
                for (var i in arg) {
                    if (typeof arg[i] === "object") {
                        deactivateCallbacks(arg[i]);
                    } else if (typeof arg[i] === "function" && arg[i].__guid) {
                        if (receiver.getMethodNames("hidden").indexOf(arg[i].__guid) >= 0) {
                            receiver.removeMethod(arg[i].__guid);
                            receiver.addMethod(arg[i].__guid, $.noop, { hidden: true });
                        }
                    }
                }
            };

            deactivateCallbacks(rpcFrame.args);
        });

        return promise;
    }

    function holdOrRelease(arg, release) {
        if (typeof arg === "function") {
            if (arg.__guid) {
                this._releaseArguments[arg.__guid].release = release;
            }

            if (arg.__extra) {
                holdOrRelease.call(this, arg.__extra, release);
            }
        } else {
            // We parse the whole argument to find __guid first
            for (var i in arg) {
                if (typeof arg[i] === "object" || typeof arg[i] === "function") {
                    holdOrRelease.call(this, arg[i], release);
                }
            }
        }
    }

    // Receiver
    ml.Communication.Receiver.prototype.holdArgument = function (arg) {
        /// <summary>
        /// Holds a specific argument so we do not send a release call to the client.
        /// &#10;This is required if the argument contains function callbacks.
        /// &#10;You must call releaseArgument once you do not need the argument anymore.
        /// </summary>
        /// <param name="arg" type="Object">Argument to keep</param>

        holdOrRelease.call(this, arg, false);
    };

    ml.Communication.Receiver.prototype.releaseArgument = function (arg) {
        /// <summary>Releases a specific argument and we send release afterwards to the client.</summary>
        /// <param name="arg" type="Object">Argument to keep</param>

        holdOrRelease.call(this, arg, true);
        processReleaseArguments(this);
    };

    ml.Communication.Receiver.prototype.addMethod = function (methodName, callback, options) {
        /// <summary>Adds a method to listen to which a sender can call.</summary>
        /// <param name="methodName" type="String">The method name, can contain periods</param>
        /// <param name="callback" type="Function">Function callback</param>
        /// <param name="options" type="Object">Options. hidden: Will not show when listing the methods</param>

        if (!methodName) {
            throw "methodName must be defined.";
        }

        if (!callback) {
            throw "Callback must be defined.";
        }

        if (!this._listeningMethods) {
            this._releaseArguments = this._releaseArguments || [];
            this._listeningMethods = {};
            this.bind("RPC", onRpc);
            this.bind("RPC_RELEASE", onRpcRelease);
        }

        ////console.log("ADD " + methodName);
        ////console.log(callback);
        this._listeningMethods[methodName] = { callback: callback, options: $.extend({ hidden: false }, options) };
    };

    ml.Communication.Receiver.prototype.removeMethod = function (methodName) {
        /// <summary>Stops listening on the method, the sender won't be able to call this method anymore.</summary>
        /// <param name="methodName" type="String">Name of the method to stop listening</param>

        ////console.log("REMOVE " + methodName);

        delete this._listeningMethods[methodName];
    };

    ml.Communication.Receiver.prototype.getMethodNames = function (methodType) {
        /// <summary>Lists the available listening methods for the cunrrent channel.</summary>
        /// <param name="methodType" type="String">Type of method to return. all: all methods; public: non-hidden method; hidden: only hidden method</param>
        /// <returns type="Array" elementType="String" />

        methodType = methodType || "public";

        return $.map(this._listeningMethods || {}, function (value, key) {
            if (methodType === "all" || (methodType === "public" && !value.options.hidden) || (methodType === "hidden" && value.options.hidden)) {
                return key;
            }

            return null;
        });
    };

    // TODO Should we call the releaseArguments when we destroy?

    // Sender
    ml.Communication.Sender.prototype.getMethod = function (methodName) {
        /// <summary>Gets the method associated with the channel.</summary>
        /// <param name="methodName" type="String">Method name</param>
        /// <returns type="Function" />

        var client = this,
            rpcFrame = { method: methodName },
            returnFunction;

        if (typeof methodName !== "string" || !methodName) {
            throw "You must provide a method name as a string.";
        }

        returnFunction = function () {
            /// <summary>Calls the method on the server. You can pass any arguments.</summary>
            /// <returns type="Object">Returns a handle that can be used in subsequent functions.</returns>

            client._latestDeferred = client._latestDeferred || $.Deferred();
            client._syncQueue = client._syncQueue || client._latestDeferred.resolve();

            rpcFrame.args = [].slice.call(arguments);
            return addToQueue(rpcFrame, client);
        };

        returnFunction.invokeAsync = function () {
            /// <summary>
            /// Calls the method on the server. You can pass any arguments.
            /// This method will not sync with the server for subsequent calls.
            /// </summary>

            rpcFrame.args = [].slice.call(arguments);
            client.send("RPC", JSON.stringify(rpcFrame, jsonReplacer(rpcFrame)));
        };

        return returnFunction;
    };

    ml.Communication.Sender.prototype.abort = function () {
        /// <summary>Aborts the channel and make sure the queue is failed.</summary>

        if (this._syncQueue && this._latestDeferred) {
            this._latestDeferred.rejectWith(this, [{ status: "abort" }]);
        }
    };

    ml.Communication.Sender.prototype.close = function () {
        /// <summary>Closes the channel connection and make sure the handles are destroyed.</summary>

        this._syncQueue = null;
        this._latestDeferred = null;
    };

    /// <disable>JS2076.IdentifierIsMiscased</disable> // JsonProcessor is a class name
    ml.Namespace.defineWithParent(ml, "Communication.Rpc", {
        JsonProcessor: JsonProcessor,
        addJsonProcessor: function (jsonProcessor) {
            /// <summary>Adds a JSON processor which can be called when sending or receiving data.</summary>
            /// <param name="jsonProcessor" type="JsonProcessor" />

            jsonProcessors.push(jsonProcessor);
        },
        removeJsonProcessor: function (jsonProcessor) {
            /// <summary>Removes a JSON processor.</summary>
            /// <param name="jsonProcessor" type="JsonProcessor" />

            for (var i = 0; i < jsonProcessors.length; i++) {
                if (jsonProcessors[i] === jsonProcessor) {
                    jsonProcessors.splice(i, 1);
                    break;
                }
            }
        }
    });
    /// <enable>JS2076.IdentifierIsMiscased</enable>
})(ML, jQuery, this);
/// <dependency type="js" file="array.js" />
/// <dependency type="js" file="ML.Communication.Rpc.js" />
/// <dictionary>rel</dictionary>

(function ($, ml, global, undefined) {
    "use strict";

    var toJsonProcessor = new ml.Communication.Rpc.JsonProcessor(),
        jQueryEventProcessor = new ml.Communication.Rpc.JsonProcessor(),
        dateProcessor = new ml.Communication.Rpc.JsonProcessor(),
        deferredProcessor = new ml.Communication.Rpc.JsonProcessor(),
        exceptionProcessor = new ml.Communication.Rpc.JsonProcessor(),
        windowOpenerProcessor = new ml.Communication.Rpc.JsonProcessor(),
        chromeWebStoreInstaller = new ml.Communication.Rpc.JsonProcessor();

    toJsonProcessor.canHandleReplacer = function (value) {
        return value && typeof value.toJSON === "function";
    };
    toJsonProcessor.handleReplacer = function (value) {
        return value;
    };

    jQueryEventProcessor.canHandleReplacer = function (value) {
        return value instanceof jQuery.Event;
    };
    jQueryEventProcessor.handleReplacer = function (value) {
        return "jQuery Event";
    };

    dateProcessor.canHandleReplacer = function (value) {
        return value instanceof Date;
    };
    dateProcessor.handleReplacer = function (value) {
        return { "##rpc_date##": value };
    };
    dateProcessor.canHandleReviver = function (value) {
        return value && value["##rpc_date##"];
    };
    dateProcessor.handleReviver = function (value) {
        return new Date(value["##rpc_date##"]);
    };

    deferredProcessor.canHandleReplacer = function (value) {
        return value && typeof value.promise === "function" && typeof value.done === "function";
    };
    deferredProcessor.handleReplacer = function (value) {
        // We need to hold the argument for each of the method if it's being called.
        if (!value["##rpc_processed"]) {
            var prevFail = value.fail, prevDone = value.done, receiver = ml.Communication.Receiver.getReceiver();
            if (receiver) {
                ["always", "done", "fail", "progress", "then"].forEach(function (method) {
                    var prev = value[method];
                    value[method] = function () {
                        var args = arguments, ret;
                        receiver.holdArgument(arguments);
                        ret = prev.apply(this, arguments);
                        prevFail(function () {
                            receiver.releaseArgument(args);
                        });
                        prevDone(function () {
                            receiver.releaseArgument(args);
                        });
                        return ret;
                    };
                });
                value["##rpc_processed"] = true;
            }
        }

        return value;
    };

    exceptionProcessor.canHandleReplacer = function (value) {
        return value instanceof Error;
    };
    exceptionProcessor.handleReplacer = function (value) {
        // Some exception properties are on the proto; let's create a new object
        var obj = { "##rpc_error##": {} },
            objError = obj["##rpc_error##"];

        ["name", "message", "stack", "number", "description"].forEach(function (property) {
            objError[property] = value[property];
        });

        if (value instanceof EvalError) {
            objError.type = "EvalError";
        } else if (value instanceof RangeError) {
            objError.type = "RangeError";
        } else if (value instanceof ReferenceError) {
            objError.type = "ReferenceError";
        } else if (value instanceof SyntaxError) {
            objError.type = "SyntaxError";
        } else if (value instanceof TypeError) {
            objError.type = "TypeError";
        } else if (value instanceof URIError) {
            objError.type = "URIError";
        } else {
            objError.type = "Error";
        }

        return obj;
    };
    exceptionProcessor.canHandleReviver = function (value) {
        return value && value["##rpc_error##"];
    };
    exceptionProcessor.handleReviver = function (value) {
        var objError = value["##rpc_error##"],
            error = objError.type ? new global[objError.type](objError.message) : new Error(objError.message);
        ["name", "stack", "number", "description"].forEach(function (property) {
            error[property] = objError[property];
        });

        return error;
    };

    windowOpenerProcessor.canHandleReviver = function (value) {
        return value && value["##window_open_url##"];
    };
    windowOpenerProcessor.handleReviver = function (value) {
        var url = value["##window_open_url##"],
            target = value["##window_open_target##"] || "_blank",
            features = value["##window_open_features##"] || "",
            extra = value["##window_open_extra##"] || null,
            func = function () {
                global.open(url, target, features);
                if (extra) {
                    extra();
                }
            };
        func.__extra = extra;
        return func;
    };

    chromeWebStoreInstaller.canHandleReviver = function (value) {
        return value && value["##chromeWebStoreInstall_url##"];
    };
    chromeWebStoreInstaller.handleReviver = function (value) {
        var url = value["##chromeWebStoreInstall_url##"],
            onSuccess = value["##chromeWebStoreInstall_onSuccess##"] || null,
            onFailure = value["##chromeWebStoreInstall_onFailure##"] || null,
            extra = value["##chromeWebStoreInstall_extra##"] || null,
            func = function () {
                var link = $("<link />")
                    .attr({
                        href: url,
                        rel: "chrome-webstore-item"
                    })
                    .appendTo("head"),
                    removeLink = function () {
                        link.remove();
                    };

                global.chrome.webstore.install(
                    url,
                    function () {
                        removeLink();
                        if (onSuccess) {
                            onSuccess.apply(null, arguments);
                        }
                    },
                    function () {
                        removeLink();
                        if (onFailure) {
                            onFailure.apply(null, arguments);
                        }
                    });
                if (extra) {
                    extra();
                }
            };
        func.__extra = [onSuccess, onFailure, extra];
        return func;
    };

    ml.Namespace.define("ML.Communication.Rpc.Functions", {
        windowOpen: function (url, target, features, extra) {
            /// <summary>
            /// Creates a special function to be executed on the receiver side.
            /// This function will execute window.open and prevent popup-blocker to happen.
            /// Since the click event will be triggered by a user event and not iframe.
            /// </summary>
            /// <param name="url" type="String">URL</param>
            /// <param name="target" type="String" optional="true">Target</param>
            /// <param name="features" type="String" optional="true">Features</param>
            /// <param name="extra" type="Function" optional="true">Extra Function to call after window.open happened</param>
            /// <returns type="Object">Object understood by the Rpc Reviver</returns>

            if (typeof target === "function") {
                extra = target;
                target = null;
            } else if (typeof features === "function") {
                extra = features;
                features = null;
            }

            return {
                "##window_open_url##": url,
                "##window_open_target##": target || null,
                "##window_open_features##": features || "",
                "##window_open_extra##": extra || null
            };
        },
        chromeWebStoreInstall: function (url, onSuccess, onFailure, extra) {
            /// <summary>
            /// Creates a special function to be executed on the receiver side.
            /// This function will execute chrome.webstore.install and prevent the error thrown my Chrome indicating the call must be triggered on a user event.
            /// </summary>
            /// <param name="url" type="String">URL</param>
            /// <param name="onSuccess" type="Function" optional="true">Method called on success</param>
            /// <param name="onFailure" type="Function" optional="true">Method called on failure</param>
            /// <param name="extra" type="Function" optional="true">Extra Function to call after chrome.webstore.install happened</param>
            /// <returns type="Object">Object understood by the Rpc Reviver</returns>

            return {
                "##chromeWebStoreInstall_url##": url,
                "##chromeWebStoreInstall_onSuccess##": onSuccess,
                "##chromeWebStoreInstall_onFailure##": onFailure,
                "##chromeWebStoreInstall_extra##": extra
            };
        }
    });

    ml.Communication.Rpc.addJsonProcessor(dateProcessor);
    ml.Communication.Rpc.addJsonProcessor(toJsonProcessor);
    ml.Communication.Rpc.addJsonProcessor(jQueryEventProcessor);
    ml.Communication.Rpc.addJsonProcessor(deferredProcessor);
    ml.Communication.Rpc.addJsonProcessor(exceptionProcessor);
    ml.Communication.Rpc.addJsonProcessor(windowOpenerProcessor);
    ml.Communication.Rpc.addJsonProcessor(chromeWebStoreInstaller);
})(jQuery, ML, this);
