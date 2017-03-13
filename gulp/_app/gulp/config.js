var
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  print = require('gulp-print'),
  size = require('gulp-size'),
  changed = require('gulp-changed'),
  frep = require('gulp-frep'),
  gulpif  = require('gulp-if'),
  convertEncoding = require('gulp-convert-encoding'),
  root = {
    src: 'src/',
    dest: '../',
    errorHandler: notify.onError('<%= error.message %>')
  },
  charCode = 'UTF-8';

module.exports = {
  /*
   * config required plugin
   */
  root: root,
  required: {
    plumber: plumber,
    print: print,
    size: size,
    changed: changed,
    gulpif: gulpif,
    frep: frep,
    convertEncoding: convertEncoding,
  },

  charCode: charCode,
  /*
   * config pug
   */
  pug: {
    src: [
      root.src + '**/*.pug',
      '!' + root.src + '**/_*.pug'
    ],
    src_watch: [
      root.src + '**/*.pug'
    ],
    changed: false,
    dest: root.dest,
    options: {
      pretty: true
    }
  },

  /*
   * config stylus
   */
  stylus: {
    src: [
      root.src + '**/*.styl',
      '!' + root.src + '**/_*.styl'
    ],
    src_watch: [
      root.src + '**/*.styl'
    ],
    changed: false,
    dest: root.dest,
    prefix: {
      browsers: [
        'last 2 Firefox versions',
        'last 2 Chrome versions',
        'last 2 Opera versions',
        'ie >= 8',
        'ios >= 7',
        'android >= 2.3'
      ]
    }
  },

  /*
   * config javascript その１
   *
   * その２：その１の下にあるので、その１をコメントアウトして、その２のコメントアウトをはずしてください。
   *
   * その３：entryのassets/js/common部分をコメントアウトしてください。そのあとに、各個別ページのJSにcommon.jsをインクルードする記述をしてください。
   */
  js: {
    src: root.src + '**/*.js',
    dest: root.dest + 'html',
    uglify: true,

    webpack: {
      // jsファイル書き出したい時にここに追加する
      // TODO:jsファイルを自動検知できるようにしたい
      entry: {
        'assets/js/common': './src/html/assets/js/common.js',
        'assets/js/template': './src/html/assets/js/template.js',
        'assets/js/template_es': './src/html/assets/js/template_es.js',
        'js/top': './src/html/js/top.js'
      },
      output: {
        // path: __dirname,
        filename: '[name].js'
      },
      resolve: {
        extensions: ['', '.js'],
        root: root.src
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
              presets: ['es2015']
            }
          }
        ]
      },
      // errorが出た時に下記コメントアウトを外すと詳細がわかる
      // stats: {
      //   colors: true,
      //   modules: true,
      //   reasons: true,
      //   errorDetails: true
      // }
    },
  },

  /*
   * config javascript その２
   */
  // js: {
  //   src: root.src + '**/*.js',
  //   dest: root.dest + 'html/assets/js',
  //   uglify: true,
  //
  //   webpack: {
  //     output: {
  //       filename: 'common.js'
  //     },
  //     resolve: {
  //       extensions: ['', '.js'],
  //       root: root.src
  //     },
  //     module: {
  //       loaders: [
  //         {
  //           test: /\.js$/,
  //           exclude: /node_modules/,
  //           loader: "babel",
  //           query: {
  //             presets: ['es2015']
  //           }
  //         }
  //       ]
  //     },
  //   },
  // },

  /*
   * config image minify
   */
  image: {
    src: root.src + '**/*.+(jpg|jpeg|png|gif|svg)',
    dest: root.dest,
    option: {
        quality: '60-80',
        speed: 1
    }
  },

  /*
   * config browserSync
   */
  browserSync: {
    options: {
      server: {
        baseDir: '../html'
      }
    }
  },

  frep: [
    { pattern:/～/g, replacement: '～' },//波ダッシュ問題//&#xff5e;
    { pattern:/〜/g, replacement: '～' },//波ダッシュ問題//&#x301c;
    { pattern:/UTF-8/gi, replacement: charCode },//文字コード変換;
  ]
};
