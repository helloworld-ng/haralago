function winSize() {
    // returns an object with height and width of the window
    var win_size = {};
    if (self.innerHeight) {
        win_size.height = self.innerHeight;
        win_size.width = self.innerWidth;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        win_size.height = document.documentElement.clientHeight;
        win_size.width = document.documentElement.Width;
    } else if (document.body) {
        win_size.height = document.body.clientHeight;
        win_size.width = document.body.clientWidth;
    }
    return win_size;
}
var win_size = winSize();

// set indice "m" for mobile (max. 400px), "t" for tablet (max. 700px), "d" for desktop, according to window size
var dev_i = (win_size.width < 400) ? 'm' : ((win_size.width < 700) ? 't' : 'd');

// when Resize browser, check window-width; refresh if current device indice not initial device indice
window.addEventListener('resize', function (e) {
    var win_size2 = winSize();
    var dev_i2 = (win_size2.width < 400) ? 'm' : ((win_size2.width < 700) ? 't' : 'd');
    if (dev_i2 != dev_i) window.location.replace(window.location.href);
}, false);