define(["require", "exports"], function (require, exports) {
    var ConfigService = (function () {
        function ConfigService() {
        }
        ConfigService.constr = function () {
            return window.config = window.config || {};
        };
        Object.defineProperty(ConfigService, "catalogUrl", {
            get: function () {
                return window.config.catalogUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "marketplaceSubscriptionsUrl", {
            get: function () {
                return window.config.marketplaceSubscriptionsUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexUrl", {
            get: function () {
                return window.config.indexUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "userActivityUrl", {
            get: function () {
                return window.config.userActivityServiceAddress;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "token", {
            get: function () {
                return window.config.token;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "msftTenantId", {
            get: function () {
                return window.config.msftTenantId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "msftSponsorId", {
            get: function () {
                return window.config.msftSponsorId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "experimentDetailsPath", {
            get: function () {
                return window.config.experimentDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "apiDetailsPath", {
            get: function () {
                return window.config.apiDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "tutorialDetailsPath", {
            get: function () {
                return window.config.tutorialDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "competitionDetailsPath", {
            get: function () {
                return window.config.competitionDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "collectionDetailsPath", {
            get: function () {
                return window.config.collectionDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "solutionDetailsPath", {
            get: function () {
                return window.config.solutionDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "notebookDetailsPath", {
            get: function () {
                return window.config.notebookDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "projectDetailsPath", {
            get: function () {
                return window.config.projectDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "classroomDetailsPath", {
            get: function () {
                return window.config.classroomDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "videoDetailsPath", {
            get: function () {
                return window.config.videoDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "webinarDetailsPath", {
            get: function () {
                return window.config.webinarDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "moduleDetailsPath", {
            get: function () {
                return window.config.moduleDetailsPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameExperiment", {
            get: function () {
                return window.config.categoryNameExperiment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameApi", {
            get: function () {
                return window.config.categoryNameApi;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameTutorial", {
            get: function () {
                return window.config.categoryNameTutorial;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameCompetition", {
            get: function () {
                return window.config.categoryNameCompetition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameCollection", {
            get: function () {
                return window.config.categoryNameCollection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameSolution", {
            get: function () {
                return window.config.categoryNameSolution;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameNotebook", {
            get: function () {
                return window.config.categoryNameNotebook;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameIndustry", {
            get: function () {
                return window.config.categoryNameIndustry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameLearning", {
            get: function () {
                return window.config.categoryNameLearning;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameClassroom", {
            get: function () {
                return window.config.categoryNameClassroom;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameVideo", {
            get: function () {
                return window.config.categoryNameVideo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameWebinar", {
            get: function () {
                return window.config.categoryNameWebinar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameModule", {
            get: function () {
                return window.config.categoryNameModule;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "categoryNameProject", {
            get: function () {
                return window.config.categoryNameProject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterExperiment", {
            get: function () {
                return window.config.indexFilterExperiment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterApi", {
            get: function () {
                return window.config.indexFilterApi;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterTutorial", {
            get: function () {
                return window.config.indexFilterTutorial;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterCompetition", {
            get: function () {
                return window.config.indexFilterCompetition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterCollection", {
            get: function () {
                return window.config.indexFilterCollection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterSolution", {
            get: function () {
                return window.config.indexFilterSolution;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterNotebook", {
            get: function () {
                return window.config.indexFilterNotebook;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterClassroom", {
            get: function () {
                return window.config.indexFilterClassroom;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterVideo", {
            get: function () {
                return window.config.indexFilterVideo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterWebinar", {
            get: function () {
                return window.config.indexFilterWebinar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexLevelFilterBeginner", {
            get: function () {
                return window.config.indexLevelFilterBeginner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexLevelFilterIntermediate", {
            get: function () {
                return window.config.indexLevelFilterIntermediate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexLevelFilterAdvanced", {
            get: function () {
                return window.config.indexLevelFilterAdvanced;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexLevelFilterExpert", {
            get: function () {
                return window.config.indexLevelFilterExpert;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterModule", {
            get: function () {
                return window.config.indexFilterModule;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexFilterProject", {
            get: function () {
                return window.config.indexFilterProject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogLevelFilterBeginner", {
            get: function () {
                return window.config.catalogLevelFilterBeginner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogLevelFilterIntermediate", {
            get: function () {
                return window.config.catalogLevelFilterIntermediate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogLevelFilterAdvanced", {
            get: function () {
                return window.config.catalogLevelFilterAdvanced;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogLevelFilterExpert", {
            get: function () {
                return window.config.catalogLevelFilterExpert;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterExperiment", {
            get: function () {
                return window.config.catalogFilterExperiment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterApi", {
            get: function () {
                return window.config.catalogFilterApi;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterTutorial", {
            get: function () {
                return window.config.catalogFilterTutorial;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterCompetition", {
            get: function () {
                return window.config.catalogFilterCompetition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterCollection", {
            get: function () {
                return window.config.catalogFilterCollection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterSolution", {
            get: function () {
                return window.config.catalogFilterSolution;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterNotebook", {
            get: function () {
                return window.config.catalogFilterNotebook;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterClassroom", {
            get: function () {
                return window.config.catalogFilterClassroom;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterVideo", {
            get: function () {
                return window.config.catalogFilterVideo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterWebinar", {
            get: function () {
                return window.config.catalogFilterWebinar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterModule", {
            get: function () {
                return window.config.catalogFilterModule;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogFilterProject", {
            get: function () {
                return window.config.catalogFilterProject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogExperimentLongUrl", {
            get: function () {
                return window.config.catalogExperimentLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogApiLongUrl", {
            get: function () {
                return window.config.catalogApiLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogTutorialLongUrl", {
            get: function () {
                return window.config.catalogTutorialLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogCompetitionLongUrl", {
            get: function () {
                return window.config.catalogCompetitionLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogCollectionLongUrl", {
            get: function () {
                return window.config.catalogCollectionLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogSolutionLongUrl", {
            get: function () {
                return window.config.catalogSolutionLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogNotebookLongUrl", {
            get: function () {
                return window.config.catalogNotebookLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogModuleLongUrl", {
            get: function () {
                return window.config.catalogModuleLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogProjectLongUrl", {
            get: function () {
                return window.config.catalogProjectLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogClassroomLongUrl", {
            get: function () {
                return window.config.catalogClassroomLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogWebinarLongUrl", {
            get: function () {
                return window.config.catalogWebinarLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogVideoLongUrl", {
            get: function () {
                return window.config.catalogVideoLongUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexIndustryFilterUnspecified", {
            get: function () {
                return window.config.indexIndustryFilterUnspecified;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexIndustryFilterRetail", {
            get: function () {
                return window.config.indexIndustryFilterRetail;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexIndustryFilterManufacturing", {
            get: function () {
                return window.config.indexIndustryFilterManufacturing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexIndustryFilterBanking", {
            get: function () {
                return window.config.indexIndustryFilterBanking;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexIndustryFilterPublicSector", {
            get: function () {
                return window.config.indexIndustryFilterPublicSector;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexIndustryFilterHealthcare", {
            get: function () {
                return window.config.indexIndustryFilterHealthcare;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexVerticalFilterUnspecified", {
            get: function () {
                return window.config.indexVerticalFilterUnspecified;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexVerticalFilterHealthcare", {
            get: function () {
                return window.config.indexVerticalFilterHealthcare;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "indexVerticalFilterEnergy", {
            get: function () {
                return window.config.indexVerticalFilterEnergy;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogIndustryFilterUnspecified", {
            get: function () {
                return window.config.catalogIndustryFilterUnspecified;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogIndustryFilterRetail", {
            get: function () {
                return window.config.catalogIndustryFilterRetail;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogIndustryFilterManufacturing", {
            get: function () {
                return window.config.catalogIndustryFilterManufacturing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogIndustryFilterBanking", {
            get: function () {
                return window.config.catalogIndustryFilterBanking;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogIndustryFilterPublicSector", {
            get: function () {
                return window.config.catalogIndustryFilterPublicSector;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogIndustryFilterHealthcare", {
            get: function () {
                return window.config.catalogIndustryFilterHealthcare;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogVerticalFilterUnspecified", {
            get: function () {
                return window.config.catalogVerticalFilterUnspecified;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogVerticalFilterEngery", {
            get: function () {
                return window.config.catalogVerticalFilterEngery;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "catalogVerticalFilterHealthcare", {
            get: function () {
                return window.config.catalogVerticalFilterHealthcare;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseTutorialUrl", {
            get: function () {
                return window.config.browseTutorialUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseExperimentUrl", {
            get: function () {
                return window.config.browseExperimentUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseApiUrl", {
            get: function () {
                return window.config.browseApiUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseCompetitionUrl", {
            get: function () {
                return window.config.browseCompetitionUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseCollectionUrl", {
            get: function () {
                return window.config.browseCollectionUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseSolutionUrl", {
            get: function () {
                return window.config.browseSolutionUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseNotebookUrl", {
            get: function () {
                return window.config.browseNotebookUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseClassroomUrl", {
            get: function () {
                return window.config.browseClassroomUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseVideoUrl", {
            get: function () {
                return window.config.browseVideoUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseWebinarUrl", {
            get: function () {
                return window.config.browseWebinarUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseModuleUrl", {
            get: function () {
                return window.config.browseModuleUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseProjectUrl", {
            get: function () {
                return window.config.browseProjectUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "levelBeginnerLabel", {
            get: function () {
                return window.config.levelBeginnerLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "levelIntermediateLabel", {
            get: function () {
                return window.config.levelIntermediateLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "levelAdvancedLabel", {
            get: function () {
                return window.config.levelAdvancedLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "levelExpertLabel", {
            get: function () {
                return window.config.levelExpertLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "popularEntitiesSampleSet", {
            get: function () {
                return parseInt(window.config.popularEntitiesSampleSet);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "msftSmallLogoUrl", {
            get: function () {
                return window.config.msftSmallLogoUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "msftLargeLogoUrl", {
            get: function () {
                return window.config.msftLargeLogoUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "competitionIsEnabled", {
            get: function () {
                return window.config.competitionIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "userActivityIsEnabled", {
            get: function () {
                return window.config.userActivityIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "industryIsEnabled", {
            get: function () {
                return window.config.industryIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "verticalIsEnabled", {
            get: function () {
                return window.config.verticalIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "topContributorsIsEnabled", {
            get: function () {
                return window.config.topContributorsIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "stockImagesUrl", {
            get: function () {
                return window.config.stockImagesUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "collectionEnabled", {
            get: function () {
                return window.config.enableCollection === 'true';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "solutionIsEnabled", {
            get: function () {
                return window.config.solutionIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "notebookIsEnabled", {
            get: function () {
                return window.config.notebookIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "tutorialIsEnabled", {
            get: function () {
                return window.config.tutorialIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "autosuggestIsEnabled", {
            get: function () {
                return window.config.enableAutosuggest === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "webinarIsEnabled", {
            get: function () {
                return window.config.webinarIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "videoIsEnabled", {
            get: function () {
                return window.config.videoIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "classroomIsEnabled", {
            get: function () {
                return window.config.classroomIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "moduleIsEnabled", {
            get: function () {
                return window.config.moduleIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "projectIsEnabled", {
            get: function () {
                return window.config.projectIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "textBoyIsEnabled", {
            get: function () {
                return window.config.textBoyIsEnabled === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "searchResultsItemsReturned", {
            get: function () {
                return window.config.searchResultsItemsReturned;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "searchResultsQuery", {
            get: function () {
                var query = window.config.searchResultsQuery;
                var returnedItems = ConfigService.searchResultsItemsReturned.toString();
                return decodeURIComponent(query.replace("{0}", returnedItems));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "searchMinimumCharacters", {
            get: function () {
                return window.config.searchMinimumCharacters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "recommendationDisplayNumber", {
            get: function () {
                return parseInt((window.config.recommendationsDisplayNumber));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "featuredEntitiesId", {
            get: function () {
                return window.config.featuredEntitiesId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "featuredExperimentsId", {
            get: function () {
                return window.config.featuredExperimentsId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "featuredApisId", {
            get: function () {
                return window.config.featuredApisId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "featuredTutorialsId", {
            get: function () {
                return window.config.featuredTutorialsId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "featuredNotebooksId", {
            get: function () {
                return window.config.featuredNotebooksId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "featuredCompetitionsId", {
            get: function () {
                return window.config.featuredCompetitionsId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "featuredSolutionsId", {
            get: function () {
                return window.config.featuredSolutionsId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "featuredLearningsId", {
            get: function () {
                return window.config.featuredLearningId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "numberOfFixedFeaturedItems", {
            get: function () {
                return parseInt((window.config.numberOfFixedFeaturedItems));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "numberOfFeaturedItems", {
            get: function () {
                return parseInt((window.config.numberOfFeaturedItems));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "numberOfTopContributors", {
            get: function () {
                return parseInt((window.config.numberOfTopContributors));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "featuredItemsRotationDuration", {
            get: function () {
                return parseInt((window.config.featuredItemsRotationDuration));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "experimentsLandingPageUrl", {
            get: function () {
                return window.config.experimentsLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "apisLandingPageUrl", {
            get: function () {
                return window.config.apisLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "solutionsLandingPageUrl", {
            get: function () {
                return window.config.solutionsLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "notebooksLandingPageUrl", {
            get: function () {
                return window.config.notebooksLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "competitionsLandingPageUrl", {
            get: function () {
                return window.config.competitionsLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "tutorialsLandingPageUrl", {
            get: function () {
                return window.config.tutorialsLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "collectionsLandingPageUrl", {
            get: function () {
                return window.config.collectionsLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "modulesLandingPageUrl", {
            get: function () {
                return window.config.modulesLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "projectsLandingPageUrl", {
            get: function () {
                return window.config.projectsLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "learningLandingPageUrl", {
            get: function () {
                return window.config.learningLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "industryAllLandingPageUrl", {
            get: function () {
                return window.config.industryAllLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "industryRetailLandingPageUrl", {
            get: function () {
                return window.config.industryRetailLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "industryManufacturingLandingPageUrl", {
            get: function () {
                return window.config.industryManufacturingLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "industryPublicSectorLandingPageUrl", {
            get: function () {
                return window.config.industryPublicSectorLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "industryHealthcareLandingPageUrl", {
            get: function () {
                return window.config.industryHealthcareLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "industryBankingLandingPageUrl", {
            get: function () {
                return window.config.industryBankingLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "notebookCreationEnabled", {
            get: function () {
                return window.config.enableNotebookCreation === 'true';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "galleryTitle", {
            get: function () {
                return window.config.galleryTitle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "galleryHomePageUrl", {
            get: function () {
                return window.config.galleryHomePageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "browseLandingPageUrl", {
            get: function () {
                return window.config.browseLandingPageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "quickStartIsEnabled", {
            get: function () {
                return window.config.quickStartIsEnabled === 'true';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "quickStartUrl", {
            get: function () {
                return window.config.quickStartUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "galleryContributeUrl", {
            get: function () {
                return window.config.galleryContributeUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "topContributorsToIgnore", {
            get: function () {
                return window.config.topContributorsToIgnore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "tutorialContributeUrl", {
            get: function () {
                return window.config.tutorialContributeUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "defaultImageUrl", {
            get: function () {
                return window.config.defaultImageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "defaultCollectionImageUrl", {
            get: function () {
                return window.config.defaultCollectionImageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "servicesList", {
            get: function () {
                return ConfigService.decode(window.config.servicesList);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "languages", {
            get: function () {
                return ConfigService.decode(window.config.languages);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "timezones", {
            get: function () {
                return ConfigService.decode(window.config.timezones);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "countryRegions", {
            get: function () {
                return ConfigService.decode(window.config.countryRegions);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "infiniteScrollIsEnabled", {
            get: function () {
                return window.config.infiniteScrollIsEnabled === 'true';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigService, "likeButtonIsEnabled", {
            get: function () {
                return window.config.likeButtonIsEnabled === 'true';
            },
            enumerable: true,
            configurable: true
        });
        ConfigService.decode = function (value) {
            if (value) {
                value = decodeURIComponent(value);
            }
            return value;
        };
        ConfigService.statrun = ConfigService.constr();
        return ConfigService;
    })();
    return ConfigService;
});
