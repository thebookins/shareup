const Twit = require('twit');

const T = new Twit({
  consumer_key:         process.env.BOT_CONSUMER_KEY,
  consumer_secret:      process.env.BOT_CONSUMER_SECRET,
  access_token:         process.env.BOT_ACCESS_TOKEN,
  access_token_secret:  process.env.BOT_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            false,     // optional - requires SSL certificates to be valid.
})

module.exports = {
  tweet: (message) => {
    T.post('statuses/update', { status: message }, function(err, data, response) {
      console.log(data)
    })
  }
}
