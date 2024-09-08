const mongoose = require('mongoose');
const MessageSchema = require('./Message').schema; // Import the Message schema

const LogSchema = new mongoose.Schema({
    logId: {
        type: Number,
        required: true, // Ensuring logId is required
        unique: true // Ensure uniqueness across logs
    },
    messages: {
        type: [MessageSchema],
        default: () => [{
            text: 'This is a temporary message',
            sender: 'System'
        }]
    }
}, { autoIndex: false }); // Disable automatic indexing

const LogModel = mongoose.model('Log', LogSchema);

module.exports = LogModel;
