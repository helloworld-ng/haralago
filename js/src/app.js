window.onload = function () {
    $('.loader').remove();

    if (isMobile.phone) {
        Mobile.init();
    } else {
        EntranceAnimation.play().then(Desktop.init);
    }

    Navigation.init();
    NewsletterSubscribe.init();
};