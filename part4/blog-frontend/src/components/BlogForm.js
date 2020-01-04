import React, {useState} from 'react';
import blogService from '../services/blog';

const BlogForm = (props) => {

  const blogProps = props.blogProps;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const blogHandler = async (event) => {
    event.preventDefault();
    
    try {
      const data = await blogService.create({
        title, author, url
      });
        
      await blogProps.setBlogs(blogProps.blogs.concat(data));

      props.setMessage("Blog posted")
      setTimeout(() => {
        props.setMessage(null);
      }, 3000)
      
    } catch(exception){
      console.log(exception);
      
      props.setError("Error posting a blog")
      setTimeout(() => {
        props.setError(null);
      }, 3000)
    }
  }

  return(
    <div>
      <form onSubmit={blogHandler}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
          Athor:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          URL:
          <input
            type="url"
            value={url}
            name="Url"
            onChange={({target}) => setUrl(target.value)}/>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default BlogForm;