/// <amd-dependency path="text!./imageTile.html" />
define(["require", "exports", "lodash", "text!./imageTile.html"], function (require, exports, _) {
    exports.template = require("text!./imageTile.html");
    var ImageTileViewModel = (function () {
        function ImageTileViewModel(params) {
            this.useOverlayText = false;
            this.imageTemplateUrl = "url('<%= link %>')";
            this.topBlockClass = params.topBlockClass;
            this.targetLinkUrl = params.targetLinkUrl;
            var template = _.template(this.imageTemplateUrl);
            this.imageUrl = template({ link: params.imageUrl });
            if (params.overlayText) {
                this.useOverlayText = true;
                this.overlayText = params.overlayText;
            }
            this.mdaSection = params.mdaSection || 'image-strip';
        }
        return ImageTileViewModel;
    })();
    exports.ImageTileViewModel = ImageTileViewModel;
    exports.viewModel = ImageTileViewModel;
});
