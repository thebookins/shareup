const request = require('request');

const APP_ID = process.env.FB_APP_ID;
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

module.exports = {
  post: (message) => {
    request.post(`https://graph.facebook.com/${APP_ID}/feed?message=${message}&access_token=${ACCESS_TOKEN}`);
  }
}
