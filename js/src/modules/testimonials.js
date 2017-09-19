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