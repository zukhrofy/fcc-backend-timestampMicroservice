// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", (req, res) => {
  // get date from url
  const dateParam = req.params.date;

  // handle if input empty
  if (!dateParam) {
    return res.json({
      unix: new Date(Date.now()).getTime(),
      utc: new Date(Date.now()).toUTCString(),
    });
  }

  // handle unix input
  if (new Date(parseInt(dateParam)).getTime() == dateParam) {
    return res.json({
      unix: parseInt(dateParam),
      utc: new Date(parseInt(dateParam)).toUTCString(),
    });
  }

  // handle if input invalid
  if (new Date(dateParam) == "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // if input is date string
  return res.json({
    unix: new Date(dateParam).getTime(),
    utc: new Date(dateParam).toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
