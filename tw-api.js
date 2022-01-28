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

