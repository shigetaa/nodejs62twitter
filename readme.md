# Twitter からダウンロード

Twitter ではリアルタイムに情報が更新されるので、話題になっているトピックを抽出する事ができます。

## Twitter とは何か？
Twitteは、ユーザーが誰でも手軽に情報を発信出来るコミュニケーションサービスです。
様々なシーンで活用されるようになりました。
ユーザーは「いま、どうしてる？」に答える形で140文字以内の短文を投稿します。

## Twitter APIを使う準備
Twitter のデータをダウンロードするには、無料で使えるTwitter APIを使う方法が推奨されています。
Twitter APIを使うには、開発者向けのWebサイトで登録する必要があります。
登録には、Twitterのアカウントが必要です。

具体的にAPIを使うためには、下記のデベロッパーセンタにてアプリケーションを登録します。

[Twitter Developers<br>https://dev.twitter.com/](https://dev.twitter.com/)

ページ右上にある「Sign In」と言うリンクをクリックしてTwitterアカウントでログインします。
以下のURLにアクセスします。

[Twitter Application Management<br>https://developer.twitter.com/en/apps](https://developer.twitter.com/en/apps)

そして、ページの情報にある「Create an app」と言うボタンをクリックして、Twitterアプリ登録画面にて、Twitter開発者アカウントを申請してください。

Twitter アプリが無事に登録出来ると
以下の情報を保存しておいてください。

- API Key
- API Key Secret
- Bearer Token

### Twit モジュールをインストール
Node.js からTwitter APIを手軽に使うためのモジュールをインストールします。

```bash
npm i twit
```

### Twitter API を使ったプログラム

Twitter API を使ったプログラムを作成していきます。
プログラムは`tw-api.js`と言うファイル名で以下の様になります。
Twitterに投稿された「JavaScript」と言う単語を含むつぶやきを画面に表示するというものになります。

```javascript
var Twit = require('twit');

// 以下、正しいキーを設定してください
var T = new Twit({
	consumer_key: '',//API Key
	consumer_secret: '',//API Key Secret
	access_token: '',//Access Token
	access_token_secret: ''//Access Token Secret
});

// JavaScriptに関するつぶやきを表示する
var stream = T.stream('statuses/filter', { track: 'JavaScript' });
// つぶやきがあったときに呼ばれるイベントを設定
stream.on('tweet', function (tw) {
	var text = tw.text;
	var user_name = tw.user.name;
	console.log(user_name + "> " + text);
});
```

実行するには、以下のコマンドを実行します。
```bash
node tw-api.js
```

### Twitter APIの制限

