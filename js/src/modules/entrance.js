var EntranceAnimation = (function () {
    var timer = null;
    var stepDelay = 2000;
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
                    el: $('#entrance-logo'),
                    opacity: [0, 1],
                    duration: 800,
                    easing: "easeInBack"
                });

                animate({
                    el: $('.entrance-scene__content'),
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

    function calculatePercentageDistanceFromPixel(val) {
        var pixelVal = val;
        var windowWidth = $(window).width();
        var percentVal = pixelVal / windowWidth * 100;
        return percentVal + "%";
    }

    function animateLogoToPosition() {
        var newPosition = calculatePercentageDistanceFromPixel(100);

        animate({
            el: $('#logo-wrap'),
            translateX: ["50%",newPosition],
            delay: 300,
            easing: "easeOutExpo",
            duration: "1500",
            complete: function() {
                showNavigation();
                setTimeout(resetLogoStyles, 500);
            }
        });
    }

    function resetLogoStyles() {
        $('#logo-wrap').attr('style', "").addClass('logo-wrap--active');
    }

    function showNavigation() {
        $('.next-arrow').show();
        $("#navigation").addClass('animated time-1s fadeInUpSmall').show();
    }

    function removeEntranceScene() {
        $('#entrance-header').fadeOut();
        $('#entrance-scene').fadeOut(function(){
            $('#entrance-scene, #entrance-header').remove();
            $('#header, #main').show();
        });
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
            removeEntranceScene();
            animateLogoToPosition();
        }
    }
})();