define(["require", "exports", "lodash", "../common/utilities"], function (require, exports, _, utilities) {
    var FlowRecorder = (function () {
        function FlowRecorder() {
        }
        FlowRecorder.init = function (callback) {
            FlowRecorder.callbacks.push(callback);
            if (!FlowRecorder.initStarted) {
                FlowRecorder.initStarted = true;
                FlowRecorder.loadScript(0, function () {
                    if (!FlowRecorder.getSessionId()) {
                        document.cookie = "sId=" + utilities.generateGuid();
                    }
                    FlowRecorder.initFinished = true;
                    _.forEach(FlowRecorder.callbacks, function (c) { return c(); });
                    FlowRecorder.callbacks = [];
                });
            }
            else if (FlowRecorder.initFinished) {
                _.forEach(FlowRecorder.callbacks, function (c) { return c(); });
                FlowRecorder.callbacks = [];
            }
        };
        FlowRecorder.loadScript = function (id, callback) {
            FlowRecorder.getScript(FlowRecorder.scripts[id], function () {
                if (id < FlowRecorder.scripts.length - 1) {
                    FlowRecorder.loadScript(id + 1, callback);
                }
                else {
                    callback();
                }
            });
        };
        FlowRecorder.getScript = function (url, callback) {
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");
            script.src = url;
            var done = false;
            script.onload = function () {
                if (!done && (!this.readyState ||
                    this.readyState == "loaded" || this.readyState == "complete")) {
                    done = true;
                    if (callback) {
                        callback();
                    }
                    script.onload = null;
                }
            };
            head.appendChild(script);
        };
        FlowRecorder.getSessionId = function () {
            return document.cookie.replace(/(?:(?:^|.*;\s*)sId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        };
        FlowRecorder.track = function (trackId) {
            FlowRecorder.init(function () {
                ML.Environment.setSessionId(FlowRecorder.getSessionId());
                var featureName = ML.Constants.FeatureId[ML.Constants.FeatureId[trackId]];
                var groupName = ML.Constants.FeatureId[ML.Constants.FeatureId.Discovery];
                Impl.Diagnostics.Log.featureUsage(ML.Constants.FeatureId[trackId], featureName, ML.Constants.FeatureId.Discovery, groupName, null, null, null, null);
            });
        };
        FlowRecorder.trackNavigationTiming = function () {
            FlowRecorder.init(function () {
                ML.Environment.setSessionId(FlowRecorder.getSessionId());
                ML.Performance.logNavigationTiming();
            });
        };
        FlowRecorder.trackResourceTiming = function () {
            FlowRecorder.init(function () {
                if (ML.Performance.ResourceTimings.isEnabled) {
                    ML.Environment.setSessionId(FlowRecorder.getSessionId());
                    ML.Performance.doClearResourceTimingsOnIntervalStart = true;
                    ML.Performance.ResourceTimings.send({ intervalNumber: 1 }, 5, 2000);
                }
            });
        };
        FlowRecorder.submitFeedback = function (feedback) {
            FlowRecorder.init(function () {
                try {
                    ML.Environment.setSessionId(FlowRecorder.getSessionId());
                    Impl.Diagnostics.Log.feedbackInfo(JSON.stringify(feedback), null);
                }
                catch (e) {
                    console.error('failed to submit feedback: ' + e);
                }
            });
        };
        FlowRecorder.initStarted = false;
        FlowRecorder.initFinished = false;
        FlowRecorder.callbacks = [];
        FlowRecorder.scripts = [
            "/scripts/telemetry/ML.Script.js",
            "/scripts/telemetry/ML.Environment.js",
            "/scripts/telemetry/ML.Communication.js",
            "/scripts/telemetry/ML.GlobalErrorHandling.js",
            "/scripts/telemetry/ML.Diagnostics.js",
            "/scripts/telemetry/ML.Impl.js",
            "/scripts/telemetry/ML.Impl.LoggingService.js",
            "/scripts/telemetry/ML.Performance.js",
            "/scripts/telemetry/ML.Constants.js"
        ];
        return FlowRecorder;
    })();
    exports.FlowRecorder = FlowRecorder;
});
