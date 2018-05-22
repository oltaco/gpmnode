const fs = require('fs');
const PlayMusic = require('./node_modules/playmusic/play.js');
const util = require('util');

const pm = new PlayMusic();
const config = JSON.parse(fs.readFileSync("conf-pm.json"));

// const gpmtokens = JSON.parse(fs.readFileSync("conf-pm-tokens.json"));


pm.login({ email: config.email, password: config.password }, function (err, resp) {
    if (err) {
        console.log("pm.login error: ", err);
    } else {
        console.log("pm.login response: ", resp);
        var tokens = JSON.stringify(resp);
        fs.writeFile('conf-pm-tokens.json', tokens, 'utf8', function(err) {
    if (err) throw err;
    console.log('Tokens written to conf-pm-tokens.json... complete');
    });
    }
});
