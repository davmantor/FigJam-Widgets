const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package

const app = express();
require('dotenv').config(); // at the top of your server.js
const connectDB = require('./config/db'); // Import your connectDB function
const MessageSchema = require('./models/Message');
const LogSchema = require('./models/Logs');
const PollLogSchema = require('./models/PollLogs');
const PollSchema = require('./models/Poll');

const moment = require('moment');
const bodyParser = require('body-parser');

const ObjectId = mongoose.Types.ObjectId;


mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000 
});

const widgetSchema = new mongoose.Schema({
  widgetId: { type: String, unique: true },
  Group:{type: String,  default: "None"},
  previous: [{
    response: String,
    userName: String,
    photoUrl: String, // Added photoUrl field
    timestamp: { type: Date, default: Date.now } // Added timestamp field
  }],
  current: {
    response: String,
    userName: String,
    photoUrl: String, // Added photoUrl field
    timestamp: { type: Date, default: Date.now } // Added timestamp field
  },
  showPrevious: Boolean
});

const textEntryDB = mongoose.connection.useDb('TextEntryWidget');
const chatWidgetDB = mongoose.connection.useDb('ChatWidget');
const pollingDB = mongoose.connection.useDb('PollingWidget');

const MessageModel = chatWidgetDB.model('Message', MessageSchema); // Using MessageSchema
const LogModel = chatWidgetDB.model('Log', LogSchema); // Using LogSchema
const Widget = textEntryDB.model('log', widgetSchema);
const PollModel = pollingDB.model('Poll', PollSchema); // Poll model
const PollLogModel = pollingDB.model('Log', PollLogSchema);    // Log model




connectDB();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());


app.use(express.json()); // For parsing application/json

