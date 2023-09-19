const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const MONGO_DB_USR = process.env.MONGO_DB_USR;
const MONGO_DB_PWD = process.env.MONGO_DB_PWD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_DB_COLLECT = process.env.MONGO_DB_COLLECT;

const mongoURI = `mongodb+srv://${MONGO_DB_USR}:${MONGO_DB_PWD}@cluster0.8kikncc.mongodb.net/${MONGO_DB_NAME}`;

const NotesSchema = mongoose.Schema({
  title: String,
  description: String,
});

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
const collect = db.collection(`${MONGO_DB_COLLECT}`);

const Notes = mongoose.model(`${collect.collectionName}`, NotesSchema);

module.exports = Notes;
