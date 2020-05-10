const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const CourseSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  director: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  teachers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

module.exports = mongoose.model('Course', CourseSchema);