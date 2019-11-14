const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  url: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    required: true
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  }
})

module.exports = mongoose.model('Blog', blogSchema);