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
  gulp.watch(config.pug.src_watch, ['pug']).on('change', (function(file){
    //保存したファイルがパーシャルでない場合のみchangedの設定をtrueに
    config.pug.changed = !/\/_.[^\/]+\.pug/.test(file.path);
  }));
  gulp.watch(config.stylus.src_watch, ['stylus']).on('change',(function(file){
    config.stylus.changed = !/\/_.[^\/]+\.styl/.test(file.path);
  }));
  gulp.watch(config.image.src, ['image']);
  gulp.watch(config.js.src, ['webpack'])
});

/*
 * bs-watch
 *
 * 監視タスク + browserSync
 */
gulp.task('bs-watch', ['browserSync'], () => {
  gulp.watch(config.pug.src, ['pug', 'bs-reload']);
  gulp.watch(config.stylus.src, ['stylus', 'bs-reload']);
  gulp.watch(config.image.src, ['image', 'bs-reload']);
  gulp.watch(config.js.src, ['webpack', 'bs-reload'])
});

/*
 * build
 *
 * 全ファイル書き出し用タスク
 */
gulp.task('build', ['pug', 'stylus', 'image', 'webpack']);
