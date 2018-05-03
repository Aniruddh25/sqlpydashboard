
/*
* All ML.Diagnostics.Log.* and ML.Diagnostics.Telemetry.* methods take an object literal (parameter "data")
* which can define the following values logged. Any key/value pairs not in the following list will also be logged
* but they are logged in a "name:value;name:value' format in a single column.
*
* data key names:
*  - clickUrl
*  - eventName
*  - componentName
*  - objectType
*  - objectId
*  - subscriptionId
*
* TODO: All ML.Diagnostic.Log.* methods also know about eventId which can be included in the "data" parameter.
*/

(function (ml, undefined) {
    "use strict";

    var fxSender,
        markers = {};

    function getSender() {
        if (fxSender) {
            return fxSender;
        }

        fxSender = new ml.Communication.Sender("fx");
        return fxSender;
    }

    function dumpObject(obj, depth) {
        return "[object]";
    }

    // next four methods are just shortcuts for writeEntry
    function error(eventKey, message, data) {
        /// <summary>Logs an error message.</summary>
        /// <param name="eventKey" type="String">Globally unique string that identifies callsite of logging message.</param>
        /// <param name="message" type="String">The error message.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        writeEntry(eventKey, message, ML.Diagnostics.LogEntryLevel.error, data);
    }

    function warning(eventKey, message, data) {
        /// <summary>Logs a warning message.</summary>
        /// <param name="eventKey" type="String">Globally unique string that identifies callsite of logging message.</param>
        /// <param name="message" type="String">The warning message.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        writeEntry(eventKey, message, ML.Diagnostics.LogEntryLevel.warning, data);
    }

    function info(eventKey, message, data) {
        /// <summary>Logs an informational message.</summary>
        /// <param name="eventKey" type="String">Globally unique string that identifies callsite of logging message.</param>
        /// <param name="message" type="String">The informational message.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        writeEntry(eventKey, message, ML.Diagnostics.LogEntryLevel.information, data);
    }

    function verbose(eventKey, message, data) {
        /// <summary>Logs a verbose message.</summary>
        /// <param name="eventKey" type="String">Globally unique string that identifies callsite of logging message.</param>
        /// <param name="message" type="String">The verbose message.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        writeEntry(eventKey, message, ML.Diagnostics.LogEntryLevel.verbose, data);
    }

    function writeEntry(eventKey, entry, severity, data) {
        /// <summary>Logs a message with the given severity.</summary>
        /// <param name="eventKey" type="String">Globally unique string that identifies callsite of logging message.</param>
        /// <param name="entry" type="String">Message to log.</param>
        /// <param name="severity" type="ML.Diagnostics.LogEntryLevel">The severity of the message.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        var message = "";
        if (typeof entry === "object") {
            message = dumpObject(entry, 4);
        } else if (typeof entry === "undefined") {
            message = "[undefined]";
        } else if (typeof entry === "function") {
            message = "[function]";
        } else if (entry !== null) {
            message = entry.toString();
        } else {
            message = "[null]";
        }

        getSender().getMethod("Impl.Diagnostics.Log.writeEntry")(eventKey, message, severity, data);
    }

    function exception(isHandledException, type, stackTrace, stringRepresentation, data) {
        /// <summary>Logs an exception.</summary>
        /// <param name="isHandledException" type="Boolean">Whether the exception was handled or not.</param>
        /// <param name="type" type="String">The type of exception.</param>
        /// <param name="stackTrace" type="String">A stack trace for the exception.</param>
        /// <param name="stringRepresentation" type="String">A string representation of the error.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        getSender().getMethod("Impl.Diagnostics.Log.exception")(isHandledException, type, stackTrace, stringRepresentation, data);
    }

    function startup(secondsDuration, successfulDownloadCount, failedDownloadCount, failedDownloadSummary, downloadMetricsSummary, data) {
        /// <summary>Logs telemetry information about startup.</summary>
        /// <param name="secondsDuration" type="Number">Number of seconds for startup to complete.</param>
        /// <param name="successfulDownloadCount" type="Number">Number of successful downloads.</param>
        /// <param name="failedDownloadCount" type="Number">Number of failed downloads.</param>
        /// <param name="failedDownloadSummary" type="String">A summary of the failed downloads.</param>
        /// <param name="downloadMetricsSummary" type="String">A summary of the download metrics.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        getSender().getMethod("Impl.Diagnostics.Log.startup")(secondsDuration, successfulDownloadCount, failedDownloadCount, failedDownloadSummary, downloadMetricsSummary, data);
    }

    function viewSwitch(fromView, toView, totalSeconds, data) {
        /// <summary>Logs telemetry information for a view switch.</summary>
        /// <param name="fromView" type="String">The origin view of the switch.</param>
        /// <param name="toView" type="String">The destination view of the switch.</param>
        /// <param name="totalSeconds" type="Number">The number of seconds taken by the view switch.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        getSender().getMethod("Impl.Diagnostics.Log.viewSwitch")(fromView, toView, totalSeconds, data);
    }

    function clientAction(action, scenarioCorrelationId, selectedEntity, data) {
        /// <summary>Logs telemetry information for an action.</summary>
        /// <param name="action" type="String">The action performed.</param>
        /// <param name="scenarioCorrelationId" type="String">The scenario correlation id.</param>
        /// <param name="selectedEntity" type="String">The selected entity.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        getSender().getMethod("Impl.Diagnostics.Log.clientAction")(action, scenarioCorrelationId, selectedEntity, data);
    }

    function customEvent(eventKey, customEventType, data) {
        /// <summary>Logs telemetry information for a custom event.</summary>
        /// <param name="eventKey" type="String">Globally unique string that identifies callsite of logging message.</param>
        /// <param name="customEventType" type="String">The custom event type.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>
        // If the page is running locally, do not instrument
        if (window.location.hostname !== "") {
            getSender().getMethod("Impl.Diagnostics.Log.customEvent")(eventKey, customEventType, data);
        }
    }

    function clientScenario(scenarioCorrelationId, scenarioName, entityType, completionReason, userSeconds, endToEndSeconds, data) {
        /// <summary>Logs telemetry information for a scenario.</summary>
        /// <param name="scenarioCorrelationId" type="String">The scenario correlation id.</param>
        /// <param name="scenarioName" type="String">The name of the scenario.</param>
        /// <param name="entityType" type="String">The type of the entity.</param>
        /// <param name="completionReason" type="String">The completion reason.</param>
        /// <param name="userSeconds" type="Number">The userSeconds.</param>
        /// <param name="endToEndSeconds" type="Number">Number of seconds end to end for the scenario.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        getSender().getMethod("Impl.Diagnostics.Log.clientScenario")(scenarioCorrelationId, scenarioName, entityType, completionReason, userSeconds, endToEndSeconds, data);
    }

    function performance(key, time, message, data) {
        /// <summary>Logs a performance message.</summary>
        /// <param name="key" type="String">Globally unique string that identifies callsite of logging message.</param>
        /// <param name="time" type="Number">Time taken in seconds.</param>
        /// <param name="message" type="String">A message to be associated with the performance data.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        getSender().getMethod("Impl.Diagnostics.Log.performance")(key, time, message, data);
    }

    function traceEvent(source, extension, action, context) {
        /// <summary>Logs telemetry information for an event.</summary>
        /// <param name="source" type="String">Source of the event.</param>
        /// <param name="extension" type="String">Extension associated with the event.</param>
        /// <param name="action" type="String">The event action.</param>
        /// <param name="context" type="String">Additional data to be logged on the server. Should only be used in cases
        /// where all other parameters are not able to uniquely identify an event.</param>

        getSender().getMethod("Impl.Diagnostics.Log.traceEvent")(source, extension, action, context);
    }

    function traceNavigation() {
        /// <summary>Logs telemetry information for a browser navigation event.</summary>

        getSender().getMethod("Impl.Diagnostics.Log.traceNavigation")();
    }


    function feedbackInfo(comments, data) {
        /// <summary>Logs a feedback survey data.</summary>
        /// <param name="comments" type="String">Comments from the user</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Not used in this case (left there for uniformity with other methods of this kind.</param>

        getSender().getMethod("Impl.Diagnostics.Log.feedbackInfo")(comments, data);
    }

    function featureUsage(featureId, groupId, workspaceId, experimentId, moduleId, data) {
        /// <summary>Logs telemetry information for a feature usage.</summary>
        /// <param name="featureId" type="Number">Id of the feature as defined in ML.Constants.FeatureId.</param>
        /// <param name="featureName" type="String">Name of the feature.</param>
        /// <param name="groupId" type="Number">Id of the group this feature belongs to (defined in ML.Constants.FeatureId).</param>
        /// <param name="groupName" type="String">Name of the group this feature belongs to.</param>
        /// <param name="workspaceId" type="String">Id of the workspace under which the feature was used.</param>
        /// <param name="experimentId" type="String">Id of the experiment under which the feature was used.</param>
        /// <param name="moduleId" type="String">Relevant module Id.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>
        // If the page is running locally, do not instrument
        if (window.location.hostname !== "") {
            // reverse enum mapping to get names
            var featureName = ML.Constants.FeatureId[featureId];
            var groupName = ML.Constants.FeatureId[groupId];
            getSender().getMethod("Impl.Diagnostics.Log.featureUsage")(featureId, featureName, groupId, groupName, workspaceId, experimentId, moduleId, data);
        }
    }

    function timerStart(key) {
        /// <summary>Starts a timer tied to the given key.</summary>
        /// <param name="key" type="String">Globally unique string that identifies callsite of logging message.</param>

        if ((typeof key !== "string") || (key.length === 0)) {
            throw "Performance marker key must be a non empty string";
        }

        // Reset the date if the same key is passed several times before calling "stop"
        markers[key] = new Date();
    }

    function timerStopAndLog(key, message, data) {
        /// <summary>Stops a timer started with timerStart() and logs the information.</summary>
        /// <param name="key" type="String">Globally unique string that identifies callsite of logging message.</param>
        /// <param name="message" type="String">A message to be included with the timing information.</param>
        /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
        /// via this object is logged. Columns are reserved for the following keys which should be included if available:
        ///   * clickUrl
        ///   * eventName
        ///   * componentName
        ///   * objectType
        ///   * objectId
        ///   * subscriptionId
        /// </param>

        var end = new Date(),
            start = null,
            time;

        if ((typeof key !== "string") || (key.length === 0)) {
            throw "Performance marker key must be a non empty string";
        }

        if (key in markers) {
            start = markers[key];
            delete markers[key];
        }

        if (start !== null) {
            time = (end.getTime() - start.getTime()) / 1000;
            performance(key, time, message, data);
        } else {
            error(key, "ML.Diagnostics.Telemetry.timerStopAndLog() - marker name '" + key + "' cannot be found.", data);
        }
    }

    function Timer(key) {
        /// <summary>Constructs a Timer</summary>
        /// <param name="key" type="String">Timer ID</param>
        /// <field name="key" type="String">Timer ID</field>
        /// <field name="start" type="Date">Start time</field>

        this.key = key;
        this.start = new Date();
    }

    Timer.prototype = {

        start: function () {
            /// <summary>Starts performance timing.</summary>

            this.start = new Date();
        },

        end: function (message, data) {
            /// <summary>Stops the timer and logs the information.</summary>
            /// <param name="message" type="String">A message to be included with the timing information.</param>
            /// <param name="data" type="Object">Additional data to be logged on the server. Each key/value pair passed in
            /// via this object is logged. Columns are reserved for the following keys which should be included if available:
            ///   * clickUrl
            ///   * eventName
            ///   * componentName
            ///   * objectType
            ///   * objectId
            ///   * subscriptionId
            /// </param>

            performance(this.key, (new Date() - this.start) / 1000, message, data);
        }
    };

    function getNewTimer(key) {
        /// <summary>Retrieves an instance of a Timer that logs performance data.</summary>
        /// <param name="key" type="String">Globally unique string that identifies callsite of logging message.</param>
        /// <returns type="Timer">A timer used to log performance information.</returns>

        return new Timer(key);
    }

    /// <disable>JS2076.IdentifierIsMiscased</disable> // Namsepaces
    ml.Namespace.define("ML.Diagnostics", {
        LogEntryLevel: {
            /// <field>Error level</field>
            error: "error",

            /// <field>Warning level</field>
            warning: "warning",

            /// <field>Information level</field>
            information: "information",

            /// <field>Verbose level</field>
            verbose: "verbose"
        },

        Log: {
            error: error,
            warning: warning,
            info: info,
            verbose: verbose,
            writeEntry: writeEntry,
            exception: exception
        },

        Telemetry: {
            performance: performance,
            timerStart: timerStart,
            timerStopAndLog: timerStopAndLog,
            startup: startup,
            viewSwitch: viewSwitch,
            clientAction: clientAction,
            customEvent: customEvent,
            clientScenario: clientScenario,
            traceEvent: traceEvent,
            traceNavigation: traceNavigation,
            getNewTimer: getNewTimer,
            feedbackInfo: feedbackInfo,
            featureUsage: featureUsage
        }
    });
})(ML);
