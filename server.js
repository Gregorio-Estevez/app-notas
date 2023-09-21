const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 3000;

const MONGO_DB_USR = process.env.MONGO_DB_USR;
const MONGO_DB_PWD = process.env.MONGO_DB_PWD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const mongoURI = `mongodb+srv://${MONGO_DB_USR}:${MONGO_DB_PWD}@cluster0.8kikncc.mongodb.net/${MONGO_DB_NAME}`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {


    app.listen(port, () => {
      console.log(`Server started @ ${port}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
