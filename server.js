const express = require("express");
const bodyParser = require("body-parser");
// const storage = require('node-persist');

const client = require('redis').createClient(process.env.REDIS_URL);

const app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// storage.init().then(() => {
  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
// });

client.get('status', (err, val) => {
  if (!val) {
    client.set('status', JSON.stringify({at: new Date(0).toISOString(), up: false, since: new Date(0).toISOString()}))
  }
});

// STATUS API ROUTES BELOW
/*  "/api/status"
 *    GET: finds all statuses
 */

app.get("/api/status", function(req, res) {
  client.get("status", function(err, reply) {
    // reply is null when the key is missing
    // TODO: add if (reply) or something
    res.status(200).json(JSON.parse(reply));
  });
  // storage.values().then(values => {
  //   res.status(200).json(values);
  // });
});

/*  "/api/status/:id"
 *    GET: find status by id
 */

app.get("/api/status/:id", function(req, res) {
});
