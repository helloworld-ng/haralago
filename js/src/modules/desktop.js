var Desktop = (function () {
    var setup = false;
    var lastSectionVisited, lastSectionExited = null;

    function setupOnePageScroll() {
        var currentIndex = 1;
    
        $('body, html').addClass('has-onepage');
        $("#main").onepage_scroll({
            responsiveFallback: 767,
            pagination: false,
            loop: false,
            beforeMove: function (index) {
                if (index == lastSectionExited) return;
                lastSectionExited = index;
                Sections.transition(index);
            },
            afterMove: function (index) {
                if (index == lastSectionVisited) return;
                lastSectionVisited = index;
                Sections.afterMove(index);
            }
        });
    }
    
    return {
        init: function () {
            if (setup) return;

            Sections.init();
            Navigation.init();
            Services.init();
            Testimonials.init();
            
            setupOnePageScroll();
            setup = true;
        }
    }
})();