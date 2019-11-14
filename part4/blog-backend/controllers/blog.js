const blogRouter = require('express').Router();
const Blog = require('../models/blog');

//create blog
function createBlog(body) {
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    upvotes: body.upvotes
  })

  return blog;
}

//default / get all
blogRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()));
    })
})

//get one
blogRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON());
      } else {
        response.status(400).end();
      }
    })
})

//post
blogRouter.post('/', (request, response) => {
  
  const body = request.body;
  
  const blog = createBlog(body);

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog.toJSON());
    })
})

//delete
blogRouter.delete('/:id', (request, response) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(()=> {
      response.status(204).end();
    })
})

//update
blogRouter.put('/:id', (request, response) => {
  const body = request.body;

  const blog = createBlog(body);

  Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON());
    })  
})

module.exports = blogRouter;