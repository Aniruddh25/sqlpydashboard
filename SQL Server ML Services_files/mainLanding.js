/// <amd-dependency path="text!./mainLanding.html" />
define(["require", "exports", "knockout", "../../services/configService", "../../common/sharedTypes", "../../common/landingHelper", "../../common/bodyTagsModifierHelper", "text!./mainLanding.html"], function (require, exports, ko, configService, sharedTypes, landingHelper, bodyTagsHelper) {
    var MainLandingViewModel = (function () {
        function MainLandingViewModel() {
            var _this = this;
            this.loadingFeaturedItems = ko.observable(true);
            this.description = "Azure AI Gallery enables our growing community of developers and data scientists to share their analytics solutions.";
            this.topContributors = ko.observableArray([]);
            this.featuredEntities = ko.observableArray([]);
            var featuredRotateParams = new sharedTypes.FeaturedItemsRotateParams();
            featuredRotateParams.featuredCollectionId = configService.featuredEntitiesId;
            featuredRotateParams.numberOfFixedItems = configService.numberOfFixedFeaturedItems;
            featuredRotateParams.numberOfItems = configService.numberOfFeaturedItems;
            featuredRotateParams.duration = configService.featuredItemsRotationDuration;
            landingHelper.getRotatingFeaturedItems(this.featuredEntities, this.loadingFeaturedItems, featuredRotateParams);
            if (configService.topContributorsIsEnabled) {
                landingHelper.getTopContributors(this.topContributors, configService.numberOfTopContributors, configService.topContributorsToIgnore);
            }
            this.showTopContributors = ko.computed(function () {
                return configService.topContributorsIsEnabled && _this.topContributors().length > 0 &&
                    (_this.mainStripParams.entities().length > 0 || _this.sndStripParams.entities().length > 0);
            });
            this.mainStripParams = new sharedTypes.EntitiesStripParams();
            this.mainStripParams.stripTitle = "Recently added";
            this.mainStripParams.viewAllUrl = "/browse?orderby=freshness desc";
            this.mainStripParams.entities = ko.observableArray([]);
            landingHelper.getNewNoteworthyEntities(this.mainStripParams.entities, "");
            this.sndStripParams = new sharedTypes.EntitiesStripParams();
            this.sndStripParams.stripTitle = "What's popular";
            this.sndStripParams.viewAllUrl = "/browse";
            this.sndStripParams.entities = ko.observableArray([]);
            landingHelper.getStripEntities(this.sndStripParams.entities, "", false, true);
            this.showIndustryStrip = configService.industryIsEnabled;
            landingHelper.clearNavigationTab();
            bodyTagsHelper.BodyTagsModifierHelper.setMetaTags(configService.galleryHomePageUrl, configService.galleryTitle, this.description);
        }
        return MainLandingViewModel;
    })();
    exports.MainLandingViewModel = MainLandingViewModel;
    exports.viewModel = MainLandingViewModel;
});
