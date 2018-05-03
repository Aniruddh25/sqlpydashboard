/// <reference path="../references.d.ts"/>
/// <reference path="../common/EntityViewModel.ts"/>
define(["require", "exports", "./configService", "../common/constant", "../common/sharedTypes", "./ExperimentFilter", "../common/filterValue", "../common/EntityViewModel", "../common/UserViewModel", "jquery", "lodash"], function (require, exports, configService, constant, sharedTypes, Filter, filterValue, CommonEntityUX, CommonUserUX, $, _) {
    var LandingDataService = (function () {
        function LandingDataService() {
        }
        LandingDataService.getNewNoteworthy = function (top, category, excludeCategories) {
            if (category === void 0) { category = ""; }
            if (excludeCategories === void 0) { excludeCategories = []; }
            var result = jQuery.Deferred();
            LandingDataService.getEntities(top, category, false, LandingDataService.freshnessOrderBy, false, "", "", 0, excludeCategories).always(function (data) {
                result.resolve(data);
            });
            return result;
        };
        LandingDataService.getEntitiesByIndustry = function (top, industryFilter, verticalFilter) {
            if (verticalFilter === void 0) { verticalFilter = ""; }
            return LandingDataService.getEntities(top, "", false, LandingDataService.trendingOrderBy, false, industryFilter, verticalFilter);
        };
        LandingDataService.getEntities = function (top, category, filterOutMs, orderby, msOnly, industryFilter, verticalFilter, skip, excludeCategories) {
            if (category === void 0) { category = ""; }
            if (filterOutMs === void 0) { filterOutMs = false; }
            if (orderby === void 0) { orderby = LandingDataService.trendingOrderBy; }
            if (msOnly === void 0) { msOnly = false; }
            if (industryFilter === void 0) { industryFilter = ""; }
            if (verticalFilter === void 0) { verticalFilter = ""; }
            if (skip === void 0) { skip = 0; }
            if (excludeCategories === void 0) { excludeCategories = []; }
            var result = jQuery.Deferred();
            var filters = new Filter();
            filters.top = top;
            filters.skip = skip;
            filters.orderby = orderby;
            if (msOnly) {
                filters.msPublisher = true;
            }
            if (filterOutMs) {
                filters.excludePublisher = true;
            }
            if (category) {
                filters.categories = filterValue.FilterValue.constructFilterValues([category], constant.facetTypeCategory);
            }
            if (industryFilter) {
                filters.industries = filterValue.FilterValue.constructFilterValues([industryFilter], constant.facetTypeIndustry);
            }
            if (verticalFilter) {
                filters.verticals = filterValue.FilterValue.constructFilterValues([verticalFilter], constant.facetTypeVertical);
            }
            if (excludeCategories && excludeCategories.length) {
                filters.excludeCategories = filterValue.FilterValue.constructFilterValues(excludeCategories, constant.facetTypeCategory);
            }
            var url = configService.catalogUrl + LandingDataService.catalogEntitiesPath;
            var urlPath = url + "?" + filters.toQueryParams();
            LandingDataService.makeAjaxCall(urlPath, CommonEntityUX.EntityViewModel.buildEntityViewModelFromCatalog).always(function (data) {
                result.resolve(data);
            });
            return result;
        };
        LandingDataService.getCollectionItemsById = function (entityId) {
            var result = jQuery.Deferred();
            var url = configService.catalogUrl + LandingDataService.catalogCollectionsPath + "/" + entityId + "/items";
            LandingDataService.makeAjaxCall(url, CommonEntityUX.EntityViewModel.buildEntityViewModelFromCatalog).always(function (data) {
                result.resolve(data);
            });
            return result;
        };
        LandingDataService.makeAjaxCall = function (urlPath, buildViewModel, isQueryCatalogMode) {
            if (isQueryCatalogMode === void 0) { isQueryCatalogMode = true; }
            var result = jQuery.Deferred();
            $.ajax(urlPath, {
                type: "GET"
            })
                .fail(function (xhr, ajaxOptions, thrownError) {
                var response = new sharedTypes.BrowseCollection([], 0, 0, true);
                result.resolve(response);
            })
                .done(function (data) {
                if (!data || !data.value) {
                    data = {
                        value: [],
                        count: 0
                    };
                }
                var items = [];
                if (isQueryCatalogMode) {
                    var catalogItems = data.value;
                    _.forEach(catalogItems, function (item) {
                        if (item.entity) {
                            item = item.entity;
                        }
                        if (item !== null && Object.keys(item).length > 0) {
                            items.push(buildViewModel(item));
                        }
                    });
                }
                else {
                    var indexItems = data.value;
                    _.forEach(indexItems, function (item) {
                        items.push(buildViewModel(item));
                    });
                }
                var resultCollection = new sharedTypes.BrowseCollection(items, data.count, data.total_count);
                result.resolve(resultCollection);
            });
            return result;
        };
        LandingDataService.getTopContributors = function (top) {
            var result = jQuery.Deferred();
            var filters = new Filter();
            filters.top = top;
            filters.orderby = this.contributionScoreOrderBy;
            var url = configService.catalogUrl + LandingDataService.catalogUsersPath;
            var urlPath = url + "?" + filters.toQueryParams();
            LandingDataService.makeAjaxCall(urlPath, CommonUserUX.UserViewModel.buildUserViewModelFromCatalog).always(function (data) {
                result.resolve(data);
            });
            return result;
        };
        LandingDataService.catalogExperimentsPath = "experiments";
        LandingDataService.indexExperimentsPath = "experiments";
        LandingDataService.catalogApisPath = "apis";
        LandingDataService.indexApisPath = "apis";
        LandingDataService.catalogEntitiesPath = "entities";
        LandingDataService.catalogUsersPath = "users";
        LandingDataService.indexDocumentsPath = "documents";
        LandingDataService.catalogCompetitionsPath = "competitions";
        LandingDataService.catalogCollectionsPath = "collections";
        LandingDataService.freshnessOrderBy = "freshness desc";
        LandingDataService.trendingOrderBy = "trending desc";
        LandingDataService.recentOrderBy = "updated_at desc";
        LandingDataService.contributionScoreOrderBy = "contribution_score desc";
        LandingDataService.facetsParam = "?facets=";
        return LandingDataService;
    })();
    return LandingDataService;
});
