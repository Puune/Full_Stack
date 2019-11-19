const userRouter = require('express').Router();
const User = require('../models/users');
const crypt = require('bcryptjs');

async function newPsw (body) {
  const saltRounds = 10;
  const passwordHash = crypt.hash(body.password, saltRounds);
  return passwordHash;  
}


//get users
userRouter.get('/', async (request, response, next) => {
  try {
    const results = await User.find({}).populate('blogs', {author: 1, title: 1, url: 1});    
    response.json(results.map((user) => user.toJSON()));
  } catch(exception) {
    next(exception);
  }
})

//get user

//post user
userRouter.post('/', async (request, response, next) => {
  try{
    const body = request.body;

    if(body.password.length < 5){
      response.status(400).end('Password to short');
    }

    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash: await newPsw(body)
    })
    
    const savedUser = await newUser.save();
    response.json(savedUser);
  } catch(exception){
    next(exception);
  }
})

//update user
userRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body;        

    const oldUser = await User.findById(request.params.id);   

    
    if(await oldUser){
      const newUser = {
        username: typeof body.username !== 'undefined' ? body.username : oldUser.username,
        name: typeof body.name !== 'undefined' ? body.name : oldUser.name,
        passwordHash: typeof body.password !== 'undefined' ? await newPsw(body) : undefined,
        blogs: oldUser.blogs
      }

      if(typeof newUser.passwordHash === 'undefined'){ delete newUser.passwordHash}

      const result = await User.findByIdAndUpdate(request.params.id, newUser, {new: true});
      response.json(result.toJSON());

    } else {
      throw new Error('User not found');
    }
  }catch(exception){
    next(exception);
  }
})

//delete user

module.exports = userRouter;