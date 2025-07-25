const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  long_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
  },
  history: [
    {
      _id: false,
      date: Date,
      ip: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  totalVisits: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Urls", urlSchema);
