const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const rolls = require("./routes/api/rolls");

const app = express();

// body-parser middleware
app.use(bodyParser.json());

const db = require("./config/keys").localMongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB connected..."))
  .catch(err => console.log(err));

app.use("/api/rolls", rolls);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}...`));
