var AboutSlideShow = (function(){
    var currentSlideIndex = 0;
    var lastIndex = 0;
    var slides = null;
    var loop = null;

    function hide(slide) {
        slide.addClass('about-slideshow__image--exiting');
        setTimeout(function(){
            slide.removeClass('about-slideshow__image--active');
            slide.removeClass('about-slideshow__image--exiting');
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