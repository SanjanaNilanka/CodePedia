const mongoose = require('mongoose')

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  criteria: {
    type: [String],
    required: true,
  },
  timerDurationInMinutes: {
    type: Number,
    required: true,
  },
  difficultyLevel: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('Challenge', challengeSchema);
