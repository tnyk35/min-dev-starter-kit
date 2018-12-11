var
  gulp        = require('gulp'),
  config      = require('../config.js'),
  browserSync = require('browser-sync').create();

/**
 * browserSync
 * ローカルサーバーを起動
 */
gulp.task('browserSync', () => {
  browserSync.init(config.browserSync.options);

  gulp.watch('../html/**', () => {
    browserSync.reload();
  });
});
