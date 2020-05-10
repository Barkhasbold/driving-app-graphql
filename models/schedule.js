const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const ScheduleSchema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date,
  name: String,
});

module.exports = mongoose.model('Schedule', ScheduleSchema);