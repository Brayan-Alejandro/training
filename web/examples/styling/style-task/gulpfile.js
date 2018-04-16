// Packages.
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Paths.
var paths = {
  fonts: {
    input: [
      'node_modules/font-awesome/fonts/*'
    ],
    output: 'fonts/'
  },
  styles: {
    input: 'sass/**/*.scss',
    output: 'css/'
  }
};

// Move fonts to current project.
gulp.task('fonts', function() {
  return gulp.src(paths.fonts.input)
    .pipe(gulp.dest(paths.fonts.output));
});

// Styles.
gulp.task('styles', function () {
  gulp.src(paths.styles.input)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], remove: false, cascade: false }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.output));
});

// Default
gulp.task('default', ['styles']);