// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const {
  dialogflow,
  Permission,
  SignIn,
  Suggestions
} = require('actions-on-google');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

const CLIENT_ID = '29482288043-nejagq5sbb8snu9qf62b4utn3npcotju.apps.googleusercontent.com';

//const app = dialogflow({debug: true});
const app = dialogflow({clientId: CLIENT_ID});


// Default welcome intent
app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new SignIn('To get your account details'));
    conv.ask("\nWelcome to my agent!, What can I do for you?");
});

// Create a Dialogflow intent with the `actions_intent_SIGN_IN` event.
app.intent('simple-signin', (conv, params, signin) => {
  if (signin.status === 'OK') {
    const payload = conv.user.profile.payload;
    conv.ask(`I got your account details, ${payload.name}. Have a great day`);
  } else {
    conv.ask(`I won't be able to save your data, Have a great day`);
  }
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);