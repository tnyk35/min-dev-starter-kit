## はじめに
フロント制作時の開発環境の最小環境を作成
gulp4バージョンになってます。（winは動作未確認）

## 開発環境の構成
- node 14.7.0
- npm 6.14.7
- gulp 4.0.2
- OS X Mojave 10.14.6

で作成してあります。

### gulpの構成
- pug
- stylus　または　sass

#### バージョンアップ内容
- gulpfileの統合
- stylusとsassどちらでも利用可能
- JSと画像変換系は未実装（必要がでてきたら実装する予定）

画像は(tinypng)[https://tinypng.com/]で対応。

## 基本的な使い方
node.jsなどのインストールは端折ります。Macならndenvおすすめです。

### 1.npm installをする
```
cd _app
npm install
```

### 2.gulpを動かす
```
cd _app
gulp
```

## 利用可能な機能
### 1.文字置換
波ダッシュと全角チルダの問題は置換されるようにしてあります（pugのみ）

### 2.文字コード
/\_app/gulpfile.js内 **const charCode = 'UTF-8'** にて変更可能（pugのみ）

---

## ディレクトリ構成
- /\_app/直下にgulp周りの設定を置く（gulpコマンドの実行する場所）
- /\_app/src/htmlに、.pugや.stylなどを設置する。出力先は/distとする。
- /\_app/src/html/assets/以下は共通のものを置く

## 主要なgulpコマンド
### 共通設定
pug,stylus,scssはアンダースコアをつけたファイル自体は変換されない  
（extendsやinclude用のファイル（\_layout.pug、\_layout.styl）などとして利用）

```
gulp
各種ファイルをwatch、ローカルサーバー(browsersync)が開く

```

## JSに関して
- 直接 /dist/assets/js/　にて修正する。

## その他
自由にお使いください。改造とかしても全然OKです。好きにつかってください。
要望などがあれば連絡下さい。もしくはissue書いてください。