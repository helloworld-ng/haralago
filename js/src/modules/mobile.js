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