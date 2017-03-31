# min-dev-starter-kit

## 開発環境構成
- node.js v6.2.0
- npm 3.9.3
- gulp 3.9.1
- OS X El Capitan 10.11.6

## gulp構成
- HTML：pug
- CSS：stylus
- JS:babel+webpack
- image：imagemin
- ブラウザ：browserSync

## 対応ブラウザ
- IE9以上
- 各最新のモダンブラウザ対応（Chrome,Firefox,Safari）

## 使い方
### 0.準備
- node.js v6.2.0以上推奨（極力新しいものをお使いください）

### 1.パッケージインストール
```
cd _app
npm install
# yarnでもいけるはず（動作未確認）
```

### 2.設定ファイルをプロジェクトに合わせて修正
```
# お好きなエディタで構いません
vi _app/gulp/config.js
```

### 3.gulpを動かす
```
# これでwatchが動く（gulpコマンドは下記参照）
cd _app
gulp
```

## ディレクトリ構成
- /_app/直下にgulp周りの設定ファイルを配置（gulpコマンドの実行する場所）
- /_app/src/html以下に、pugファイル、stylusファイル、jsファイルを設置。出力先は/htmlとなっている。

## 主要なgulpコマンド
pug,stylus,jsはアンダースコアをつけたファイル（パーシャルファイル）自体は変換されない。 
（extendsやinclude用のファイル（_layout.pug、_layout.styl,_myFunc.js）などとして利用を推奨）

```
gulp
デフォルトでwatchが走る（下記）

gulp watch
  pug,stylusは、_layout.pug,_layout.stylなどパーシャル付きのものは、全ファイル変換し、index.pugやstyle.stylなどはそのファイルのみ変換する。
  imageminで更新があったファイルのみ変換する。
  js(webpack & babel)の詳細は後述

gulp build
  pug,stylus,js,imageminを全ファイル対象で変換する。

gulp bs-watch
  gulp watch + browserSyncでローカルサーバーを起動する

gulp image
  画像変換がかかる
```

## JSに関して
ES2015に対応しております。
- minify
- モジュール管理
- ES2015のトランスパイル（babelでやる）
上記が目的。運用方法次第では、entryを利用するほうが好ましい（現状だとentryが使えない）
### 運用方法
- その１ 共通ファイル(common.js)＋個別に出力
- その２ 出力ファイルをcommon.jsのみにして出力
- その３ 個別のみにして出力

上記３通りが考えられる。現状その3に対応している。

```
# 設定ファイル
/_app/gulp/config.js
```
__entry__にあわせて出力するようになっている。

## licence
MIT
