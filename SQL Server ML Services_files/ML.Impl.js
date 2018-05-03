
(function (global, ml, undefined) {
    "use strict";

    // this sets up the receiver

    var receiver = ml.Communication.Receiver.create("fx");
        receiver.register();
})(this, ML);

(function (ml, undefined) {
    "use strict";

    ml.Namespace.define("Impl");
})(ML);


(function (global, $, ml, undefined) {
    "use strict";

    var onDocumentUnloadCallbacks = $.Callbacks("memory once");

    function _initializeDocumentUnloadHandler() {
        $(global).unload(function () {
            onDocumentUnloadCallbacks.fire();
        });
    }

    function onDocumentUnload(callback) {
        /// <summary>
        /// Adds a callback to be executed when navigating away from the portal (when the current document is unloaded).
        /// This is best effort but appears to work on most browsers. Some browsers will disallow actions that prevent
        /// navigation like alerts and possibly other actions.
        /// </summary>
        /// <param name="callback" type="Function">Callback to be invoked when navigating away from the portal.</param>

        onDocumentUnloadCallbacks.add(callback);
    }

    // Host API
    ml.Namespace.define("Host", {
        onDocumentUnload: onDocumentUnload,
    });

    $(function () {
        _initializeDocumentUnloadHandler();
    });
})(this, jQuery, ML);







