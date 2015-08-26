var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('default', ['serve']);

gulp.task('index', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('public'));
});
gulp.task('index-watch', ['index'], browserSync.reload);

gulp.task('serve', ['index'], function () {
    browserSync({
        server: {
            baseDir: 'public'
        }
    });

    gulp.watch('src/index.html', ['index-watch']);
});