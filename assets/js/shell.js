/* globals jQuery, document */
(function($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function() {

        $(window).scroll(function() {
            var scrollerToTop = $('.back-top');
            document.documentElement.scrollTop + document.body.scrollTop > 200 ?
                scrollerToTop.fadeIn() :
                scrollerToTop.fadeOut();
		});
		

        // #back-top Button Event
        $("#backTop").on("click", function() {
            scrollToTop();
        });

        // highlight config
        hljs.initHighlightingOnLoad();

        // add archives year
        var yearArray = new Array();
        $(".archives-item").each(function() {
            var archivesYear = $(this).attr("date");
            yearArray.push(archivesYear);
        });
        var uniqueYear = $.unique(yearArray);
        for (var i = 0; i < uniqueYear.length; i++) {
            var html = "<div class='archives-item fadeInDown animated'>" +
                "<div class='archives-year'>" +
                "<h3><time datetime='" + uniqueYear[i] + "'>" + uniqueYear[i] + "</time></h3>" +
                "</div></div>";
            $("[date='" + uniqueYear[i] + "']:first").before(html);
        }
    });
})(jQuery);

function scrollToTop(name, speed) {
    if (!speed) speed = 300
    if (!name) {
        $('html,body').animate({
            scrollTop: 0
        }, speed)
    } else {
        if ($(name).length > 0) {
            $('html,body').animate({
                scrollTop: $(name).offset().top
            }, speed)
        }
    }
}
