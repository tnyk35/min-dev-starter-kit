var
  gulp = require('gulp'),
  pug = require('gulp-pug'),
  config = require('../config.js');

/*
 * pug
 *
 * 変更があったpugファイルを変換する(gulp watchで利用)
 */
gulp.task('pug', () => {
  return gulp.src(config.pug.src)
    .pipe(config.required.gulpif(
      config.pug.changed,
      config.required.changed(config.pug.dest, {extension: '.html'})
    ))
    .pipe(config.required.plumber(config.root.errorHandler))
    .pipe(pug(config.pug.options))
    .pipe(config.required.frep(config.frep))
    .pipe(config.required.convertEncoding({to: config.charCode}))
    .pipe(gulp.dest(config.pug.dest))
    .pipe(config.required.print())
    .pipe(config.required.size({title: '*** create html ***'}));
});
