/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    var request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewCursedImageIntent');
  },
  handle(handlerInput) {
    var factArr = data;
    var factIndex = Math.floor(Math.random() * factArr.length);
    var randomCITitle = factArr[factIndex][0];
    var randomCIImage = factArr[factIndex][1];    
    var speechOutput = randomCITitle;
    console.log(randomCITitle);
    console.log(randomCIImage);
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withStandardCard(SKILL_NAME, randomCITitle, randomCIImage, randomCIImage)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'CURSED_IMAGE';
const HELP_MESSAGE = 'You can ask me for a cursed image, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  ['cursed_hit', 'https://i.redd.it/wky6djdc86z01.jpg'],
  ['cursed_defense', 'https://i.redd.it/xu6jxmwr67f11.jpg'],
  ['cursed_beverage', 'https://i.imgur.com/vQwb5zO.jpg'],
  ['cursed_arrest', 'https://i.redd.it/58of6g6zxaq11.jpg'],
  ['cursed_ride', 'https://i.redd.it/63q73fxgg0j11.jpg'],
  ['cursed_rage', 'https://i.redd.it/507p6ayp91w01.jpg'],
  ['cursed_party', 'https://i.redd.it/fey5b7756fx01.jpg'],
  ['cursed_todd_howard','https://i.redd.it/6ipk5ua5ch611.png'],
  ['cursed_concert', 'https://i.redd.it/mvu9cpd2ixu11.jpg'],
  ['cursed_stream', 'https://i.imgur.com/J11U2no.jpg']
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
