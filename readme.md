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

Authentication Tokens ページにて
以下のTokenも発行して、こちらも保存しておきます。

- ACCESS_TOKEN
- ACCESS_TOKEN_SECRET

### dotenv モジュールをインストール
Node.js から環境変数を簡単に扱う為にモジュールをインストールします。
```bash
npm i dotenv
```
dotenv を利用することで`.env`と言うファイルで環境変数を定義手軽に認証情報などを設定する際に便利です。
ここでは、Twitterの認証情報を設定しておきます。

```txt
CONSUMER_KEY = 'APIキー'
CONSUMER_SECRET = 'APIシークレットキー'
ACCESS_TOKEN = 'アクセストークン'
ACCESS_TOKEN_SECRET = 'アクセストークンシークレット'
BEARER_TOKEN = 'Bearer トークン'
```

### Twit モジュールをインストール
Node.js からTwitter APIを手軽に使うためのモジュールをインストールします。

```bash
npm i twit
```

### Twitter API v1 を使ったプログラム

Twitter API v1を使ったプログラムを作成していきます。
プログラムは`tw-api.js`と言うファイル名で以下の様になります。
Twitterに投稿された「JavaScript」と言う単語を含むつぶやきを画面に表示するというものになります。

```javascript
require('dotenv').config();
var Twit = require('twit');

// 以下、正しいキーを設定してください
var T = new Twit({
	consumer_key: process.env.CONSUMER_KEY,//API Key
	consumer_secret: process.env.CONSUMER_SECRET,//API Key Secret
	access_token: process.env.ACCESS_TOKEN,//Access Token
	access_token_secret: process.env.ACCESS_TOKEN_SECRET//Access Token Secret
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

なお、現在では新規でTwitter開発者アカウントを申請はTwitter API v1は使用できないため
次項のプログラムでTwitter API v2に対応したプログラムを作成していきます。

### twitter-api-v2 モジュールをインストール
Twitter API v2 に対応した Node.js のモジュールになります。
```bash
npm i twitter-api-v2
```

### Twitter API v2 を使ったプログラム

Twitter API v2を使ったプログラムを作成していきます。
プログラムは`tw-api-v2.js`と言うファイル名で以下の様になります。
Twitterに投稿された「JavaScript」と言う単語を含むつぶやきを画面に表示するというものになります。

```javascript
require('dotenv').config();
var TwitterApi = require('twitter-api-v2').TwitterApi;

/*var client = new TwitterApi({
	appKey: process.env.CONSUMER_KEY,
	appSecret: process.env.CONSUMER_SECRET,
	accessToken: process.env.ACCESS_TOKEN,
	accessSecret: process.env.ACCESS_TOKEN_SECRET,
});*/
var client = new TwitterApi(process.env.BEARER_TOKEN);
(async () => {
	var result = await client.v2.get('tweets/search/recent',
		{
			query: 'JavaScript',
			max_results: 100,
			expansions: ['entities.mentions.username']
		});
	var data = result.data;
	for (var tweet of data) {
		console.log('====================');
		// username
		if (typeof tweet.entities === 'object') {
			console.log('***  username  ***');
			for (var user of tweet.entities.mentions) {
				console.log(user.username);
			}
		}
		// tweet
		console.log('*** tweet text ***');
		console.log(tweet.text);
	}
})()
```
実行するには、以下のコマンドを実行します。
```bash
node tw-api-v2.js
```


