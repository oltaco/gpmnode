// server.js
const app = require('./pm-app.js');
const port = process.env.PORT || 3001;

var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

const PlayMusic = require('./node_modules/playmusic/play.js');

const fs = require('fs');
const util = require('util');

const pm = new PlayMusic();
const gpmtokens = JSON.parse(fs.readFileSync("conf-pm-tokens.json"));

const DATA_FILE = 'playlist.json';




const server = app.listen(port, function() {
  console.log('GPM Express server listening on port ' + port);
});

// here we set up the link to google play music
pm.init(gpmtokens, function(err) {
    if(err) return console.log("error", err);
});

// allow searching for tracks.
app.get('/api/trackSearch', (req, res) => {
  let param = req.query.q;
  let filter = req.query.f;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }
  console.log("Searching for: ", param);


  pm.search(param, 3, function(err, data) { // max 3 results
      var results = data.entries.sort(function(a, b) { // sort by match score (this does nothing)
          return a.score < b.score;
      })

let songs = results.filter(val => val.type == 1)

let tracks = [];
songs.forEach(element => {
  console.log("Search result: ", element.track.artist, "-", element.track.title)
  tracks.push(element.track)
})

if (filter == "no") { songs = search }

if (tracks) {
  res.json( tracks);
} else {
  res.json([]);
}

  }, function(message, body, err, httpResponse) {
      console.log(message);
  });


});

// endpoint for getting URI of track from trackId
app.get('/api/getTrackURI', (req, res) => {
  let param = req.query.q;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }

  pm.getStreamUrl(param, function (err, data) {
    var trackUrl = data;
    if (err) {
      console.log("getStreamUrl error: ", err);
      res.json({
        getStreamUrlError: err,
      });
      return;
    } else {
      res.json({
        streamUrl: data
      })
    }
  })
});


// set playlist
app.post('/api/playlist', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    let playlist = JSON.parse(data);
    // let newTrack = { track: req.body };

    playlist=req.body;

    fs.writeFile(DATA_FILE, JSON.stringify(playlist, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(playlist);
    });
  });
});

app.get('/api/playlist', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const playlist = JSON.parse(data);
    res.setHeader('Cache-Control', 'no-cache');
    res.json(playlist);
  });
});