# gulp-starter

## はじめに
フロント制作時の開発環境の最小環境を作成  
gulpの設定をちょっといじると動くようになってるはず。

## 開発環境の構成
- node 7.7.1
- npm 4.1.2
- gulp 3.9.1
- OS X El Capitan 10.11.6

で作成してあります。

### gulpの構成
- pug
- stylus
- webpack
- babel(ES2015)
- imagemin

## 基本的な使い方
node.jsなどのインストールは端折ります。

### 1.npm installをする
```
cd _app
npm install
```

### 2.設定ファイルを修正してプロジェクトに合わせる
```
_app/gulp/config.jsを修正
```

### 3.gulpを動かす
```
cd _app
gulp      //これでwatchが動く様になっている（gulpコマンドは下記参照）
```

## 利用可能な機能
### 1.文字置換
波ダッシュと全角チルダの問題は置換されるようにしてあります（pugのみ）

### 2.文字コード
/\_app/gulp/config.jsの **charCode** を変えれば変更可能（pugのみ）

## コミットルール（推奨）
- あくまで推奨。困らなければもっとざっくりで良い。  
http://qiita.com/itosho/items/9565c6ad2ffc24c09364  
このページライト版利用＆さらに1行でしか書かない。

- こんな感じ
```
[fix] #110 削除フラグが更新されない不具合の修正
```

- 修正内容の詳細はissueに書くべき。  
1つのissueに1課題というのがいいみたいですが、HTML/CSSの場合は、ページ単位とかディレクトリ単位とかで問題ないと思う。  
プロジェクトに合わせる。

---

## ディレクトリ構成
- /\_app/直下にgulp周りの設定を置く（gulpコマンドの実行する場所）
- /\_app/src/htmlに、.pugや.stylなどを設置する。出力先は/htmlとする。
- /\_app/src/html/assets/以下は共通のものを置く

## 主要なgulpコマンド
### 共通設定
pug,stylusはアンダースコアをつけたファイル自体は変換されない  
（extendsやinclude用のファイル（\_layout.pug、\_layout.styl）などとして利用）

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
上記が目的で、あとは運用方法でカバーをする。

### 運用方法
- その１ 共通ファイル(common.js)＋個別に出力
- その２ 出力ファイルをcommon.jsのみにして出力
- その３ 個別のみにして出力
の３通りが考えられる。

現状だと、その１のentryを利用する前提でつくられている。
```
/_app/src/html/assets/js/common.js
```
のほかに
```
/_app/gulp/config.js
```
内に記載がある__entry__にあわせて出力するようになっている。

その２、その３についてもconfig.jsをコメントアウトの追加/削除で対応できるようになっている。


## その他
自由にお使いください。改造とかしても全然OKです。好きにつかってください。
要望などがあれば連絡下さい。もしくはissue書いてください。
