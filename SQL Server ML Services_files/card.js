define(["require", "exports", "../../common/EntityViewModel", "../../common/sharedTypes", "../../services/configService", "knockout", "lodash"], function (require, exports, CommonUX, sharedTypes, configService, ko, _) {
    var recalcEllipsis = function (element, longString) {
        var textLargerThanDiv = function (el, t) {
            $(el).text(t);
            while (el && (!el.clientHeight)) {
                el = $(el).parent()[0];
            }
            while (el && (!el.scrollHeight)) {
                el = $(el).parent()[0];
            }
            if (!el) {
                return false;
            }
            if (el.clientHeight < el.scrollHeight - 1) {
                return true;
            }
            return false;
        };
        if (!textLargerThanDiv(element, longString)) {
            return;
        }
        var ellipsis = "\u2026";
        var low = 0;
        var high = longString.length;
        var position = Math.floor(high / 2);
        var stringSlice = longString.slice(0, position);
        var leftCharBad = textLargerThanDiv(element, stringSlice + ellipsis);
        var rightCharBad = leftCharBad ? false : textLargerThanDiv(element, stringSlice + longString[position] + ellipsis);
        while (leftCharBad || !rightCharBad) {
            if (leftCharBad) {
                high = position;
                position = Math.floor(low + (high - low) / 2);
            }
            else if (!rightCharBad) {
                low = position;
                position = Math.floor(low + (high - low) / 2);
            }
            stringSlice = longString.slice(0, position);
            leftCharBad = textLargerThanDiv(element, stringSlice + ellipsis);
            rightCharBad = leftCharBad ? false : textLargerThanDiv(element, stringSlice + longString[position] + ellipsis);
            if (high - low <= 2) {
                break;
            }
        }
        $(element).text(stringSlice + ellipsis);
    };
    ko.bindingHandlers["ellipsisText"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            $(window).resize(_.debounce(function () {
                var text = ko.utils.unwrapObservable(valueAccessor);
                element.textContent = text();
                recalcEllipsis(element, text());
                if (allBindingsAccessor().afterEllipsisProcessor) {
                    allBindingsAccessor().afterEllipsisProcessor.bind(viewModel)(element, text());
                }
            }, 500));
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var text = ko.utils.unwrapObservable(valueAccessor);
            element.textContent = text();
            recalcEllipsis(element, text());
            if (allBindingsAccessor().afterEllipsisProcessor) {
                allBindingsAccessor().afterEllipsisProcessor.bind(viewModel)(element, text());
            }
        }
    };
    ko.bindingHandlers["onHover"] = {
        init: function (element, valueAccessor) {
            $(element).mouseenter(function () { valueAccessor()(true); });
            $(element).mouseleave(function () { valueAccessor()(false); });
        }
    };
    var CardViewModel = (function () {
        function CardViewModel(params) {
            var _this = this;
            this.cardStyleUrl = ko.observable("");
            this.imageClasses = ko.observableArray(["image-card", "screenShot", "image-card__invisible"]);
            this.collectionType = false;
            this.collectionCount = ko.observable("");
            this.mdaSection = 'strip';
            this.showSharingButton = ko.observable(false);
            if (!params) {
                this.atOwnerProfile = false;
                this.hideAuthor = false;
                this.isSponsor = false;
                this.setDefaultCategoryInfo(sharedTypes.EntityTypes.Experiment, "");
                return;
            }
            this.entity = params.experiment;
            this.galleryDomain = params.galleryDomain || "";
            this.enabletagsNavigation = params.enabletagsNavigation || true;
            this.enablealgorithmsNavigation = params.enablealgorithmsNavigation || true;
            this.isSponsor = !!this.entity.sponsor_name;
            this.hideAuthor = params.hideAuthor;
            this.atOwnerProfile = !!params.atOwnerProfile;
            this.editExperiment = params.editExperiment || _.noop;
            this.deleteExperiment = params.deleteExperiment || _.noop;
            this.navigateToProfile = "/Home/Author?authorId=" + this.entity.owner_id;
            this.navigateToSite = this.entity.sponsor_site_link;
            this.mdaSection = params.mdaSection || 'strip';
            this.entityId = this.entity.itemId;
            this.entityHidden = this.entity.hidden || false;
            this.title = this.entity.title;
            this.buildCategory(this.entity.entity_type, this.entity.getSlug());
            if (this.collectionType) {
                var collectionCount = (this.entity.item_count || 0) + " item";
                if (this.entity.item_count !== 1) {
                    collectionCount += "s";
                }
                this.collectionCount(collectionCount);
            }
            var loaderImg = $('<img/>');
            loaderImg.attr('src', this.val().imgUrl).load(function () {
                loaderImg.remove();
                _this.cardStyleUrl("url('" + _this.val().imgUrl + "')");
                _this.imageClasses.remove("image-card__invisible");
            });
            var duration = this.showDuration ? CardViewModel.toDurationString(this.entity.estimatedDuration) : "";
            var dateRange = this.showDateRange ? CardViewModel.toDateRangeString(this.entity.startDate, this.entity.endDate) : "";
            var location = this.showLocation ? CardViewModel.toLocationString(this.entity.city, this.entity.stateProvince) : "";
            this.subHeader = _.without([location, dateRange, duration], "").join(" | ");
            this.showSubHeader = ko.computed(function () { return _this.subHeader.length > 0; }, this);
        }
        CardViewModel.prototype.val = function () {
            return this.entity || { title: '', algorithmList: [], summary: '', imgUrl: '' };
        };
        CardViewModel.prototype.updateDate = function () {
            return CardViewModel.toTimeAgo(this.val().updateDate);
        };
        CardViewModel.prototype.endDate = function () {
            return CardViewModel.toTimeToGo(this.val().endDate);
        };
        CardViewModel.prototype.downloadCount = function () {
            return CardViewModel.toCountSummary(this.val().download_count);
        };
        CardViewModel.prototype.participantCount = function () {
            return CardViewModel.toCountSummary(this.val().participant_count);
        };
        CardViewModel.prototype.viewCount = function () {
            return CardViewModel.toCountSummary(this.val().view_count);
        };
        CardViewModel.prototype.getCanonicalDetailsUrl = function () {
            return configService.galleryHomePageUrl + this.detailsUrl;
        };
        CardViewModel.prototype.linkifyAlgos = function (element, text) {
            var _this = this;
            var $el = $(element);
            var algos = $el.text().split(', ');
            var originalAlgos = text.split(', ');
            $(element).html(_.map(_.filter(_.zip(algos, originalAlgos), function (algoPair) { return algoPair[0] && algoPair[1]; }), function (algoPair) { return "<a title='" + algoPair[1] + "' href='" + _this.galleryDomain + "/browse/?algorithms=[\"" + algoPair[1] + "\"]" + "'>" + algoPair[0] + "</a>"; }).join(', '));
        };
        CardViewModel.prototype.buildCategory = function (entityType, entitySlug) {
            this.setDefaultCategoryInfo(entityType, entitySlug);
            switch (entityType) {
                case sharedTypes.EntityTypes.Experiment:
                    break;
                case sharedTypes.EntityTypes.Api:
                    this.showDownloads = false;
                    this.showAlgos = false;
                    this.showViews = true;
                    this.showTimeAgo = true;
                    this.showReward = false;
                    this.showParticipants = false;
                    this.showTimeToGo = false;
                    break;
                case sharedTypes.EntityTypes.Tutorial:
                    this.showDownloads = false;
                    this.showAlgos = false;
                    this.showViews = true;
                    this.showTimeAgo = true;
                    this.showReward = false;
                    this.showParticipants = false;
                    this.showTimeToGo = false;
                    break;
                case sharedTypes.EntityTypes.Competition:
                    this.showDownloads = false;
                    this.showAlgos = false;
                    this.showViews = false;
                    this.showTimeAgo = false;
                    this.showReward = true;
                    this.showParticipants = true;
                    this.showTimeToGo = true;
                    break;
                case sharedTypes.EntityTypes.Collection:
                    this.showDownloads = false;
                    this.showAlgos = false;
                    this.collectionType = true;
                    break;
                case sharedTypes.EntityTypes.SolutionAccelerator:
                    this.showDownloads = true;
                    this.showAlgos = false;
                    break;
                case sharedTypes.EntityTypes.Notebook:
                    this.showAlgos = false;
                    break;
                case sharedTypes.EntityTypes.Classroom:
                    this.showDownloads = true;
                    this.showAlgos = false;
                    this.showTimeAgo = false;
                    this.showDateRange = true;
                    this.showLocation = true;
                    this.showLevel = true;
                    this.showTimeAgo = false;
                    break;
                case sharedTypes.EntityTypes.Video:
                    this.showDownloads = true;
                    this.showAlgos = false;
                    this.showDuration = true;
                    this.showLevel = true;
                    this.showTimeAgo = false;
                    break;
                case sharedTypes.EntityTypes.Webinar:
                    this.showDownloads = true;
                    this.showAlgos = false;
                    this.showDateRange = true;
                    this.showLevel = true;
                    this.showTimeAgo = false;
                    break;
                case sharedTypes.EntityTypes.Module:
                    this.showAlgos = false;
                    break;
                case sharedTypes.EntityTypes.Project:
                    this.showAlgos = false;
                    break;
            }
        };
        CardViewModel.prototype.setDefaultCategoryInfo = function (entityType, entitySlug) {
            var categoryDetails = CommonUX.EntityViewModel.getEntityViewDetails(entityType);
            this.svgSprite = categoryDetails.iconSprite;
            this.cardTypeName = categoryDetails.categoryName;
            this.categoryBrowseUrl = categoryDetails.browseUrl;
            this.detailsUrl = categoryDetails.detailsUrl.replace("{0}", entitySlug);
            this.showDownloads = true;
            this.showAlgos = this.val().algorithmList && this.val().algorithmList.length > 0;
            ;
            this.showViews = true;
            this.showTimeAgo = true;
            this.showReward = false;
            this.showParticipants = false;
            this.showTimeToGo = false;
            this.showDateRange = false;
            this.showDuration = false;
            this.showLocation = false;
            this.showLevel = false;
        };
        CardViewModel.toTimeAgo = function (dateString) {
            var dt = new Date(dateString);
            var secs = (((new Date()).getTime() - dt.getTime()) / 1000), days = Math.floor(secs / 86400);
            return days === 0 && (secs < 60 && "just now" ||
                secs < 120 && "a minute ago" ||
                secs < 3600 && Math.floor(secs / 60) + " minutes ago" ||
                secs < 7200 && "an hour ago" ||
                secs < 86400 && Math.floor(secs / 3600) + " hours ago") ||
                days === 1 && "yesterday" ||
                days < 31 && days + " days ago" ||
                days < 60 && "one month ago" ||
                days < 365 && Math.ceil(days / 30) + " months ago" ||
                days < 730 && "one year ago" ||
                Math.ceil(days / 365) + " years ago";
        };
        CardViewModel.toTimeToGo = function (dateString) {
            var currentDate = new Date();
            var dt = new Date(dateString);
            var secs = (dt.getTime() - currentDate.getTime()) / 1000, days = Math.floor(secs / 86400);
            return days === 0 && (secs < 0 && "ended " + this.toTimeAgo(dateString) ||
                secs < 60 && "ending now" ||
                secs < 120 && "ending in a minute" ||
                secs < 3600 && "ending in " + Math.floor(secs / 60) + " minutes" ||
                secs < 7200 && "ending in an hour" ||
                secs < 86400 && "ending in " + Math.floor(secs / 3600) + " hours") ||
                days < 0 && "ended " + this.toTimeAgo(dateString) ||
                days === 1 && "ending tomorrow" ||
                days < 31 && "ending in " + days + " days" ||
                days < 60 && "ending in a month" ||
                days < 365 && "ending in " + Math.ceil(days / 30) + " months" ||
                days < 730 && "ending in a year" ||
                "ending in " + Math.ceil(days / 365) + " years";
        };
        CardViewModel.toDurationString = function (duration) {
            return duration ? duration : "";
        };
        CardViewModel.toDateRangeString = function (startDate, endDate) {
            if (!startDate || !endDate) {
                return "";
            }
            var sd = new Date(startDate);
            var ed = new Date(endDate);
            if (sd.getUTCHours() > 12) {
                sd = new Date(sd.getTime() + 12 * 3600000);
            }
            if (ed.getUTCHours() > 12) {
                ed = new Date(ed.getTime() + 12 * 3600000);
            }
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
            if (sd.getUTCFullYear() !== ed.getUTCFullYear()) {
                return months[sd.getUTCMonth()] + " " + sd.getUTCDate() + ", " + sd.getUTCFullYear() + " - " + months[ed.getUTCMonth()] + " " + ed.getUTCDate() + ", " + ed.getUTCFullYear();
            }
            if (sd.getUTCMonth() !== ed.getUTCMonth()) {
                return months[sd.getUTCMonth()] + " " + sd.getUTCDate() + " - " + months[ed.getUTCMonth()] + " " + ed.getUTCDate() + ", " + ed.getUTCFullYear();
            }
            if (sd.getUTCDate() !== ed.getUTCDate()) {
                return months[sd.getUTCMonth()] + " " + sd.getUTCDate() + " - " + ed.getUTCDate() + ", " + ed.getUTCFullYear();
            }
            return months[sd.getUTCMonth()] + " " + sd.getUTCDate() + ", " + sd.getUTCFullYear();
        };
        CardViewModel.toLocationString = function (city, stateProvince) {
            var result = "";
            if (city) {
                result += city;
                if (stateProvince) {
                    result += ", ";
                }
            }
            if (stateProvince) {
                result += stateProvince;
            }
            return result;
        };
        CardViewModel.toCountSummary = function (count) {
            if (count < 1000) {
                return count.toString();
            }
            var abbrForThousand = "K";
            var tempCount = Math.floor(count / 100);
            var result = tempCount / 10;
            if (count >= 1000 && count < 10000 && tempCount % 10 !== 0) {
                return result + abbrForThousand;
            }
            return Math.floor(result) + abbrForThousand;
        };
        return CardViewModel;
    })();
    exports.CardViewModel = CardViewModel;
    exports.viewModel = CardViewModel;
});
