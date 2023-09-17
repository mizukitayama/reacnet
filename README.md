# reacnet

A seamless online JavaScript editor, specializing in creating React components with integrated AI support.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


## Overview

`ReacNet` is a dedicated online JavaScript editor for learners and developers who are keen on creating React components or learning to program with JavaScript. What sets this project apart from other editors:

- **Intuitive Interface**: Features a two-panel interface with the editor on the left and real-time rendered output on the right. Code can be instantly formatted with the integrated Prettier button.
  
- **Cell System**: Freely add, move, or delete distinct cells to write JavaScript code, leave comments in Markdown, or input descriptions for the AI to generate code.
  
- **Show function**: Use the `show()` function in code cell to preview variables, components, etc., in real time.
  
- **Portability**: With the browser version, code on-the-go from your smartphone or tablet.
  
- **File Saving & Sharing**: When using via the command line, save your changes to a specified file, which can be used to reproduce the same state. Share the file to share your code.
  
- **Ask the AI**: Utilizing ChatGPT, upon registering your own API key, you can have AI-generated React components.
  

## Getting started
You can either install via npm or use the hosted web browser version.

Web App: https://endearing-sunburst-eba81a.netlify.app/

npm: https://www.npmjs.com/package/reacnet

If using the web browser version, remember that your data won't be saved. So, be cautious about refreshing or closing the browser.

If installed via npm, you can save your current state locally and resume or share it later.


### npm Installation

1. Install via npm:
   
   `npx reacnet`

2. Start with the following command:
   
   `npx reacnet serve [./path/filename]`
   
   The state of your code will be saved in the file specified by `filename`. If not specified, the default is `reacnetbook.js`.
   
   If you specify a non-existent file, a new one will be created, and changes to the code will be saved automatically.
   
   If you specify a file previously used with reacnet, you can resume from where you left off.

   _Options_:
   
   `-p` or `-port`: Specify the port number when launching the editor on localhost. Default is **4005**.

   
4. Open the link that appears in the terminal on your browser.
   
   <img width="569" alt="スクリーンショット 2023-08-26 15 26 37" src="https://github.com/mizukitayama/reacnet/assets/104298092/e1e148ea-fd65-474a-8088-61f72caf4494">


### Running Locally After Cloning from git

1. Run `npm install` under each: /reacnet , /reacnet/packages/local-client , /reacnet/packages/local-api , and /reacnet/packages/cli
2. Execute `npm run start` under /reacnet.
3. While keeping step 2 running, in a separate terminal, execute `node index.js serve` under /reacnet/packages/cli/dist.
4. Open the link that appears in the terminal on your browser.

## How to Use the Browser App

Execute the `npx reacnet serve` command, and a browser will launch on localhost.

Here, you can code in JavaScript or React, and even let AI craft React components for you!

You can add, delete, and move cells:

- **Text Cell**: Use this for comments or notes. Click inside to edit and outside to exit editing mode.
    
- **Code Cell**: Write JavaScript or React code and preview variables or components on the left using the show() function.

<img width="1433" alt="スクリーンショット 2023-08-26 16 46 28" src="https://github.com/mizukitayama/reacnet/assets/104298092/e0d176e3-f0f8-4f27-8c59-16f978c7829a">

- AI Cell:
  
    - Register your OpenAI key. Refer to: https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key

     <img width="731" alt="スクリーンショット 2023-08-26 16 14 46" src="https://github.com/mizukitayama/reacnet/assets/104298092/5a5e97d4-ada4-4f08-8962-a7b4d8796e06">
     
   - Once registered successfully, type in your desired React component description and hit Enter.
     
     <img width="734" alt="スクリーンショット 2023-08-26 16 15 38" src="https://github.com/mizukitayama/reacnet/assets/104298092/e05eb5a3-8269-47bb-8c3e-27785911c374">

   - After a few seconds, the AI-generated code will reflect in a Code Cell. You can edit as necessary, and of course, events like clicks are functional in the preview.
     
     <img width="729" alt="スクリーンショット 2023-08-26 16 16 23" src="https://github.com/mizukitayama/reacnet/assets/104298092/cd67cfe2-1748-44a6-a5e9-71c2c6eb90a1">
     


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


### npmインストール

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


### gitからcloneしてローカルで動かす

1. /reacnet , /reacnet/packages/local-client , /reacnet/packages/local-api , /reacnet/packages/cli 　下でそれぞれ　`npm install`　を実行します。
2. /reacnet　下で `npm run start`を実行します。
3. 3を実行したまま別ターミナル　/reacnet/packages/cli/dist 下で`node index.js serve`を実行します。
4. ターミナルに現れたリンクをブラウザで開きます。

## ブラウザアプリの使い方

`npx reacnet serve`コマンドを叩くと、localhostでブラウザが立ち上がります。

ここでJavaScriptやReactをコーディングしたり、AIがReactを代わりに書いてくれたりします！

セルは追加、削除、上下移動ができます。

- textセル
  - コメントやメモを残せます。セル内をクリックすると編集、セル外をクリックすると編集終了します。
    
- codeセル
  - JavaScriptやReactのコードを書き、show()関数で変数やコンポーネントの左でプレビューができます。

<img width="1433" alt="スクリーンショット 2023-08-26 16 46 28" src="https://github.com/mizukitayama/reacnet/assets/104298092/e0d176e3-f0f8-4f27-8c59-16f978c7829a">

- AIセル
  
    - OpenAIのキーを登録します。 参考：https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key


     <img width="731" alt="スクリーンショット 2023-08-26 16 14 46" src="https://github.com/mizukitayama/reacnet/assets/104298092/5a5e97d4-ada4-4f08-8962-a7b4d8796e06">
     
   - キーが正常に登録されたら、生成したいReactのコンポーネントを入力してEnterを押してください。
     
     <img width="734" alt="スクリーンショット 2023-08-26 16 15 38" src="https://github.com/mizukitayama/reacnet/assets/104298092/e05eb5a3-8269-47bb-8c3e-27785911c374">

   - 数秒後にAIが書いたコードがCodeセルに反映されます。適宜編集してください。もちろんプレビュー画面ではクリックなどのイベントが使用できます。
     
     <img width="729" alt="スクリーンショット 2023-08-26 16 16 23" src="https://github.com/mizukitayama/reacnet/assets/104298092/cd67cfe2-1748-44a6-a5e9-71c2c6eb90a1">
    
