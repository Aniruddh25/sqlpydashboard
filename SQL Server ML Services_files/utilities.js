define(["require", "exports", "../common/sharedTypes", "../services/configService"], function (require, exports, sharedTypes, configService) {
    var Utilities = (function () {
        function Utilities() {
        }
        Utilities.base64Encode = function (file) {
            var deferred = $.Deferred();
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                var resultMinusPrefix = reader.result.replace(/^.*?base64,/, "");
                deferred.resolve(resultMinusPrefix);
            };
            return deferred;
        };
        Utilities.generateGuid = function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        Utilities.httpsUrl = function (url) {
            return url.replace(/^http:\/\//i, "https://");
        };
        Utilities.escapeODataQuote = function (str) {
            return str ? encodeURIComponent(str.replace(/\'/g, "''")) : "";
        };
        Utilities.toCssClass = function (input) {
            var result = "";
            if (input) {
                result = input.trim().replace(/ /g, '-').toLowerCase();
            }
            return result;
        };
        Utilities.numberWithCommas = function (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        Utilities.upperFirst = function (input) {
            if (input) {
                return input.charAt(0).toUpperCase() + input.slice(1);
            }
            return input;
        };
        Utilities.getFullUrl = function (relativeUrl) {
            return configService.galleryHomePageUrl + relativeUrl;
        };
        Utilities.getCatalogLongUrlByEntityType = function (entityType) {
            switch (entityType) {
                case sharedTypes.EntityTypes.Api: {
                    return configService.catalogApiLongUrl;
                }
                case sharedTypes.EntityTypes.Collection: {
                    return configService.catalogCollectionLongUrl;
                }
                case sharedTypes.EntityTypes.Competition: {
                    return configService.catalogCompetitionLongUrl;
                }
                case sharedTypes.EntityTypes.Experiment: {
                    return configService.catalogExperimentLongUrl;
                }
                case sharedTypes.EntityTypes.Notebook: {
                    return configService.catalogNotebookLongUrl;
                }
                case sharedTypes.EntityTypes.SolutionAccelerator: {
                    return configService.catalogSolutionLongUrl;
                }
                case sharedTypes.EntityTypes.Tutorial: {
                    return configService.catalogTutorialLongUrl;
                }
                case sharedTypes.EntityTypes.Module: {
                    return configService.catalogModuleLongUrl;
                }
                case sharedTypes.EntityTypes.Classroom: {
                    return configService.catalogClassroomLongUrl;
                }
                case sharedTypes.EntityTypes.Webinar: {
                    return configService.catalogWebinarLongUrl;
                }
                case sharedTypes.EntityTypes.Video: {
                    return configService.catalogVideoLongUrl;
                }
                case sharedTypes.EntityTypes.Project: {
                    return configService.catalogProjectLongUrl;
                }
                default: {
                    return configService.catalogExperimentLongUrl;
                }
            }
        };
        Utilities.getEntityDetailsPathByEntityType = function (entityType) {
            switch (entityType) {
                case sharedTypes.EntityTypes.Api: {
                    return configService.apiDetailsPath;
                }
                case sharedTypes.EntityTypes.Collection: {
                    return configService.collectionDetailsPath;
                }
                case sharedTypes.EntityTypes.Competition: {
                    return configService.competitionDetailsPath;
                }
                case sharedTypes.EntityTypes.Experiment: {
                    return configService.experimentDetailsPath;
                }
                case sharedTypes.EntityTypes.Notebook: {
                    return configService.notebookDetailsPath;
                }
                case sharedTypes.EntityTypes.SolutionAccelerator: {
                    return configService.solutionDetailsPath;
                }
                case sharedTypes.EntityTypes.Tutorial: {
                    return configService.tutorialDetailsPath;
                }
                case sharedTypes.EntityTypes.Module: {
                    return configService.moduleDetailsPath;
                }
                case sharedTypes.EntityTypes.Classroom: {
                    return configService.classroomDetailsPath;
                }
                case sharedTypes.EntityTypes.Webinar: {
                    return configService.webinarDetailsPath;
                }
                case sharedTypes.EntityTypes.Video: {
                    return configService.videoDetailsPath;
                }
                case sharedTypes.EntityTypes.Project: {
                    return configService.projectDetailsPath;
                }
                default: {
                    return configService.experimentDetailsPath;
                }
            }
        };
        Utilities.displayNumberWithText = function (displayNumber, displayText, pluralForm) {
            return displayNumber.toString().concat(" ").concat(displayNumber > 1 ? Utilities.displayPluralText(displayText, pluralForm) : displayText);
        };
        Utilities.displayPluralText = function (displayText, pluralForm) {
            return pluralForm ? pluralForm : displayText.concat("s");
        };
        Utilities.navigateToGalleryUrl = function (navigationUrl) {
            window.location.href = navigationUrl;
            this.setConsent();
        };
        Utilities.setConsent = function () {
            var currentWindow = window;
            var mscc = currentWindow.mscc;
            if (mscc && !mscc.hasConsent()) {
                mscc.setConsent();
            }
        };
        return Utilities;
    })();
    return Utilities;
});
