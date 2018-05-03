/// <reference path="../references.d.ts"/>
define(["require", "exports", "knockout", "lodash", "sammy", "history"], function (require, exports, ko, _, sammy, History) {
    var history = History || (window).History;
    var StateService = (function () {
        function StateService() {
        }
        StateService.setValue = function (params, state) {
            state = state || {};
            var currentUrl = history.getState().url;
            var queryParams = StateService.buildQueryParams(currentUrl);
            Object.keys(params).forEach(function (name) {
                var nameLowerCase = name.toLocaleLowerCase();
                var value = params[name];
                if (typeof value === "undefined" || value === null || value.length == 0) {
                    delete queryParams[nameLowerCase];
                }
                else {
                    if (typeof value !== "string") {
                        value = JSON.stringify(value);
                    }
                    if (queryParams[nameLowerCase] !== value) {
                        queryParams[nameLowerCase] = value;
                    }
                }
            });
            state.queryParams = queryParams;
            var newUrl = Object.getOwnPropertyNames(queryParams).map(function (propertyName) {
                return propertyName + "=" + encodeURIComponent(queryParams[propertyName]);
            }).join("&");
            if (newUrl) {
                newUrl = "?" + newUrl;
            }
            history.pushState(state, null, newUrl);
        };
        StateService.setUrl = function (url, state) {
            state = state || {};
            history.pushState(state, null, url);
        };
        StateService.getValueFromHistory = function (name) {
            var state = history.getState().data;
            return state[name];
        };
        StateService.getSearchText = function () {
            if (StateService.currentRoute().params) {
                return StateService.currentRoute().params().queryParams["s"];
            }
            return null;
        };
        StateService.addRoute = function (pattern, componentName, extraParamas) {
            sammy().get(pattern, function (context) {
                var pageData = history.getState().data;
                if (!pageData.queryParams) {
                    pageData.queryParams = StateService.buildQueryParams(context.path);
                }
                _.extend(pageData, { splat: context["splat"] });
                if (extraParamas) {
                    _.extend(pageData, extraParamas);
                }
                var newRoute = {
                    page: componentName,
                    pathParts: ko.observable(context.path.split("/").filter(function (n) { return n; }).map(function (n) { return n.toLowerCase(); })),
                    params: ko.observable(pageData)
                };
                if (newRoute.page === StateService.currentRoute().page) {
                    StateService.currentRoute().pathParts(newRoute.pathParts());
                    StateService.currentRoute().params(newRoute.params());
                }
                else {
                    StateService.currentRoute(newRoute);
                }
            });
        };
        StateService.run = function () {
            sammy().run();
        };
        StateService.buildQueryParams = function (url) {
            var m, re = StateService.urlParamsRe, urlParams = {};
            while ((m = re.exec(url)) != null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                var name = m[1].toLowerCase();
                urlParams[name] = decodeURIComponent(m[2]);
            }
            re.lastIndex = 0;
            return urlParams;
        };
        StateService.currentRoute = ko.observable({});
        StateService.urlParamsRe = /(?:\?|\&)([^=]+)\=([^&]+)/g;
        return StateService;
    })();
    return StateService;
});
