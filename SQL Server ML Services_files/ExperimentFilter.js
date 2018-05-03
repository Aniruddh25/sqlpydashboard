define(["require", "exports", "../common/sharedTypes", "../services/configService", "../common/utilities", "../common/constant"], function (require, exports, sharedTypes, configService, utilities, constant) {
    var filterMsPublisher = "owner/id eq '" + utilities.escapeODataQuote(configService.msftTenantId) + "'", excludeMsPublisher = "owner/id ne '" + utilities.escapeODataQuote(configService.msftTenantId) + "'", filterHidden = "hidden eq <value>", filterOwnerId = "owner/id eq '<ownerId>'", filterAuthorId = "author/id eq '<authorId>'", filterOwnedOrAuthored = "(<owned> or <authored>)", filterCategories = "entity_type eq <value>", filterExcludeCategories = "entity_type ne <value>", filterIndustry = "industry eq <value>", filterVertical = "vertical eq <value>", filterLevel = "level eq <value>", allFilters = "$filter=", genericAnyTypeFilterTemplate = "<filter>/any(f: f eq '<value>')";
    var ExperimentFilter = (function () {
        function ExperimentFilter() {
            this._top = constant.bigDeviceItemsPerPage;
            this._orderBy = "trending desc";
            this._queryChanged = true;
            this.authorOwner = false;
            this.filterHidden = false;
            this.filterVisible = false;
        }
        Object.defineProperty(ExperimentFilter.prototype, "queryType", {
            get: function () {
                return !!this.searchText ? sharedTypes.DataQueryType.Index : sharedTypes.DataQueryType.Catalog;
            },
            enumerable: true,
            configurable: true
        });
        ExperimentFilter.prototype.setValue = function (key, value) {
            if (this[key] !== value) {
                this._queryChanged = true;
                this[key] = value;
            }
        };
        ExperimentFilter.prototype.checkChanged = function () {
            var result = this._queryChanged;
            this._queryChanged = false;
            return result;
        };
        Object.defineProperty(ExperimentFilter.prototype, "searchText", {
            get: function () {
                return this._searchText;
            },
            set: function (value) {
                this.setValue('_searchText', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExperimentFilter.prototype, "skip", {
            get: function () {
                return this._skip;
            },
            set: function (value) {
                if (typeof (value) === "number" && !isNaN(value)) {
                    this._skip = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExperimentFilter.prototype, "top", {
            get: function () {
                return this._top;
            },
            set: function (value) {
                if (typeof (value) === "number" && !isNaN(value)) {
                    this._top = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExperimentFilter.prototype, "orderby", {
            get: function () {
                return this._orderBy;
            },
            set: function (value) {
                this.setValue('_orderBy', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExperimentFilter.prototype, "owner", {
            get: function () {
                return this._owner;
            },
            set: function (value) {
                this.setValue('_owner', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExperimentFilter.prototype, "author", {
            get: function () {
                return this._author;
            },
            set: function (value) {
                this.setValue('_author', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExperimentFilter.prototype, "msPublisher", {
            get: function () {
                return this._msPublisher;
            },
            set: function (value) {
                this.setValue('_msPublisher', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExperimentFilter.prototype, "excludePublisher", {
            get: function () {
                return this._excludePublisher;
            },
            set: function (value) {
                this.setValue('_excludePublisher', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExperimentFilter.prototype, "categories", {
            get: function () {
                return this._categories;
            },
            set: function (value) {
                this.setValue('_categories', value);
            },
            enumerable: true,
            configurable: true
        });
        ExperimentFilter.prototype.category = function (value) {
            this._queryChanged = true;
            if (!this._categories) {
                this._categories = [];
            }
            this._categories.push(value);
        };
        Object.defineProperty(ExperimentFilter.prototype, "excludeCategories", {
            get: function () {
                return this._excludeCategories;
            },
            set: function (value) {
                this.setValue('_excludeCategories', value);
            },
            enumerable: true,
            configurable: true
        });
        ExperimentFilter.prototype.excludeCategory = function (value) {
            this._queryChanged = true;
            if (!this._excludeCategories) {
                this._excludeCategories = [];
            }
            this._excludeCategories.push(value);
        };
        Object.defineProperty(ExperimentFilter.prototype, "tags", {
            get: function () {
                return this._tags;
            },
            set: function (value) {
                this.setValue('_tags', value);
            },
            enumerable: true,
            configurable: true
        });
        ExperimentFilter.prototype.tag = function (value) {
            this._queryChanged = true;
            if (!this._tags) {
                this._tags = [];
            }
            this._tags.push(value);
        };
        Object.defineProperty(ExperimentFilter.prototype, "algorithms", {
            get: function () {
                return this._algorithms;
            },
            set: function (value) {
                this.setValue('_algorithms', value);
            },
            enumerable: true,
            configurable: true
        });
        ExperimentFilter.prototype.algorithm = function (value) {
            this._queryChanged = true;
            if (!this._algorithms) {
                this._algorithms = [];
            }
            this.algorithms.push(value);
        };
        Object.defineProperty(ExperimentFilter.prototype, "services", {
            get: function () {
                return this._services;
            },
            set: function (value) {
                this.setValue('_services', value);
            },
            enumerable: true,
            configurable: true
        });
        ExperimentFilter.prototype.service = function (value) {
            this._queryChanged = true;
            if (!this._services) {
                this._services = [];
            }
            this.services.push(value);
        };
        Object.defineProperty(ExperimentFilter.prototype, "modules", {
            get: function () {
                return this._modules;
            },
            set: function (value) {
                this.setValue('_modules', value);
            },
            enumerable: true,
            configurable: true
        });
        ExperimentFilter.prototype.addModule = function (value) {
            this._queryChanged = true;
            if (!this._modules) {
                this._modules = [];
            }
            this.modules.push(value);
        };
        Object.defineProperty(ExperimentFilter.prototype, "languages", {
            get: function () {
                return this._languages;
            },
            set: function (value) {
                this.setValue('_languages', value);
            },
            enumerable: true,
            configurable: true
        });
        ExperimentFilter.prototype.addLanguage = function (value) {
            this._queryChanged = true;
            if (!this._languages) {
                this._languages = [];
            }
            this.languages.push(value);
        };
        Object.defineProperty(ExperimentFilter.prototype, "industries", {
            get: function () {
                return this._industries;
            },
            set: function (value) {
                this.setValue('_industries', value);
            },
            enumerable: true,
            configurable: true
        });
        ExperimentFilter.prototype.addIndustries = function (value) {
            this._queryChanged = true;
            if (!this._industries) {
                this._industries = [];
            }
            this._industries.push(value);
        };
        Object.defineProperty(ExperimentFilter.prototype, "verticals", {
            get: function () {
                return this._verticals;
            },
            set: function (value) {
                this.setValue('_verticals', value);
            },
            enumerable: true,
            configurable: true
        });
        ExperimentFilter.prototype.addVerticals = function (value) {
            this._queryChanged = true;
            if (!this._verticals) {
                this._verticals = [];
            }
            this._verticals.push(value);
        };
        Object.defineProperty(ExperimentFilter.prototype, "levels", {
            get: function () {
                return this._levels;
            },
            set: function (value) {
                this.setValue('_levels', value);
            },
            enumerable: true,
            configurable: true
        });
        ExperimentFilter.prototype.addLevels = function (value) {
            this._queryChanged = true;
            if (!this._levels) {
                this._levels = [];
            }
            this._levels.push(value);
        };
        ExperimentFilter.prototype.toString = function (inputQueryType) {
            return this.toQueryParams(inputQueryType);
        };
        ExperimentFilter.prototype.toQueryParams = function (inputQueryType, skipOverride) {
            var result = [], filters = [];
            var queryTypeToUse = inputQueryType ? inputQueryType : this.queryType;
            var authorFilter = null;
            var ownerFilter = null;
            if (skipOverride) {
                result.push("$skip=" + skipOverride);
            }
            else if (typeof (this.skip) === "number") {
                result.push("$skip=" + this.skip);
            }
            if (typeof (this.top) === "number") {
                result.push("$top=" + this.top);
            }
            if (!!this.searchText) {
                result.push("q='" + utilities.escapeODataQuote(this.searchText) + "'");
            }
            if (typeof (this.orderby) === "string" && this.orderby) {
                result.push("$orderby=" + this.orderby);
            }
            if (typeof (this.owner) === "string" && this.owner) {
                ownerFilter = filterOwnerId.replace("<ownerId>", utilities.escapeODataQuote(this.owner));
            }
            if (typeof (this.author) === "string" && this.author) {
                authorFilter = filterAuthorId.replace("<authorId>", utilities.escapeODataQuote(this.author));
            }
            if (typeof (this.msPublisher) === "boolean" && this.msPublisher) {
                filters.push(filterMsPublisher);
            }
            if (typeof (this.excludePublisher) === "boolean" && this.excludePublisher && !this.msPublisher) {
                filters.push(excludeMsPublisher);
            }
            if (typeof (this.filterHidden) === "boolean" && this.filterHidden) {
                filters.push(filterHidden.replace("<value>", "false"));
            }
            if (typeof (this.filterVisible) === "boolean" && this.filterVisible) {
                filters.push(filterHidden.replace("<value>", "true"));
            }
            if (ownerFilter != null) {
                if (authorFilter != null) {
                    filters.push(filterOwnedOrAuthored.replace("<owned>", ownerFilter).replace("<authored>", authorFilter));
                }
                else {
                    filters.push(ownerFilter);
                }
            }
            else {
                if (authorFilter != null) {
                    filters.push(authorFilter);
                }
            }
            ExperimentFilter.pushFilterString(this.categories, filterCategories, filters, queryTypeToUse);
            ExperimentFilter.pushFilterString(this.excludeCategories, filterExcludeCategories, filters, queryTypeToUse, true);
            ExperimentFilter.pushFilterString(this.industries, filterIndustry, filters, queryTypeToUse);
            ExperimentFilter.pushFilterString(this.verticals, filterVertical, filters, queryTypeToUse);
            ExperimentFilter.pushFilterString(this.levels, filterLevel, filters, queryTypeToUse);
            ExperimentFilter.pushFilterString(this.algorithms, ExperimentFilter.getFilterTemplate(ExperimentFilter.algorithmsFilterName, queryTypeToUse), filters, queryTypeToUse);
            ExperimentFilter.pushFilterString(this.services, ExperimentFilter.getFilterTemplate(ExperimentFilter.servicesFilterName, queryTypeToUse), filters, queryTypeToUse);
            ExperimentFilter.pushFilterString(this.modules, ExperimentFilter.getFilterTemplate(ExperimentFilter.modulesFilterName, queryTypeToUse), filters, queryTypeToUse);
            ExperimentFilter.pushFilterString(this.languages, ExperimentFilter.getFilterTemplate(ExperimentFilter.languagesFilterName, queryTypeToUse), filters, queryTypeToUse);
            ExperimentFilter.pushFilterString(this.tags, ExperimentFilter.getFilterTemplate(ExperimentFilter.tagsFilterName, queryTypeToUse), filters, queryTypeToUse);
            if (filters.length) {
                result.push(allFilters + filters.join(" and "));
            }
            if (result.length) {
                return result.join("&");
            }
            else {
                return "";
            }
        };
        ExperimentFilter.getFilterValueNameByQueryType = function (filterName, dataQuerytype) {
            switch (filterName) {
                case ExperimentFilter.algorithmsFilterName:
                    return ExperimentFilter.algorithmsFilterName;
                case ExperimentFilter.languagesFilterName:
                    return ExperimentFilter.languagesFilterName;
                case ExperimentFilter.modulesFilterName:
                    return ExperimentFilter.modulesFilterName;
                case ExperimentFilter.servicesFilterName:
                    return dataQuerytype === sharedTypes.DataQueryType.Catalog ? ExperimentFilter.servicesCatalogFilterName : ExperimentFilter.servicesFilterName;
                case ExperimentFilter.tagsFilterName:
                    return ExperimentFilter.tagsFilterName;
                default:
                    return "";
            }
        };
        ExperimentFilter.pushFilterString = function (filterValues, filterTemplate, filterStrings, inputQueryType, filterIntersection) {
            if (filterIntersection === void 0) { filterIntersection = false; }
            var filterJoinStr = filterIntersection ? " and " : " or ";
            if (filterValues && filterValues.length) {
                var allfilters = filterValues.map(function (value) {
                    return ExperimentFilter.getFilter(value, filterTemplate, inputQueryType, false);
                }).join(filterJoinStr);
                filterStrings.push("(" + allfilters + ")");
            }
        };
        ExperimentFilter.getFilter = function (filterValue, filterTemplateString, queryType, useODataEscape) {
            var valueToUse = useODataEscape ? utilities.escapeODataQuote(filterValue.actualValue) : filterValue.actualValue;
            if (queryType === sharedTypes.DataQueryType.Catalog) {
                valueToUse = useODataEscape ? utilities.escapeODataQuote(filterValue.catalogValue) : filterValue.catalogValue;
            }
            return filterTemplateString.replace("<value>", valueToUse);
        };
        ExperimentFilter.getFilterTemplate = function (filterName, inputQueryType) {
            return genericAnyTypeFilterTemplate.replace("<filter>", ExperimentFilter.getFilterValueNameByQueryType(filterName, inputQueryType));
        };
        ExperimentFilter.algorithmsFilterName = "algorithms";
        ExperimentFilter.languagesFilterName = "languages";
        ExperimentFilter.modulesFilterName = "modules";
        ExperimentFilter.servicesFilterName = "solution_accelerator_related_azure_services";
        ExperimentFilter.servicesCatalogFilterName = "related_azure_services";
        ExperimentFilter.tagsFilterName = "tags";
        return ExperimentFilter;
    })();
    return ExperimentFilter;
});
