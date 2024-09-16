const mongoose = require('mongoose');
const PollSchema = require('./Poll'); 

const LogSchema = new mongoose.Schema({
  logId: {
    type: Number,
    required: true,
    unique: true,
  },
  polls: {
    type: [PollSchema],
    default: () => [{
      text: 'This is a temporary poll',
      sender: 'System',
    }]
  }
}, { autoIndex: false });

module.exports = LogSchema;
