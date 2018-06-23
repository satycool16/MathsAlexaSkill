const intentModule= require('./intents');
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);
        console.log(`onLaunch requestId=${event.request.requestId}, sessionId=${event.session.sessionId}`);

        if (event.request.type === 'LaunchRequest') {
            intentModule.onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        }
    } catch (err) {
      console.log(`onLaunch requestId=${event.request.requestId}, sessionId=${event.session.sessionId}`);
        console.log(err);
        callback(err);
    }
};
function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}
/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;

    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'TableIntent') {
        intentModule.tellTable(intent, session, callback);
    }
    else if  (intentName === 'FactorialIntent') {
        intentModule.tellFactorial(intent, session, callback);
    }
     else if  (intentName === 'SquareIntent') {
        intentModule.tellSquare(intent, session, callback);
    }
    else if  (intentName === 'AreaIntent') {
       intentModule.calculateArea(intent, session, callback);
   }
   else if  (intentName === 'InputIntent') {
      intentModule.processInput(intent, session, callback);
  }
    else {
        throw new Error('Invalid intent');
    }
}
