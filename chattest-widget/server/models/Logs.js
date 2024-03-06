const mongoose = require('mongoose');
const MessageSchema = require('./Message').schema; // Import the Message schema

const LogSchema = new mongoose.Schema({
    logId:{
        type: Number,
      }, 
    messages: {
        type: [MessageSchema],
        default: [{
            id:  Math.random(),
            text: 'This is a temporary message',
            sender: 'System'
        }]
    }
}, { autoIndex: false }); // Disable automatic indexing

const LogModel = mongoose.model('Log', LogSchema);

module.exports = LogModel;
