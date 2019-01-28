const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  trail_id: {
    type: Number,
    required: true
  },
  user_id: {
    type: Number,
    required: true
  },
  upload_date: {
    type: Date,
    required: true
  },
  photo_url: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  is_hero_photo: {
    type: Boolean,
    required: true
  }
});

module.exports = Photo = mongoose.model('Photo', PhotoSchema);