var Mobile = (function () {
    var isSetup = false;

    function resetDivs() {
        $('.entrance-scene, .section--desktop').remove();
        $('#intro, #navigation, .team, #recruitment, #main, .next-arrow').removeAttr("style");
        $('#logo').addClass('logo--mobile').css({
            opacity: 1
        });
    }

    function setupSmoothScroll() {
        $('.navigation__link').on('click', function (e) {
            e.preventDefault();
            $('.navigation').removeClass('navigation--visible');
            var id = $(this).attr('href');
            var pos = $(id).offset().top - 100;
            $('body, html').animate({
                scrollTop: pos
            });
        });
    }

    return {
        init: function () {
            if (isSetup) return;

            resetDivs();            
            setupSmoothScroll();
            isSetup = true;
        }
    }
})();