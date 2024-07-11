const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors'); // Import the cors package

const db = process.env.MONGODB_URI;

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const widgetSchema = new mongoose.Schema({
  widgetId: String,
  previous: [String],
  current: String,
  showPrevious: Boolean
});

const Widget = mongoose.model('Widget', widgetSchema);

app.post('/refresh', async (req, res) => {
  const { widgetId } = req.body;

  try {
    let widget = await Widget.findOne({ widgetId });
    if (!widget) {
      const timestamp = new Date().toISOString();
      widget = new Widget({ widgetId: timestamp, previous: [], current: "", showPrevious: false });
      await widget.save();
      return res.json({ status: 'new', widget });
    } else {
      return res.json({ status: 'updated', widget });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/submit', async (req, res) => {
  const { widgetId, response } = req.body;

  try {
    let widget = await Widget.findOne({ widgetId });
    if (!widget) {
      const timestamp = new Date().toISOString();
      widget = new Widget({ widgetId: timestamp, previous: [], current: response, showPrevious: false });
      await widget.save();
      return res.json({ status: 'new', widget });
    } else {
      widget.current = response;
      await widget.save();
      return res.json({ status: 'updated', widget });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/reveal-all', async (req, res) => {
  try {
    await Widget.updateMany({}, { $set: { showPrevious: true } });
    res.json({ status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
