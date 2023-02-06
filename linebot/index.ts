const line = require('@line/bot-sdk');
require("dotenv").config();

const config = {
    channelSecret: process.env.CHANNEL_SECRET, 
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

const client = new line.Client(config);

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    if (req.query.message || (req.body && req.body.events)) {
        if (req.body && req.body.events[0]) {

            const message = {
                type: "text",
                text: req.body.events[0].message.text
            }


            console.log(message);
            if (req.body.events[0].replyToken) {
                client.replyMessage(req.body.events[0].replyToken, message);
            }

        }
        else {
            context.res = {
                status: 200,
                body: "You said" + req.query.message
            };
        }
    }
    else {
        context.res = {
            status: 200,
            body: "Please check the query string in the request body"
        };
    };
};