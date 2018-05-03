define(["require", "exports"], function (require, exports) {
    var AWA = (function () {
        function AWA() {
        }
        AWA.logContentPageAction = function (behavior, actionType, content) {
            if (window.awa && window.awa.ct) {
                window.awa.ct.captureContentPageAction({
                    behavior: behavior,
                    actionType: actionType,
                    content: content
                });
            }
        };
        AWA.logContentUpdate = function (behavior, actionType, content) {
            if (window.awa && window.awa.ct) {
                window.awa.ct.captureContentUpdate({
                    behavior: behavior,
                    actionType: actionType,
                    content: content
                });
            }
        };
        AWA.BEHAVIORS = window.awa ? window.awa.behavior : null;
        return AWA;
    })();
    return AWA;
});
