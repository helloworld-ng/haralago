window.onload = function () {
    var entranceScenes = [{
        play: function () {
            animate({
                el: $('#logo'),
                opacity: [0, 1],
                duration: 800,
                easing: "easeInBack"
            });

            animate({
                el: $('.entrance-scene__wrap'),
                opacity: [0, 1],
                translateY: ["100%", 0],
                duration: 1000,
                delay: 1000,
                easing: "easeInOutCubic"
            });

            animateEntranceScenes();

            function animateEntranceScenes() {
                var step = 0;
                var stepCount = 4;
                var stepMove = 100 / stepCount;
                var from, to;

                var loop = setInterval(function () {
                    from = (step * -stepMove) + "%";
                    to = ((step * -stepMove) - stepMove) + "%";

                    animate({
                        el: $('.entrance-slider__content'),
                        translateY: [from, to],
                        duration: 1000,
                        easing: "easeInOutExpo"
                    });

                    step++;

                    if (step == stepCount) {
                        window.clearInterval(loop);
                        entranceScenes[1].play();
                    }
                }, 3000);
            }
        }
    }, {
        play: function () {
            $('.entrance-scene__skip, .entrance-scene__divider').addClass('animated fadeOut longer');
            $("#logo")
                .addClass('logo--active')
                .animate({
                    left: "100px",
                }, 1500, "easeOutExpo", function () {
                    loadMainPage();
                });
        }
    }]

    var pageLoaded;
    var sections = ['services', 'servicesOverview', 'servicesBreakdown', 'servicesTestimonial', 'about', 'team', 'contact', 'apply', 'footer'];

    function setupOnePageScroll() {
        var currentIndex = 1;

        $('body, html').addClass('has-onepage');
        $("#main").onepage_scroll({
            responsiveFallback: 767,
            pagination: false,
            loop: false,
            beforeMove: function (index) {
                var toSection = sections[index - 1];
                var direction = index > currentIndex ? "down" : "up";
                setHeaderColor(toSection, direction);
                updateNavigation(index);
            },
            afterMove: function (index) {
                currentIndex = index;
                var section = sections[index - 1];
                pageEntranceAnimations[section]();
            }
        });
    }

    var activeService = 0;
    function setupNavigation() {
        $('[data-section]').click(function (e) {
            e.preventDefault();
            var index = $(this).data('section');
            $("#main").moveTo(index);
        })
    }

    function setupServices() {
        $('[data-service]').click(function (e) {
            e.preventDefault();
            activeService = $(this).data('service');
        })
    }

    function updateNavigation(index) {
        var navIndex;
        var services = [1, 2, 3, 4];

        if (services.indexOf(index) > -1) {
            navIndex = 1;
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

    var pageEntranceAnimations = (function () {
        return {
            start: function () {
                $('#intro').show();
                setTimeout(function () {
                    $('.next-arrow').show();
                    $("#navigation").addClass('animated time-1s fadeInUpSmall').show();
                }, 1000);
            },
            services: function () {},
            servicesOverview: function () {
                $('#services-overview-intro').show();
            },
            servicesBreakdown: function () {
                function setActive(index) {
                    activeService = index;
                    $('.service-slider__count span').text("0" + (index + 1));
                    $('.service-slide').removeClass('service-slide--active');
                    $('.service-slide').eq(index).addClass('service-slide--active');
                    $('.service-slider__control').removeClass('service-slider__control--active');
                    $('.service-slider__control').eq(index).addClass('service-slider__control--active');
                }

                setActive(activeService);
                $('.service-slider__control').unbind('click');
                $('.service-slider__control').unbind('mouseover');

                $('.service-slider__control').click(function () {
                    setActive($(this).data('index'));
                });
                $('.service-slider__control').on('mouseover', function () {
                    setActive($(this).data('index'));
                });
            },
            servicesTestimonial: function () {
                // $('#services-message').show();
            },
            about: function () {},
            team: function () {
                $('.team').show();
            },
            contact: function () {},
            apply: function () {
                $('#recruitment').show();
            },
            footer: function () {},
        }
    })();

    function setHeaderColor(elementId, direction) {
        var isGreen = $("#" + elementId).hasClass('section--green');
        var isBlue = $("#" + elementId).hasClass('section--blue');

        $('#header').attr('class', 'header');

        if (direction == 'down') $('#header').addClass('header--add-delay');
        if (isGreen) $('#header').addClass('header--green');
        if (isBlue) $('#header').addClass('header--blue');
    }

    function setPagination(elementId, direction) {
        $('#pagination').addClass('pagination--white');
    }

    function loadMainPage() {
        if (pageLoaded) return;

        $('.entrance-scene').remove();
        $('#main').show();

        pageEntranceAnimations.start();
        setupOnePageScroll();
        setupNavigation();
        setupServices();
        pageLoaded = true;
    }

    function resetDivsForMobile() {
        $('#intro, #navigation, .team, #recruitment, #main, .next-arrow').removeAttr("style");
        $('#logo').addClass('logo--mobile').css({
            opacity: 1
        });
    }

    function setupMobileNavigation() {
        $('.header-navigation-open').click(function () {
            $('.navigation').addClass('navigation--visible');
        });
        $('.navigation-close').click(function () {
            $('.navigation').removeClass('navigation--visible');
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

    function animateLogoIn() {
        $("#logo").addClass('logo--active').animate({
            opacity: 1,
            left: '100px'
        }, 1500, "easeOutExpo");
    }

    if (isMobile.phone) {
        $('.loader').remove();
        $('.entrance-scene').remove();
        resetDivsForMobile();
        setupSmoothScroll();
    } else {
        $('.loader').remove();
        // $('.entrance-scene').show();
        // entranceScenes[0].play();
        // $('#skip-entrance').click(function() {
        animateLogoIn();
        loadMainPage();
        // });
    }
};