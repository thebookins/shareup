const twit = require('./twit');
const fb = require('./fb');
const moment = require('moment');

const client = require('redis').createClient(process.env.REDIS_URL);

client.get('status', (err, val) => {
  let status = JSON.parse(val);

  const statusStr = status.up ? 'up' : 'down';
  // const taStr = ta.ago(status.since).slice(0, -4);
  const taStr = moment(status.since).fromNow(true);
  const lastCheckedStr = moment().calendar(status.at).replace(/^\w/, c => c.toLowerCase());
  const message = `Share has been ${statusStr} for ${taStr}. Last checked ${lastCheckedStr} (UTC). http://shareup2.herokuapp.com`;
  twit.tweet(message);
  fb.post(message);
});

client.quit();
