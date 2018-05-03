define(["require", "exports", "knockout"], function (require, exports, ko) {
    ko.bindingHandlers["rank"] = {
        init: function (element, valueAccessor) {
            var index = ko.utils.unwrapObservable(valueAccessor);
            element.textContent = TopContributorsViewModel.getRankString(index() + 1);
        }
    };
    var TopContributorsViewModel = (function () {
        function TopContributorsViewModel(params) {
            this.topContributors = ko.observableArray([]);
            this.title = "Recent Top Contributors";
            this.topContributors = params.topContributors;
        }
        TopContributorsViewModel.getRankString = function (index) {
            var secondDigit = Math.floor(index / 10) % 10;
            if (index % 10 === 1 && secondDigit !== 1) {
                return index + "st";
            }
            else if (index % 10 === 2 && secondDigit !== 1) {
                return index + "nd";
            }
            else if (index % 10 === 3 && secondDigit !== 1) {
                return index + "rd";
            }
            else {
                return index + "th";
            }
        };
        return TopContributorsViewModel;
    })();
    exports.TopContributorsViewModel = TopContributorsViewModel;
    exports.viewModel = TopContributorsViewModel;
});
