var AboutSlideShow = (function(){
    var currentSlideIndex = 0;
    var lastIndex = 0;
    var slides = null;
    var loop = null;

    function hide(slide) {
        setTimeout(function(){
            slide.removeClass('about-slideshow__image--active');
        }, 1000);
    }

    function show(slideIndex, callback) {
        var active = $('.about-slideshow__image--active');
        if (active) hide(active);

        slides.eq(slideIndex).addClass('about-slideshow__image--active');
        callback();
    }

    function resetClasses() {
        slides.attr('class', 'about-slideshow__image');
        slides.eq(0).show().addClass('about-slideshow__image--active');
    }

    return {
        init: function() {
            slides = $('.about-slideshow__image');
            lastIndex = slides.length - 1;            
            resetClasses();
        },
        play: function() {
            loop = window.requestInterval(function () {
                var nextSlideIndex = (currentSlideIndex === lastIndex) ? 0 : currentSlideIndex + 1;
                show(nextSlideIndex, function(){
                    currentSlideIndex = nextSlideIndex;
                });
            }, 3000);
        },
        reset: function() {
            window.clearRequestInterval(loop);
            loop = null;
            currentSlideIndex = 0;
            resetClasses();
        }
    }
})();
var Desktop = (function () {
    var setup = false;

    function setupOnePageScroll() {
        var currentIndex = 1;
    
        $('body, html').addClass('has-onepage');
        $("#main").onepage_scroll({
            responsiveFallback: 767,
            pagination: false,
            loop: false,
            beforeMove: function (index) {
                Sections.transition(index);
            },
            afterMove: function (index) {
                Sections.afterMove(index);
            }
        });
    }
    
    return {
        init: function () {
            if (setup) return;

            Sections.init();
            Services.init();
            Testimonials.init();
            AboutSlideShow.init();
            
            setupOnePageScroll();
            setup = true;
        }
    }
})();
var EntranceAnimation = (function () {
    var timer = null;
    var stepDelay = 3000;
    var stepCount = 4;

    var player = (function () {
        var loop = null;
        var callback = null;

        function loopScenes() {
            var step = 0;
            var stepMove = 100 / stepCount;
            var from, to;

            loop = requestInterval(function () {
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
                    endLoop(callback);
                }
            }, stepDelay);
        };

        function endLoop() {
            window.clearRequestInterval(loop);
            $('.entrance-scene__skip, .entrance-scene__divider').addClass('animated fadeOut longer');
            if (callback) callback();
        }

        return {
            run: function (cb) {
                callback = cb;

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
                    duration: 500,
                    delay: 500,
                    easing: "easeInOutCubic",
                    complete: function () {
                        loopScenes();
                    }
                });
            }
        }
    })();

    function animateLogoIn() {
        $("#logo").addClass('logo--active').animate({
            opacity: 1,
            left: '100px'
        }, 1500, "easeOutExpo");
    }

    function changeHeaderColor() {
        $('#header').addClass('header--green');
    }

    function showNavigation() {
        $('.next-arrow').show();
        $("#navigation").addClass('animated time-1s fadeInUpSmall').show();
    }

    function removeEntranceScene() {
        $('.entrance-scene').remove();
        $('#main').show();
    }

    return {
        play: function () {
            var self = this;
            $('.entrance-scene').show();

            timer = new Promise(function (resolve, reject) {
                player.run(function () {
                    resolve();
                });

                $('#skip-entrance').click(function () {
                    resolve();
                });
            }).then(function () {
                self.end();
            });

            return timer;
        },
        end: function () {
            changeHeaderColor();
            setTimeout(removeEntranceScene, 200);
            setTimeout(animateLogoIn, 500);
            setTimeout(showNavigation, 1000);
        }
    }
})();
var Mobile = (function () {
    var isSetup = false;

    function resetDivs() {
        $('.entrance-scene, .section--desktop').remove();
        $('#intro, #navigation, .team, #recruitment, #main, .next-arrow').removeAttr("style");
        $('#logo').addClass('logo--mobile').css({
            opacity: 1
        });
    }
    
    return {
        init: function () {
            if (isSetup) return;

            resetDivs();
            isSetup = true;
        }
    }
})();
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
        $('.navigation__link').on('click', function (e) {
            e.preventDefault();
            $('.navigation').removeClass('navigation--visible');
            var id = $(this).attr('href');
            var isSubscribeLink = $(this).attr('data-subscribe') != undefined;
            
            if (id) {
                var pos = $(id).offset().top - 100;
                $('body, html').animate({
                    scrollTop: pos
                }, function(){
                    if (isSubscribeLink) NewsletterSubscribe.show();
                });
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
var NewsletterSubscribe = (function(){
    var openButtons, closeButton, subscribeButton, backgrounds, modal, form;
    var form = {
        name: null,
        email: null
    }

    function validate() {
        var subscribeButtonIsActive = false;

        form.find('input').on('input', function(){
            form.name = $('#subscribe-name').val();
            form.email = $('#subscribe-email').val();

            if (!subscribeButtonIsActive && form.name && form.email) {
                subscribeButtonIsActive = true;
                subscribeButton.removeAttr('disabled');
            } else if (subscribeButtonIsActive && !form.name && !form.email) {
                subscribeButtonIsActive = false;
                subscribeButton.attr('disabled', true);
            }
        });
    }

    function onSubmit() {
        form.submit(function(e){
            e.preventDefault();
        
            subscribeButton.attr('disabled', true);
            form.find('input').attr('disabled', true);
            subscribeButton.html('Please wait...');
        
            var request = new Request('https://power-death.glitch.me/mailchimp', {
                method: 'POST',
                mode: 'cors',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    email_address: form.email,
                    status: "pending",
                    merge_fields: {
                        FNAME: form.name.split(" ")[0],
                        LNAME: form.name.split(" ")[1]
                    }
                })
            });
        
            fetch(request).then(function(response) {
                return response.json();
            }).then(function(response) {
                showSuccess();
            }).catch(function(){
                showSuccess(); // to change
            });
        })
    }

    function showSuccess() {
        $("#subscribe-default").hide();
        $("#subscribe-success").show();
    }

    function reset() {
        form.find('input').val('');
        $("#subscribe-default").show();
        $("#subscribe-success").hide();
        form.find('input').removeAttr('disabled');
        subscribeButton.html('Submit');
    }

    return {
        init: function() {
            openButtons = $('.subscribeTrigger');
            closeButton = $('#subscribeClose');
            subscribeButton = $('#subscribe-button');
            backgrounds = $('section').find('.container');
            modal = $('#newsletterSubscribe');
            form = $('#newsletterSubscribeForm');
            
            var self = this;
            openButtons.click(function(e){
                e.preventDefault();
                self.show();
            });       
            closeButton.click(function(e){
                e.preventDefault();
                self.hide();
            });

            validate();
            onSubmit();
        },
        show: function() {
            backgrounds.css({opacity: 0.2});
            modal.fadeIn(function(){
                form.find('input').eq(0).focus();
            });
        },
        hide: function() {           
            modal.fadeOut(function() {
                backgrounds.css({opacity: 1});
                reset();
            });
        }
    }
})();
var Sections = (function () {
    var current = 1;
    var ids = [];

    var entrances = (function () {
        return {
            servicesBreakdown: function () {
                Services.setActive();
            },
            servicesTestimonials: function() {
                Testimonials.play();
            },
            aboutSlideshow: function() {
                AboutSlideShow.play();
            }
        }
    })();
    
    var exits = (function () {
        return {
            servicesTestimonials: function() {
                Testimonials.reset();
            },
            aboutSlideshow: function() {
                AboutSlideShow.reset();
            }
        }
    })();

    function getInfo(id) {
        var div = $("#" + id);
        var section = {
            div: div,
            isGreen: div.hasClass('section--green'),
            isBlue: div.hasClass('section--blue'),
            isClear: div.hasClass('section--clear'),
            showPagination: div.is('[data-pagination]')
        }
        section.isColored = section.isGreen || section.isBlue;
        return section;
    }

    function setHeaderColor(elementId, direction) {
        var section = getInfo(elementId);
        $('#header').attr('class', 'header');

        if (direction == 'down') $('#header').addClass('header--add-delay');
        if (section.isGreen) $('#header').addClass('header--green');
        if (section.isBlue) $('#header').addClass('header--blue');
        if (section.isClear) $('#header').addClass('header--clear');
    }

    function setPagination(elementId, index) {
        var section = getInfo(elementId);
        if (section.showPagination) {
            $('#pagination').attr('class', 'pagination');
            if (section.isColored) $('#pagination').addClass('pagination--white');
        } else {
            $('#pagination').attr('class', 'hidden');
        }

        Navigation.update(index);
    }

    return {
        init: function () {
            var _sections = $("#main > section");
            ids = $.map(_sections, function (i) {
                return $(i).attr("id")
            });
        },
        transition: function (index) {
            var fromSection = ids[current - 1];
            var toSection = ids[index - 1];
            var direction = index > current ? "down" : "up";
            
            setHeaderColor(toSection, direction);
            setPagination(toSection, index);
            
            var exitFunction = exits[fromSection];
            if (exitFunction) setTimeout(exitFunction, 500);
        },
        afterMove: function (index) {
            current = index;
            var toSection = ids[index - 1];

            var entranceFunction = entrances[toSection];
            if (entranceFunction) entranceFunction();
        }
    }
})();
var Services = (function(){
    var active = 0;
    
    function init() {
        $('[data-service]').click(function (e) {
            e.preventDefault();
            active = $(this).data('service');
        })
    
        $('.service-slider__control').click(function () {
            setActive($(this).data('index'));
        });
    
        $('.service-slider__control').on('mouseover', function () {
            setActive($(this).data('index'));
        });

        setActive();
    }
    
    function setActive(index) {
        if (index !== undefined) active = index;
    
        $('.service-slider__count span').text("0" + (active + 1));
        $('.service-slide').removeClass('service-slide--active');
        $('.service-slide').eq(active).addClass('service-slide--active');
        $('.service-slider__control').removeClass('service-slider__control--active');
        $('.service-slider__control').eq(active).addClass('service-slider__control--active');
    }

    return {
        init: init,
        setActive: setActive
    }
})();
var Testimonials = (function(){
    var currentSlideIndex = 0;
    var lastIndex = 0;
    var slides = null;
    var loop = null;

    function hide(slide) {
        slide.addClass('testimonial-slide--exiting');

        setTimeout(function(){
            slide.attr('class', 'testimonial-slide').hide();
        }, 2000);
    }

    function show(slideIndex, callback) {
        var active = $('.testimonial-slide--active');
        if (active) hide(active);

        slides.eq(slideIndex).show().addClass('testimonial-slide--active');
        callback();
    }

    function resetClasses() {
        slides.attr('class', 'testimonial-slide').hide();
        slides.eq(0).show().addClass('testimonial-slide--active');
    }

    return {
        init: function() {
            slides = $('.testimonial-slide');
            lastIndex = slides.length - 1;            
            resetClasses();
        },
        play: function() {
            loop = window.requestInterval(function () {
                var nextSlideIndex = (currentSlideIndex === lastIndex) ? 0 : currentSlideIndex + 1;
                show(nextSlideIndex, function(){
                    currentSlideIndex = nextSlideIndex;
                });
            }, 3000);
        },
        reset: function() {
            window.clearRequestInterval(loop);
            loop = null;
            currentSlideIndex = 0;
            resetClasses();
        }
    }
})();
window.onload = function () {
    $('.loader').remove();

    if (isMobile.phone) {
        Mobile.init();
    } else {
        EntranceAnimation.play().then(Desktop.init);
    }

    Navigation.init();
    NewsletterSubscribe.init();

    $(window).bind('resize', function(e) {
        $('body').css({opacity: 0});
        this.location.reload(false); 
    });
};