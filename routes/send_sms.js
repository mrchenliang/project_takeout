//This file is used to send a message to users about their orders

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

const sendMessage = function(message, number) {
  client.messages
    .create({
      body: message,
      from: '+16473608610',
      to: number
    })
    .then(message => console.log(message.sid));
};

module.exports = sendMessage;
