const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    id: {
      type: String,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),  // Assigns a unique ID
      default: () => new mongoose.Types.ObjectId().toString(),  // Assigns a unique ID
    },
    parentId: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: '',  // Default empty string for text
      default: '',  // Default empty string for text
    },
    sender: {
      type: String,
      default: 'anonymous',  // Default sender name if not provided
      default: 'anonymous',  // Default sender name if not provided
    },
    timestamp: {
      type: Date, // Store as Date object instead of a string
      default: Date.now,  // Default to current timestamp
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
      default: [],  // Default to an empty array
      default: [],  // Default to an empty array
    },
    downvotedUsers: {
      type: [String],
      default: [],  // Default to an empty array
      default: [],  // Default to an empty array
    },
    directReply: {
      type: Number,
      default: 0,  // Default to zero for no replies
      default: 0,  // Default to zero for no replies
    },
    logId: {
    logId: {
      type: Number,
      required: true,  // Ensure logId is provided
      required: true,  // Ensure logId is provided
    },
    anonymous: {
    anonymous: {
      type: Boolean,
      default: false,  // Default to not being anonymous
      default: false,  // Default to not being anonymous
    }
});
});

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;

