const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
