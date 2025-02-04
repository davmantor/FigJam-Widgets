const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  parentId: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: '',
  },
  sender: {
    type: String,
    default: 'anonymous',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  deleteConfirm: {
    type: Boolean,
    default: false,
  },
  showReplies: {
    type: Boolean,
    default: false,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  upvotedUsers: {
    type: [String],
    default: [],
  },
  downvotedUsers: {
    type: [String],
    default: [],
  },
  directReply: {
    type: Number,
    default: 0,
  },
  logId: {
    type: Number,
    default: 0,
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  userIcon: {
    type: String,
    default: '',
  }
});

// Export only the schema so that the model can be associated with the correct database context
module.exports = MessageSchema;
