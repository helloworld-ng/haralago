var Navigation = (function(){
    function setCurrentIndex(index) {
        var navIndex;
        var services = [1, 2, 3, 4];
        var about = [5, 6];
    
        if (services.indexOf(index) > -1) {
            navIndex = 1;
        } else if (about.indexOf(index) > -1) {
            navIndex = 5;
        } else {
            navIndex = index;
        }
    
        var navLink = $('.navigation__link[data-section="' + navIndex + '"]');
        if (navLink) {
            $('.navigation__link').removeClass('navigation__link--active');
            navLink.addClass('navigation__link--active');
        }
    
        // Move pagination scrubber
        var scrubber_distance = (index - (index > 3 ? 3 : 2)) * 14;
        $('.pagination__scrubber').css('transform', 'translateY(' + scrubber_distance + 'px)');
    }
    
    function setupMobile() {
        $('.header-navigation-open').click(function () {
            $('.navigation').addClass('navigation--visible');
        });
        $('.navigation-close').click(function () {
            $('.navigation').removeClass('navigation--visible');
        });
    }
    
    function setupDesktop() {
        $('[data-section]').click(function (e) {
            e.preventDefault();
            var index = $(this).data('section');
            $("#main").moveTo(index);
            setCurrentIndex(index);
        })
    }

    return {
        init: function() {
            if (isMobile.phone) {
                setupMobile();
            } else {
                setupDesktop();
            }
        },
        update: setCurrentIndex
    }
})();