// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
admin.initializeApp();
const auth = admin.auth();
const db = admin.firestore();

const {
  dialogflow,
  Permission,
  SignIn,
  Suggestions
} = require('actions-on-google');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

const CLIENT_ID = '793235640468-cgl1kt7i04l37fhgdici5bvoubv6g238.apps.googleusercontent.com';

//const app = dialogflow({debug: true});
const app = dialogflow({debug: true, clientId: CLIENT_ID});


// Default welcome intent
app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new SignIn('To get your account details'));
    conv.ask("\nWelcome to my agent!, What can I do for you?");
});

// Create a Dialogflow intent with the `actions_intent_SIGN_IN` event.
// Save the user in the Firestore DB after successful signin
app.intent('save-signin', (conv, params, signin) => {
  if (signin.status !== 'OK') {
    return conv.close(`Let's try again next time.`);
  }
  //const color = conv.data[Fields.COLOR];
  const {email} = conv.user;
  if (!conv.data.uid && email) {
    try {
      conv.data.uid = (auth.getUserByEmail(email)).uid;
    } catch (e) {
      if (e.code !== 'auth/user-not-found') {
        throw e;
      }
      // If the user is not found, create a new Firebase auth user
      // using the email obtained from the Google Assistant
      conv.data.uid = (auth.createUser({email})).uid;
    }
  }
  if (conv.data.uid) {
    conv.user.ref = db.collection('users').doc(conv.data.uid);
  }
  //conv.close(`I saved ${color} as your favorite color for next time.`);
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);