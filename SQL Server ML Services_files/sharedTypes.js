define(["require", "exports", "knockout"], function (require, exports, ko) {
    var BrowseCollection = (function () {
        function BrowseCollection(value, count, totalCount, hasError) {
            if (hasError === void 0) { hasError = false; }
            this.value = value;
            this.count = count;
            this.totalCount = totalCount;
            this.hasError = hasError;
        }
        return BrowseCollection;
    })();
    exports.BrowseCollection = BrowseCollection;
    var ModuleType = (function () {
        function ModuleType() {
        }
        return ModuleType;
    })();
    exports.ModuleType = ModuleType;
    (function (FilterElementKind) {
        FilterElementKind[FilterElementKind["Any"] = 0] = "Any";
        FilterElementKind[FilterElementKind["Category"] = 1] = "Category";
        FilterElementKind[FilterElementKind["Tag"] = 2] = "Tag";
        FilterElementKind[FilterElementKind["Algorithm"] = 3] = "Algorithm";
        FilterElementKind[FilterElementKind["Service"] = 4] = "Service";
        FilterElementKind[FilterElementKind["Module"] = 5] = "Module";
        FilterElementKind[FilterElementKind["Language"] = 6] = "Language";
        FilterElementKind[FilterElementKind["MicrosoftSamplesOnly"] = 7] = "MicrosoftSamplesOnly";
        FilterElementKind[FilterElementKind["Industry"] = 8] = "Industry";
        FilterElementKind[FilterElementKind["Vertical"] = 9] = "Vertical";
        FilterElementKind[FilterElementKind["Level"] = 10] = "Level";
    })(exports.FilterElementKind || (exports.FilterElementKind = {}));
    var FilterElementKind = exports.FilterElementKind;
    (function (DataQueryType) {
        DataQueryType[DataQueryType["Catalog"] = 0] = "Catalog";
        DataQueryType[DataQueryType["Index"] = 1] = "Index";
    })(exports.DataQueryType || (exports.DataQueryType = {}));
    var DataQueryType = exports.DataQueryType;
    var FilterElement = (function () {
        function FilterElement(name, id, isSelected, kind) {
            this.name = name;
            this.id = id;
            this.isSelected = isSelected;
            this.kind = kind;
            this.isSelectedObservable = ko.observable(false);
            this.isVisible = ko.observable(true);
            this.isSelectedObservable(isSelected);
        }
        return FilterElement;
    })();
    exports.FilterElement = FilterElement;
    var FilterItemView = (function () {
        function FilterItemView() {
        }
        return FilterItemView;
    })();
    exports.FilterItemView = FilterItemView;
    var facetChoice = (function () {
        function facetChoice() {
        }
        return facetChoice;
    })();
    exports.facetChoice = facetChoice;
    var facet = (function () {
        function facet() {
        }
        return facet;
    })();
    exports.facet = facet;
    (function (EntityTypes) {
        EntityTypes[EntityTypes["Experiment"] = 0] = "Experiment";
        EntityTypes[EntityTypes["Api"] = 1] = "Api";
        EntityTypes[EntityTypes["Tutorial"] = 2] = "Tutorial";
        EntityTypes[EntityTypes["Competition"] = 3] = "Competition";
        EntityTypes[EntityTypes["Collection"] = 4] = "Collection";
        EntityTypes[EntityTypes["SolutionAccelerator"] = 5] = "SolutionAccelerator";
        EntityTypes[EntityTypes["Notebook"] = 6] = "Notebook";
        EntityTypes[EntityTypes["Classroom"] = 7] = "Classroom";
        EntityTypes[EntityTypes["Webinar"] = 8] = "Webinar";
        EntityTypes[EntityTypes["Video"] = 9] = "Video";
        EntityTypes[EntityTypes["Module"] = 10] = "Module";
        EntityTypes[EntityTypes["Project"] = 11] = "Project";
        EntityTypes[EntityTypes["Unknown"] = 100] = "Unknown";
    })(exports.EntityTypes || (exports.EntityTypes = {}));
    var EntityTypes = exports.EntityTypes;
    var HyperLink = (function () {
        function HyperLink(text, url) {
            this.text = text;
            this.url = url;
        }
        return HyperLink;
    })();
    exports.HyperLink = HyperLink;
    var EntitiesStripParams = (function () {
        function EntitiesStripParams() {
        }
        return EntitiesStripParams;
    })();
    exports.EntitiesStripParams = EntitiesStripParams;
    var TopicTypes = (function () {
        function TopicTypes() {
        }
        TopicTypes.language = "language";
        TopicTypes.service = "service";
        return TopicTypes;
    })();
    exports.TopicTypes = TopicTypes;
    (function (Level) {
        Level[Level["Unspecified"] = 0] = "Unspecified";
        Level[Level["Beginner"] = 1] = "Beginner";
        Level[Level["Intermediate"] = 2] = "Intermediate";
        Level[Level["Advanced"] = 3] = "Advanced";
        Level[Level["Expert"] = 4] = "Expert";
    })(exports.Level || (exports.Level = {}));
    var Level = exports.Level;
    var FeaturedItemsRotateParams = (function () {
        function FeaturedItemsRotateParams() {
        }
        return FeaturedItemsRotateParams;
    })();
    exports.FeaturedItemsRotateParams = FeaturedItemsRotateParams;
});
