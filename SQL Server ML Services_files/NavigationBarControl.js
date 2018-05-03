(function ($) {
    $.azureMl = $.azureMl || {};
    $.azureMl.NavigationBarControl = function (options) {
        var element = options.element;
        // Initialize the navigation Bar controls
        var activeLink = element.find(".site-link-" + (options.site || "home"));
        activeLink.addClass("active");
        activeLink.find("a").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
        
        element.find(".feedback").feedbackControl(options.feedbackControlOptions);
        element.find(".help-search").helpSearch(options.helpSearchControlOptions);
        if (element.find(".timer").timerControl) {
            element.find(".timer").timerControl(options.timerControlOptions);
        }

        // Load the user's liveId image. The avatarUrl returns 404 if user hasn't set their image 
        if (options.userControl && options.userControl.avatarUrl) {
            var image = new Image();
            image.onload = function () {
                $(".user-info .profile-pic").attr("src", options.userControl.avatarUrl);
            }
            image.src = options.userControl.avatarUrl;
        }

        // Set the workspace selector state
        if (options.workspaceControl && options.workspaceControl.selectedWorkspaceId) {
            $(".workspace-" + options.workspaceControl.selectedWorkspaceId).addClass("active");
        }

        // TODO: A request was made to open/close the drop down menus on the navigation bar upon hover. This resulted in
        // a suboptimal experience since the hover surface is small a user would have to be very careful when interacting
        // with the menues (otherwise they'll close).  In addition, we didn't have a mechanism to keep the menu open when
        // a user click on it; without this, we can't ship this functionality.  
        // Leaving the following code commented out as we need to evaluate the next steps.

        //element.find(".navbar-right .dropdown").on(
        //{
        //    mouseenter: function() {
        //        $(this).addClass("open");
        //    },
        //    mouseleave: function() {
        //        $(this).removeClass("open");
        //    }
        //});
    };

    $.azureMl.NavigationBarControl.DefaultOptions = {

    };

    // Construct a plugin to handle the feedback
    $.fn.navigationBarControl = function (options, args) {
        return $.azureMl.jQueryPluginHelper.call(this, { name: "navigationBarControl", constructor: $.azureMl.NavigationBarControl }, options, args);
    };
})(jQuery);