'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

var facts = ['Tamil is one of the longest-surviving classical languages in the World. ',
'Tamil being one of 7 classical languages in the World, still it is used as spoken language by Tamil native speakers and Tamil diaspora around the World.',
'Tamil word, "Amma" to denote the mother, has been adapted by many languages around the World.',
'Tamil is the mother tongue of nearly 75 million people and nearly 85 million people can speak Tamil.',
'Tamil has 12 vowels and 18 consonents. These two combine to form 216 compound letters. Plus one special character called Ayudha Eluthu. It gives total of 247 letters.',       
'Tamil has total of Two Hundred and Forty Seven letters.',
'Tamil vowels are called as Soul letters and consonents are called as Body letters. Rest of compound letters are called as living letters, (Because they formed by Soul plus Body letters).',
'Tamil has a continuous unbroken flow of literature for more than two millennia.',
'Old Tamil is the period of the Tamil language spanning the 5th century BC to the 8th century AD. \
The earliest records in Old Tamil are short inscriptions from between the 5th and 2nd century BC in caves and on pottery.',
'Tamil language inscriptions, written in Tamil Brahmi script have been discovered in Sri Lanka and on trade goods in Thailand and Egypt.',
'Tamil was declared a classical language by UNESCO in 2004.',
'Two Tamil manuscripts are Recorded in UNESCO Memory of the World Register in 1997 and 2005.',
'More than 55% of the epigraphical inscriptions (about 55,000), found by the Archaeological Survey of India are in Tamil language.',
'The Tamil Lexicon, published by the University of Madras, was one of the earliest dictionaries published in the Indian languages.',
'Tamil poet Thiru-valluvar has written couplet format poem Thiru-kural 2000 years before. It got translated into most number of other languages.',
'Tamil, Apart from being the name of the language, it also gives meaning like beauty, sweet and natural.',
'Tamil has around 47 meaningful single letter words. For example: Ko means, Cow or King. Ni means, You. ',
'Tamil has the earliest period of literature, known as Sangam literature, is dated from circa 300 BC to AD 300.',
'Tamil is having official language status in India, Sri Lanka and Singapore.',
'The meaning of a sentence won’t change in Tamil, even if you displace the words in it. For example, Try to replace words in the sentence: Raaman Ilanggaykku Chendraar.',
'Tamil belongs to the southern branch of the Dravidian languages. Tamil is spoken in the form of 23 dialects.',
'Tamil has a term to denote 10 to the power of 21 (called as Aambal).',
'Tamil has a term to denote fraction of 1 by 165,580,800 (called as Anu).',
'American academic Professor George T.Hall who greatly contributed in declaring Tamil as a classical language at international level.',
'Archeological excavation happened in Keeladi, a village in southern Tamilnadu near Madurai, revealed the proof of Urbanised civilisation existed during 200 BC in banks of river Vaigai.',
'Tamil words has been loaned by many languages. For example, English language has loaned more than 100 words from Tamil.',
'Oldest Tamil writing system was called as Tamil-Brahmi, or Tamili.',
'Tamil Brahmi scripts, differs in several ways from Ashokan Brahmi. Tamil Brahmi letters ends with consonents like iṉ, iṟ, and iḷ, but Ashokan Brahmi ends with sound "a".'
    ];

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

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
