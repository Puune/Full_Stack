const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/users');

loginRouter.post('/', async (request, response, next) => {
  try{
    const body = request.body;

    const user = await User.findOne({username: body.username});
    const pswCorrect = (user === null)
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);
    
    if(!(user && pswCorrect)){
      response.status(401).json({error: 'invalid username or password'}).end();
    } else {

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, process.env.SECRET);

      response
        .status(200)
        .send({token, username: user.username, name: user.name});
        
    }
  } catch(exception){
    next(exception);
  }
})

module.exports = loginRouter;