// Helper object to easily create new jquery plugins 
(function ($) {
    $.azureMl = $.azureMl || {};
    $.azureMl.jQueryPluginHelper = function (pluginDetails, options, args) {
        var result = [];
        this.each(function () {
            var $this = $(this);
            var pluginName = pluginDetails.name;
            var control = $this.data(pluginName);
            if (options && typeof (options) === "string") {
                // Likely a method call
                var methodName = options;
                if (!control) {
                    throw "This is not a valid plugin: " + pluginName;
                }

                var rtnVal = control[methodName].call(control, args);
                result.push(rtnVal);
            } else {
                if (!control) {
                    options = options || {};
                    options.element = $(this);
                    control = new pluginDetails.constructor(options);
                    $this.data(pluginName, control);
                }
                result.push(control);
            }
            return result;
        });
    };
})(jQuery);