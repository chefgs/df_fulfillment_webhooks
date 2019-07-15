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
// Instantiate the Dialogflow client.
// const app = dialogflow({debug: true, clientId: CLIENT_ID});
const app = dialogflow({debug: true});

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

app.intent('make_name_get_city_name', (conv, {firstName, cityName}) => {
  conv.data.cityName = "";
  if (conv.data.userName && cityName) {
    //conv.ask('Your name can be called as ' + cityName + ' ' + conv.data.userName + '.! Do you want to play this again?');
    conv.ask('Your name can be called as ' + cityName + ' ' + conv.data.userName + '.!');
    conv.data.cityName = cityName;
    conv.ask("Do you want to search more about your favourite city " + conv.data.cityName + "?" + "\n You can choose to say either 'Search' or 'Don't Search'");
    conv.ask(new Suggestions("Search", "Don't Search"));
    //conv.ask('Do you want to this one more time?');
    //conv.ask(new Suggestions('No', 'Yes'));
  } else if (firstName && cityName) {
    conv.ask('Your name can be called as ' + cityName + ' ' + firstName + '.!');
    conv.data.cityName = cityName;
    conv.ask("Do you want to search more about your favourite city " + conv.data.cityName + "?" + "\n You can choose to say either 'Search' or 'Don't Search'");
    conv.ask(new Suggestions("Search", "Don't Search"));
  } else { 
    conv.ask("\nYou're missing to tell either of First name or City name");
  }
});

app.intent('make_name_get_city_name-search_city', (conv, {search_val_yes}) => {
  //searchGoogle( cityName );
  var cityName = conv.data.cityName;
  if (conv.screen) {
    conv.ask("OK, Let us search Google for more info about " + cityName + "!");
    conv.close(new BasicCard({
      text: "Click on the search info for more info about your favourite city " + cityName + '!' ,
      //subtitle: 'This is a subtitle',
      title: "Google Search Info for " + cityName,
      buttons: new Button({
        title: "Search " + cityName + " info!",
        url: "https://www.google.com/search?q=" + cityName,
      })
  }));    
  } else {
    conv.ask("Sorry, try this on a screen device or select the " +
    "phone surface in the simulator.");
    return;
  }

});

app.intent('make_name_get_city_name-search_city_no', (conv) => {
    conv.ask('Do you want to try City name maker one more time?');
    conv.ask(new Suggestions('No', 'Yes'));
});

app.intent('make_name_get_city_name - yes', (conv, {sayYes}) => {
  if (conv.data.userName) {
    conv.ask("OK " + conv.data.userName +", Let us try this one more time.! Tell me Favourite City. You can choose a city from suggestions or tell me some other city.");
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
