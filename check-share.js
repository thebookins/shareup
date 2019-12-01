// const storage = require('node-persist');
const request = require('request');

const shareUS = 'https://share1.dexcom.com'
const shareOUS = 'https://shareous1.dexcom.com'

const client = require('redis').createClient(process.env.REDIS_URL);

// from https://github.com/nightscout/share2nightscout-bridge/issues/15
const systemTime = '/ShareWebServices/Services/General/SystemUtcTime'

request(`${shareOUS}${systemTime}`, function (error, response, body) {
  console.log('errorOUS:', error); // Print the error if one occurred
  console.log('statusCodeOUS:', response && response.statusCode); // Print the response status code if a response was received
  console.log('bodyOUS:', body); // Print the HTML for the Google homepage.
});

request(`${shareUS}${systemTime}`, function (error, response, body) {
  console.log('errorUS:', error); // Print the error if one occurred
  console.log('statusCodeUS:', response && response.statusCode); // Print the response status code if a response was received
  console.log('bodyUS:', body); // Print the HTML for the Google homepage.
});

// (async () => {
//   await storage.init();
const now = new Date().toISOString();
client.set('us', now);
client.set('ous', now);
//   await storage.setItem('ous', now);
// })();
