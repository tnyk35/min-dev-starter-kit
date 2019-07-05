var
  gulp = require('gulp'),
  os = require('os'),
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
    if (os.type().toString().match('Windows')) {
        config.pug.changed = !/^[a-zA-Z]:\\[\\\S|*\S]?.*\.pug$/.test(file.path);
    } else if (os.type().toString().match('Darwin')) {
        config.pug.changed = !/\/_.[^\/]+\.pug/.test(file.path);
    }
  }));
  gulp.watch(config.stylus.src_watch, ['stylus']).on('change',(function (file) {
    if (os.type().toString().match('Windows')) {
      config.stylus.changed = !/^[a-zA-Z]:\\[\\\S|*\S]?.*\.styl$/.test(file.path);
    } else if (os.type().toString().match('Darwin')) {
      config.stylus.changed = !/\/_.[^\/]+\.styl/.test(file.path);
    }
  }));
  // gulp.watch(config.js.src_watch, ['webpack']);
  // gulp.watch(config.image.src, ['image']);
});

/*
 * bs-watch
 *
 * 監視タスク + browserSync
 */
gulp.task('server', ['browserSync'], () => {
  gulp.watch(config.pug.src_watch, ['pug', 'bs-reload']).on('change', (function (file) {
    if (os.type().toString().match('Windows')) {
        config.pug.changed = !/^[a-zA-Z]:\\[\\\S|*\S]?.*\.pug$/.test(file.path);
    } else if (os.type().toString().match('Darwin')) {
        config.pug.changed = !/\/_.[^\/]+\.pug/.test(file.path);
    }
  }));
  gulp.watch(config.stylus.src_watch, ['stylus', 'bs-reload']).on('change',(function (file) {
    if (os.type().toString().match('Windows')) {
      config.stylus.changed = !/^[a-zA-Z]:\\[\\\S|*\S]?.*\.styl$/.test(file.path);
    } else if (os.type().toString().match('Darwin')) {
      config.stylus.changed = !/\/_.[^\/]+\.styl/.test(file.path);
    }
  }));
  // gulp.watch(config.js.src_watch, ['webpack', 'bs-reload']);
  // gulp.watch(config.image.src, ['image', 'bs-reload']);
});
/*
 * build
 *
 * 全ファイル書き出し用タスク
 */
// gulp.task('build', ['pug', 'stylus', 'image', 'webpack']);
gulp.task('build', ['pug', 'stylus']);
