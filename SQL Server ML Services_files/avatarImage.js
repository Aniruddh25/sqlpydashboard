define(["require", "exports", "knockout", "../../services/configService", "../../common/utilities"], function (require, exports, ko, configService, utilities) {
    var msftSmallLogo = configService.msftSmallLogoUrl, msftLargeLogo = configService.msftLargeLogoUrl;
    var AvatarImage = (function () {
        function AvatarImage(params) {
            var _this = this;
            this.imgSrc = ko.observable("/Images/fxs.avatarbar.default-avatar-small.png");
            this.authorUrl = "#";
            this.isMsft = ko.observable(false);
            this.backgroundColor = ko.observable(AvatarImage.colorSwatches[0]);
            this.initials = ko.observable("");
            this.showTextBoy = ko.observable(false);
            if (params.isMsft) {
                params.imgSrc = !!params.useLargeLogo ? msftLargeLogo : msftSmallLogo;
                this.isMsft(true);
            }
            if (AvatarImage.showAvatar(params.imgSrc, params.name)) {
                var image = new Image();
                image.onload = function () {
                    _this.showTextBoy(false);
                    _this.imgSrc(params.imgSrc);
                };
                image.onerror = function () {
                    if (params.name && params.name.trim().length > 0) {
                        _this.showTextBoy(true);
                        _this.computeInitialsAndColor(params.name);
                    }
                };
                image.src = params.imgSrc;
            }
            else {
                this.showTextBoy(true);
                this.computeInitialsAndColor(params.name);
            }
            if (params.url) {
                this.authorUrl = params.url;
            }
        }
        AvatarImage.prototype.onClick = function () {
            utilities.navigateToGalleryUrl(this.authorUrl);
        };
        AvatarImage.showAvatar = function (image, name) {
            if (configService.textBoyIsEnabled) {
                if ((image && image.toLowerCase() !== AvatarImage.DefaultAvatarImage && image.toLowerCase() !== AvatarImage.TestAvatarImage)
                    || name == null || name.trim().length == 0) {
                    return true;
                }
                return false;
            }
            return true;
        };
        AvatarImage.prototype.computeInitialsAndColor = function (displayName) {
            var name = "";
            if (displayName && displayName.length > 0) {
                var personaName = displayName.replace(AvatarImage.CharsWithinParenthesisRegex, "");
                personaName = personaName.replace(AvatarImage.AlphanumericCharsRegex, "");
                personaName = personaName.replace(AvatarImage.MultipleWhiteSpacesRegexToken, " ");
                personaName = personaName.trim();
                var splits = personaName.split(' ');
                if (splits.length == 2) {
                    name += splits[0].charAt(0).toUpperCase();
                    name += splits[1].charAt(0).toUpperCase();
                }
                else if (splits.length == 3) {
                    name += splits[0].charAt(0).toUpperCase();
                    name += splits[2].charAt(0).toUpperCase();
                }
                else if (splits.length != 0) {
                    name += splits[0].charAt(0).toUpperCase();
                }
                this.initials(name);
                this.backgroundColor(AvatarImage.computeBackgroundColor(displayName));
            }
        };
        AvatarImage.computeBackgroundColor = function (name) {
            var hashCode = 0;
            for (var iLen = name.length - 1; iLen >= 0; iLen--) {
                var ch = name.charCodeAt(iLen);
                var shift = iLen % 8;
                hashCode ^= (ch << shift) + (ch >> (8 - shift));
            }
            return AvatarImage.colorSwatches[hashCode % AvatarImage.colorSwatches.length];
        };
        AvatarImage.DefaultAvatarImage = "/images/fxs.avatarbar.default-avatar-small.png";
        AvatarImage.TestAvatarImage = "https://az712634.vo.msecnd.net/assets/v2/genericuser.png";
        AvatarImage.colorSwatches = [
            "rgb(153, 180, 51)",
            "rgb(107, 165, 231)",
            "rgb(231, 115, 189)",
            "rgb(0, 163, 0)",
            "rgb(30, 113, 69)",
            "rgb(255, 0, 151)",
            "rgb(126, 56, 120)",
            "rgb(96, 60, 186)",
            "rgb(29, 29, 29)",
            "rgb(0, 171, 169)",
            "rgb(45, 137, 239)",
            "rgb(43, 87, 151)",
            "rgb(218, 83, 44)",
            "rgb(185, 29, 71)",
            "rgb(238, 17, 17)",
        ];
        AvatarImage.CharsWithinParenthesisRegex = new RegExp("\\(([^)]*)\\)", "gi");
        AvatarImage.AlphanumericCharsRegex = new RegExp("[^ A-Za-z0-9]", "gi");
        AvatarImage.MultipleWhiteSpacesRegexToken = new RegExp("\\s+", "gi");
        return AvatarImage;
    })();
    exports.AvatarImage = AvatarImage;
    exports.viewModel = AvatarImage;
});
