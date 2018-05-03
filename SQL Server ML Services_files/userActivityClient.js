// DO NOT MODIFY THIS FILE OUTSIDE OF COMMUNITY COMMON BRANCH
/// <reference path="../definitions/jquery/jquery.d.ts"/>
var ActivityType;
(function (ActivityType) {
    ActivityType[ActivityType["Unknown"] = 0] = "Unknown";
    ActivityType[ActivityType["View"] = 1] = "View";
    ActivityType[ActivityType["Publish"] = 2] = "Publish";
    ActivityType[ActivityType["Comment"] = 3] = "Comment";
    ActivityType[ActivityType["Open"] = 4] = "Open";
    ActivityType[ActivityType["Clone"] = 5] = "Clone";
    ActivityType[ActivityType["Share"] = 6] = "Share";
    ActivityType[ActivityType["CompetitionSubmission"] = 7] = "CompetitionSubmission";
    ActivityType[ActivityType["CompetitionParticipation"] = 8] = "CompetitionParticipation";
    ActivityType[ActivityType["EntityCreated"] = 9] = "EntityCreated";
    ActivityType[ActivityType["EntityUpdated"] = 10] = "EntityUpdated";
    ActivityType[ActivityType["EntityLiked"] = 11] = "EntityLiked";
})(ActivityType || (ActivityType = {}));
var Activity = (function () {
    function Activity() {
    }
    return Activity;
})();
var UserActivityClient = (function () {
    function UserActivityClient(activityServiceUrl) {
        this.activityServiceUrl = activityServiceUrl;
    }
    UserActivityClient.prototype.view = function (entityId, userId, context) {
        this.postActivity(entityId, userId, context, ActivityType.View);
    };
    UserActivityClient.prototype.download = function (entityId, userId, context) {
        this.postActivity(entityId, userId, context, ActivityType.Open);
    };
    UserActivityClient.prototype.publish = function (entityId, userId, context) {
        this.postActivity(entityId, userId, context, ActivityType.Publish);
    };
    UserActivityClient.prototype.comment = function (entityId, userId, context) {
        this.postActivity(entityId, userId, context, ActivityType.Comment);
    };
    UserActivityClient.prototype.open = function (entityId, userId, context) {
        this.postActivity(entityId, userId, context, ActivityType.Open);
    };
    UserActivityClient.prototype.clone = function (entityId, userId, context) {
        this.postActivity(entityId, userId, context, ActivityType.Clone);
    };
    UserActivityClient.prototype.share = function (entityId, userId, context) {
        this.postActivity(entityId, userId, context, ActivityType.Share);
    };
    UserActivityClient.prototype.like = function (entityId, userId, context) {
        this.postActivity(entityId, userId, context, ActivityType.EntityLiked);
    };
    UserActivityClient.prototype.postActivity = function (entityId, userId, context, activityType) {
        var activity = new Activity();
        activity.EntityId = entityId;
        activity.UserId = userId;
        activity.Context = context;
        activity.ActivityType = activityType;
        $.ajax(this.activityServiceUrl + "/Add", {
            data: JSON.stringify(activity),
            contentType: "application/json",
            type: "POST"
        });
    };
    return UserActivityClient;
})();
