const request = require('request');

var parseString = require('xml2js').parseString;

const shareUS = 'https://share1.dexcom.com'
// const shareOUS = 'https://shareous1.dexcom.com'
// from https://github.com/nightscout/share2nightscout-bridge/issues/15
const systemTime = '/ShareWebServices/Services/General/SystemUtcTime'

const client = require('redis').createClient(process.env.REDIS_URL);

const now = new Date().toISOString();

client.get('status', (err, val) => {
  let status = JSON.parse(val);
  console.log(status);
  request(`${shareUS}${systemTime}`, function (error, response, body) {
    // console.log('errorOUS:', error); // Print the error if one occurred
    // console.log('statusCodeOUS:', response && response.statusCode); // Print the response status code if a response was received
    parseString(body, function (err, result) {
      if (err) {
        if (status.up) {
          client.set('status', JSON.stringify({at: now, up: false, since: now}));
        } else {
          client.set('status', JSON.stringify({at: now, up: false, since: status.since}));
        }
      } else {
        if (status.up) {
          client.set('status', JSON.stringify({at: now, up: true, since: status.since}));
        } else {
          // const since = new Date(result.DateTimeOffset.DateTime[0]).toISOString();
          client.set('status', JSON.stringify({at: now, up: true, since: now}));
        }
      }
      client.quit();
    });
  });
});

// request(`${shareUS}${systemTime}`, function (error, response, body) {
//   console.log('errorUS:', error); // Print the error if one occurred
//   console.log('statusCodeUS:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('bodyUS:', body); // Print the HTML for the Google homepage.
// });

// (async () => {
//   await storage.init();
// const now = new Date().toISOString();
// client.set('us', now);
// client.set('ous', now);
//
// client.set('status', 1);
//   await storage.setItem('ous', now);
// })();
