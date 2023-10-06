const mongoose = require('mongoose');

const tokenschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'register',
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdOn: { type: Date, default: Date.now(), expires: 300 },
});

const Token = mongoose.model('Token', tokenschema);

module.exports = Token;
