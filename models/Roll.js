const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Exposure = require("./Exposure");

const RollSchema = new Schema({
  user_id: String,
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  stock: String,
  iso: Number,
  pushedOrPulled: Number,
  camera: String,
  format: String,
  tags: [String],
  notes: String,
  exposures: [Exposure],
});

module.exports = Roll = mongoose.model("roll", RollSchema);
