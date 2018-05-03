(function (ml, undefined) {
    "use strict";

    var registeredServices = {},

        get = function (serviceName) {
            if (typeof serviceName === "string" && serviceName.length > 0 && serviceName in registeredServices) {
                return registeredServices[serviceName];
            } else {
                return null;
            }
        },

        add = function (serviceName, serviceInstance) {
            if (typeof serviceName === "string" && serviceName.length > 0) {
                registeredServices[serviceName] = serviceInstance;
            }
        };

    ml.Namespace.define("Impl.Services", {
        get: get,
        add: add
    });
})(ML);

var debugConsole = { debug: function () { } };
if (document.cookie.indexOf("tracePattern") >= 0) {
    debugConsole.debug = console.debug.bind(console);
}


(function (global, $, ml, impl, host, undefined) {
    "use strict";

    /// <disable>JS2076.IdentifierIsMiscased</disable> // LoggingService is a class name
    var LoggingService;
    /// <enable>JS2076.IdentifierIsMiscased</enable>

    LoggingService = ml.Class.define(function () {
        var that = this;

        this._replayEventsFromLocalStorage();

        host.onDocumentUnload(function () {
            debugConsole.debug("onDocumentUnload: queue length " + that._eventQueue.length);
            if (that._eventQueue.length > 0) {
                that._saveEventsToLocalStorage();
                that._eventQueue = [];
            }
        });
    },
    {
        _logViewer: null,
        _sendTimeoutMs: 10000,
        _maxQueuedEvents: ml.Environment.getTelementryQueueSize(),
        _eventQueue: [],
        _sendTimer: null,

        writeEntry: function (eventKey, message, severity, data) {
            var logData = {};

            if (this._logViewer !== null) {
                this._logViewer.logviewer("addEntry", message, severity);
            }

            data = this._getDataObject(data);

            $.extend(logData, {
                message: message,
                eventKey: eventKey
            }, data);

            this._logData(severity, logData);
        },

        exception: function (isHandledException, type, stackTrace, stringRepresentation, data) {
            var logData = {};

            data = this._getDataObject(data);

            $.extend(logData, {
                isHandledException: isHandledException,
                type: type,
                stackTrace: stackTrace,
                stringRepresentation: stringRepresentation
            },
                data);

            this._logData("exception", logData);
        },

        startup: function (secondsDuration, successfulDownloadCount, failedDownloadCount, failedDownloadSummary, downloadMetricsSummary, data) {
            var logData = {};

            data = this._getDataObject(data);

            $.extend(logData, {
                secondsDuration: secondsDuration,
                successfulDownloadCount: successfulDownloadCount,
                failedDownloadCount: failedDownloadCount,
                failedDownloadSummary: failedDownloadSummary,
                downloadMetricsSummary: downloadMetricsSummary
            },
                data);

            this._logData("startup", logData);
        },

        viewSwitch: function (fromView, toView, totalSeconds, data) {
            var logData = {};

            data = this._getDataObject(data);

            $.extend(logData, {
                fromView: fromView,
                toView: toView,
                totalSeconds: totalSeconds
            },
                data);

            this._logData("viewSwitch", logData);
        },

        clientAction: function (action, scenarioCorrelationId, selectedEntity, data) {
            var logData = {};

            data = this._getDataObject(data);

            $.extend(logData, {
                action: action,
                scenarioCorrelationId: scenarioCorrelationId,
                selectedEntity: selectedEntity
            },
                data);

            this._logData("clientAction", logData);
        },

        customEvent: function (eventKey, customEventType, data) {
            var logData = {};

            data = this._getDataObject(data);

            $.extend(logData, {
                customEventType: customEventType,
                eventKey: eventKey
            },
                data);

            this._logData("customEvent", logData);
        },

        clientScenario: function (scenarioCorrelationId, scenarioName, entityType, completionReason, userSeconds, endToEndSeconds, data) {
            var logData = {};

            data = this._getDataObject(data);

            $.extend(logData,
                {
                    scenarioCorrelationId: scenarioCorrelationId,
                    scenarioName: scenarioName,
                    entityType: entityType,
                    completionReason: completionReason,
                    userSeconds: userSeconds,
                    endToEndSeconds: endToEndSeconds
                },
                data);

            this._logData("clientScenario", logData);
        },

        performance: function (key, time, message, data) {
            var logData = {};

            data = this._getDataObject(data);

            $.extend(logData,
                {
                    key: key,
                    time: time,
                    message: message
                },
                data);

            this._logData("performance", logData);
        },

        feedbackInfo: function (comments, data) {
            debugConsole.debug("logged feedbackInfo " + comments + JSON.stringify(data));
            var logData = {};

            data = this._getDataObject(data);

            $.extend(logData,
                {
                    comments: comments
                },
                data);

            this._logData("feedbackInfo", logData, true);
        },

        featureUsage: function (featureId, featureName, groupId, groupName, workspaceId, experimentId, moduleId, data) {
            debugConsole.debug("logged featureUsage " + featureName);
            var logData = {};

            data = this._getDataObjectAsString(data);

            $.extend(logData,
                {
                    featureId: featureId,
                    featureName: featureName,
                    groupId: groupId,
                    groupName: groupName,
                    workspaceId: workspaceId,
                    experimentId: experimentId,
                    moduleId: moduleId,
                },
                data);

            this._logData("featureUsage", logData);
        },

        setLogViewer: function (newLogViewer) {
            this._logViewer = newLogViewer;
        },

        _getDataObjectAsString: function (data) {
            switch (typeof data) {
                case "object":
                    return { data: JSON.stringify(data) };
                case "undefined":
                    return "";
                case "string":
                    return { data: data };
                default:
                    return { data: data.toString() };
            }
        },

        _getDataObject: function (data) {
            var i, obj;

            switch (typeof data) {
                case "object":
                    if (data instanceof Array) {
                        obj = {};

                        for (i = 0; i < data.length; i++) {
                            obj["data" + i] = data[i];
                        }

                        return obj;
                    }

                    return data;
                case "undefined":
                    return {};
                case "string":
                    return { data: data };
                default:
                    return { data: data.toString() };
            }
        },

        _logData: function (methodName, data, sendToServerImmediately) {
            var that = this,
                eventId = LoggingService._methodToEventIdMap[methodName],
                isTelemetryEventDisabled = ml.Environment.getIsTelemetryEventDisabled();

            // server can send information about which events to log to the client on initial activation
            // (ids start at 450 so subtract 450 to get the zero-based index)
            if (!isTelemetryEventDisabled ||
                !isTelemetryEventDisabled[eventId - 450]) {
                this._eventQueue.push($.extend(data, { eventId: eventId }, this._getCommonLoggingData()));

                if (this._eventQueue.length >= this._maxQueuedEvents || sendToServerImmediately) {
                    this._sendEventsToServer();
                } else if (!this._sendTimer) {
                    this._sendTimer = global.setTimeout(function () {
                        that._sendEventsToServer();
                    }, this._sendTimeoutMs);
                }
            }
        },

        _saveEventsToLocalStorage: function () {
            if (this._supports_html5_storage()) {
                try {
                    var requestId = this._createGuid();
                    var dataArr = this._getPostJsonArray(requestId);
                    var storedData = localStorage.getItem('eventQueue');
                    if (storedData) {
                        var savedEvents = JSON.parse(storedData);
                        dataArr = savedEvents.concat(dataArr);
                        debugConsole.debug("New array size: " + dataArr.length);
                    }
                    var currentData = JSON.stringify(dataArr);
                    localStorage.setItem('eventQueue', currentData);
                    var headers = JSON.stringify(this._getHeaders(requestId));
                    localStorage.setItem('eventQueueHeaders', headers);
                    debugConsole.debug("saved events to storage");
                } catch (e) {
                    return false;
                } 
            }
            return true;
        },
        _replayEventsFromLocalStorage: function () {
            if (this._supports_html5_storage()) {
                try {
                    var storedData = localStorage.getItem('eventQueue');
                    var headers = localStorage.getItem('eventQueueHeaders');
                    if (storedData) {
                        var savedEvents = JSON.parse(storedData);
                        debugConsole.debug("pulled events from storage: " + savedEvents.length);
                        this._sendEventsToServer(storedData, headers, function () {
                            localStorage.removeItem('eventQueue');
                            localStorage.removeItem('eventQueueHeaders');
                        });
                    }
                } catch (e) {
                    return false;
                } 
            }
            return true;
        },

        _supports_html5_storage: function () {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch(e) {
                return false;
            }
        },

        _sendEventsToServer: function (payload, headers,  callback) {
            var requestId = this._createGuid();
            debugConsole.debug("_sendEventsToServer V");
            if (payload) {
                var savedPayload = JSON.parse(payload)
                _.forEach(savedPayload, function(el) {
                    if (el.eventId == 464) {
                        debugConsole.debug("    ++" + el.telemetry.featureName);
                    }
                });
            }
            $.ajax(LoggingService._postDataUrl, {
                type: "POST",
                data: payload || JSON.stringify(this._getPostJsonArray(requestId)),
                headers: headers ? JSON.parse(headers) : this._getHeaders(requestId),
                contentType: 'application/json',                
                dataType: 'json'
            }).done(function (result) {
                if (callback) {
                    callback();
                }
            }).fail(function (result) {
                if (callback) {
                    callback();
                }
            });

            // stop setTimeout call and reset eventQueue
            global.clearTimeout(this._sendTimer);
            this._sendTimer = null;
            this._eventQueue = [];
        },

        _getHeaders: function (requestId) {
            var headers = {
                "x-ms-client-session-id": ml.Environment.getPageRequestId(),
                "x-ms-client-request-id": requestId
            }

            var antiForgeryId = $("input[name=__RequestVerificationToken]").val();
            if (antiForgeryId) {
                headers["x-ms-client-antiforgery-id"] = antiForgeryId;
            }

            return headers;
        },        

        _createGuid: function () {
            /// <summary>Returns a GUID such as xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.</summary>
            // c.f. rfc4122 (UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)            
           return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        
        _getPostJsonArray: function (requestId) {
            var    postArray = [],
                    currentEvent,                    
                    prop,
                    i, j,
                    encodedKey,
                    encodedValue;

            for (i = 0; i < this._eventQueue.length; i++) {
                currentEvent = this._eventQueue[i];
                if (currentEvent.eventId == 464) {
                    debugConsole.debug("    +" + currentEvent.featureName);
                }

                var eventLogData = {}, telemetry = {};
                for (prop in currentEvent) {
                    if (currentEvent.hasOwnProperty(prop)) {
                        encodedKey = this._encodeText(prop);
                        encodedValue = this._encodeText(currentEvent[prop]);

                        if (this._isCommonLoggingData(prop))
                        {
                            eventLogData[prop] = encodedValue;
                        }
                        else {
                            telemetry[encodedKey] = encodedValue;
                        }
                    }
                }

                eventLogData["telemetry"] = telemetry;
                eventLogData["requestId"] = requestId;
                postArray.push(eventLogData);
            }
            
            return postArray;
        },
        // ASP.NET has a security feature that tries to detect potentially dangerous requests to the server and will
        // throw an error rather than accept them. Anything with "<" or ">" is treated as potentially dangerous and
        // thus must be encoded. Other characters ("/" for example) should not be encoded because "&#x2F;" is also pontentially
        // dangerous and for this reason we cannot use ML.Utilities.htmlEncode(). Quotes and ampersands are encoded otherwise
        // they show up as undefined on the other side.
        _encodeText: function (text) {
            var newText = (text === undefined || text === null) ? "" : (text + "").replace(/([&<>"])/g, this._getReplacementEntity);

            // this will encode & and + for us
            return encodeURIComponent(newText);
        },

        _getReplacementEntity: function (character) {
            var replacements = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "\"": "&quot;"
            };
            return replacements[character];
        },

        _isCommonLoggingData: function(key)
        {           
            var result = key === "url" || key === "eventId" || key === "pageRequestId" || key === "requestId" || key === "clientDateTime" || key === "key" || key === "userId";
            return result;
        },

        _getCommonLoggingData: function () {
            // cdm wasn't passed in to this function because it's not defined at this point. Is that a problem?
            return {
                pageRequestId: ml.Environment.getPageRequestId(),
                url: global.location.href,
                clientDateTime: new Date().toUTCString(),
                userId: ml.Environment.getUserId()
            };
        }
    },
    {
        _methodToEventIdMap: {
            error: 451,
            information: 452,
            exception: 453,
            startup: 454,
            viewSwitch: 456,
            clientAction: 457,
            clientScenario: 458,
            customEvent: 459,
            warning: 460,
            verbose: 461,
            performance: 462,
            feedbackInfo: 463,
            featureUsage: 464
        },
        _postDataUrl: ml.Environment.getLoggingServiceUrl()
    });

    // add to service container
    impl.Services.add("loggingService", new LoggingService());
})(this, jQuery, ML, Impl, this.Host);


(function (global, ml, impl, undefined) {
    "use strict";

    var receiver = ml.Communication.Receiver.getReceiver(),
        noop = function () { },
        debugTracer = noop,
       //// devMode = ml.Environment.getDevelopmentMode && ml.Environment.getDevelopmentMode(),
        getLoggingService = function () {
            var loggingService = impl.Services.get("loggingService");

            if (!loggingService) {
                throw "logging service not found";
            }

            return loggingService;
        },
        traceEventHelper = function (isNavigation, source, extension, action, context) {
            var //// traceInWebTrends = global.dcsMultiTrack,
                uri = global.location,
                uriString,
                eventType,
                eventSource;          
        },
        log = ml.Namespace.define("Impl.Diagnostics.Log", {
            writeEntry: function (eventKey, message, severity, data) {
                debugTracer(eventKey, message, severity, data);
                getLoggingService().writeEntry(eventKey, message, severity, data);
            },
            exception: function (isHandledException, type, stackTrace, stringRepresentation, data) {
                debugTracer(type, "Exception", "error", [isHandledException, stringRepresentation, data]);
                getLoggingService().exception(isHandledException, type, stackTrace, stringRepresentation, data);
            },
            startup: function (secondsDuration, successfulDownloadCount, failedDownloadCount, failedDownloadSummary, downloadMetricsSummary, data) {
                getLoggingService().startup(secondsDuration, successfulDownloadCount, failedDownloadCount, failedDownloadSummary, downloadMetricsSummary, data);
            },
            viewSwitch: function (fromView, toView, totalSeconds, data) {
                getLoggingService().viewSwitch(fromView, toView, totalSeconds, data);
            },
            clientAction: function (action, scenarioCorrelationId, selectedEntity, data) {
                getLoggingService().clientAction(action, scenarioCorrelationId, selectedEntity, data);
            },
            customEvent: function (eventKey, customEventType, data) {
                getLoggingService().customEvent(eventKey, customEventType, data);
            },
            clientScenario: function (scenarioCorrelationId, scenarioName, entityType, completionReason, userSeconds, endToEndSeconds, data) {
                getLoggingService().clientScenario(scenarioCorrelationId, scenarioName, entityType, completionReason, userSeconds, endToEndSeconds, data);
            },
            performance: function (key, time, message, data) {
                getLoggingService().performance(key, time, message, data);
            },
            traceEvent: function (source, extension, action, context) {
                traceEventHelper(false, source, extension, action, context);
            },
            traceNavigation: function () {
                traceEventHelper(true);
            },
            feedbackInfo: function (comments, data) {
                getLoggingService().feedbackInfo(comments, data);
            },
            featureUsage: function (featureId, featureName, groupId, groupName, workspaceId, experimentId, moduleId, data) {
                getLoggingService().featureUsage(featureId, featureName, groupId, groupName, workspaceId, experimentId, moduleId, data);
            }
        });
    // set up development mode trace listener
    /// <disable>JS2043.RemoveDebugCode</disable>
    (function () {
        if (ml.Environment &&
        ml.Environment.getDevelopmentMode &&
        ml.Environment.getDevelopmentMode() &&
        ml.Diagnostics &&
        ml.Diagnostics.LogEntryLevel) {
            var level = ml.Diagnostics.LogEntryLevel,
                console = global.console,
                pattern;

            if (global.jQuery &&
                global.jQuery.cookie) {
                pattern = global.jQuery.cookie("tracePattern");
            }

            if (console &&
                console.error &&
                console.info &&
                console.log &&
                console.warn) {
                debugTracer = function (eventKey, message, severity, data) {
                    if (pattern && eventKey && eventKey.IndexOf(pattern) === -1) {
                        // skip the logging
                        noop();
                    } else if (severity === level.error) {
                        console.error(eventKey, { message: message, data: data });
                    } else if (severity === level.warning) {
                        console.warn(eventKey, { message: message, data: data });
                    } else if (pattern) {
                        // dont log info messages unless they matched the pattern
                        console.info(eventKey, { message: message, data: data });
                    }
                };
            }
        }
    })();
    /// <enable>JS2043.RemoveDebugCode</enable>

    receiver.addMethod("Impl.Diagnostics.Log.writeEntry", log.writeEntry);
    receiver.addMethod("Impl.Diagnostics.Log.exception", log.exception);
    receiver.addMethod("Impl.Diagnostics.Log.startup", log.startup);
    receiver.addMethod("Impl.Diagnostics.Log.viewSwitch", log.viewSwitch);
    receiver.addMethod("Impl.Diagnostics.Log.clientAction", log.clientAction);
    receiver.addMethod("Impl.Diagnostics.Log.customEvent", log.customEvent);
    receiver.addMethod("Impl.Diagnostics.Log.clientScenario", log.clientScenario);
    receiver.addMethod("Impl.Diagnostics.Log.performance", log.performance);
    receiver.addMethod("Impl.Diagnostics.Log.traceEvent", log.traceEvent);
    receiver.addMethod("Impl.Diagnostics.Log.traceNavigation", log.traceNavigation);
    receiver.addMethod("Impl.Diagnostics.Log.feedbackInfo", log.feedbackInfo);
    receiver.addMethod("Impl.Diagnostics.Log.featureUsage", log.featureUsage);
})(this, ML, Impl);
