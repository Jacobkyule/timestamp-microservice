// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
/*app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});*/

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

app.get("/api/:date?", (req, res) => {
  let date;

  if (req.params.date === undefined || req.params.date.trim() === '') {
    // Handle empty date parameter by using the current date
    date = new Date();
  } else {
    date = new Date(req.params.date);

    // Check if the date is invalid and try parsing as a Unix timestamp
    if (isInvalidDate(date)) {
      date = new Date(+req.params.date);
    }

    // If still invalid, return an error
    if (isInvalidDate(date)) {
      res.json({ error: "Invalid Date" });
      return;
    }
  }

  res.json({ 
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api", (req, res) => {
  let currentDate = new Date();

  if (isInvalidDate(currentDate)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  });
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
