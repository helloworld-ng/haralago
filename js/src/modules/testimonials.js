var Testimonials = (function(){
    var currentSlide, lastIndex = 0;
    var slides, loop = null;
    var delay = 3000;

    function hide(slide) {
        slide.addClass('testimonial-slide--exiting');

        setTimeout(function(){
            slide.attr('class', 'testimonial-slide').hide();
        }, 2000);
    }

    function show(current) {
        var active = $('.testimonial-slide--active');
        if (active) hide(active);

        slides.eq(current).show().addClass('testimonial-slide--active');
    }

    function resetClasses() {
        slides.attr('class', 'testimonial-slide').hide();
        slides.eq(0).show().addClass('testimonial-slide--active');
    }

    return {
        init: function() {
            slides = $('.testimonial-slide');
            lastIndex = slides.length;            
        },
        play: function() {
            loop = setInterval(function () {
                currentSlide++;
                if (currentSlide === lastIndex) currentSlide = 0;
                show(currentSlide);
            }, delay);
        },
        reset: function() {
            console.log("reset")
            window.clearInterval(loop);
            loop = null;
            currentSlide = 0;
            resetClasses();
        }
    }
})();