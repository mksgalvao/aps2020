const mongoose = require('mongoose');

const damSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

mongoose.model('Dam', damSchema);
