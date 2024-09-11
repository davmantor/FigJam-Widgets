const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const LogModel = require('./models/Logs');
const db = process.env.MONGODB_URI;

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(db, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds
  socketTimeoutMS: 45000 // 45 seconds
});

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.error(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to MongoDB'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
