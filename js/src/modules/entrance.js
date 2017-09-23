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
        $('#header').removeClass('header--loading').addClass('header--green');
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