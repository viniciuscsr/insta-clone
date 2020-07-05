const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  caption: { type: String, required: true },
  date: { type: Date, defaut: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

module.exports = mongoose.model('Posts', postSchema);
