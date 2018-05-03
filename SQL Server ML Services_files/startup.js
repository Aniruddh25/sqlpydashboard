define(["require", "exports", "jquery", "lodash", "knockout", "src/services/flowRecorder", "src/components/experiment-card/card", "../common/utilities", "../common/components", "../services/configService"], function (require, exports, $, _, ko, flowRecorder, card, utilities, components, configService) {
    card;
    components.list.forEach(components.register);
    ko.bindingHandlers['returnAction'] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).keydown(function (e) {
                if (e.which === 13) {
                    value.apply(viewModel);
                }
            });
        }
    };
    ko.bindingHandlers['class'] = {
        update: function (element, valueAccessor) {
            var currentValue = ko.utils.unwrapObservable(valueAccessor()), prevValue = element['__ko__previousClassValue__'], addOrRemoveClasses = function (singleValueOrArray, shouldHaveClass) {
                if (Object.prototype.toString.call(singleValueOrArray) === '[object Array]') {
                    ko.utils.arrayForEach(singleValueOrArray, function (cssClass) {
                        var value = ko.utils.unwrapObservable(cssClass);
                        ko.utils.toggleDomNodeCssClass(element, value, shouldHaveClass);
                    });
                }
                else if (singleValueOrArray) {
                    ko.utils.toggleDomNodeCssClass(element, singleValueOrArray, shouldHaveClass);
                }
            };
            addOrRemoveClasses(prevValue, false);
            addOrRemoveClasses(currentValue, true);
            element['__ko__previousClassValue__'] = currentValue.concat();
        }
    };
    ko.bindingHandlers["slideVisible"] = {
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            if (!value) {
                $(element).slideUp("fast");
            }
            else {
                $(element).slideDown("fast");
            }
        }
    };
    ko.bindingHandlers["trimmedValue"] = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            $(element).on("change", function () {
                var observable = valueAccessor();
                var trimedValue = $.trim($(this).val());
                observable($(this).val());
                observable(trimedValue);
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var trimedValue = $.trim((new String(value)).toString());
            $(element).val(trimedValue);
        }
    };
    ko.bindingHandlers["clicktrack"] = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            if (location.search.indexOf("showClickTargets") >= 0) {
                $(element).css("background-color", "pink").css("color", "black");
                $("<div style='top: 0px; left: 0px; background-color: yellow; color: black'/>").text(valueAccessor()).insertBefore($(element));
            }
            $(element).click(function (e) {
                flowRecorder.FlowRecorder.track(valueAccessor());
            });
        },
    };
    ko.bindingHandlers["dispose"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            if (typeof value === "function") {
                value = value.bind(viewModel);
                ko.utils.domNodeDisposal.addDisposeCallback(element, value);
            }
        }
    };
    ko.bindingHandlers['scrollTop'] = {
        init: function (element, valueAccessor) {
            var value = valueAccessor();
            if (typeof value === 'function') {
                element.addEventListener('scroll', _.debounce(function () {
                    requestAnimationFrame(function () {
                        value(element.scrollTop);
                    });
                }, 200));
            }
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            if (typeof value == 'number') {
                element.scrollTop = value;
            }
        }
    };
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (settings.url.indexOf(configService.catalogUrl) > -1 ||
                settings.url.indexOf(configService.indexUrl) > -1 ||
                settings.url.indexOf(configService.userActivityUrl) > -1) {
                xhr.setRequestHeader("x-ms-client-request-id", utilities.generateGuid());
            }
        }
    });
});
