const mongoose = require('mongoose');
const MessageSchema = require('./Message'); // Import the Message schema

const LogSchema = new mongoose.Schema({
  logId: {
    type: Number,
    required: true,
    unique: true,
  },
  messages: {
    type: [MessageSchema],
    default: () => [{
      text: 'This is a temporary message',
      sender: 'System',
    }]
  }
}, { autoIndex: false });

// Export only the schema, not the model
module.exports = LogSchema;
