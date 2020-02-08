const twit = require('./twit');
const fb = require('./fb');

const client = require('redis').createClient(process.env.REDIS_URL);

client.get('status', (err, val) => {
  let status = JSON.parse(val);
  const message = `Share is ${status.up ? 'up' : 'down'}. http://shareup2.herokuapp.com`;
  twit.tweet(message);
  fb.post(message);
});

client.quit();
