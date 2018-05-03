// Handler for the provide feedback control in the navigation bar
(function ($) {
    $.azureMl = $.azureMl || {};
    $.azureMl.FeedbackControl = function (options) {
        var me = this;

        options = $.extend({}, $.azureMl.FeedbackControl.defaultOptions, options);
        var element = options.element;
        this.textInput = element.find(".text-input");
        this.characterCount = element.find(".count");

        function updateCharacterCountAndSubmitButton() {
            var charactersUsed = me.textInput.val().length;
            me.characterCount.text(options.maxCharacters - charactersUsed);
            var method = (charactersUsed > 0) ? "removeClass" : "addClass";
            element.find(".submit")[method]("disabled");
        }

        this.textInput.attr("maxlength", options.maxCharacters);

        this.textInput.on({
            "keyup change": function () {
                updateCharacterCountAndSubmitButton();
            },
            "paste" : function() {
                window.setTimeout(function() {
                    updateCharacterCountAndSubmitButton();
                }, 1);
            }
        });
        element.find(".prompt").html(options.strings.whatDidYouLike);

        element.find("input").on({
            change: function() {
                var dataType = $(this).data("feedback-type");
                var promptString = (dataType === "smile") ? options.strings.whatDidYouLike : options.strings.whatCanWeImprove;
                element.find(".prompt").html(promptString);
            }
        });

        element.find(".submit").on({
            click: function () {
                if (me._submitInProgress) {
                    return;
                }
                me._submitInProgress = true;

                var feedback = me.textInput.val();
                var feedbackType = $(".feedback-type-controls [type=radio]:checked");

                if (!(feedback || feedbackType.length)) {
                    return; // nothing to submit;
                }

                var encodedFeedback = $("<div/>").text(feedback).html();
                var result = {
                    feedback: encodedFeedback,
                    src: 'feedbackBox',
                    isHappy: feedbackType.data("feedback-type") === 'smile'
                }

                //reset the fields
                me.textInput.val('');
                if (!result.isHappy) {
                    feedbackType.prop("checked", false);
                    feedbackType.parent().removeClass("active");

                    $(".smile").addClass("active");
                    $(".smile input").attr("checked", "checked");
                }
                updateCharacterCountAndSubmitButton();

                if (options.sendFeedbackHandler && typeof (options.sendFeedbackHandler) === 'function') {
                    options.sendFeedbackHandler(result);
                }

                delete me._submitInProgress;
            }
        });

        // The following overrides the bootstrap behavior that closes a dropdown menu when clicks anywhere in the menu.
        var closeControl = false;
        element.find(".form-element").on({
            click: function () {
                closeControl = false;
            }
        });

        element.on({
            'hide.bs.dropdown': function () {
                var result = closeControl;
                closeControl = true;
                return result;
            }
        });
    }

    $.azureMl.FeedbackControl.defaultOptions = {
        maxCharacters: 1000
    };

    // Construct a plugin to handle the feedback
    $.fn.feedbackControl = function (options, args) {
        return $.azureMl.jQueryPluginHelper.call(this, { name: "feedbackControl", constructor: $.azureMl.FeedbackControl }, options, args);
    }
})(jQuery);