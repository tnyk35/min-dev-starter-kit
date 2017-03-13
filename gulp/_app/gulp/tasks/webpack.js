var
  gulp = require('gulp'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  webpack = require('gulp-webpack'),
  config = require('../config.js'),
  requireDir = require('require-dir');

/**
 * webpack
 * JSを変換する
 */
gulp.task('webpack', function () {
  gulp.src(config.js.src)
    .pipe(webpack(config.js.webpack))
    .pipe(gulpif(config.js.uglify, uglify()))
    .pipe(gulp.dest(config.js.dest))
    .pipe(config.required.print())
    .pipe(config.required.size({title: '*** create js ***'}));
});
