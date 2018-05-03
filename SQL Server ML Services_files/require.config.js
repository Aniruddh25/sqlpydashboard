// require.js looks for the following global when initializing
var require = {
    baseUrl: "/",
    paths: {
        "bootstrap":            "https://ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/bootstrap.min",
        "sammy":                "/src/bower_modules/sammy/lib/sammy",
        "history":              "/src/bower_modules/history.js/scripts/bundled/html5/native.history",
        "jquery":               "/src/bower_modules/jquery/dist/jquery",
        "knockout":             "/src/bower_modules/knockout/dist/knockout",
        "knockout-projections": "/src/bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "/src/bower_modules/js-signals/dist/signals.min",
        "text":                 "/src/bower_modules/requirejs-text/text",
        "slick":                "/src/bower_modules/slick.js/slick/slick.min",
        "lodash":               "/src/bower_modules/lodash/dist/lodash",
        "markdown-converter":   "https://az712634.vo.msecnd.net/src/pagedown_v1/markdown-converter",
        "markdown-sanitizer":   "https://az712634.vo.msecnd.net/src/pagedown_v1/markdown-sanitizer",
        "markdown-editor":      "/src/bower_modules/pagedown/markdown-editor",
        "jQueryPluginHelper":   "/../Scripts/NavigationBar/jQueryPluginHelper",
        "HelpSearchControl":    "/../Scripts/NavigationBar/HelpSearchControl",
        "FeedbackControl":      "/../Scripts/NavigationBar/FeedbackControl",
        "NavigationBarControl": "/../Scripts/NavigationBar/NavigationBarControl",
        "typeaheadModule":       "/src/bower_modules/typeahead/dist/typeahead"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        "jQueryPluginHelper": { deps: ["jquery"] },
        "HelpSearchControl": { deps: ["jquery"] },
        "FeedbackControl": { deps: ["jquery"] },
        "NavigationBarControl": { deps: ["jquery"] },
        "knockout": {
            deps: ["jquery", "bootstrap"]
        },
        'sammy': {
            deps: ['jquery'],
            exports: 'Sammy'
        },
        "history": { deps: ['knockout'], },
        "knockout-projections": { deps: ['knockout'], },
        "text": { deps: ['knockout', 'bootstrap'], },
        "markdown-sanitizer": {
            deps: ["markdown-converter"],
            exports: "markdown-sanitizer"
        },
        "markdown-editor": {
            deps: ["markdown-sanitizer"],
            exports: "markdown-editor"
        },
        "typeaheadModule": { deps: ["jquery"] }
    }
};
