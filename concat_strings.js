'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

/* // Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('favorite color', (conv, {color}) => {
    const luckyNumber = color.length;
    // Respond with the user's lucky number and end the conversation.
    conv.close('Your lucky number is ' + luckyNumber);
});*/
app.intent('Default Welcome Intent', (conv) => {
  conv.ask('Hello! Welcome to Favourite City Name Maker, Let us get started..! Tell me your Name and Favourite City in the World...!');
});
// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('make_name_get_city_name', (conv, {firstName, cityName}) => {
    conv.ask('Your name can be called as ' + cityName + ' ' + firstName + '.! Do you want to play this again?');
});

app.intent('make_name_get_city_name - yes', (conv, {sayYes}) => {
    conv.ask('OK, Let us try this one more time.! Tell me Your Name and Favourite City in the World...!');
});

app.intent('make_name_get_city_name - no', (conv, {sayNo}) => {
    conv.close('OK, Let us stop here');
});
// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
