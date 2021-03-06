$.i18n = $.i18n || {
    strings: {},   // here will be actual localized strings
    default: "en",
    lang: "en",

    init: function(applyOnReady, useGlobalization) {
        if(useGlobalization) {
            navigator.globalization.getPreferredLanguage(function(language) {
                    console.log("Device language is: " + language);
                    $.i18n.lang = language;
                    if( $.i18n.lang != $.i18n.default ) {
                        if($.i18n.strings[$.i18n.lang] == undefined) {
                            console.log("There is no localization data for " + language + " language, using default");
                            $.i18n.lang = $.i18n.default;
                        }
                    }
                    if(applyOnReady) $.i18n.apply();
                },
                function() {
                    console.log("Error determining device language, using default");
                    $.i18n.lang = $.i18n.default;
                    if(applyOnReady) $.i18n.apply();
                });
        } else {
            language = $.i18n.lang = navigator.language.split('-')[0];
            console.log("Device language is: " + language);

            if( $.i18n.lang != $.i18n.default ) {
                if($.i18n.strings[$.i18n.lang] == undefined) {
                    console.log("There is no localization data for " + language + " language, using default");
                    $.i18n.lang = $.i18n.default;
                }
            }

            if(applyOnReady) $.i18n.apply();
        }
    },

    get: function(tag) {
        if ( $.i18n.strings[$.i18n.lang] != undefined && $.i18n.strings[$.i18n.lang][tag] != undefined) {
            return $.i18n.strings[$.i18n.lang][tag];
        } else {
            return tag;
        }
    },

    apply: function() {
        var elements = $("[i18n]");
        for(var i = 0, len = elements.length; i < len; i++) {
            var el = $(elements[i]);
            var tag = el.attr("i18n");
            el.text($.i18n.get(tag));
        }
    }
};