define(["require", "exports", "lodash", "../services/configService", "../common/constant"], function (require, exports, _, configService, constant) {
    var FilterValue = (function () {
        function FilterValue(actualValue, catalogValue, displayValue) {
            this.actualValue = actualValue;
            this.catalogValue = catalogValue;
            this.displayValue = displayValue;
        }
        FilterValue.constructFilterValue = function (value, facetType) {
            var lowerCaseFacetType = facetType ? facetType.toLowerCase() : "";
            switch (lowerCaseFacetType) {
                case constant.facetTypeIndustry:
                    return FilterValue.constructFilterValueForIndustry(value);
                case constant.facetTypeVertical:
                    return FilterValue.constructFilterValueForVertical(value);
                case constant.facetTypeCategory:
                    return FilterValue.constructFilterValueForCategory(value);
                case constant.facetTypeLevel:
                    return FilterValue.constructFilterValueForLevel(value);
                default:
                    return new FilterValue(value, value, value);
            }
        };
        FilterValue.constructFilterValues = function (values, facetType) {
            var filterValues = [];
            if (values) {
                filterValues = _.map(values, function (value) {
                    return FilterValue.constructFilterValue(value, facetType);
                });
            }
            return filterValues;
        };
        FilterValue.constructFilterValueForIndustry = function (value) {
            var displayValue, catalogValue, filterValue = null;
            switch (value) {
                case configService.indexIndustryFilterRetail:
                    displayValue = "Retail";
                    catalogValue = configService.catalogIndustryFilterRetail;
                    break;
                case configService.indexIndustryFilterManufacturing:
                    displayValue = "Manufacturing";
                    catalogValue = configService.catalogIndustryFilterManufacturing;
                    break;
                case configService.indexIndustryFilterBanking:
                    displayValue = "Banking";
                    catalogValue = configService.catalogIndustryFilterBanking;
                    break;
                case configService.indexIndustryFilterHealthcare:
                    displayValue = "Healthcare";
                    catalogValue = configService.catalogIndustryFilterHealthcare;
                    break;
                default:
                    catalogValue = displayValue = null;
            }
            if (displayValue != null) {
                filterValue = new FilterValue(value, catalogValue, displayValue);
            }
            return filterValue;
        };
        FilterValue.constructFilterValueForLevel = function (value) {
            var displayValue, catalogValue, filterValue = null;
            switch (value) {
                case configService.indexLevelFilterBeginner:
                    displayValue = configService.levelBeginnerLabel;
                    catalogValue = configService.catalogLevelFilterBeginner;
                    break;
                case configService.indexLevelFilterIntermediate:
                    displayValue = configService.levelIntermediateLabel;
                    catalogValue = configService.catalogLevelFilterIntermediate;
                    break;
                case configService.indexLevelFilterAdvanced:
                    displayValue = configService.levelAdvancedLabel;
                    catalogValue = configService.catalogLevelFilterAdvanced;
                    break;
                case configService.indexLevelFilterExpert:
                    displayValue = configService.levelExpertLabel;
                    catalogValue = configService.catalogLevelFilterExpert;
                    break;
                default:
                    catalogValue = displayValue = null;
            }
            if (displayValue != null) {
                filterValue = new FilterValue(value, catalogValue, displayValue);
            }
            return filterValue;
        };
        FilterValue.constructFilterValueForVertical = function (value) {
            var displayValue, catalogValue, filterValue = null;
            switch (value) {
                case configService.indexVerticalFilterEnergy:
                    displayValue = "Energy";
                    catalogValue = configService.catalogVerticalFilterEngery;
                    break;
                case configService.indexVerticalFilterHealthcare:
                    displayValue = "Healthcare";
                    catalogValue = configService.catalogVerticalFilterHealthcare;
                    break;
                default:
                    catalogValue = displayValue = null;
            }
            if (displayValue != null) {
                filterValue = new FilterValue(value, catalogValue, displayValue);
            }
            return filterValue;
        };
        FilterValue.constructFilterValueForCategory = function (value) {
            var displayValue;
            var catalogValue;
            var filterValue = null;
            switch (value) {
                case configService.indexFilterExperiment:
                    displayValue = configService.categoryNameExperiment;
                    catalogValue = configService.catalogFilterExperiment;
                    break;
                case configService.indexFilterNotebook:
                    displayValue = configService.categoryNameNotebook;
                    catalogValue = configService.catalogFilterNotebook;
                    break;
                case configService.indexFilterApi:
                    displayValue = configService.categoryNameApi;
                    catalogValue = configService.catalogFilterApi;
                    break;
                case configService.indexFilterCollection:
                    displayValue = configService.categoryNameCollection;
                    catalogValue = configService.catalogFilterCollection;
                    break;
                case configService.indexFilterCompetition:
                    displayValue = configService.categoryNameCompetition;
                    catalogValue = configService.catalogFilterCompetition;
                    break;
                case configService.indexFilterSolution:
                    displayValue = configService.categoryNameSolution;
                    catalogValue = configService.catalogFilterSolution;
                    break;
                case configService.indexFilterTutorial:
                    displayValue = configService.categoryNameTutorial;
                    catalogValue = configService.catalogFilterTutorial;
                    break;
                case configService.indexFilterClassroom:
                    displayValue = configService.categoryNameClassroom;
                    catalogValue = configService.catalogFilterClassroom;
                    break;
                case configService.indexFilterVideo:
                    displayValue = configService.categoryNameVideo;
                    catalogValue = configService.catalogFilterVideo;
                    break;
                case configService.indexFilterWebinar:
                    displayValue = configService.categoryNameWebinar;
                    catalogValue = configService.catalogFilterWebinar;
                    break;
                case configService.indexFilterModule:
                    displayValue = configService.categoryNameModule;
                    catalogValue = configService.catalogFilterModule;
                    break;
                case configService.indexFilterProject:
                    displayValue = configService.categoryNameProject;
                    catalogValue = configService.catalogFilterProject;
                    break;
                default:
                    catalogValue = displayValue = null;
            }
            if (displayValue != null) {
                filterValue = new FilterValue(value, catalogValue, displayValue);
            }
            return filterValue;
        };
        return FilterValue;
    })();
    exports.FilterValue = FilterValue;
});
