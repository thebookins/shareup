const express = require("express");
const bodyParser = require("body-parser");
const storage = require('node-persist');

const app = express();
app.use(bodyParser.json());

storage.init().then(() => {
  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


// STATUS API ROUTES BELOW
/*  "/api/status"
 *    GET: finds all statuses
 */

app.get("/api/status", function(req, res) {
  storage.values().then(values => {
    res.status(200).json(values);
  });
});

/*  "/api/status/:id"
 *    GET: find status by id
 */

app.get("/api/status/:id", function(req, res) {
});
