var
  gulp        = require('gulp'),
  config      = require('../config.js'),
  imagemin    = require('gulp-imagemin'),
  pngquant    = require('imagemin-pngquant');

/**
 * image
 * 画像を圧縮
 */
gulp.task('image', function(e) {
  return gulp.src(config.image.src)
    .pipe(config.required.changed(config.image.dest))
    .pipe(config.required.plumber(config.root.errorHandler))
    .pipe(
      imagemin({
        use: [pngquant(config.image.option)]
      })
    )
    .pipe(imagemin()) //ここでガンマ情報を除去！
    .pipe(gulp.dest(config.image.dest))
    .pipe(config.required.print())
    .pipe(config.required.size({title: '*** optimize image ***'}));
});
