/*eslint-env node */

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

// /* *************
//     TASKS
// ************* */

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src(['js/src/modules/*.js', 'js/src/app.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js/'))
        .pipe(connect.reload());
});

gulp.task('vendor', function () {
    gulp.src(['js/vendor/isMobile.min.js', 'js/vendor/jquery.js', 'js/vendor/*.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('js/'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('css/*.css')
        .pipe(connect.reload());
});

/* *************
    WATCH
************* */

var htmlFiles = ['*.html'];
var jsFiles = ['js/src/**/*.js'];
var vendorFiles = ['js/vendor/*.js'];
var cssFiles = ['css/*.css'];

gulp.task('watch', function () {
    gulp.watch(jsFiles, ['js']);
    gulp.watch(vendorFiles, ['vendor']);
    gulp.watch(cssFiles, ['css']);
    gulp.watch(htmlFiles, ['html']);
});

gulp.task('connect', function () {
    connect.server({
        root: './',
        port: 4500,
        livereload: true
    });
});


/* *************
    DEFAULT
************* */

gulp.task('default', ['connect', 'watch']);