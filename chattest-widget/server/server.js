const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package

const app = express();
require('dotenv').config(); // at the top of your server.js
const connectDB = require('./config/db'); // Import your connectDB function
const MessageModel = require('./models/Message');
const LogModel = require('./models/Logs');




connectDB();
app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // For parsing application/json

app.post('/create-widget', async (req, res) => {
    console.log("creating widget");
    try {
      const newLog = new LogModel({});
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
app.post('/messages', async (req, res) => {
  console.log("starting", req.body);
  try {
      const message = new MessageModel(req.body);
      let log = await LogModel.findOne({ logId: req.body.logId });
      if (!log){
        log = new LogModel({});
        await log.save();
      }
      console.log("log",log);
      if (log) {
          log.messages.push(message); // Push the entire message object
          await log.save();
          res.status(201).send(message);
      } else {
          res.status(404).send({ message: 'Log not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
  }
});

  app.delete('/delete-widget/:logId', async (req, res) => {
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

  app.delete('/messages/:messageId', async (req, res) => {
    try {
      const message = await MessageModel.findByIdAndRemove(req.params.messageId);
  
      // Remove the message from the log
      await LogModel.updateMany({}, { $pull: { messages: message._id } });
  
      res.status(200).send({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/logs/:logId/messages', async (req, res) => {
    try {
      const log = await LogModel.findOne({ logId: req.params.logId }).populate('messages');
      res.status(200).send(log.messages);
    } catch (error) {
      res.status(500).send(error);
    }
  });
    
  

// Define a GET route to fetch messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await MessageModel.find({});
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/delete-widget/:logId', async (req, res) => {
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

  app.get('/logs/:logId/updates', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    console.log("update");

    console.log(req.params.logId);

    let log = await LogModel.findOne({ logId: req.params.logId });
    if (!log) {
        console.log("making new");
        log = new LogModel({});
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

  
  

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
