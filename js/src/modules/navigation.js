var Navigation = (function(){
    function setCurrentIndex(index) {
        var navIndex, paginationIndex;
        var services = [1, 2, 3, 4];
        var about = [5, 6];
    
        if (services.indexOf(index) > -1) {
            navIndex = 1;
            paginationIndex = 1;
        } else if (about.indexOf(index) > -1) {
            navIndex = 5;
            paginationIndex = 2;
        } else {
            navIndex = index;
            paginationIndex = index - 4;
        }
    
        var navLink = $('.navigation__link[data-section="' + navIndex + '"]');
        if (navLink) {
            $('.navigation__link').removeClass('navigation__link--active');
            navLink.addClass('navigation__link--active');
        }
        
        movePaginationScrubber(paginationIndex);
    }
    
    function movePaginationScrubber(index) {
        var scrubber_distance = index * 14;
        $('.pagination__scrubber').css('transform', 'translateY(' + scrubber_distance + 'px)');
    }

    function setupMobile() {
        $('.header-navigation-open').click(function (e) {
            e.preventDefault();
            $('.navigation').addClass('navigation--visible');
        });
        $('.navigation-close').click(function (e) {
            e.preventDefault();
            $('.navigation').removeClass('navigation--visible');
        });

        setupMobileNavigationClicks();
    }

    function setupMobileNavigationClicks() {
        $('a').on('click', function (e) {
            e.preventDefault();
            $('.navigation').removeClass('navigation--visible');
            var id = $(this).attr('href');
            var isSubscribeLink = $(this).attr('data-subscribe') != undefined;
            
            if ($(id).offset()) {
                var pos = $(id).offset().top - 100;
                $('body, html').animate({
                    scrollTop: pos
                }, function(){
                    if (isSubscribeLink) NewsletterSubscribe.show();
                });
            } else if (isSubscribeLink) {
                NewsletterSubscribe.show();
            }
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