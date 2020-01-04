import React from 'react';
import Blog from './Blog';
import Togglable from './Togglable';

const listItem = (member, props, user) => {
  return (
    <li 
      key={member.id}
      className='message'  
    >
        <Blog blog={member} props={props} user={user}/><br/>
    </li>
  )
}

const BlogsList = ({props, user}) => { 
  
  const blogs = props.blogs

  const sortBlogs = () => {
    let list = [...props.blogs];
    list.sort(function(a, b){
      return b.upvotes - a.upvotes
    })
    props.setBlogs(list);
  }

  return(
    <div>
      <p>Sort list by upvotes <button onClick={sortBlogs}>Sort</button></p>
      <ul className>
        {blogs.map((blog) => listItem(blog, props, user))}
      </ul>
    </div>
  )
}

export default BlogsList;