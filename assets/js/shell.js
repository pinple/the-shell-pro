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
        
        // add copy button
        AddCopyBtn()

        // add event listener
        var btns = document.querySelectorAll('.copy-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('mouseleave', clearTooltip);
            btns[i].addEventListener('blur', clearTooltip);
        }
		
        // #back-top Button Event
        $("#backTop").on("click", function() {
            scrollToTop();
        });

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

function AddCopyBtn(){
    var snippets = $('pre');
    [].forEach.call(snippets, function (snippet) {
        snippet.firstChild.insertAdjacentHTML('beforebegin',
            '<button class="copy-btn" data-clipboard-snippet><img class="clippy" width="13" src="/assets/imgs/clippy.svg" alt="Copy to clipboard"></button>');
    });
    var clipboardSnippets = new ClipboardJS('[data-clipboard-snippet]', {
        target: function (trigger) {
            return trigger.nextElementSibling;
        }
    });
    clipboardSnippets.on('success', function (e) {
        e.clearSelection();
        showTooltip(e.trigger, 'Copied!');
    });
    clipboardSnippets.on('error', function (e) {
        showTooltip(e.trigger, fallbackMessage(e.action));
    });
}

function clearTooltip(e) {
    e.currentTarget.setAttribute('class', 'copy-btn');
    e.currentTarget.removeAttribute('aria-label');
}

function showTooltip(elem, msg) {
    elem.setAttribute('class', 'copy-btn tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
}

function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
    } else {
        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    }
    return actionMsg;
}
hljs.initHighlightingOnLoad();