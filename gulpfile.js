var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifyCss = require('gulp-uglifycss');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
          baseDir: './'
        }
    });
});

gulp.task('watch', ['concat-min-js', 'sass'], function() {
    gulp.watch('assets/sass/**/*.scss', ['sass']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('assets/js/*.js', ['concat-min-js'], browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('assets/sass/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('concat-min-css', function() {
    return gulp.src('assets/css/*.css')
        .pipe(concat('all.min.css'))
        .pipe(uglifyCss())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('concat-min-js', function() {
    return gulp.src(['assets/js/*.js', '!./assets/js/all.min.js'])
        .pipe(concat('all.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('concat-min', ['concat-min-js', 'concat-min-css']);
