const {src, dest, task, watch, series, parallel} = require('gulp');

var browserSync = require('browser-sync').create();
var stylus = require('gulp-stylus');
var nib = require('nib');
var uglifycss = require('gulp-uglifycss');
var minify = require('gulp-minify');

function serve() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
}

function reload(cb) {
    browserSync.reload();
    cb();
}

function styles() {
    return src('./assets/stylus/style.styl')
        .pipe(stylus({use: nib()}))
        .pipe(dest('./assets/css'));
};

function css() {
    return src('./assets/css/*.css')
        .pipe(uglifycss({
            // "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(dest('./dist/'));
};

function js() {
    return  src('./app/**/*.js')
        .pipe(minify())
        .pipe(dest('./dist/'));
}

function watch_files(cb) {
    watch('./assets/stylus/**/*.styl', series(styles, reload));
    watch('./assets/css/*.css', series(css, reload));
    watch('./app/**/*.js', series(js, reload));
    cb();
}

task('styles', styles);
task('css', css);
task('js', js);
task('default', parallel(styles, css, js));
task('watch', parallel(serve, watch_files));