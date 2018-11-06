const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const rolls = require("./routes/api/rollsApi");

const app = express();

// body-parser middleware
app.use(bodyParser.json());

// const db = require("./config/keys").localMongoURI;
const db = require("./config/keys").mLabURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB connected..."))
  .catch(err => console.log(err));

app.use("/api/rolls", rolls);

// serve static assests if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}...`));
