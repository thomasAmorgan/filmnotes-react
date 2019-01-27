const Exposure = {
  date: {
    type: Date,
    default: Date.now
  },
  title: String,
  aperture: Number,
  shutter: String,
  lens: String,
  description: String
};

module.exports = Exposure;
