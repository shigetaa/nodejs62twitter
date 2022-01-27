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

