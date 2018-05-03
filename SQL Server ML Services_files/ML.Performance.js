/// <reference path="ML.Script.d.ts" />
var ML;
(function (ML) {
    var Performance;
    (function (Performance) {
        "use strict";
        var ResourceTimings;
        (function (ResourceTimings) {
            ResourceTimings.isEnabled = false;
            ResourceTimings.isSetBufferSizeSupported = false;
            ResourceTimings.beforeClearCallback = null;
            ResourceTimings.dataForFlush = null;
            ResourceTimings.doClearWhenAllSent = true;
            var _api = (window.performance) || {};
            var _data = [];
            var _fromIndex = 0;
            var _timeoutIdForSendResourceTiming = null;
            function clear() {
                if (ResourceTimings.beforeClearCallback) {
                    ResourceTimings.beforeClearCallback();
                }
                clearBuffer();
            }
            ResourceTimings.clear = clear;
            function send(data, retries, interval) {
                if (retries === void 0) { retries = 0; }
                if (interval === void 0) { interval = 1000; }
                var resources = _api.getEntriesByType("resource");
                var toIndex = resources.length;
                for (var index = _fromIndex; index < toIndex; ++index) {
                    _data[index] = data;
                }
                _fromIndex = toIndex;
                sendHelper(toIndex, retries, interval);
            }
            ResourceTimings.send = send;
            function flush() {
                send(ResourceTimings.dataForFlush, 0);
            }
            ResourceTimings.flush = flush;
            function setBufferSize(size) {
                if (_api.setResourceTimingBufferSize) {
                    _api.setResourceTimingBufferSize(size);
                }
            }
            ResourceTimings.setBufferSize = setBufferSize;
            function sendHelper(toIndex, retries, interval) {
                cancelAsyncCalls();
                var resources = _api.getEntriesByType("resource");
                var amountUnsent = 0;
                var amountSent = 0;
                for (var index = 0; index < toIndex; ++index) {
                    var data = _data[index];
                    if (data) {
                        var resource = resources[index];
                        if (retries === 0 || resource.duration > 0) {
                            ML.Diagnostics.Telemetry.performance("resource", resource.duration, "", $.extend({}, resource, data));
                            _data[index] = null;
                            amountSent++;
                        }
                        else {
                            amountUnsent++;
                        }
                    }
                }
                if (amountUnsent > 0 && retries > 0) {
                    _timeoutIdForSendResourceTiming = setTimeout(sendHelper.bind(undefined, toIndex, retries - 1, interval), interval);
                }
                else if (toIndex === resources.length && ResourceTimings.doClearWhenAllSent) {
                    clearBuffer();
                }
            }
            function cancelAsyncCalls() {
                if (_timeoutIdForSendResourceTiming) {
                    clearTimeout(_timeoutIdForSendResourceTiming);
                    _timeoutIdForSendResourceTiming = null;
                }
            }
            function clearBuffer() {
                cancelAsyncCalls();
                _api.clearResourceTimings();
                _fromIndex = 0;
                _data = [];
            }
            (function initialize(global) {
                _api.clearResourceTimings = _api.clearResourceTimings || _api.webkitClearResourceTimings || _api.msClearResourceTimings || _api.mozClearResourceTimings || _api.oClearResourceTimings;
                _api.getEntriesByType = _api.getEntriesByType || _api.webkitGetEntriesByType || _api.msGetEntriesByType || _api.mozGetEntriesByType || _api.oGetEntriesByType;
                _api.setResourceTimingBufferSize = _api.setResourceTimingBufferSize || _api.webkitSetResourceTimingBufferSize || _api.msSetResourceTimingBufferSize || _api.mozSetResourceTimingBufferSize || _api.oSetResourceTimingBufferSize;
                ResourceTimings.isSetBufferSizeSupported = !!_api.setResourceTimingBufferSize;
                ResourceTimings.isEnabled = !!_api.getEntriesByType && !!_api.clearResourceTimings;
                if (global.environment && global.environment.doMeasurePerformance !== true) {
                    ResourceTimings.isEnabled = false;
                }
            })(window);
        })(ResourceTimings = Performance.ResourceTimings || (Performance.ResourceTimings = {}));
        ;
        Performance.isEnabled = true;
        Performance.doClearResourceTimingsOnIntervalStart = true;
        var _api;
        var _timeoutIdForIntervalEnd = null;
        var _interval = null;
        var _pageCounter = 0;
        function logNavigationTiming() {
            if (!Performance.isEnabled) {
                return;
            }
            if (_api.timing) {
                var logTiming = function logTiming() {
                    setTimeout(function () {
                        ML.Diagnostics.Telemetry.performance("initialPageLoad", _api.timing.loadEventEnd - _api.timing.navigationStart, "", _api.timing);
                    }, 0);
                    if (disposable) {
                        window.removeEventListener("load", logTiming);
                        disposable = null;
                    }
                };
                if (_api.timing.loadEventStart > 0) {
                    logTiming();
                }
                else {
                    var disposable = true;
                    window.addEventListener("load", logTiming);
                }
            }
        }
        Performance.logNavigationTiming = logNavigationTiming;
        function intervalStart(name) {
            if (!Performance.isEnabled) {
                return;
            }
            _pageCounter++;
            _interval = {
                name: name,
                startTime: _api.now(),
                number: _pageCounter
            };
            if (_timeoutIdForIntervalEnd) {
                clearTimeout(_timeoutIdForIntervalEnd);
                _timeoutIdForIntervalEnd = null;
            }
            if (ResourceTimings.isEnabled && Performance.doClearResourceTimingsOnIntervalStart) {
                ResourceTimings.flush();
                ResourceTimings.clear();
            }
        }
        Performance.intervalStart = intervalStart;
        function intervalEnd() {
            if (!Performance.isEnabled) {
                return;
            }
            if (_interval) {
                if (_timeoutIdForIntervalEnd) {
                    clearTimeout(_timeoutIdForIntervalEnd);
                }
                _timeoutIdForIntervalEnd = setTimeout(function () {
                    var duration = _api.now() - _interval.startTime;
                    ML.Diagnostics.Telemetry.performance("interval", duration, "", _interval);
                    if (ResourceTimings.isEnabled) {
                        ResourceTimings.send({ intervalNumber: _interval.number }, 5, 2000);
                    }
                    _interval = null;
                }, 0);
            }
        }
        Performance.intervalEnd = intervalEnd;
        (function initialize(global) {
            _api = global.performance || {};
            Performance.isEnabled = global.environment && !!global.environment.doMeasurePerformance && !!_api.now;
            if (!Performance.isEnabled) {
                return;
            }
            if (ResourceTimings.isSetBufferSizeSupported) {
                ResourceTimings.setBufferSize(300);
                Performance.doClearResourceTimingsOnIntervalStart = false;
            }
            ResourceTimings.dataForFlush = { intervalNumber: 1 };
            ResourceTimings.beforeClearCallback = function () {
                ResourceTimings.beforeClearCallback = null;
                ResourceTimings.dataForFlush = null;
            };
        })(window);
    })(Performance = ML.Performance || (ML.Performance = {}));
})(ML || (ML = {}));
