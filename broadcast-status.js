const twit = require('./twit');
const fb = require('./fb');
const ta = require('time-ago');

const client = require('redis').createClient(process.env.REDIS_URL);

client.get('status', (err, val) => {
  let status = JSON.parse(val);

  const message = `Share has been ${status.up ? 'up' : 'down'} for ${ta.ago(status.since).slice(0, -4)}. http://shareup2.herokuapp.com`;
  twit.tweet(message);
  fb.post(message);
});

client.quit();
