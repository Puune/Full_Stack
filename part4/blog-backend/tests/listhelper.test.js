const listHelper = require('../utils/list_helper');

function cBlog (auth, title, url, up, _id, __v) {
  let temp = {
    author: auth,
    title: title,
    url: url,
    upvotes: up,
    _id: _id,
    __v: __v
  }
  return temp;
}

test('dummy returns 1', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
})

describe('total likes', () => {
  const oneBlogList = [
    {
      _id: 'kjfhdsiuohsdefoiu',
      title: 'dfsfsds',
      author: 'me',
      url: 'www.google.com',
      upvotes: 3,
      __v: 0
    }
  ]

  test('list with one blog has the like equal of', () => {
    const result = listHelper.totalLikes(oneBlogList);
    expect(result).toBe(3);
  })
})

describe('favourite blog', () => {
  const multipleBlogList = [
    cBlog('me', 'first', 'asdasdasd', 2, 'hh3h332h23h', 0),
    cBlog('me', 'second', 'ijsdfgfojhog', 4, 'gh234ygasd', 0),
    cBlog('you', 'this first', 'asdgkuqw23', 3, '37rhrhhaay77', 0),
    cBlog('him', 'that first', 'asdhg32adskjh', 3, '2132esasda', 0),
    cBlog('her', 'most likes', 'akdgu327uhads', 5, 'asugh8372tu', 0)
  ]

  test('blog with most upvotes', () => {
    const result = listHelper.favouriteBlog(multipleBlogList);
    expect(result).toEqual({author: 'her', title: 'most likes', upvotes: 5});
  })
})