const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const ExamSchema = new Schema({
  _id: {
    type: String
  },
});

module.exports = mongoose.model('Exam', ExamSchema);