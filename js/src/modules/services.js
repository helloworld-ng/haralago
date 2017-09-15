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
    }
    
    function setActive(index) {
        if (index) active = index;
    
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