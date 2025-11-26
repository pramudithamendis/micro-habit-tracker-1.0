const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  checkins: [String], // store "YYYY-MM-DD"
});

module.exports = mongoose.model("Habit", habitSchema);
