var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../common/BaseItemViewModel"], function (require, exports, CommonItemViewModel) {
    var UserViewModel = (function (_super) {
        __extends(UserViewModel, _super);
        function UserViewModel(name) {
            _super.call(this);
            this.name = name;
        }
        UserViewModel.buildUserViewModelFromCatalog = function (data) {
            var userToViewModelMap = UserViewModel.userToViewModelMap, result = new UserViewModel(data.name);
            _.forEach(Object.keys(userToViewModelMap), function (key) { result[key] = data[userToViewModelMap[key]]; });
            result.selfUri = data._links ? (data._links && data._links.self) : undefined;
            result.navigateToProfile = "/Home/Author?authorId=" + result.itemId;
            return result;
        };
        UserViewModel.userToViewModelMap = {
            'name': 'name',
            'avatarUrl': 'avatar_url',
            'contributionScore': 'contribution_score',
            'itemId': 'id'
        };
        return UserViewModel;
    })(CommonItemViewModel.BaseItemViewModel);
    exports.UserViewModel = UserViewModel;
});
