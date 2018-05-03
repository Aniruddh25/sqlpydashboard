/// <amd-dependency path="text!./entitiesStrip.html" />
define(["require", "exports", "knockout", "text!./entitiesStrip.html"], function (require, exports, ko) {
    exports.template = require("text!./entitiesStrip.html");
    var EntitiesStripViewModel = (function () {
        function EntitiesStripViewModel(params) {
            var _this = this;
            this.mdaSection = "entities-strip-default";
            params.stripParams = params.stripParams || {};
            this.browseEntitiesUrl = params.stripParams.viewAllUrl;
            this.stripTitle = params.stripParams.stripTitle;
            this.entities = params.stripParams.entities;
            this.hasEntities = ko.computed(function () {
                var result = false;
                if (_this.entities && _this.entities()) {
                    result = _this.entities().length > 0;
                }
                return result;
            });
            if (this.stripTitle) {
                this.showStripTitle = true;
            }
            else {
                this.showStripTitle = false;
            }
            if (params.mdaSection) {
                this.mdaSection = params.mdaSection;
            }
        }
        return EntitiesStripViewModel;
    })();
    exports.EntitiesStripViewModel = EntitiesStripViewModel;
    exports.viewModel = EntitiesStripViewModel;
});
