const mongoose = require('mongoose');
const MessageModel = require('../models/Message');
const db = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    // Log the MongoDB URI (remove this in production)
    console.log('MongoDB URI:', db);

    // Connect to MongoDB without deprecated options
    await mongoose.connect(db);

    console.log('-----MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
