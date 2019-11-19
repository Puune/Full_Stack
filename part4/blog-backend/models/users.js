const mongoose = require('mongoose');
const uValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: 
  {
    type: String,
    required: true,
    unique: true
  },
  name: 
  {
    type: String  
  },
  passwordHash: 
  {
    type: String,
    required: true,
  },
  blogs: 
  [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uValidator);

userSchema.set('toJSON', {
  transform: (document, returnObj) => {
    if(returnObj._id) {
      returnObj.id = returnObj._id.toString();
      delete returnObj._id,
      delete returnObj.__v
      delete returnObj.passwordHash
    }
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;