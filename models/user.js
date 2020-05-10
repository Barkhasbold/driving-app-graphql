const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const {
  Schema
} = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: [
      'ADMIN',
      'CLIENT',
      'TEACHER',
      'DIRECTOR',
    ],
    default: 'CLIENT'
  },
  isBanned: {
    type: Boolean,
    default: false,
    required: true
  },
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id.toString(),
    email: this.email,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, secret);
}

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    username: this.username,
    type: this.type,
    isBanned: this.isBanned,
    avatar: this.avatar,
    phone: this.phone
  };
};

module.exports = mongoose.model('User', UserSchema);