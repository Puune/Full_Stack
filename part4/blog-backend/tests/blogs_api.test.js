const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');
const _ = require('lodash');


beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjs = helper.initBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjs.map((blog) => blog.save());
  await Promise.all(promiseArray); 
})


describe('when blogs are returned', () => {

  test('blogs return in json', async () => {
    await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/);
  })

  test('all blogs are returned',  async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.initBlogs.length);
  })

  test('all blogs are assigned an id', async () => {
    expect(helper.genNaturalId).toBeDefined();
  })

  test('a singluar blog is returned', async () => {
    const blogs = await helper.blogsInDb();
    const response = await api.get(`/api/blogs/${blogs[0].id}`);
    expect(response.body).toEqual(blogs[0]);
  })
})


describe('when blogs are posted', () => {
  test('posting a blog successfully generates a db document', async () => {
    const newBlog = {
      author: 'they',
      title: 'testpost',
      url: 'assudgh39y',
      upvotes: 0,
    }
    await api.post('/api/blogs/')
      .send(newBlog);
    const response = await api.get('/api/blogs');
    
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          newBlog
        )
      ])
    )
  })

  test('unset "upvotes" defaults to 0', async () => {
    const newBlog = {
      author: 'whom',
      title: 'no upvotes',
      url: 'dskjhfsduhi4352'
    }
    await api.post('/api/blogs/')
      .send(newBlog);
    const response = await api.get('/api/blogs');
    const postedBlog = _.find(response.body, {'author': 'whom'});
    expect(postedBlog.upvotes).toBe(0);
  })
})


describe('when bad requests are made', () => {
  test('with missing properties, a validation error is catched', async () => {
    const newBlog = {
      author: 'those'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  })

  test('fails 404 if id is invalid', async () => {
    const idValidNotExisting = await helper.genNaturalId();
    await api
      .get(`/api/blogs/${idValidNotExisting}`)
      .expect(404);
  })
})

afterAll(()=> {
  mongoose.connection.close();
})