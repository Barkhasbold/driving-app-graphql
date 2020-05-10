const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const DuremSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'DuremCategory'
  },
});

module.exports = mongoose.model('Durem', DuremSchema);