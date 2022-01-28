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