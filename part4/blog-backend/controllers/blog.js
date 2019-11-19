const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/users');

//default / get all
blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
    response.json(blogs.map((blog) => blog.toJSON()));
  } catch(exception){
    next(exception);
  }
})

//get one
blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);    
    if(blog) {
      response.json(blog.toJSON());
    } else {
      response.status(404).end();
    }
  }catch (exception){
    next(exception);
  }
})

//post
blogRouter.post('/', async (request, response, next) => {
  
  const body = request.body;

  try {
    const decodedToken = request.token;        

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      upvotes: (typeof body.upvoted !== 'undefined') ? body.upvotes : 0,
      user: user._id
    })

    const savedBlog = await blog.save();    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save();

    response.json(savedBlog.toJSON());
  } catch(exception){
    next(exception);
  }
})

//delete
blogRouter.delete('/:id', async (request, response, next) => {
  
  try {

    const decodedToken = request.token;

    const user = await User.findOne({username: decodedToken.username});
    const blog = await Blog.findById(request.params.id);

    if(blog.user.toString() === user.id){
      await Blog.findByIdAndDelete(request.params.id);
      response.status(200).end();
    } else {      
      response.status(404).json({error: 'invalid token'});
    }
  } catch(exception){
    next(exception);
  }
})

//update
blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body;  

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    upvotes: (typeof body.upvoted !== 'undefined') ? body.upvotes : 0
  }

  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
    response.json(result.toJSON());
  } catch(exception){
    next(exception);
  }
})

module.exports = blogRouter;