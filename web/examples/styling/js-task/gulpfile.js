// Packages.
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');
var autoprefixer = require('gulp-autoprefixer');
var sassVariables = require('gulp-sass-variables');
const cleanCSS = require('gulp-clean-css');

// Paths.
var paths = {
  fonts: {
    input: [
      'node_modules/slick-carousel/slick/fonts/*'
    ],
    output: 'fonts/'
  },
  scripts: {
    input: [
      // Libraries
      'node_modules/jquery/dist/jquery.js',
      'node_modules/slick-carousel/slick/slick.js',
      'js/core.js'
    ],
    output: 'dist/',
    outputFilename: 'core.js'
  },
  styles: {
    input: [
      'node_modules/slick-carousel/slick/**/*.scss',
      'sass/**/*.scss'
    ],
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
    .pipe(sassVariables({'$slick-font-path': '../fonts/'}))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], remove: false, cascade: false }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.output));
});

// Scripts.
gulp.task('scripts', function() {
  gulp.src(paths.scripts.input)
    .pipe(concat(paths.scripts.outputFilename))
    .pipe(minify({
      ext:{
        src:'-debug.js',
        min:'.js'
      },
      ignoreFiles: ['.min.js', '-min.js']
    }))
    .pipe(gulp.dest(paths.scripts.output));
});

// Default
gulp.task('default', ['styles', 'scripts']);