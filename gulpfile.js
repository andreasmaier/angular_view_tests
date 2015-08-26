var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    clean = require('gulp-clean'),
    inject = require('gulp-inject'),
    mainBowerFiles = require('main-bower-files'),
    templateCache = require('gulp-angular-templatecache');

var indexHtml = 'src/index.html';

gulp.task('default', ['serve']);

gulp.task('clean-index', function () {
     return gulp.src('public/index.html', {read: false})
         .pipe(clean());
});
gulp.task('index', ['clean-index', 'inject-dependencies']);
gulp.task('index-watch', ['index'], browserSync.reload);
gulp.task('js-watch', ['js'], browserSync.reload);
gulp.task('template-watch', ['templates'], browserSync.reload);

gulp.task('clean-js', function () {
    return gulp.src('public/js', {read: false})
        .pipe(clean());
});
gulp.task('js', ['clean-js'], function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('public/js'));
});

gulp.task('inject-dependencies', ['templates', 'js'], function () {
    return gulp.src(indexHtml)
        .pipe(inject(gulp.src(mainBowerFiles(), {read: false}), {name: 'bower', ignorePath: 'public'}))
        .pipe(inject(gulp.src(['public/js/**/*.js', 'public/templates/**/*.js'], {read: false}), {ignorePath: 'public'}))
        .pipe(gulp.dest('public'));
});

gulp.task('clean-templates', function () {
    return gulp.src('public/templates', {read: false})
        .pipe(clean());
});
gulp.task('templates', ['clean-templates'], function () {
    return gulp.src('src/js/**/*.html')
        .pipe(templateCache({
            standalone: true,
            transformUrl: function (url) {
                return url.match(/[^\/]*$/);
            }
        }))
        .pipe(gulp.dest('public/templates'));
});

gulp.task('serve', ['index', 'templates'], function () {
    browserSync({
        server: {
            baseDir: 'public'
        }
    });

    gulp.watch(indexHtml, ['index-watch']);
    gulp.watch('src/js/**/*.js', ['js-watch']);
    gulp.watch('src/js/**/*.html', ['template-watch']);
});