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