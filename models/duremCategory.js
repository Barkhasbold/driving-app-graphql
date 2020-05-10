const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const DuremCategorySchema = new Schema({
  name: {
    type: String,
  },
  durmuud: [{
    type: Schema.Types.ObjectId,
    ref: 'Durem'
  }],
});

module.exports = mongoose.model('DuremCategory', DuremCategorySchema);