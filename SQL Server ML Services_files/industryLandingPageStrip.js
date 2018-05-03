/// <amd-dependency path="text!./industryLandingPageStrip.html" />
define(["require", "exports", "../../common/industryInfo", "text!./industryLandingPageStrip.html"], function (require, exports, industryInfo) {
    exports.template = require("text!./industryLandingPageStrip.html");
    var IndustryLandingPageStripViewModel = (function () {
        function IndustryLandingPageStripViewModel() {
            this.imageBlockClass = "image-container";
            this.title = "Find out how Azure AI is helping your industry";
            this.mdaSection = "main-industry-strip";
            this.industryInfos = industryInfo.IndustryInfo.getAllIndustries();
        }
        return IndustryLandingPageStripViewModel;
    })();
    exports.IndustryLandingPageStripViewModel = IndustryLandingPageStripViewModel;
    exports.viewModel = IndustryLandingPageStripViewModel;
});
