This project intends to be a party playlist for Google Play Music (soon to be defunct!).

To start first you have to add a custom app password in your Google account settings.

Then you want to create a conf-pm.json file with your Google username and the custom app password, and run node setup-tokens.js to retrieve a set of login tokens which the app will use.

Finally, run npm install and npm start.

Note: most functionality is still not there.