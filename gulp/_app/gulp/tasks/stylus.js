var
  gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  postcss = require('gulp-postcss'),
  config = require('../config.js');

/**
 * stylus
 * CSSに変換(gulp watchで利用)
 */
gulp.task('stylus', function() {
  return gulp.src(config.stylus.src)
    .pipe(config.required.gulpif(
      config.stylus.changed,
      config.required.changed(config.stylus.dest, {extension: '.css'})
    ))
    .pipe(config.required.plumber(config.root.errorHandler))
    .pipe(stylus({
      'include css': true // cssファイルを展開
      }
    ))
    .pipe(postcss([
        require('autoprefixer')(config.stylus.prefix)
    ]))
    .pipe(gulp.dest(config.stylus.dest))
    .pipe(config.required.print())
    .pipe(config.required.size({title: '*** create css ***'}));
});
