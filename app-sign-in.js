// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
// Import the Dialogflow module from the Actions on Google client library.
//const {dialogflow} = require('actions-on-google');

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const CLIENT_ID = '123abc-app-clientID.apps.googleusercontent.com';


const {
  dialogflow,
  Permission,
  SignIn,
  Suggestions
} = require('actions-on-google');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

// Instantiate the Dialogflow client.
const app = dialogflow({clientId: CLIENT_ID,});


// Create a Dialogflow intent with the `actions_intent_SIGN_IN` event.
app.intent('account_sign_in', (conv, params, signin) => {
  if (signin.status === 'OK') {
    const payload = conv.user.profile.payload;
    conv.ask(`I got your account details, ${payload.name}. What do you want to do next?`);
    conv.ask(new Suggestions(['Create a Linux Instance']));
  } else {
    conv.ask(`I won't be able to save your data, but what do you want to do next?`);
  }
});

// Default welcome intent
app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new SignIn('To get your account details'));
    conv.ask("\nWelcome to my agent!, What can I do for you?");
    conv.ask(new Suggestions(['Suggestion text']));
});
