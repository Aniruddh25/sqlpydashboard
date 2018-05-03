define(["require", "exports", "jquery"], function (require, exports, $) {
    function selectNavigationTab(tabClass) {
        $(".sub-navbar-menu .sub-navbar-elem").removeClass("active");
        $(".sub-navbar-elem-dropdown").removeClass("active");
        if (tabClass) {
            $(".sub-navbar-menu ." + tabClass).addClass("active");
        }
    }
    exports.selectNavigationTab = selectNavigationTab;
    function clearSearchBar() {
        $(".twitter-typeahead .tt-input").val("");
        $(".twitter-typeahead .tt-hint").val("");
    }
    exports.clearSearchBar = clearSearchBar;
});
