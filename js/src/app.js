window.onload = function () {
    $('.loader').remove();

    if (isMobile.phone) {
        Mobile.init();
    } else {
        // EntranceAnimation.play().then(Desktop.init);
        EntranceAnimation.end();
        Desktop.init();
    }
};