define(["require", "exports", 'knockout', "../../common/EntityViewModel", "../listItem/listItem"], function (require, exports, ko, entity, listItem) {
    var HeroBlock = (function () {
        function HeroBlock(params) {
            this.layout = ko.observable("");
            this.totalHeroElements = 5;
            this.loading = params.loading;
            var maxCount = 0 | params.maxCount;
            this.mdaSection = params.mdaSection || 'hero-strip';
            this.loadHeroElements(params);
        }
        HeroBlock.prototype.loadHeroElements = function (params) {
            var _this = this;
            this.entities = ko.computed(function () {
                var result = _.map(new Array(_this.totalHeroElements), function () {
                    var item = new listItem.ListItem({ item: new entity.EntityViewModel(null, null) });
                    item.cardTypeName = "";
                    item.detailsUrl = "#";
                    return item;
                });
                var entities = params.entities();
                if (entities && entities.length > 0) {
                    result = _.map(result, function (element, index) {
                        var entity = _.find(entities, function (elem, idx) { return idx === index; });
                        var result = element;
                        if (entity) {
                            result = new listItem.ListItem({ item: entity });
                        }
                        return result;
                    });
                    return new Array(result.slice(1, Math.round(_this.totalHeroElements / 2)), result.slice(Math.round(_this.totalHeroElements / 2), _this.totalHeroElements));
                }
                return new Array();
            });
            this.mainEntity = ko.computed(function () {
                var result = new listItem.ListItem({ item: new entity.EntityViewModel(null, null) });
                var entities = params.entities();
                if (entities && entities.length > 0) {
                    return new listItem.ListItem({ item: entities[0] });
                }
                return result;
            });
        };
        return HeroBlock;
    })();
    exports.HeroBlock = HeroBlock;
    exports.viewModel = HeroBlock;
});
