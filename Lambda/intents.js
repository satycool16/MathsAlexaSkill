const sessionModule = require('./sessionAttributes');
const mathModule = require('./maths');

module.exports ={
  tellTable: function(intent, session, callback) {
        const cardTitle = intent.name;
        const sessionAttributes = {};
        const num = intent.slots.numberTable.value;
        let repromptText = '';
        const shouldEndSession = true;
        let speechOutput ='';
        for(var i=1;i<=10;i++)
        {
            var product=num*i;
            speechOutput+=num+' is to '+ i+' is equals to ' +product+'     ' ;
        }
        callback(sessionAttributes,
             module.exports.buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    },

  tellFactorial: function(intent, session, callback) {
        const cardTitle = intent.name;
        const sessionAttributes = {};
        const num = intent.slots.numberFact.value;
        let repromptText = '';
        const shouldEndSession = true;
        let speechOutput ='factorial';
        speechOutput=speechOutput+'of number '+ num +' is ' + mathModule.getFactorial(num)+'';
        callback(sessionAttributes,
             module.exports.buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    },

  tellSquare: function(intent, session, callback) {
        const cardTitle = intent.name;
        const sessionAttributes = {};
        const num = intent.slots.numberSquare.value;
        let repromptText = '';
        const shouldEndSession = true;
        let speechOutput ='Square';
        speechOutput=speechOutput+' of number '+' '+ num +' is ' + mathModule.getSquare(num)+'';
        callback(sessionAttributes,
             module.exports.buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    },

  calculateArea: function(intent, session, callback) {
        const cardTitle = intent.name;
        var sessionAttributes={};
        var speechOutput;
        var shape = intent.slots.ShapeTwoD.value;
        shape=shape.toLowerCase();
        let repromptText = '';
        var shouldEndSession = false;
        console.log("came inside calculateArea-" +shape);
        speechOutput=mathModule.getSpeechForShape(shape);
        if(speechOutput=='Invalid shape')
        {
          speechOutput="Our Mathematician are working hard to find the area of "+ shape+" we will get back to you soon";
          shouldEndSession = true;
        }
        else {
          sessionAttributes = sessionModule.setShapeAttribute(sessionAttributes,shape);
        }
        callback(sessionAttributes,
             module.exports.buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    },

  processInput: function(intent, session, callback) {
        const cardTitle = intent.name;
        var sessionAttributes = session.attributes;
        const val = intent.slots.Input.value;
        var speechOutput;
        var shouldEndSession;
        var area;
        let repromptText='';
        if(typeof(session.attributes)!='undefined'){
          switch (session.attributes.shape) {
            case 'circle':
              area=mathModule.getAreaOfCircle(val);
              speechOutput="The area of circle is "+area;
              shouldEndSession=true;
            break;
            case 'square':
              area=mathModule.getAreaOfSquare(val);
              speechOutput="The area of square is "+area;
              shouldEndSession=true;
            break;
            case 'rectangle':
              if(session.attributes.length){
                area=mathModule.getAreaOfRectangle(session.attributes.length,val);
                speechOutput="The area of rectangle is "+area;
                shouldEndSession=true;
              }
              else {
                shouldEndSession=false;
                sessionAttributes=sessionModule.setLengthAttribute(sessionAttributes,val);
                speechOutput="What is the breadth of rectangle";
                console.log("Setting shouldEndSession="+shouldEndSession);
              }
            break;
            case 'triangle':
              if(session.attributes.base){
                area=mathModule.getAreaOfTriangle(session.attributes.base,val);
                //console.log("Sending values="+session.attributes.base+val);
                speechOutput="The area of triangle is "+area;
                shouldEndSession=true;
              }
              else {
                shouldEndSession=false;
                sessionAttributes=sessionModule.setBaseAttribute(sessionAttributes,val);
                speechOutput="What is the height of triangle";
              }
            break;
            default:
          }
        }
        else {
          speechOutput="I dont know which operation to do, just ask by saying what is the area of circle";
          shouldEndSession=false;
        }
        callback(sessionAttributes,
             module.exports.buildSpeechletResponse(cardTitle, speechOutput,repromptText, shouldEndSession));
    },

    getWelcomeResponse: function(callback) {
        const sessionAttributes = {};
        const cardTitle = 'Welcome';
        const speechOutput = 'Welcome to the Maths Teacher skill ' +
            'Just ask by saying, tell me the table of four or what is area of square or what is the square of 19' ;
        const repromptText = 'Just ask by saying, tell me the table of four';
        const shouldEndSession = false;

        callback(sessionAttributes,
            module.exports.buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    },

    onLaunch: function(launchRequest, session, callback) {
        console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);
        // Dispatch to your skill's launch.
        module.exports.getWelcomeResponse(callback);
    },

    buildSpeechletResponse: function(title, output, repromptText, shouldEndSession) {
        return {
            outputSpeech: {
                type: 'PlainText',
                text: output,
            },
            card: {
                type: 'Simple',
                title: `SessionSpeechlet - ${title}`,
                content: `SessionSpeechlet - ${output}`,
            },
            reprompt: {
                outputSpeech: {
                    type: 'PlainText',
                    text: repromptText,
                },
            },
            shouldEndSession,
        };
    }
}
