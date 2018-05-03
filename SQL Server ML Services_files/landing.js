/// <amd-dependency path="text!./landing.html" />
define(["require", "exports", "text!./landing.html"], function (require, exports) {
    exports.template = require("text!./landing.html");
    var LandingViewModel = (function () {
        function LandingViewModel(params) {
            this.showFeatured = params.showFeatured;
            this.mainStrip = params.mainStrip;
            this.sndStrip = params.sndStrip;
            this.trdStrip = params.trdStrip;
            this.quatStrip = params.quatStrip;
            this.featuredEntities = params.featuredEntities;
            this.loadingFeaturedItems = params.loadingFeaturedItems;
            this.heroSection = params.heroSection;
            this.mainSection = params.mainSection;
            this.sndSection = params.sndSection;
            this.trdSection = params.trdSection;
            this.quatSection = params.quatSection;
            this.topContributors = params.topContributors;
            this.showTopContributors = params.showTopContributors;
        }
        return LandingViewModel;
    })();
    exports.LandingViewModel = LandingViewModel;
    exports.viewModel = LandingViewModel;
});
