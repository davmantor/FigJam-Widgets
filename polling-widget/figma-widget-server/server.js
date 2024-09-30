const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
require('dotenv').config(); // Use environment variables for DB connection

const LogSchema = require('./models/PollLogs');
const PollSchema = require('./models/Poll');

const db = process.env.MONGODB_URI;

mongoose.connect(db, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000 
});

const pollingDB = mongoose.connection.useDb('PollingWidget');
const PollModel = pollingDB.model('Poll', PollSchema); // Poll model
const LogModel = pollingDB.model('Log', LogSchema);    // Log model

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json()); 

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.error(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to MongoDB'));

app.post('/polls', async (req, res) => {
  console.log("hello world");
});

app.post('/polls/create', async (req, res) => {
  console.log("new widget created");
  try {
    const { title, options } = req.body;

    const newPoll = new PollModel({
      title,
      options,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await newPoll.save();

    const newLog = new LogModel({
      logId: newPoll.id,
      polls: [newPoll], 
    });

    await newLog.save();

    res.status(201).send({ pollId: newPoll._id, logId: newLog._id });
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).send('Error creating poll');
  }
});

app.get('/polls/:pollId', async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await PollModel.findById(pollId);

    if (!poll) {
      return res.status(404).send('Poll not found');
    }

    res.status(200).json(poll);
  } catch (error) {
    console.error('Error fetching poll:', error);
    res.status(500).send('Error fetching poll');
  }
});


app.put('/polls/update-id/:pollId', async (req, res) => {
  try {
    console.log(req.params);
    const { pollId } = req.params;
    const { newPollId } = req.body;

    const poll = await PollModel.findById(pollId);
    if (!poll) {
      return res.status(404).send('Poll not found');
    }

    // Update the poll ID
    poll.id = newPollId
    console.log(poll.id);
    console.log(poll);

    // Save the updated poll
    await poll.save();

    // Return the updated poll for confirmation
    return res.status(200).json(poll);
  } catch (error) {
    console.log(error);
    console.error('Error updating poll ID:', error);
    return res.status(500).send('Error updating poll ID');
  }
});

app.put('/polls/:pollId', async (req, res) => {
  try {
    console.log('Received data:', req.body); // Log the request data
    const { pollId } = req.params;
    const { options, totalVotes, updatedAt } = req.body;

    // Ensure that options are an array and have valid structure
    if (!Array.isArray(options)) {
      return res.status(400).send('Options must be an array');
    }
    console.log("totalVotes" + totalVotes);
    // Validate the structure of each option
    for (const option of options) {
      if (!option.text || typeof option.votes !== 'number' || !Array.isArray(option.voters)) {
        return res.status(400).send('Invalid option format');
      }
    }
    console.log("options" + options);
    // Find the poll by its ID
    const poll = await PollModel.findById(pollId);
    if (!poll) {
      return res.status(404).send('Poll not found');
    }
    console.log("Poll" + poll);

    // Update the poll options, totalVotes, and updatedAt
    poll.options = options || poll.options;
    poll.totalVotes = totalVotes || poll.totalVotes;
    poll.updatedAt = updatedAt || poll.updatedAt;
    console.log("ATTEMPTING TO SAVE");
    // Save the updated poll
    await poll.save();
    console.log("SAVE");
  } catch (error) {
    console.error('Error updating poll:', error);
    return res.status(500).send('Error updating poll');
  }
});


app.get('/logs/:logId', async (req, res) => {
  try {
    const { logId } = req.params;
    const log = await LogModel.findOne({ logId });

    if (!log) {
      return res.status(404).send('Log not found');
    }

    res.status(200).json(log);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).send('Error fetching logs');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
