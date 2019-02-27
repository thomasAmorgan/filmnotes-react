module.exports = {
  MONGODB: process.env.MONGODB_URI || 'mongodb://localhost/FilmNotes',
  JWT_SECRET: process.env.JWT_SECRET || 'secretDevKey'
};
