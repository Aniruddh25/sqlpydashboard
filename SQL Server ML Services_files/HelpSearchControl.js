// Handler for the help search control inside the Navigation bar
(function ($) {
    $.azureMl = $.azureMl || {};

    $.azureMl.HelpSearch = function (options) {
        var keyCode = {
            ENTER: 13,
            UP: 38,
            DOWN: 40
        }
        options = $.extend({}, $.azureMl.HelpSearch.defaultOptions, options);
        var me = this;
        this.element = options.element;

        var searchInput = this.element.find(".search-input");
        var resultsDiv = this.element.find(".results");

        searchInput.autocomplete({
            minLength: 2,
            delay: 350,
            source: function (request, response) {
                $.getJSON(options.dataSource.replace("%QUERY", request.term), function(data, status, xhr) {
                    var result = $.map(data.QueryResults.slice(0, options.maxResults), function(item) {
                        return {
                            provider: item.ProviderInformation,
                            guid: item.GUID,
                            value: item.ModuleName,
                            label: item.ModuleName
                        }
                    });
                    resultsDiv.show();
                    resultsDiv.find(".header").html(options.templates.header(request.term));
                    response(result);

                    var op = result.length ? "hide" : "show";
                    resultsDiv.find(".empty")[op]();
                });
            },
            open: function ()
            {
                $(".ui-autocomplete").css({ top: "0px", width: "100%" });
            },
            select: function(event, ui)
            {
                resultsDiv.hide();
                var url = options.helpContentUrl + ui.item.guid;
                window.open(url, "_blank");
            }
        });

        // Since we are supporting hover to expand the search help menu and autocomplete appends the result UI to the body element, we need to move
        // the autocomplete result so that hovering over the result doesn't close the bootstrap menu.
        $(".ui-autocomplete").appendTo(".help-search-control .results");

        this.element.find(".empty").html(options.templates.empty);

        // Do not propagate the key events as Bootstrap 
        this.element.on({
            "keydown.autocomplete": function(event) {
                switch (event.keyCode) {
                    case keyCode.DOWN:
                    case keyCode.UP:
                        event.stopPropagation();
                        break;
                };
            }
        });

        this.element.find(".close").on("click", function () {
            resultsDiv.hide();
        });

        var instance = searchInput.data("ui-autocomplete") || searchInput.data("autocomplete"); // newer jquery-ui requires the "ui-" namespacing for widget data
        instance._renderMenu = function (ul, items) {
            var that = this;
            if (!items.length) {
                $("<li/>").html(options.templates.empty).appentTo($(ul));
                return;
            }

            $.each(items, function (index, item) {
                that._renderItem(ul, item);
            });
        }

        instance._renderItem = function( ul, item ) {
            return $("<li>")
                .data("item.autocomplete", item)
                .attr("data-value", item.value)
                .html(options.templates.suggestion(item))
              .appendTo( ul );
        }

        var closeControl = false;
        this.element.find(".form-element").on({
            click: function (e) {
                closeControl = false;
            }
        });

        this.element.on({
            'hide.bs.dropdown': function (e) {
                resultsDiv.hide();
                var result = closeControl;
                closeControl = true;
                return result;
            }
        });

        this.element.find(".launch-Guided-Tour").click(function(e) {
            options.launchGuidedTour();
            return false;
        });
    }

    $.azureMl.HelpSearch.defaultOptions = {
        templates: {
            header: function (searchTerm)
            {
                return [
                    "Search results for: <span class='searchTerm'>",
                    searchTerm,
                    "</span>"
                ].join('');
            },
            suggestion: function(item) {
                return [
                    "<a class='search-link' target='_blank' href='",
                    $.azureMl.HelpSearch.defaultOptions.helpContentUrl,
                    item.guid,
                    "' >",
                    item.label,
                    "</a>"
                ].join('');
            },
            empty: "<p> No Results found.</p>"
        },
        maxResults: 8,
        searchHomepage: "http://help.azureml.net",
        helpContentUrl: "http://help.azureml.net?topic=",
        launchGuidedTour: function() {
            return false;
        }
    }

    // Construct a plugin to handle the feedback
    $.fn.helpSearch = function (options, args) {
        return $.azureMl.jQueryPluginHelper.call(this, { name: "helpSearch", constructor: $.azureMl.HelpSearch }, options, args);
    }
})(jQuery);