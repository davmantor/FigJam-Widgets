// models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    id: {
      type: String,
      unique: true,
    },
    parentId: {
      type: String,
      default: null,
    },
    text: {
      type: String,
    },
    sender: {
      type: String,
    },
    timestamp: {
      type: String,
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
    logId:{
      type: Number,
    }
  });

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;