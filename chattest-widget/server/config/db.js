const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MessageModel = require('../models/Message');
const db = process.env.MONGODB_URI;


const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('-----MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
