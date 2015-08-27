var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    clean = require('gulp-clean'),
    inject = require('gulp-inject'),
    karmaServer = require('karma').Server,
    less = require('gulp-less'),
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
gulp.task('less-watch', ['less'], browserSync.reload);

gulp.task('clean-js', function () {
    return gulp.src('public/js', {read: false})
        .pipe(clean());
});
gulp.task('js', ['clean-js'], function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('public/js'));
});

gulp.task('inject-dependencies', ['copy-templates', 'js'], function () {
    return gulp.src(indexHtml)
        .pipe(inject(gulp.src(mainBowerFiles(), {read: false}), {name: 'bower', ignorePath: 'public'}))
        .pipe(inject(gulp.src(['public/js/**/*.js', 'public/templates/**/*.js'], {read: false}), {ignorePath: 'public'}))
        .pipe(gulp.dest('public'));
});

gulp.task('clean-gen-templates', function () {
    return gulp.src('gen/templates', {read: false})
        .pipe(clean());
});
gulp.task('clean-public-templates', function () {
    return gulp.src('public/templates', {read: false})
        .pipe(clean());
});
gulp.task('generate-templates', ['clean-gen-templates'], function () {
    return gulp.src('src/js/**/*.html')
        .pipe(templateCache({
            standalone: true,
            transformUrl: function (url) {
                return url.match(/[^\/]*$/);
            }
        }))
        .pipe(gulp.dest('src/gen'));
});
gulp.task('copy-templates', ['generate-templates', 'clean-public-templates'], function () {
    return gulp.src('src/gen/templates.js')
        .pipe(gulp.dest('public/templates'))
});

gulp.task('clean-css', function () {
    return gulp.src('public/style.css', {read: false})
        .pipe(clean());
});
gulp.task('less', function () {
    return gulp.src('src/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('public'));
});

gulp.task('build', ['index', 'copy-templates', 'less'], function () {

});

gulp.task('serve', ['build'], function () {
    browserSync({
        server: {
            baseDir: 'public'
        }
    });

    gulp.watch(indexHtml, ['index-watch']);
    gulp.watch('src/js/**/*.js', ['js-watch']);
    gulp.watch('src/js/**/*.html', ['template-watch']);
    gulp.watch('src/less/**/*.less', ['less-watch']);
});

gulp.task('karma-bower-inject', ['generate-templates'], function () {
    gulp.src('karma.conf.js')
        .pipe(inject(gulp.src(mainBowerFiles({
            filter: '**/*.js',
            includeDev: true,
            overrides: {
                "jquery": {
                    ignore: true
                }
            }
        }), {read: false}), {
            starttag: '//inject:bower',
            endtag: '//inject:end',
            transform: function (filepath, file, i, length) {
                return '"' + filepath.replace(/^\//, '') + '",';
            }
        }))
        .pipe(gulp.dest(''));
});

gulp.task('test', ['karma-bower-inject'], function (cb) {
    return new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, cb).start();
});