const request = require('request');

var parseString = require('xml2js').parseString;

const twit = require('./twit');
const fb = require('./fb');

const shareUS = 'https://share1.dexcom.com'
// const shareOUS = 'https://shareous1.dexcom.com'
// from https://github.com/nightscout/share2nightscout-bridge/issues/15
const systemTime = '/ShareWebServices/Services/General/SystemUtcTime'

const client = require('redis').createClient(process.env.REDIS_URL);

const now = new Date();
const nowString = now.toISOString();

const broadcastStatus = status => {
  const message = `Share has changed status to ${status.up ? 'UP' : 'DOWN'}. http://shareup2.herokuapp.com`;
  twit.tweet(message);
  fb.post(message);
  client.set('lastBroadcast', nowString);
};

client.get('status', (err, val) => {
  let status = JSON.parse(val);
  console.log(`status = ${JSON.stringify(status)}`);
  status.at = nowString;
  request(`${shareUS}${systemTime}`, function (error, response, body) {
    // console.log('errorOUS:', error); // Print the error if one occurred
    // console.log('statusCodeOUS:', response && response.statusCode); // Print the response status code if a response was received
    parseString(body, function (err, result) {
      if (err) {
        if (status.up) {
          status.up = false;
          status.since = nowString;
          broadcastStatus(status);
        }
      } else {
        if (!status.up) {
          status.up = true;
          status.since = nowString;
          broadcastStatus(status);
        }
      }
    });
  });
  console.log(`status = ${JSON.stringify(status)}`);
  client.set('status', JSON.stringify(status));
  // client.get('lastBroadcast', (err, val) => {
  //   console.log(`lastBroadcast = ${JSON.parse(val)}.`)
  // });
});

client.quit();
