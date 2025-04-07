const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  group: {
    type: String,
    default: "None"
  },
  title: {
    type: String,
    required: true,
  },
  subheading: {  // ➕ Added subheading field
    type: String,
    default: "",  // Optional, can be empty if not provided
  },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 },
      voters: [
        {
          name: { type: String, default: 'Unknown User' },
        }
      ]
    }
  ],
  totalVotes: {
    type: Number,
    default: 0,
  },
  isAnonymous: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = PollSchema;
