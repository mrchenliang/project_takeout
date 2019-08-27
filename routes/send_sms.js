//This file is used to send a message to users about their orders

const accountSid = 'AC9e93205a99a6539689388b48f5f2d61c';
const authToken = '0d3dfcad366973c43614361a219f01a2';
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
