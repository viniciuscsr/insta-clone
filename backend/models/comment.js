const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: true },
  date: { type: Date, required: true },
  user: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: { type: String },
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Posts',
  },
});

module.exports = mongoose.model('Comment', commentSchema);
