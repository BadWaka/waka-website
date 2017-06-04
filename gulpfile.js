const gulp = require('gulp');
const gulpSass = require('gulp-sass');

// 编译 sass
gulp.task('sass', function () {
    return gulp.src('./static/**/*.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest('./static'));
});

// 监测文件改动, 自动编译 sass
gulp.task('sass:watch', function () {
    gulp.watch('./static/**/*.scss', ['sass']);
});