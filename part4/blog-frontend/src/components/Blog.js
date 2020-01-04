import React from 'react';
import Togglable from './Togglable';
import blogService from '../services/blog';

const Blog = ({blog, props, user}) => {

  const visible = () => {
    let visible = blog.user.username === user.username;        
    return {display: visible ? '' : 'none'}}

  const updateHandler = async () => {
    try{
      const newBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        upvotes: ++blog.upvotes,
        id: blog.id
      }

      const response = await blogService.update(newBlog);

      let list = [...props.blogs];
      list.map((blog) => {
        if(blog.id === response.id){
          blog.upvotes = response.upvotes;
        }
      })
      props.setBlogs(list);

    } catch(exception){
      console.log(exception);
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div>
      <Togglable button={{toggled: 'minimize', untoggled: 'expand'}}
        nonVisContent={blog.title}>
        <div>
          {blog.title} <br/> 
          author: {blog.author} <br/> 
          URL: {blog.url} <br/> 
          uvotes: {blog.upvotes} <button onClick={updateHandler}>like</button>
        </div>
        <div style={visible()}>
          <button>delete</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog;