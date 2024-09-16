const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
require('dotenv').config(); // Use environment variables for DB connection

const LogSchema = require('./models/Logs');
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

app.post('/polls/create', async (req, res) => {
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

app.put('/polls/:pollId', async (req, res) => {
  try {
    const { pollId } = req.params;
    const { title, options } = req.body;

    const poll = await PollModel.findById(pollId);
    if (!poll) {
      return res.status(404).send('Poll not found');
    }

    poll.title = title || poll.title;
    poll.options = options || poll.options;
    poll.updatedAt = Date.now();

    await poll.save();

    await LogModel.updateOne({ logId: pollId }, { $push: { polls: poll } });

    res.status(200).send('Poll updated successfully');
  } catch (error) {
    console.error('Error updating poll:', error);
    res.status(500).send('Error updating poll');
  }
});

app.delete('/polls/:pollId', async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await PollModel.findByIdAndDelete(pollId);
    if (!poll) {
      return res.status(404).send('Poll not found');
    }

    await LogModel.deleteOne({ logId: pollId });

    res.status(200).send('Poll deleted successfully');
  } catch (error) {
    console.error('Error deleting poll:', error);
    res.status(500).send('Error deleting poll');
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
