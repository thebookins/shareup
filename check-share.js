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

client.get('status', (err, val) => {
  let status = JSON.parse(val);
  request(`${shareUS}${systemTime}`, function (error, response, body) {
    // console.log('errorOUS:', error); // Print the error if one occurred
    // console.log('statusCodeOUS:', response && response.statusCode); // Print the response status code if a response was received
    parseString(body, function (err, result) {
      if (err) {
        if (status.up) {
          client.set('status', JSON.stringify({at: nowString, up: false, since: nowString}));
          twit.tweet(`Share is down at ${now}.`);
          fb.post(`Share is down at ${now}.`);
        } else {
          client.set('status', JSON.stringify({at: nowString, up: false, since: status.since}));
        }
      } else {
        if (status.up) {
          client.set('status', JSON.stringify({at: nowString, up: true, since: status.since}));
        } else {
          client.set('status', JSON.stringify({at: nowString, up: true, since: nowString}));
          twit.tweet(`Share is up at ${now}.`);
          fb.post(`Share is up at ${now}.`);
        }
      }
      client.quit();
    });
  });
});
