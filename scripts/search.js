!function (a) {
    var e = {};

    function i(t) {
        if (e[t]) return e[t].exports;
        var n = e[t] = {i: t, l: !1, exports: {}};
        return a[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports
    }

    i.m = a, i.c = e, i.d = function (a, e, t) {
        i.o(a, e) || Object.defineProperty(a, e, {configurable: !1, enumerable: !0, get: t})
    }, i.n = function (a) {
        var e = a && a.__esModule ? function () {
            return a.default
        } : function () {
            return a
        };
        return i.d(e, "a", e), e
    }, i.o = function (a, e) {
        return Object.prototype.hasOwnProperty.call(a, e)
    }, i.p = "", i(i.s = 20)
}({
    20: function (a, e) {
        $(document).ready(function () {
            var a = algolia;
            if (a.applicationID && a.apiKey && a.indexName) {
                var e = instantsearch({
                    appId: a.applicationID,
                    apiKey: a.apiKey,
                    indexName: a.indexName,
                    searchFunction: function (a) {
                        $("#algolia-search-input").find("input").val() && a.search()
                    }
                });
                [instantsearch.widgets.searchBox({
                    container: "#algolia-search-input",
                    placeholder: a.labels.input_placeholder
                }), instantsearch.widgets.hits({
                    container: "#algolia-hits",
                    hitsPerPage: a.hits.per_page || 10,
                    templates: {
                        item: function (a) {
                            return '<a href="' + (a.permalink ? a.permalink : siteMeta.root + a.path) + '" class="algolia-hit-item-link" style="color: lightseagreen;">' + a._highlightResult.title.value + "</a>"
                                + '<a class="algolia-hit-item-link" style="cursor: unset; font-size: 0.5rem; border-bottom: none; text-align: justify;">💁‍♂️&nbsp;' + a._highlightResult.excerpt.value.replace(/<\/?(?!em|\/em).+?\/?>/g, '') + '</a>';
                        }, empty: function (e) {
                            return '<div id="algolia-hits-empty">' + a.labels.hits_empty.replace(/\$\{query}/, e.query) + "</div>"
                        }
                    },
                    cssClasses: {item: "algolia-hit-item"}
                }), instantsearch.widgets.stats({
                    container: "#algolia-stats", templates: {
                        body: function (e) {
                            return a.labels.hits_stats.replace(/\$\{hits}/, e.nbHits).replace(/\$\{time}/, e.processingTimeMS) + '<span class="algolia-powered">  <img src="' + siteMeta.root + 'assets/algolia_logo.svg" alt="Algolia" /></span><hr />'
                        }
                    }
                }), instantsearch.widgets.pagination({
                    container: "#algolia-pagination",
                    scrollTo: !1,
                    showFirstLast: !1,
                    labels: {
                        first: '<i class="fa fa-angle-double-left"></i>',
                        last: '<i class="fa fa-angle-double-right"></i>',
                        previous: '<i class="fa fa-angle-left"></i>',
                        next: '<i class="fa fa-angle-right"></i>'
                    },
                    cssClasses: {
                        root: "pagination",
                        item: "pagination-item",
                        link: "page-number",
                        active: "current",
                        disabled: "disabled-item"
                    }
                })].forEach(e.addWidget, e), e.start(), $(".popup-trigger").on("click", function (a) {
                    a.stopPropagation(), $("body").append('<div class="search-popup-overlay algolia-pop-overlay"></div>').css("overflow", "hidden"), $(".popup").toggle(), $("#algolia-search-input").find("input").focus()
                }), $(".popup-btn-close").click(function () {
                    $(".popup").hide(), $(".algolia-pop-overlay").remove(), $("body").css("overflow", "")
                })
            } else window.console.error("Algolia Settings are invalid.")
        })
    }
});