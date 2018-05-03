define(["require", "exports", "../common/navigationBar", "../common/utilities", "../services/landingDataService", "../services/configService"], function (require, exports, navBar, utilities, landingDataService, configService) {
    var LandingHelper = (function () {
        function LandingHelper() {
        }
        LandingHelper.selectNavigationTab = function (categoryName) {
            navBar.clearSearchBar();
            navBar.selectNavigationTab(utilities.toCssClass(categoryName));
        };
        LandingHelper.clearNavigationTab = function () {
            navBar.selectNavigationTab(null);
        };
        LandingHelper.getStripEntities = function (target, indexEntityType, filterOutMsContent, generateRandomSkips, orderBy) {
            if (filterOutMsContent === void 0) { filterOutMsContent = false; }
            if (generateRandomSkips === void 0) { generateRandomSkips = false; }
            if (orderBy === void 0) { orderBy = landingDataService.trendingOrderBy; }
            var skip = 0;
            if (generateRandomSkips) {
                skip = Math.floor((Math.random() * configService.popularEntitiesSampleSet) + 1);
            }
            landingDataService.getEntities(4, indexEntityType, filterOutMsContent, orderBy, false, "", "", skip).done(function (result) {
                target(result.value);
            });
        };
        LandingHelper.getFeaturedItems = function (target, featuredCollectionId, loadingFeaturedItems) {
            landingDataService.getCollectionItemsById(featuredCollectionId).always(function (result) {
                target(result.value);
                loadingFeaturedItems(false);
            });
        };
        LandingHelper.getRotatingFeaturedItems = function (target, loadingFeaturedItems, params) {
            landingDataService.getCollectionItemsById(params.featuredCollectionId).done(function (result) {
                target(LandingHelper.rotateItems(result.value, params));
                loadingFeaturedItems(false);
            });
        };
        LandingHelper.getNewNoteworthyEntities = function (target, indexEntityType, excludeIndexEntityTypes) {
            if (excludeIndexEntityTypes === void 0) { excludeIndexEntityTypes = []; }
            landingDataService.getNewNoteworthy(4, indexEntityType, excludeIndexEntityTypes).done(function (result) {
                target(result.value);
            });
        };
        LandingHelper.getMicrosoftStripEntities = function (target, indexEntityType) {
            landingDataService.getEntities(4, indexEntityType, false, landingDataService.trendingOrderBy, true).done(function (result) {
                target(result.value);
            });
        };
        LandingHelper.orderByFreshness = function (browseEntityUrl) {
            return browseEntityUrl + "&orderby=freshness desc";
        };
        LandingHelper.rotateItems = function (collection, params) {
            var itemsToDisplay = [];
            if (collection != null && params != null && params.numberOfItems > 0) {
                var numFixedItems = Math.min(params.numberOfFixedItems, collection.length, params.numberOfItems);
                itemsToDisplay = itemsToDisplay.concat(collection.slice(0, numFixedItems));
                var itemsToRotate = collection.slice(numFixedItems);
                if (itemsToRotate.length > 0) {
                    var conversion = 1000.0 * 60.0;
                    var duration = params.duration <= 0 ? 1000 : params.duration * conversion;
                    var startingIndex = Math.floor(Date.now() / duration) % itemsToRotate.length;
                    var numberToFill = Math.min(params.numberOfItems - numFixedItems, itemsToRotate.length);
                    for (var i = startingIndex; i < numberToFill + startingIndex; i++) {
                        itemsToDisplay.push(itemsToRotate[i % itemsToRotate.length]);
                    }
                }
            }
            return itemsToDisplay;
        };
        LandingHelper.getTopContributors = function (target, numberOfTopContributors, topContributorsToIgnore) {
            var ignoreList = LandingHelper.getIgnoredContributors(topContributorsToIgnore);
            var numberOfAdditionalUsersToRequest = ignoreList.length;
            landingDataService.getTopContributors(configService.numberOfTopContributors + numberOfAdditionalUsersToRequest).done(function (result) {
                var topContributors = topContributorsToIgnore ? _.filter(result.value, function (user) { return (ignoreList.indexOf(user.itemId) === -1); }) : result.value;
                target(topContributors.slice(0, configService.numberOfTopContributors));
            });
        };
        LandingHelper.getIgnoredContributors = function (topContributorsToIgnore) {
            var ignoreList = [];
            if (topContributorsToIgnore) {
                ignoreList = topContributorsToIgnore.split(",");
            }
            return ignoreList;
        };
        return LandingHelper;
    })();
    return LandingHelper;
});
