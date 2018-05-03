define(["require", "exports", "jquery"], function (require, exports, $) {
    var BodyTagsModifierHelper = (function () {
        function BodyTagsModifierHelper() {
        }
        BodyTagsModifierHelper.setMetaTags = function (canonicalUrl, title, metaDescription) {
            if (metaDescription === void 0) { metaDescription = ""; }
            var headElement = $("head");
            if (canonicalUrl) {
                var canonicalElement = BodyTagsModifierHelper.findOrCreate(headElement, BodyTagsModifierHelper.canonicalUrlPath, BodyTagsModifierHelper.canonicalElementString);
                canonicalElement.attr("href", canonicalUrl);
            }
            if (title) {
                var titleElement = BodyTagsModifierHelper.findOrCreate(headElement, BodyTagsModifierHelper.titleUrlPath, BodyTagsModifierHelper.titleElementString);
                titleElement.text(title);
            }
            if (metaDescription) {
                var description = BodyTagsModifierHelper.findOrCreate(headElement, BodyTagsModifierHelper.descriptionUrlPath, BodyTagsModifierHelper.descriptionElementString);
                description.attr("content", metaDescription);
            }
        };
        BodyTagsModifierHelper.findOrCreate = function (head, childPath, elementString) {
            var childElement = head.find(childPath);
            if (!childElement.length) {
                head.append(elementString);
                childElement = head.find(childPath);
            }
            return childElement;
        };
        BodyTagsModifierHelper.canonicalUrlPath = "link[rel='canonical']";
        BodyTagsModifierHelper.canonicalElementString = "<link rel='canonical' href=''></link>";
        BodyTagsModifierHelper.titleUrlPath = "title";
        BodyTagsModifierHelper.titleElementString = "<title></title>";
        BodyTagsModifierHelper.descriptionUrlPath = "meta[name='description']";
        BodyTagsModifierHelper.descriptionElementString = "<meta name='description' content=''></meta>";
        return BodyTagsModifierHelper;
    })();
    exports.BodyTagsModifierHelper = BodyTagsModifierHelper;
});
