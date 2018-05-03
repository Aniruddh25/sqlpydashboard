define(["require", "exports", "../../common/EntityViewModel", "../../services/configService", "knockout"], function (require, exports, CommonUX, configService, ko) {
    var ListItem = (function () {
        function ListItem(params) {
            var _this = this;
            this.cardStyleUrl = ko.observable("url('/images/Gallery_StockImages_General.svg')");
            this.imageClasses = ko.observableArray(["image-card", "screenShot", "image-card__invisible"]);
            this.entity = params.item;
            this.profileUrl = "/Home/Author?authorId=" + this.entity.owner_id;
            this.imageUrl = this.entity.imgUrl || configService.defaultImageUrl;
            this.buildCategory(this.entity.entity_type, this.entity.getSlug());
            this.ownerName = this.entity.owner_name;
            this.avtarImage = this.entity.owner_avatar_url;
            this.isMsft = this.entity.isMsft;
            this.title = this.entity.title;
            var loaderImg = $('<img/>');
            loaderImg.attr('src', this.entity.imgUrl).load(function () {
                loaderImg.remove();
                _this.cardStyleUrl("url(" + _this.entity.imgUrl + ")");
                _this.imageClasses.remove("image-card__invisible");
            });
        }
        ListItem.prototype.buildCategory = function (entityType, entitySlug) {
            var categoryInfo = CommonUX.EntityViewModel.getEntityViewDetails(entityType);
            this.detailsUrl = categoryInfo.detailsUrl.replace("{0}", entitySlug);
            ;
            this.cardTypeName = categoryInfo.categoryName;
            this.cardTypeSprite = categoryInfo.iconSprite;
            this.categoryBrowseUrl = categoryInfo.browseUrl;
        };
        return ListItem;
    })();
    exports.ListItem = ListItem;
    exports.viewModel = ListItem;
});
