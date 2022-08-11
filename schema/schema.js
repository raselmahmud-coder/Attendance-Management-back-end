const mongoose = require("mongoose");
const { Schema } = mongoose;

const users = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  present: Boolean,
  role: {
    type: String,
    required: true,
    enum: ["student", "teacher"],
  },
  password: {
    type: String,
    required: true,
  },
  created: { type: Date, default: Date.now },
});

module.exports = users;
