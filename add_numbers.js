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
  
  function arithmeticHandler(agent)
  {
    //if (isNaN(agent.parameters.integer) && isNaN(agent.parameters.integer1))
    //{
    //  agent.add ('Please provide me the numbers as input. Do you want to try this again?');
    //}
    //else
    //{
      var number1 = parseFloat(agent.parameters.integer) ;
      var number2 = parseFloat(agent.parameters.integer1) ;
      var result = ( number1 + number2 );
      agent.add( number1.toString() + ' plus ' + number2.toString() + ' is: ' + result.toString() + ' . ');
      agent.add(' Do you want to try this again?');
    //}
  }
  
  function defaultIntentHandler()
  {
    agent.add('Hello! What are the two numbers I can add for you?');
    //if ( typeof agent.parameters.integer === 'string' &&  typeof agent.parameters.integer1 === 'string'  )
  }
  
  function arithmeticHandlerFollowupYes()
  {
    agent.add ('OK, what are the two numbers, you want to add?');
  }
  
  function arithmeticHandlerFollowupNo()
  {
    agent.add ('OK, Let us stop here!');
  }
  let intentMap = new Map();
  //intentMap.set('Default Welcome Intent', defaultIntentHandler);
  intentMap.set('add_numbers', arithmeticHandler);

  agent.handleRequest(intentMap);
});

