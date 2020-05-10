const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const TutorialSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  video: {
    type: String
  },
  comment: {
    type: String
  },
});

module.exports = mongoose.model('Tutorial', TutorialSchema);