app.post('/chatwidget/create-widget', async (req, res) => {
    console.log("creating widget");
    try {
      const newLog = new LogModel({logId: req.body.logId});
      await newLog.save();
      // Store the log ID in the widget or return it to the client as needed
      console.log(newLog._id);
      res.status(201).send({ logId: newLog._id });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
  

// Define a POST route to save messages



  app.delete('/chatwidget/delete-widget/:logId', async (req, res) => {
    try {
      const log = await LogModel.findOneAndRemove({ logId: req.params.logId });
      // Optionally, delete all messages associated with the log
      await MessageModel.deleteMany({ _id: { $in: log.messages } });
      res.status(200).send({ message: 'Log and associated messages deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

  app.delete('/chatwidget/messages/:messageId', async (req, res) => {
    try {
      const message = await MessageModel.findByIdAndRemove(req.params.messageId);
  
      // Remove the message from the log
      await LogModel.updateMany({}, { $pull: { messages: message._id } });
  
      res.status(200).send({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/chatwidget/logs/:logId/messages', async (req, res) => {
    try {
      const logId = req.params.logId;
      const log = await LogModel.findOne({ logId: req.params.logId }).populate('messages');
      res.status(200).send({logId, messages: log.messages});
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
    
  

// Define a GET route to fetch messages

app.post('/chatwidget/messages', async (req, res) => {
  try {
    console.log('inside messages');
    let { timestamp, logId } = req.body;

    // Convert timestamp to a valid ISO 8601 date string
    const currentDate = new Date();
    const formattedTimestamp = moment(`${currentDate.toDateString()} ${timestamp}`, 'ddd MMM DD YYYY h:mm A').toISOString();

    // Update the request body with the formatted timestamp
    const messageData = { ...req.body, timestamp: formattedTimestamp };

    // Create a new message
    const message = new MessageModel(messageData);

    // Find the log by logId
    let log = await LogModel.findOne({ logId });

    // If log is not found, create a new log
    if (!log) {
      console.log("Creating new log");
      log = new LogModel({
        logId,
        messages: [] // Initialize messages as an empty array
      });
    }

    // Ensure log.messages exists before pushing the message
    if (!log.messages) {
      log.messages = []; // Initialize messages array if it doesn't exist
    }

    // Push the new message into the log's messages array
    log.messages.push(message);
    console.log('done');
    // Save the log and the message separately
    await log.save();
    await message.save();

    res.status(201).send(message);
  } catch (error) {
    console.log('error');
    console.error("Error in /messages route:", error);
    res.status(500).send(error.message);
  }
});





app.delete('/chatwidget/delete-widget/:logId', async (req, res) => {
    try {
      const log = await LogModel.findOne({ logId: req.params.logId }).populate('messages');
      // Optionally, delete all messages associated with the log
      await MessageModel.deleteMany({ _id: { $in: log.messages } });
      res.status(200).send({ message: 'Log and associated messages deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

  app.get('chatwidget/logs/:logId/updates', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    console.log("update");

    console.log(req.params.logId);

    let log = await LogModel.findOne({ logId: req.params.logId });
    if (!log) {
        console.log("making new");
        log = new LogModel({logId: req.body.logId});
        await log.save();
    }

    res.write(`data: ${JSON.stringify({message: "Test message"})}\n\n`);

    console.log(req.params.logId);

    // Set up a change stream to watch for changes in the LogModel
    const changeStream = LogModel.watch([
        { $match: { 'fullDocument._id': parseInt(req.params.logId) } }
    ]);

    changeStream.on('change', async (change) => {
        console.log("Change detected:", change);
        // Check if there are any changes to the document
        if (change.operationType === 'update' || change.operationType === 'replace') {
            await sendUpdate();
        }
    });

    // Clean up when the client closes the connection
    req.on('close', () => {
        console.log("Client connection closed");
        changeStream.close();
        res.end();
    });
});


const sendUpdate = async () => {
  const updatedLog = await LogModel.findOne({ logId: req.params.logId }).populate('messages');
  res.write(`data: ${JSON.stringify(updatedLog.messages)}\n\n`);
};

app.post('/textentrywidget/reset-widget', async (req, res) => {
  const { widgetId } = req.body;

  try {
    const widget = await Widget.findOne({ widgetId });

    if (!widget) {
      return res.status(404).send('Widget not found');
    }

    // Move the current response into previous only if it has content
    if (widget.current.response) {
      widget.previous.push(widget.current);
    }

    // Reset the current response
    widget.current = { response: "", userName: "", photoUrl: "", timestamp: Date.now() };


    widget.showPrevious = false;

    await widget.save();

    if (widget) {
      res.json({ status: 'success', widget });
    } else {
      res.status(404).send('Widget not found');
    }
    await widget.save();
  } catch (error) {
    console.error('Error resetting widget:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/textentrywidget/refresh', async (req, res) => {
  const { widgetId } = req.body;

  try {

    const widget = await Widget.findOneAndUpdate(
      { widgetId },
      { $setOnInsert: { widgetId, previous: [], current: { response: "", userName: "", photoUrl: "" }, showPrevious: false, Group: "None" } },
      { upsert: true, new: true }
    );
    return res.json({ status: 'updated', widget });
  } catch (error) {
    console.error('Error refreshing data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/textentrywidget/update-group', async (req, res) => {
  const { widgetId, group } = req.body;

  try {
    const widget = await Widget.findOneAndUpdate(
      { widgetId },
      { $set: { Group: group } },
      { new: true }
    );
    
    if (widget) {
      return res.json({ status: 'success', widget });
    } else {
      return res.status(404).send('Widget not found');
    }
  } catch (error) {
    console.error('Error updating group:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/textentrywidget/reveal-previous', async (req, res) => {
  const { widgetId } = req.body;

  try {
    // Find the widget by its ID and update its showPrevious field to true
    const widget = await Widget.findOneAndUpdate(
      { widgetId }, 
      { showPrevious: true }, 
      { new: true } // Return the updated widget document
    );

    if (widget) {
      return res.json({ status: 'success', widget });
    } else {
      return res.status(404).send('Widget not found');
    }
  } catch (error) {
    console.error('Error updating widget:', error);
    return res.status(500).send('Internal Server Error');
  }
});


app.post('/textentrywidget/submit', async (req, res) => {
  const { widgetId, response, userName, photoUrl, timestamp } = req.body;
  console.log(response);

  console.log('Received data:', { widgetId, response, userName, photoUrl, timestamp }); // Debugging line
  try {
    let widget = await Widget.findOne({ widgetId });
    console.log(widget);
    if (widget) {
      console.log("inside widget");
      if(widget.current.response){
        widget.previous.push(widget.current);
      }
      widget.current = { response, userName, photoUrl, timestamp };
      await widget.save();
      console.log('Updated widget:', widget); // Debugging line
      return res.json({ status: 'updated', widget });
    } else {
      console.log("new widget");
      widget = new Widget({ widgetId, previous: [], current: { response, userName, photoUrl, timestamp }, showPrevious: false });
      await widget.save();
      console.log('New widget created:', widget); // Debugging line
      return res.json({ status: 'new', widget });
    }
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/textentrywidget/reveal-all', async (req, res) => {
  console.log(req.body); 
  const { group } = req.body;

  try {
    let filter = {};

    // If a group is provided, add it to the filter criteria
    if (group) {
      filter = { 'Group': new RegExp(`^${group}$`, 'i') }; // Case-insensitive search
    }

    console.log('Searching for widgets in group:', group);
    console.log('Filter applied:', filter);
    const matchedWidgets1 = await Widget.find(filter);
    console.log('Matched Widgets1:', matchedWidgets1);


    // Update the showPrevious field for all matching widgets
    const result = await Widget.updateMany(filter, { $set: { showPrevious: true } });
    console.log('Query result:', result);

    const matchedWidgets2 = await Widget.find(filter);
    console.log('Matched Widgets2:', matchedWidgets2);


    // Use modifiedCount to check how many widgets were modified
    if (result.modifiedCount > 0) {
      res.json({ status: 'success', message: `${result.modifiedCount} widget(s) updated.` });
    } else {
      res.status(404).send('No widgets found for the specified criteria.');
    }
  } catch (error) {
    console.error('Error revealing data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/textentrywidget/add-response', async (req, res) => {
  const { widgetId, response, userName, photoUrl } = req.body;
  console.log("response", response);

  try {
    let widget = await Widget.findOne({ widgetId });
    if (widget && widget.current.response) {
      widget.previous.push({ response, userName, photoUrl });
      await widget.save();
      return res.json({ status: 'added' });
    } else {
      return res.status(404).send('Widget not found');
    }
  } catch (error) {
    console.error('Error adding response:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/textentrywidget/edit-response', async (req, res) => {
  const { widgetId, responseIndex, newResponse, newUserName, newPhotoUrl } = req.body;
  try {
    let widget = await Widget.findOne({ widgetId });
    if (widget && widget.previous[responseIndex]) {
      widget.previous[responseIndex].response = newResponse;
      widget.previous[responseIndex].userName = newUserName;
      widget.previous[responseIndex].photoUrl = newPhotoUrl; // Update photoUrl
      await widget.save();
      return res.json({ status: 'updated' });
    } else {
      return res.status(404).send('Response not found');
    }
  } catch (error) {
    console.error('Error editing response:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/textentrywidget/delete-response', async (req, res) => {
  const { widgetId, responseIndex } = req.body;
  try {
    let widget = await Widget.findOne({ widgetId });
    if (widget && widget.previous[responseIndex]) {
      widget.previous.splice(responseIndex, 1);
      await widget.save();
      return res.json({ status: 'deleted' });
    } else {
      return res.status(404).send('Response not found');
    }
  } catch (error) {
    console.error('Error deleting response:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/polls', async (req, res) => {
  console.log("hello world");
});

app.post('/polls/create', async (req, res) => {
  console.log("new widget created");
  try {
    const { title, subheading, options, group } = req.body;

    const newPoll = new PollModel({
      title,
      subheading,
      options,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      group: group
    });    

    await newPoll.save();

    const newLog = new PollLogModel({
      logId: newPoll.id,
      polls: [newPoll], 
    });

    await newLog.save();
    console.log(newPoll._id); 

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
    const { pollId } = req.params;
    const { newPollId } = req.body;
    console.log(pollId);
    console.log(newPollId);

    // Check if the poll with the provided newPollId already exists
    let poll = await PollModel.findOne({ id: newPollId });

    if (poll) {
      // If the poll exists, return the data for the poll
      return res.status(200).json({ status: 'exists', poll });
    }
    
    const poll_2 = await PollModel.findById(pollId);
    if (!poll_2) {
      return res.status(404).send('Poll not found with the object id');
    }
  
    // Update the poll ID to the newPollId
    poll_2.id = newPollId;

    // Save the updated poll
    await poll_2.save();
    return res.sendStatus(200); // This sends a 200 OK with no body
  } catch (error) {
    console.error('Error updating or retrieving poll ID');
    return res.status(500).send('Error updating or retrieving poll ID');
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

    // Validate the structure of each option
    for (const option of options) {
      if (!option.text || typeof option.votes !== 'number' || !Array.isArray(option.voters)) {
        return res.status(400).send('Invalid option format');
      }
    }

    // Find the poll by its ID
    const poll = await PollModel.findById(pollId);
    if (!poll) {
      return res.status(404).send('Poll not found');
    }

    // Update the poll options, totalVotes, and updatedAt
    poll.options = options || poll.options;
    poll.totalVotes = totalVotes
    poll.updatedAt = updatedAt || poll.updatedAt;

    // Save the updated poll
    await poll.save();

    // Return the updated poll for confirmation
    return res.status(200).json(poll);  
  } catch (error) {
    console.error('Error updating poll:', error);
    return res.status(500).send('Error updating poll');
  }
});
app.post('/polls/update-group', async (req, res) => {
  console.log('body', req.body);
  const { widgetId, group } = req.body;

  try {
    // Convert pollId to ObjectId
    console.log(widgetId);
    const objectId = new ObjectId(widgetId.toString(16).padStart(24, '0'));
    console.log(objectId);


    const poll = await PollModel.findOneAndUpdate(
      { _id: objectId }, // Ensure the ID matches
      { $set: { group } }, // Update the group field
      { new: true } // Return the updated document
    );

    if (poll) {
      console.log('succeeded');
      return res.json({ status: 'success', poll });
    } else {
      console.log('failed');
      return res.status(404).send('Poll not found');
    }
  } catch (error) {
    console.error('Error updating group for poll:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/polls/group/:group', async (req, res) => {
  console.log(req.params);
  const { group } = req.params;
  console.log(group);

  try {
    // Fetch polls that match the given group
    const polls = await PollModel.find({ group: new RegExp(`^${group}$`, 'i') }); // Case-insensitive matching

    if (polls.length === 0) {
      return res.status(404).send('No polls found for the specified group.');
    }

    res.status(200).json(polls);
  } catch (error) {
    console.error('Error fetching polls by group:', error);
    res.status(500).send('Internal Server Error');
  }
});


  
  

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));