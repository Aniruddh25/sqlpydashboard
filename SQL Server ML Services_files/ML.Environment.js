(function (global, ml, undefined) {
    "use strict";

    var environmentModel = {};

    if (global.environment) {
        environmentModel = global.environment;
    }
    
    function getDevelopmentMode() {
        /// <summary>Gets if the development mode is activated or not.</summary>
        /// <returns type="Boolean" />

        return environmentModel.developmentMode;
    }

    

    function getIsTelemetryEventDisabled() {
        /// <summary>Gets if the telemetry events are disabled.</summary>
        /// <returns type="Boolean" />

        return environmentModel.isTelemetryEventDisabled;
    }

    
    function getPageRequestId() {
        /// <summary>Gets the page request ID.</summary>
        /// <returns type="String" />

        // wiring together sessionId and pageRequestId, they mean the same thing
        // for gallery reporting - user's session
        return environmentModel.sessionId;
    }

    function getSessionId() {
        /// <summary>Gets the page request ID.</summary>
        /// <returns type="String" />

        return environmentModel.sessionId;
    }

    function setSessionId(sessionId) {
        /// <summary>Gets the page request ID.</summary>
        /// <returns type="String" />

        environmentModel.sessionId = sessionId;
    }

    function getUserId() {
        /// <summary>Gets the user ID.</summary>
        /// <returns type="String" />

        return environmentModel.userId;
    }

    function setUserId(userId) {
        /// <summary>Gets the user ID.</summary>
        /// <returns type="String" />

        environmentModel.userId = userId;
    }


    function getLoggingServiceUrl() {
        /// <summary>Logging service post url.</summary>
        /// <returns type="String" />

        return environmentModel.loggingServiceUrl;
    }

    function getTelementryQueueSize() {
            /// <summary>Logging service post url.</summary>
            /// <returns type="String" />

            return environmentModel.telementryQueueSize;
        }


    // Environment API
    ml.Namespace.define("ML.Environment", {
        getDevelopmentMode: getDevelopmentMode,        
        getIsTelemetryEventDisabled: getIsTelemetryEventDisabled,        
        getPageRequestId: getPageRequestId,
        getSessionId: getSessionId,
        setSessionId: setSessionId,
        getUserId: getUserId,
        setUserId: setUserId,
        getLoggingServiceUrl: getLoggingServiceUrl,
        getTelementryQueueSize: getTelementryQueueSize
    });
})(this, ML);