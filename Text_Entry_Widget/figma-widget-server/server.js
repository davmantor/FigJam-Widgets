const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

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

const widgetSchema = new mongoose.Schema({
  widgetId: { type: String, unique: true },
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


const Widget = mongoose.model('Widget', widgetSchema);

app.post('/reset-widget', async (req, res) => {
  const { widgetId } = req.body;

  try {
    const widget = await Widget.findOneAndUpdate(
      { widgetId },
      { $set: { showPrevious: false } },
      { new: true }
    );
    if (widget) {
      res.json({ status: 'success', widget });
    } else {
      res.status(404).send('Widget not found');
    }
  } catch (error) {
    console.error('Error resetting widget:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/refresh', async (req, res) => {
  const { widgetId } = req.body;

  try {
    const widget = await Widget.findOneAndUpdate(
      { widgetId },
      { $setOnInsert: { widgetId, previous: [], current: { response: "", userName: "", photoUrl: "" }, showPrevious: false } },
      { upsert: true, new: true }
    );
    return res.json({ status: 'updated', widget });
  } catch (error) {
    console.error('Error refreshing data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/submit', async (req, res) => {
  const { widgetId, response, userName, photoUrl, timestamp } = req.body;

  console.log('Received data:', { widgetId, response, userName, photoUrl, timestamp }); // Debugging line

  try {
    let widget = await Widget.findOne({ widgetId });
    if (widget) {
      widget.previous.push(widget.current);
      widget.current = { response, userName, photoUrl, timestamp };
      await widget.save();
      console.log('Updated widget:', widget); // Debugging line
      return res.json({ status: 'updated', widget });
    } else {
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


app.post('/reveal-all', async (req, res) => {
  try {
    await Widget.updateMany({}, { $set: { showPrevious: true } });
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Error revealing all data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/add-response', async (req, res) => {
  const { widgetId, response, userName, photoUrl } = req.body;

  try {
    let widget = await Widget.findOne({ widgetId });
    if (widget) {
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

app.post('/edit-response', async (req, res) => {
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

app.post('/delete-response', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
