var
  gulp = require('gulp'),
  config = require('../config.js');

/*
 * default
 *
 * デフォルトタスクをwatchにする
 */
gulp.task('default', ['watch']);

/*
 * watch
 *
 * 監視タスク
 */
gulp.task('watch', () => {
  gulp.watch(config.pug.src_watch, ['pug']).on('change', (function (file) {
    config.pug.changed = !/\/_.[^\/]+\.pug/.test(file.path);
  }));
  gulp.watch(config.stylus.src_watch, ['stylus']).on('change',(function (file) {
    config.stylus.changed = !/\/_.[^\/]+\.styl/.test(file.path);
  }));
  gulp.watch(config.js.src_watch, ['webpack']).on('change', (function (file) {
    config.js.changed = !/\/_.[^\/]+\.js/.test(file.path);
  }));
  gulp.watch(config.image.src, ['image']);
});

/*
 * bs-watch
 *
 * 監視タスク + browserSync
 */
gulp.task('server', ['browserSync'], () => {
  gulp.watch(config.pug.src_watch, ['pug']).on('change', (function (file) {
    config.pug.changed = !/\/_.[^\/]+\.pug/.test(file.path);
  }));
  gulp.watch(config.stylus.src_watch, ['stylus', 'aigis']).on('change', (function (file) {
    config.stylus.changed = !/\/_.[^\/]+\.styl/.test(file.path);
  }));
  gulp.watch(config.js.src_watch, ['webpack']).on('change', (function (file) {
    config.js.changed = !/\/_.[^\/]+\.js/.test(file.path);
  }));
  gulp.watch(config.image.src, ['image']);
});
/*
 * build
 *
 * 全ファイル書き出し用タスク
 */
gulp.task('build', ['pug', 'stylus', 'image', 'webpack']);
