var express = require('express');
var app = express();

var timestamp = new Date().getTime();

function getUTC() {
  const now = new Date();

  return now.toUTCString();
}

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); 

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", function(req, res) {
  console.log(req.params.date)
  if (!isNaN(new Date(Number(req.params.date)))) {
    res.json({
      unix: Number(req.params.date),
      utc: new Date(Number(req.params.date)).toUTCString(),
    });
  } else if (!isNaN(new Date(req.params.date))) {
    res.json({
      unix: new Date(req.params.date).getTime(),
      utc: new Date(req.params.date).toUTCString()
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});


app.get("/api", function(req, res) {
  res.json({
    "unix": new Date().getTime(),
    "utc": new Date().toUTCString()
  })
});

var listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
