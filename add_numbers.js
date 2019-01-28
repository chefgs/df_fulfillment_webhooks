'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

// Instantiate the Dialogflow client.
//const app = dialogflow({debug: true});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  
  function arithmaticHandler(agent)
  {
    var number1 = parseInt(agent.parameters.integer) ;
    var number2 = parseInt(agent.parameters.integer1) ;
    var result = ( number1 + number2 );
    agent.add( 'Result ' + result.toString() );
  }
  
  let intentMap = new Map();
  intentMap.set('add_numbers', arithmaticHandler);
  //intentMap.set('Default Fallback Intent', fallback);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});

/*
var number = app.parameters.integer;
var number2 = app.parameters.integer2;
var result = (+number + +number2);
    
app.intent('add_numbers', (conv) => {
//    conv.ask('<speak><audio src="${audioSound}"></audio>' + 'Here is the Fact about Tamil! ' + randomFact(facts) + ' Do you want to hear another fact?' + '</speak>');
    conv.ask('Wow! Result of ${number} and ${number2} is ${result}');
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);


var facts = [  ];

var hearIsTheFact = ['Okay, Here is the Fact! ',
'Okay, Here is the next one! ',
'Okay, let us hear another fact! ',
'Okay, here it is! '];

function randomFact(facts)
{
  const arrLength = facts.length;
  return facts[Math.floor(Math.random() * arrLength)];
}

function random(strArray)
{
  const arrLength = strArray.length;
  return strArray[Math.floor(Math.random() * arrLength)];
}

// Tamil facts intent
app.intent('tamil_facts', (conv) => {
//    conv.ask('<speak><audio src="${audioSound}"></audio>' + 'Here is the Fact about Tamil! ' + randomFact(facts) + ' Do you want to hear another fact?' + '</speak>');
    conv.ask('Here is the Fact about Tamil! ' + randomFact(facts) + ' Do you want to hear another fact?');
});

app.intent('tamil_facts - yes', (conv) => {
    conv.ask(random(hearIsTheFact) + randomFact(facts) + ' Do you want to hear another fact?');
});

app.intent('tamil_facts - no', (conv) => {
    conv.close('OK, Let us stop here. Fact references taken from Google Search, Quora and Wikipedia.');
});

app.intent('tamil_facts_letters', (conv) => {
    conv.ask('Here is the Fact! ' + 'Tamil has 12 vowels and 18 consonents. \
    These two combine to form 216 compound letters. \
    Plus one special character called Ayudha Eluthu. \
    It gives total of 247 letters.' + ' Do you want to hear another fact?');
});

app.intent('tamil_facts_letters - yes', (conv) => {
    conv.ask(random(hearIsTheFact) + randomFact(facts) + ' Do you want to hear another fact?');
});

app.intent('tamil_facts_letters - no', (conv) => {
    conv.close('OK, Let us stop here. Fact references taken from Google Search and Wikipedia.');
});
*/
