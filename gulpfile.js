/*eslint-env node */

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

// /* *************
//     HTML
// ************* */

var htmlFiles = ['*.html'];

gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('js/*.js')
        .pipe(connect.reload());
});

/* *************
    WATCH
************* */

var jsFiles = ['*.js'];

gulp.task('watch', function() {
    gulp.watch(jsFiles, ['js']);
    gulp.watch(htmlFiles, ['html']);
});

gulp.task('connect', function() {
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
