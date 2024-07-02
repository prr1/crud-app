const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/crud-app', {
  
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', console.error.bind(console, 'connection error:'));

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

app.post('/items', (req, res) => {
  const newItem = new Item(req.body);
  newItem.save((err, item) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(item);
  });
});

app.get('/items', (req, res) => {
  Item.find({}, (err, items) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(items);
  });
});

app.put('/items/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, item) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(item);
  });
});

app.delete('/items/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, item) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(item);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
