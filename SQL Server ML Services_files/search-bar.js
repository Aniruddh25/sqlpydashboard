define(["require", "exports", "jquery", "knockout", "lodash", "../../services/stateService", "../../services/configService", "../../common/EntityViewModel", "typeaheadModule", "../../common/logging", "../../common/utilities"], function (require, exports, $, ko, _, stateService, configService, CommonUX, typea, awa, utilities) {
    typea;
    var SearchBar = (function () {
        function SearchBar() {
            this.searchText = ko.observable("");
            this.placeHolderText = "";
            this.browseUrl = "/browse?s={0}";
            this.defaultImageUrl = "https://az711192.vo.msecnd.net/stockimg/v2/Gallery_StockImages_TextAnalysis.svg";
            this.suggestionsTemplate = _.template("<div class=\"element-wrapper\"><div style=\"background-image: url(<%-imageUrl%>);\" class=\"suggestion-image\"></div><span class=\"suggestion-details\"><span><%-title%></span><svg class=\"icon-svg-card\"><use xlink:href=\"<%-svgSprite%>\"></use></svg><span><%-categoryName%></span><span><%-author%></span></span></div>");
            this.$cortanaNavbar = $('.cortana-top-nav');
            this.$searchBar = $('.top-nav-search-input');
            this.searchText(stateService.getSearchText());
            this.searchText.subscribe(this.onInput);
            if (configService.autosuggestIsEnabled) {
                this.initializeDataSet();
                this.initializeSuggestions();
            }
        }
        SearchBar.prototype.onSearch = function () {
            if (!this.currentSelection) {
                this.redirectTo(this.browseUrl, this.searchText());
            }
            this.currentSelection = null;
        };
        SearchBar.prototype.onClose = function () {
            this.$cortanaNavbar.removeClass('in-search');
        };
        SearchBar.prototype.onInput = function (newText) {
            if (newText !== "") {
                utilities.setConsent();
            }
        };
        SearchBar.prototype.initializeDataSet = function () {
            var that = this;
            this.searchHitSet = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                limit: configService.searchResultsItemsReturned,
                remote: {
                    url: configService.indexUrl + configService.searchResultsQuery,
                    wildcard: '%QUERY',
                    filter: function (results) { return that.filterSearchResults(results); }
                }
            });
            this.searchHitSet.initialize();
        };
        SearchBar.prototype.initializeSuggestions = function () {
            var that = this;
            this.$searchBar.typeahead({
                hint: true,
                highlight: true,
                minLength: configService.searchMinimumCharacters,
            }, {
                name: 'best-entities',
                source: this.searchHitSet.ttAdapter(),
                display: 'name',
                templates: { suggestion: function (data) { return that.getSearchResultTemplate(data); } },
            }).on('typeahead:selected', function (context, obj) {
                that.currentSelection = obj;
                that.selectSuggestions(that.currentSelection);
                return false;
            }).on('typeahead:autocompleted', function (context, obj) {
                that.currentSelection = obj;
                that.selectSuggestions(that.currentSelection);
                return false;
            });
        };
        SearchBar.prototype.redirectTo = function (url, argument) {
            window.location.href = url.replace("{0}", argument ? argument : "");
        };
        SearchBar.prototype.selectSuggestions = function (obj) {
            var entityType = CommonUX.EntityViewModel.getEntityType(obj.entity_type);
            var entityDetails = CommonUX.EntityViewModel.getEntityViewDetails(entityType);
            var slug = obj.slugs && obj.slugs.length > 0 ? obj.slugs[0] : obj.catalog_id;
            this.reportClickActivity(obj.catalog_id, obj.index);
            this.redirectTo(entityDetails.detailsUrl, slug);
            return false;
        };
        SearchBar.prototype.filterSearchResults = function (results) {
            _.each(results.value, function (value, index) {
                value.index = index;
            });
            this.reportSearchText(results.value ? results.value.length : 0);
            return results.value;
        };
        SearchBar.prototype.getSearchResultTemplate = function (data) {
            var result = "";
            if (data) {
                var entityType = CommonUX.EntityViewModel.getEntityType(data.entity_type);
                var entityDetails = CommonUX.EntityViewModel.getEntityViewDetails(entityType);
                var svgSprite = entityDetails.iconSprite;
                var categoryName = entityDetails.categoryName;
                var title = data.name || "";
                var author = data.author && data.author.name ? " by " + data.author.name : "";
                var imageUrl = data.image_url ? data.image_url : this.defaultImageUrl;
                result = this.suggestionsTemplate({
                    imageUrl: imageUrl,
                    svgSprite: svgSprite,
                    categoryName: categoryName,
                    title: title,
                    author: author,
                });
            }
            return result;
        };
        SearchBar.prototype.reportClickActivity = function (entityId, index) {
            awa.logContentPageAction(awa.BEHAVIORS.SEARCHAUTOCOMPLETE, "CL", {
                contentName: 'suggestions',
                aslinkpos: index,
                assetid: entityId,
                srchq: this.searchText()
            });
        };
        SearchBar.prototype.reportSearchText = function (resultsCount) {
            awa.logContentPageAction(awa.BEHAVIORS.SEARCHINITIATE, "A", {
                contentName: 'suggestions',
                srchq: this.searchText(),
                srchcnt: resultsCount
            });
        };
        return SearchBar;
    })();
    exports.SearchBar = SearchBar;
    exports.viewModel = SearchBar;
});
