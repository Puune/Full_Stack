import React from 'react'
import Togglable from './Togglable'

const SimpleBlog = ({ blog, onClick }) => (
  <Togglable 
    className='blog'
    button={{toggled: 'minimize', untoggled: 'expand'}} 
    nonVisContent = {
      <div>
        {blog.title} {blog.author}
      </div>
    }
  >
    <div>
      <div>
        blog has {blog.likes} likes
        <button onClick={onClick}>like</button>
      </div>
    </div>
  </Togglable>
)

export default SimpleBlog