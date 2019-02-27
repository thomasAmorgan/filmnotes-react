module.exports = {
  LOCAL_MONGO: process.env.MONGODB_URI || 'mongodb://localhost/FilmNotes',
  MLAB_MONGO:
    process.env.MONGODB_URI || 'mongodb://thomasmorgan:development123@ds131903.mlab.com:31903/filmnotes',
  JWT_SECRET: process.env.JWT_SECRET || 'secretDevKey'
};
