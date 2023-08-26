# reacnet

オンラインJavaScriptエディタ、Reactコンポーネントの作成を専門とするシームレスなインターフェースと統合されたAIサポート付き。

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


## 概要

`reacnet`は、Reactコンポーネントを作成したい、またはJavaScriptでプログラミングを学びたい学習者、開発者向けに設計されたJavaScriptオンラインエディタです。このプロジェクトが他のエディタと異なる点:
- **直感的なインターフェース**: 左にエディタ、右にリアルタイムでレンダリングされた出力の2パネルインターフェースを備えています。統合されたPrettierボタンで、コードを一瞬でフォーマットできます。
- **セルのシステム**: JavaScriptのコードを書けるコードセル、マークダウンでコメントを残せるテキストセル、文章を書けばAIがコードを書いてくれるAIセルを自由自在に追加、移動、削除できます。
- **Show機能**: `show()`関数を使用して、変数、コンポーネントなどをリアルタイムでプレビューできます。
- **ポータブル**: ブラウザ版を使えば、スマートフォンやタブレットで、どこでもコーディングできます。
- **ファイルの保存と共有**: コマンドラインでの使用は、指定されたファイルに変更を保存し、それを使えば同じ状態を再度再現できます。もちろんこのファイルを共有すればコードをシェアすることができます。
- **AIに聞く**: ChatGPTを活用して、自分のAPIキーを登録するとReactコンポーネントを生成できます。

## 開始方法
npmからインストールする方法と、デプロイされたウェブブラウザで使用する方法があります。

Webアプリ： https://endearing-sunburst-eba81a.netlify.app/

npm:     https://www.npmjs.com/package/reacnet

Webブラウザで使用する場合は、データが保存されないためブラウザリロード時やブラウザを閉じる時には注意が必要です。

npmからインストールして利用する場合、ローカルで現在の状態を保存し、途中から再開したりシェアしたりすることができます。


### インストール

1. npmをインストールします。
   
   `npx reacnet`

2. 以下のコマンドで起動します。
   
   `npx reacnet serve [./path/filename]`
   
   `filename`で指定したファイルにコードの状態が保存されます。指定しない場合はreacnetbook.jsがデフォルト値です。
   
   存在しないファイルを指定すれば新しいファイルを作成して、コードに変更があるたびに自動で保存されます。
   
   reacnetで使用したことのあるファイルを指定すれば前回の状態から作業を再開することができます。


   _オプション_
   
   `-p` または `-port`
   
   エディタをlocalhostで起動するときのポート番号を指定します。

   指定しない場合は**4005**がデフォルト値です。
   
4. ターミナルに現れたリンクをブラウザで開きます。
   
   <img width="569" alt="スクリーンショット 2023-08-26 15 26 37" src="https://github.com/mizukitayama/reacnet/assets/104298092/e1e148ea-fd65-474a-8088-61f72caf4494">

   

