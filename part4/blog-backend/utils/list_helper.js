const dummy = (blogs) => {
  blogs;
  return 1;
}

const totalLikes = (blogs) => {
  let value = 0;
  blogs.forEach((blog) => {
    value += blog.upvotes;
  })
  return value;
}

const favouriteBlog = (blogs) => {
  let mostLiked = blogs[0];
  blogs.forEach((blog) => {
    if(blog.upvotes>mostLiked.upvotes){
      mostLiked = blog;
    }
  })
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    upvotes: mostLiked.upvotes
  } 
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}