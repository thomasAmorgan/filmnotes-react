const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RollSchema = new Schema({
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
  exposures: [
    {
      date: {
        type: Date,
        default: Date.now
      },
      title: String,
      aperture: Number,
      shutter: String,
      lens: String,
      description: String
    }
  ]
});

module.exports = Roll = mongoose.model("roll", RollSchema);
