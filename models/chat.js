const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const ChatSchema = new Schema({
  sendTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sendBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  createdDate: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model('Chat', ChatSchema);