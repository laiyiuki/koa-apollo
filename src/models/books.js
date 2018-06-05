const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Book = new Schema(
  {
    title: String,
    author: String,
  },
  {
    timestamps,
  },
);
