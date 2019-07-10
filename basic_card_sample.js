'use strict';

// Import the Dialogflow module and response creation dependencies from the 
// Actions on Google client library.
const {
  dialogflow,
  Permission,
  Suggestions, BasicCard, Button,
  SignIn
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');
const CLIENT_ID = '1006699026241-bvk1lo04trb674ecvulj7n1cua8edi7h.apps.googleusercontent.com ';
// Instantiate the Dialogflow client.
const app = dialogflow({debug: true, clientId: CLIENT_ID});

/* // Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('favorite color', (conv, {color}) => {
    const luckyNumber = color.length;
    // Respond with the user's lucky number and end the conversation.
    conv.close('Your lucky number is ' + luckyNumber);
});
app.intent('account_signin', (conv, params, signin) => {
  if (signin.status === 'OK') {
    const payload = conv.user.profile.payload;
    conv.ask(`I got your account details, ${payload.name}. Shall we start City Name Maker`);
    conv.ask(new Suggestions(['Yes'], ['No']));
  } else {
    conv.ask(`I won't be able to save your data, but what do you want to do next?`);
  }
});*/

function searchGoogle( cityName ) {
  const GSR = require('google-search-results-nodejs');
  const client = new GSR.GoogleSearchResults();
  client.html({
   q: cityName
   }, (result) => {
        // create a callback
        //callback = (result) => {
        console.log(result);
       //};
   });
  
  // Show result as HTML file
  //client.html(query_params, callback)
}
app.intent('Default Welcome Intent', (conv) => {
  conv.ask(new Permission({
    context: "Hello! Welcome to Favourite City Name Maker! to get to know you better",
    permissions: 'NAME'
  }));
    //conv.ask(new SignIn('To get your account details'));
    //conv.ask("\nHello! Welcome to Favourite City Name Maker!"); 
});

// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
  if (!permissionGranted) {
    conv.ask("Ok, no worries.!");
    conv.ask("\nLet us get started..! What's your First Name and Favourite City in the World...!");
    
  } else {
    conv.data.userName = conv.user.name.display;
    conv.ask("Thanks, " + conv.data.userName + ". What's your favorite city? You can choose a city from suggestions or tell me some other city.");
    conv.ask(new Suggestions('London', 'Paris', 'Chennai'));
  }
});
// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('make_name_get_city_name', (conv, {firstName, cityName}) => {
  if (conv.data.userName && cityName) {
    //conv.ask('Your name can be called as ' + cityName + ' ' + conv.data.userName + '.! Do you want to play this again?');
    conv.ask('Your name can be called as ' + cityName + ' ' + conv.data.userName + '.!');
    conv.ask('Do you want to know more about your favourite city?');
    conv.ask(new Suggestions('Dont Search', 'Search'));
    //conv.ask('Do you want to this one more time?');
    //conv.ask(new Suggestions('No', 'Yes'));
  } else if (firstName && cityName) {
    conv.ask('Your name can be called as ' + cityName + ' ' + firstName + '.! Do you want to play this again?');
  } else { 
    conv.ask("\nYou're missing to tell either of First name or City name");
  }
});

app.intent('make_name_get_city_name-search_city', (conv, {search_val_yes, cityName}) => {
  //searchGoogle( cityName );
  //conv.ask('OK, Let us search Google!');
  if (!conv.screen) {
  conv.ask('Sorry, try this on a screen device or select the ' +
    'phone surface in the simulator.');
  return;
}

conv.ask(new BasicCard({
  text: 'Here is the Google search info for your favourite city ' + cityName + '!' ,
  //subtitle: 'This is a subtitle',
  title: 'Title: Google Search Info for ' + cityName,
  buttons: new Button({
    title: 'Search' + cityName + ' Info',
    url: 'https://www.google.com/search?q=' + cityName,
  })
}));
});

app.intent('make_name_get_city_name-search_city_no', (conv, {search_val_no}) => {
    conv.ask('Do you want to this one more time?');
    conv.ask(new Suggestions('No', 'Yes'));
});

app.intent('make_name_get_city_name - yes', (conv, {sayYes}) => {
  if (conv.data.userName) {
    conv.ask("OK, Let us try this one more time.! Tell me Favourite City, You can choose a city from suggestions or tell me some other city.");
    conv.ask(new Suggestions('London', 'Paris', 'Chennai'));
  } else { 
    conv.ask("OK, Let us try this one more time.! Tell me Your Name and Favourite City in the World.!");
  }
});

app.intent('make_name_get_city_name - no', (conv, {sayNo}) => {
    conv.close('OK, Let us stop here');
});
// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
'use strict';

