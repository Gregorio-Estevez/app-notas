const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 3000;
/* const { MONGO_DB_USR, MONGO_DB_PWD, MONGO_DB_HOST, MONGO_DB_PORT } =
  process.env;
const credentials = MONGO_DB_USR ? `${MONGO_DB_USR}:${MONGO_DB_PWD}@` : ""; */

const MONGO_DB_USR = process.env.MONGO_DB_USR;
const MONGO_DB_PWD = process.env.MONGO_DB_PWD;
const MONGO_DB_HOST = process.env.MONGO_DB_HOST;

const mongoURI = `mongodb+srv://${MONGO_DB_USR}:${MONGO_DB_PWD}@${MONGO_DB_HOST}`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, (arg) => {
      console.log(`Server started @ ${port}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
