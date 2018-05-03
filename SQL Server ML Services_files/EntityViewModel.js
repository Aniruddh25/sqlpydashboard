var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../common/sharedTypes", "../services/configService", "../common/BaseItemViewModel"], function (require, exports, sharedTypes, configService, CommonItemViewModel) {
    var EntityViewModel = (function (_super) {
        __extends(EntityViewModel, _super);
        function EntityViewModel(title, summary) {
            _super.call(this);
            this.item_count = 0;
            this.title = title;
            this.summary = summary;
        }
        Object.defineProperty(EntityViewModel.prototype, "isCollection", {
            get: function () {
                return this.entity_type === sharedTypes.EntityTypes.Collection;
            },
            enumerable: true,
            configurable: true
        });
        EntityViewModel.getEntityType = function (entityTypeString) {
            var entityTypeValue = Number(entityTypeString);
            if (isNaN(entityTypeValue)) {
                return EntityViewModel.convertToEnumEntityType(entityTypeString);
            }
            else {
                return EntityViewModel.convertEntityTypeValueToEnumEntityType(entityTypeValue);
            }
        };
        EntityViewModel.entityToViewModel = function (data) {
            var entityToViewModelMap = EntityViewModel.entityToViewModelMap, ownerToViewModelMap = EntityViewModel.ownerToViewModelMap, result = new EntityViewModel(data.name, data.summary);
            data.author = data.author || {};
            Object.keys(entityToViewModelMap).forEach(function (key) {
                result[key] = data[entityToViewModelMap[key]];
            });
            Object.keys(ownerToViewModelMap).forEach(function (key) {
                result[key] = data.owner[ownerToViewModelMap[key]];
            });
            result.entity_type = EntityViewModel.getEntityType(data.entity_type);
            if (result.entity_type === sharedTypes.EntityTypes.Classroom) {
                Object.keys(EntityViewModel.locationToViewModelMap).forEach(function (key) {
                    result[key] = data.location[EntityViewModel.locationToViewModelMap[key]];
                });
            }
            result.selfUri = data._links && data._links.self;
            result.owner_avatar_url = data.owner.avatar_url || "/images/fxs.avatarbar.default-avatar-small.png";
            result.imgUrl = data.image_url || (result.entity_type === sharedTypes.EntityTypes.Collection ? configService.defaultCollectionImageUrl : configService.defaultImageUrl);
            result.algorithmList = data.algorithms ? data.algorithms.join(', ') : "";
            result.isMsft = data.owner.id === configService.msftTenantId;
            result.hidden = false;
            return result;
        };
        EntityViewModel.buildEntityViewModelFromCatalog = function (data) {
            var result = EntityViewModel.entityToViewModel(data);
            Object.keys(EntityViewModel.catalogEntityToViewModelMap).forEach(function (key) {
                result[key] = data[EntityViewModel.catalogEntityToViewModelMap[key]];
            });
            if (data.sponsor) {
                Object.keys(EntityViewModel.sponsorToViewModelMap).forEach(function (key) {
                    result[key] = data.sponsor[EntityViewModel.sponsorToViewModelMap[key]];
                });
            }
            result.participant_count = result.participant_count || 0;
            result.isMsftSponsor = result.sponsor_id === configService.msftSponsorId;
            return result;
        };
        EntityViewModel.buildEntityViewModelFromIndex = function (data) {
            var result = EntityViewModel.entityToViewModel(data);
            Object.keys(EntityViewModel.indexEntityToViewModelMap).forEach(function (key) {
                result[key] = data[EntityViewModel.indexEntityToViewModelMap[key]];
            });
            if (data.competition_sponsor) {
                Object.keys(EntityViewModel.sponsorToViewModelMap).forEach(function (key) {
                    result[key] = data.competition_sponsor[EntityViewModel.sponsorToViewModelMap[key]];
                });
            }
            result.participant_count = result.participant_count || 0;
            result.isMsftSponsor = result.sponsor_id === configService.msftSponsorId;
            return result;
        };
        EntityViewModel.getEntityViewDetails = function (entityType) {
            switch (entityType) {
                case sharedTypes.EntityTypes.Experiment:
                    return {
                        categoryName: configService.categoryNameExperiment,
                        browseUrl: configService.browseExperimentUrl,
                        detailsUrl: configService.experimentDetailsPath,
                        iconSprite: "#experiment_card_category"
                    };
                case sharedTypes.EntityTypes.Api:
                    return {
                        categoryName: configService.categoryNameApi,
                        browseUrl: configService.browseApiUrl,
                        detailsUrl: configService.apiDetailsPath,
                        iconSprite: "#api_card_category"
                    };
                case sharedTypes.EntityTypes.Tutorial:
                    return {
                        categoryName: configService.categoryNameTutorial,
                        browseUrl: configService.browseTutorialUrl,
                        detailsUrl: configService.tutorialDetailsPath,
                        iconSprite: "#tutorial_card_category"
                    };
                case sharedTypes.EntityTypes.Competition:
                    return {
                        categoryName: configService.categoryNameCompetition,
                        browseUrl: configService.browseCompetitionUrl,
                        detailsUrl: configService.competitionDetailsPath,
                        iconSprite: "#competition_card_category"
                    };
                case sharedTypes.EntityTypes.Collection:
                    return {
                        categoryName: configService.categoryNameCollection,
                        browseUrl: configService.browseCollectionUrl,
                        detailsUrl: configService.collectionDetailsPath,
                        iconSprite: "#collection_card_category"
                    };
                case sharedTypes.EntityTypes.SolutionAccelerator:
                    return {
                        categoryName: configService.categoryNameSolution,
                        browseUrl: configService.browseSolutionUrl,
                        detailsUrl: configService.solutionDetailsPath,
                        iconSprite: "#accelerator_card_category"
                    };
                case sharedTypes.EntityTypes.Notebook:
                    return {
                        categoryName: configService.categoryNameNotebook,
                        browseUrl: configService.browseNotebookUrl,
                        detailsUrl: configService.notebookDetailsPath,
                        iconSprite: "#notebook_card_category"
                    };
                case sharedTypes.EntityTypes.Classroom:
                    return {
                        categoryName: configService.categoryNameClassroom,
                        browseUrl: configService.browseClassroomUrl,
                        detailsUrl: configService.classroomDetailsPath,
                        iconSprite: "#classroom_card_category"
                    };
                case sharedTypes.EntityTypes.Video:
                    return {
                        categoryName: configService.categoryNameVideo,
                        browseUrl: configService.browseVideoUrl,
                        detailsUrl: configService.videoDetailsPath,
                        iconSprite: "#video_training_card_category"
                    };
                case sharedTypes.EntityTypes.Webinar:
                    return {
                        categoryName: configService.categoryNameWebinar,
                        browseUrl: configService.browseWebinarUrl,
                        detailsUrl: configService.webinarDetailsPath,
                        iconSprite: "#live_online_card_category"
                    };
                case sharedTypes.EntityTypes.Module:
                    return {
                        categoryName: configService.categoryNameModule,
                        browseUrl: configService.browseModuleUrl,
                        detailsUrl: configService.moduleDetailsPath,
                        iconSprite: "#custom_modules_card_category"
                    };
                case sharedTypes.EntityTypes.Project:
                    return {
                        categoryName: configService.categoryNameProject,
                        browseUrl: configService.browseProjectUrl,
                        detailsUrl: configService.projectDetailsPath,
                        iconSprite: "#projects_card_category"
                    };
                default:
                    return {
                        categoryName: configService.categoryNameExperiment,
                        browseUrl: configService.browseExperimentUrl,
                        detailsUrl: configService.experimentDetailsPath,
                        iconSprite: "#experiment_card_category"
                    };
            }
        };
        EntityViewModel.convertToEnumEntityType = function (entityTypeString) {
            var result;
            switch (entityTypeString && entityTypeString.toLowerCase()) {
                case "experiment":
                    result = sharedTypes.EntityTypes.Experiment;
                    break;
                case "api":
                    result = sharedTypes.EntityTypes.Api;
                    break;
                case "tutorial":
                    result = sharedTypes.EntityTypes.Tutorial;
                    break;
                case "competition":
                    result = sharedTypes.EntityTypes.Competition;
                    break;
                case "collection":
                    result = sharedTypes.EntityTypes.Collection;
                    break;
                case "solutionaccelerator":
                    result = sharedTypes.EntityTypes.SolutionAccelerator;
                    break;
                case "notebook":
                    result = sharedTypes.EntityTypes.Notebook;
                    break;
                case "classroom":
                    result = sharedTypes.EntityTypes.Classroom;
                    break;
                case "video":
                    result = sharedTypes.EntityTypes.Video;
                    break;
                case "webinar":
                    result = sharedTypes.EntityTypes.Webinar;
                    break;
                case "module":
                    result = sharedTypes.EntityTypes.Module;
                    break;
                case "project":
                    result = sharedTypes.EntityTypes.Project;
                    break;
                default:
                    result = sharedTypes.EntityTypes.Experiment;
            }
            return result;
        };
        EntityViewModel.convertEntityTypeValueToEnumEntityType = function (entityTypeValue) {
            var result;
            switch (entityTypeValue) {
                case 1:
                    result = sharedTypes.EntityTypes.Experiment;
                    break;
                case 4:
                    result = sharedTypes.EntityTypes.Module;
                    break;
                case 5:
                    result = sharedTypes.EntityTypes.Competition;
                    break;
                case 6:
                    result = sharedTypes.EntityTypes.Api;
                    break;
                case 7:
                    result = sharedTypes.EntityTypes.Tutorial;
                    break;
                case 9:
                    result = sharedTypes.EntityTypes.Collection;
                    break;
                case 10:
                    result = sharedTypes.EntityTypes.SolutionAccelerator;
                    break;
                case 11:
                    result = sharedTypes.EntityTypes.Notebook;
                    break;
                case 12:
                    result = sharedTypes.EntityTypes.Classroom;
                    break;
                case 13:
                    result = sharedTypes.EntityTypes.Webinar;
                    break;
                case 14:
                    result = sharedTypes.EntityTypes.Video;
                    break;
                case 16:
                    result = sharedTypes.EntityTypes.Project;
                    break;
                default:
                    result = sharedTypes.EntityTypes.Experiment;
            }
            return result;
        };
        EntityViewModel.entityToViewModelMap = {
            'description': 'description',
            'updateDate': 'updated_at',
            'slugs': 'slugs',
            'algorithms': 'algorithms',
            'etag': 'etag',
            'tags': 'tags',
            'rating': 'rating',
            'comment_count': 'comment_count',
            'view_count': 'view_count',
            'download_count': 'download_count',
            'estimatedDuration': 'estimated_duration',
            'startDate': 'beginning_time',
            'endDate': 'ending_time',
            'level': 'level'
        };
        EntityViewModel.ownerToViewModelMap = {
            'owner_name': 'name',
            'owner_id': 'id'
        };
        EntityViewModel.indexEntityToViewModelMap = {
            'itemId': 'catalog_id',
            'item_count': 'collection_item_count',
            'endDate': 'competition_ending_time',
            'participant_count': 'competition_participantCount',
            'reward': 'competition_short_prize_summary',
        };
        EntityViewModel.catalogEntityToViewModelMap = {
            'itemId': 'id',
            'hidden': 'hidden',
            'item_count': 'item_count',
            'items': 'items',
            'participant_count': 'participant_count',
            'reward': 'reward_compact_summary'
        };
        EntityViewModel.sponsorToViewModelMap = {
            'sponsor_avatar_url': 'image_url',
            'sponsor_id': 'id',
            'sponsor_name': 'name',
            'sponsor_site_link': 'site_link'
        };
        EntityViewModel.locationToViewModelMap = {
            'streetAddress': 'street_address',
            'city': 'city',
            'stateProvince': 'state_province',
            'countryRegion': 'country_region',
            'zipCode': 'zip_code'
        };
        return EntityViewModel;
    })(CommonItemViewModel.BaseItemViewModel);
    exports.EntityViewModel = EntityViewModel;
});
