const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejwt = require('express-jwt');
const unless = require('express-unless');

const keys = require('./config/keys');
const rolls = require("./routes/rolls");
const auth = require('./routes/auth');

const app = express();

// body-parser middleware
app.use(bodyParser.json());

app.use(ejwt({ secret: keys.JWT_SECRET })
  .unless(
    {
      path: ['/api/auth',
        { url: '/api/auth/register', methods: ['POST'] },
        { url: '/api/auth/authenticate', methods: ['POST'] },
        { url: '/favicon.ico', methods: ['GET'] }
      ]
    })
);

const db = keys.LOCAL_MONGO;
// const db = keys.MLAB_MONGO;

mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      connectTimeoutMS: 30000
    }
  )
  .then(() => console.log("mongoDB connected..."))
  .catch((err) => console.log(err));

app.use('/api/auth', auth);
app.use('/api/rolls', rolls);

// serve static assests if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}...`));
