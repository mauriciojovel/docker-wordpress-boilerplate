var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
//js
var tap = require('gulp-tap');
var gutil = require('gulp-util');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');
var concat = require('gulp-concat');

// Config variables
var config = {
  styles: {
    input: './sass/**/*.scss',
    output: '../assets/css'
  },
  scripts: {
    input: [
      './js/*.js'
    ],
    output: '../assets/js'
  },
  sass: {
    errLogToConsole: true,
    outputStyle: 'compressed'
  },
  autoprefixer: {
    browsers: ['last 2 versions', '> 5%']    
  }
};

/*
 * Tasks
 */

// Sass
gulp.task('styles', function () {
  return gulp
    .src(config.styles.input)
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass).on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(config.styles.output));
});

// JS
gulp.task('js', function () {
  return gulp.src(config.scripts.input, {read: false})
    .pipe(tap(function (file) {
      gutil.log('bundling ' + file.path);
      file.contents = browserify(file.path, {debug: true}).bundle();
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('/maps'))
    //.pipe(concat('all.js'))
    .pipe(gulp.dest(config.scripts.output));
});

// Dev
gulp.task('dev', ['styles', 'js'], function() {
  gulp.watch(config.styles.input, ['styles']);
  gulp.watch(config.scripts.input, ['js']);
});


gulp.task('default', ['styles', 'js']);
