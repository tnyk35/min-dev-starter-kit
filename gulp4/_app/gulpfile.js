const gulp = require('gulp')
const $ = require('./gulp_modules.js')
const charCode = 'UTF-8'

function html() {
  return gulp.src(["./src/**/*.pug", "!./src/**/_*.pug"])
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(
      $.pug({
        pretty: true,
      })
    )
    .pipe($.frep([
      { pattern:/～/g, replacement: '～' },//波ダッシュ問題//&#xff5e;
      { pattern:/〜/g, replacement: '～' },//波ダッシュ問題//&#x301c;
      { pattern:/UTF-8/gi, replacement: charCode },//文字コード変換;
    ]))
    .pipe($.convertEncoding({to: charCode}))
    .pipe(gulp.dest('../dist'))
    .pipe($.print())
    .pipe($.size({title: '*** create html ***'}))
    // WP用に吐き出し
    .pipe($.frep([
      { pattern:/\.\/assets\//g, replacement: '<?php echo get_template_directory_uri(); ?>/assets/' },
      { pattern:/\.\/(.+)\.html/g, replacement: function (match) {
        var str = match.replace(/\.\/(.+)\.html/, '$1');
        return '/' + str + '/';
      }},
      { pattern:/href\=\"\.\/\"/g, replacement: 'href="/"' },
    ]))
    .pipe(gulp.dest('../wp-page'))
    .pipe($.frep([
      { pattern:/\<\?php echo get_template_directory_uri\(\); \?\>/g, replacement: '/wp-content/themes/theme-name' }
    ]))
    .pipe(gulp.dest('../wp-page/nophp'))
    .pipe(
      $.browserSync.reload({
        stream: true,
        once: true
      })
    )
}


function scss() {
  return gulp.src(["./src/assets/scss/**/*.scss", "!./src/assets/scss/**/_*.scss"])
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError('Error: <%= error.message %>')
      })
    )
    // .pipe($.sourcemaps.init())
    .pipe( $.sass({
      importer: $.packageImporter({
        extensions: ['.scss', '.css']
      }),
      outputStyle: 'expanded',
      }).on( 'error', $.sass.logError ) )
      .pipe( $.autoprefixer( {
        cascade: false,
      }))
    // .pipe($.sourcemaps.write())
    .pipe(gulp.dest('../dist/assets/css'))
    .pipe($.print())
    .pipe($.size({title: '*** create css ***'}))
    .pipe(
      $.rename({
        suffix: '.min'
      })
    )
    .pipe($.minifyCSS())
    .pipe(gulp.dest('../dist/assets/css'))
    .pipe($.print())
    .pipe($.size({title: '*** create css ***'}))
    .pipe(
      $.browserSync.reload({
        stream: true,
        once: true
      })
    );
}

function stylus() {
  return gulp.src(["./src/assets/stylus/**/*.styl", "!./src/assets/stylus/**/_*.styl"])
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe( $.stylus({
      'include css': true // cssファイル展開
    }))
    .pipe( $.autoprefixer({
      cascade: false,
    }))
    // .pipe($.sourcemaps.write())
    .pipe(gulp.dest('../dist/assets/css'))
    .pipe($.print())
    .pipe($.size({title: '*** create css ***'}))
    .pipe(
      $.rename({
        suffix: '.min'
      })
    )
    .pipe($.minifyCSS())
    .pipe(gulp.dest('../dist/assets/css'))
    .pipe($.print())
    .pipe($.size({title: '*** create css ***'}))
    .pipe(
      $.browserSync.reload({
        stream: true,
        once: true
      })
    );
}


function bs() {
  $.browserSync.init({
    server: '../dist',
  });
}


exports.default = gulp.parallel([html, scss, stylus, bs], () => {
  gulp.watch("./src/**/*.pug", html)
  gulp.watch("./src/assets/scss/**/*.scss", scss)
  gulp.watch("./src/assets/stylus/**/*.styl", stylus)
})