// Import the Dialogflow module and response creation dependencies from the 
// Actions on Google client library.
const {
  dialogflow,
  Permission,
  Suggestions, BasicCard, Button,
  SignIn
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');
const CLIENT_ID = '1006699026241-bvk1lo04trb674ecvulj7n1cua8edi7h.apps.googleusercontent.com ';
// Instantiate the Dialogflow client.
const app = dialogflow({debug: true, clientId: CLIENT_ID});

/* // Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('favorite color', (conv, {color}) => {
    const luckyNumber = color.length;
    // Respond with the user's lucky number and end the conversation.
    conv.close('Your lucky number is ' + luckyNumber);
});
app.intent('account_signin', (conv, params, signin) => {
  if (signin.status === 'OK') {
    const payload = conv.user.profile.payload;
    conv.ask(`I got your account details, ${payload.name}. Shall we start City Name Maker`);
    conv.ask(new Suggestions(['Yes'], ['No']));
  } else {
    conv.ask(`I won't be able to save your data, but what do you want to do next?`);
  }
});*/

function searchGoogle( cityName ) {
  const GSR = require('google-search-results-nodejs');
  const client = new GSR.GoogleSearchResults();
  client.html({
   q: cityName
   }, (result) => {
        // create a callback
        //callback = (result) => {
        console.log(result);
       //};
   });
  
  // Show result as HTML file
  //client.html(query_params, callback)
}
app.intent('Default Welcome Intent', (conv) => {
  conv.ask(new Permission({
    context: "Hello! Welcome to Favourite City Name Maker! to get to know you better",
    permissions: 'NAME'
  }));
    //conv.ask(new SignIn('To get your account details'));
    //conv.ask("\nHello! Welcome to Favourite City Name Maker!"); 
});

// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
  if (!permissionGranted) {
    conv.ask("Ok, no worries.!");
    conv.ask("\nLet us get started..! What's your First Name and Favourite City in the World...!");
    
  } else {
    conv.data.userName = conv.user.name.display;
    conv.ask("Thanks, " + conv.data.userName + ". What's your favorite city? You can choose a city from suggestions or tell me some other city.");
    conv.ask(new Suggestions('London', 'Paris', 'Chennai'));
  }
});
// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('make_name_get_city_name', (conv, {firstName, cityName}) => {
  if (conv.data.userName && cityName) {
    //conv.ask('Your name can be called as ' + cityName + ' ' + conv.data.userName + '.! Do you want to play this again?');
    conv.ask('Your name can be called as ' + cityName + ' ' + conv.data.userName + '.!');
    conv.ask('Do you want to know more about your favourite city?');
    conv.ask(new Suggestions('Dont Search', 'Search'));
    //conv.ask('Do you want to this one more time?');
    //conv.ask(new Suggestions('No', 'Yes'));
  } else if (firstName && cityName) {
    conv.ask('Your name can be called as ' + cityName + ' ' + firstName + '.! Do you want to play this again?');
  } else { 
    conv.ask("\nYou're missing to tell either of First name or City name");
  }
});

app.intent('make_name_get_city_name-search_city', (conv, {search_val_yes, cityName}) => {
  //searchGoogle( cityName );
  //conv.ask('OK, Let us search Google!');
  if (!conv.screen) {
  conv.ask('Sorry, try this on a screen device or select the ' +
    'phone surface in the simulator.');
  return;
}

conv.ask(new BasicCard({
  text: 'Here is the Google search info for your favourite city ' + cityName + '!' ,
  //subtitle: 'This is a subtitle',
  title: 'Title: Google Search Info for ' + cityName,
  buttons: new Button({
    title: 'Search' + cityName + ' Info',
    url: 'https://www.google.com/search?q=' + cityName,
  })
}));
});

app.intent('make_name_get_city_name-search_city_no', (conv, {search_val_no}) => {
    conv.ask('Do you want to this one more time?');
    conv.ask(new Suggestions('No', 'Yes'));
});

app.intent('make_name_get_city_name - yes', (conv, {sayYes}) => {
  if (conv.data.userName) {
    conv.ask("OK, Let us try this one more time.! Tell me Favourite City, You can choose a city from suggestions or tell me some other city.");
    conv.ask(new Suggestions('London', 'Paris', 'Chennai'));
  } else { 
    conv.ask("OK, Let us try this one more time.! Tell me Your Name and Favourite City in the World.!");
  }
});

app.intent('make_name_get_city_name - no', (conv, {sayNo}) => {
    conv.close('OK, Let us stop here');
});
// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
