(function ($, global, undefined) {
    "use strict";

    var exceptionHolder = $("<div></div>")
        .addClass("fx-exceptionholder")
        .hide()
        .appendTo("body"),
        appendText = function (text) {
            var element = $("<div></div>").text(text + "\\r\\n");
            exceptionHolder.append(element);
        },
        diagnosticsText = function (text) {
            if (text !== undefined) {
                exceptionHolder.text(text);
            }
            return exceptionHolder.text();
        },
        previousOnError = global.onerror || $.noop,
        onErrorCallbacks = $.Callbacks("On Error");

    global.onerror = function () {
        // catch all exceptions here.
        try {
            var part;

            for (part in arguments) {
                if (arguments.hasOwnProperty(part)) {
                    appendText(arguments[part]);
                }
            }

            appendText("--------");
        }
        catch (e) {
        }

        // if there was a callback before us, lets assume it knows what it is doing
        // so we shouldnt bother catching its exceptions.
        previousOnError.apply(arguments);

        try {
            onErrorCallbacks.fireWith(global, arguments);
        }
        catch (e) {
        }

        // make the browser not show an alert
        return true;
    };

    $.extend(true, global, {
        fx: {
            diagnostics: {
                text: diagnosticsText,
                onError: onErrorCallbacks
            }
        }
    });
})(jQuery, this);


(function (global, $, ml, fx, undefined) {
    "use strict";


    function initialize() {
        // Listen to global js errors since we would like to save them to the server
        // NOTE: You may be tempted to attach the event with $(window).on(). It turns out, it does not work
        // See http://api.jquery.com/error/

        fx.diagnostics.onError.add(function (errorMessage, url, line, column, errorObject) {
            if (ml.Communication.Receiver.getReceiver() !== null) {
                // Grab all information available, which varies wildly by browser.
                var stackTrace;
                var type = "exception";
                var data = {
                    url: "<unknown script>",
                    line: line,
                    column: column,
                };

                if (errorObject) {
                    // Get properties only found on the errorObject
                    if (errorObject.stack) {
                        stackTrace = errorObject.stack;

                        // The regex is lenient b/c of different stacktrace formats, e.g. http://jsfiddle.net/altano/7P7UG/.
                        // It attempts to match the first line of the stacktrace that includes the location of the error by
                        // searching for *:N:N* where N is a set of digits. This doesn't have to be too precise because the
                        // full stacktrace will be in the telemetry as well.
                        //
                        // FOR EXAMPLE (see jsfiddle above), in Chrome and IE11:
                        // Stack: 
                        //     ReferenceError: 'notThere' is undefined
                        //         at innerFunction (http://fiddle.jshell.net/_display/:33:5)
                        //         at middleFunction (http://fiddle.jshell.net/_display/:37:5)
                        //         at outerFunction (http://fiddle.jshell.net/_display/:41:5)
                        //         at window.onload (http://fiddle.jshell.net/_display/:44:1)
                        // This extracts:
                        //         at innerFunction (http://fiddle.jshell.net/_display/:33:5)
                        //
                        // FOR EXAMPLE (see jsfiddle above), in Firefox nightly:
                        // Stack: 
                        //      innerFunction@http://fiddle.jshell.net/_display/:35:5
                        //      middleFunction@http://fiddle.jshell.net/_display/:39:5
                        //      outerFunction@http://fiddle.jshell.net/_display/:43:5
                        //      window.onload@http://fiddle.jshell.net/_display/:46:1
                        // This extracts:
                        //      innerFunction@http://fiddle.jshell.net/_display/:35:5
                        //
                        // TFS Defect 2797358 tracks renaming this field from "URL" to "GroupingKey" since it is no longer
                        // a URL.
                        //
                        var match = /.*:\d+:\d+.*/.exec(stackTrace);
                        if (match && match[0]) {
                            data.url = match[0].trim();
                        }
                    }

                    if (errorObject.name) {
                        type = errorObject.name;
                    }

                    // Extract supplementary information sometimes found on the errorObject
                    if (errorObject.message && errorMessage !== errorObject.message) {
                        data.exceptionMessage = errorObject.message;
                    }

                    if (errorObject.description && errorMessage !== errorObject.description && data.exceptionMessage !== errorObject.description) {
                        data.exceptionDescription = errorObject.description;
                    }

                    if (errorObject.lineNumber && errorObject.lineNumber !== data.line) {
                        data.line = errorObject.lineNumber;
                    }

                    if (errorObject.columnNumber && errorObject.columnNumber !== data.column) {
                        data.column = errorObject.columnNumber;
                    }

                    if (errorObject.number) {
                        data.exceptionNumber = errorObject.number & 0xFFFF;
                        data.exceptionFacilityCode = errorObject.number >> 16 & 0x1FFF;
                    }

                    if (errorObject.fileName) {
                        data.exceptionFileName = errorObject.fileName;
                    }
                }

                ml.Diagnostics.Log.exception(false /*=isHandledException*/, type, stackTrace, errorMessage, data);
            }
        });

    }

    $(function () {
        initialize();
    });
})(this, jQuery, ML, this.fx);