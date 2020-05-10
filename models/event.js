const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const EventSchema = new Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model('Event', EventSchema);