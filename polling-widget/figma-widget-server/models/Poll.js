const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  id: {
    type: int
  }
});

module.exports = PollSchema
v