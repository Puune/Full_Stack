const Blog = require('../models/blog');
const User = require('../models/users');

function cBlog (auth, title, url, up) {
  let temp = {
    author: auth,
    title: title,
    url: url,
    upvotes: up,
  }
  return temp;
}

const initBlogs = [
  cBlog('asdf', 'this post', '124fsdfg4r', 4),
  cBlog('qwerty', 'that post', '234234sdrfs', 2),
  cBlog('asdf', 'second post', '1234sdfijh3', 6)
]


const genNaturalId = async () => {
  const temp = new Blog({author: 'dgsflhkj', title: 'gdfsjhkl', url: 'fdskjhfihu', upvotes: 0});
  await temp.save();
  await temp.remove();

  return temp._id.toString();
}

const blogsInDb = async () => {
  const notes = await Blog.find({});
  return notes.map(blog => blog.toJSON());
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
}

module.exports = {
  initBlogs,
  genNaturalId,
  blogsInDb,
  usersInDb
}