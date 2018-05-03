define(["require", "exports"], function (require, exports) {
    var BaseItemViewModel = (function () {
        function BaseItemViewModel() {
        }
        BaseItemViewModel.prototype.getSlug = function () {
            var result = this.itemId;
            if (this.slugs && this.slugs.length > 0) {
                result = this.slugs[0];
            }
            return result;
        };
        Object.defineProperty(BaseItemViewModel.prototype, "slug", {
            get: function () {
                return this.getSlug();
            },
            enumerable: true,
            configurable: true
        });
        return BaseItemViewModel;
    })();
    exports.BaseItemViewModel = BaseItemViewModel;
});
