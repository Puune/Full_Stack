import React, {useState, useEffect} from 'react';
import blogService from './services/blog';
import LoginForm from './components/LoginForm';
import ErrorMessage from './components/ErrorMessage';
import Message from './components/Message';
import BlogsList from './components/BlogsList';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { useField } from './hooks/hooks';

import './App.css';


const App = () => {

  useEffect(() => {
    blogService
      .getAll().then(initBlogs => {
        setBlogs(initBlogs)
      })
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const [user, setUser] = useState(null);

  const username = useField('text');
  const password = useField('text');

  const loginProps = {
    user, setUser,
    username,
    password
  }

  /*
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const loginProps = {
    username, setUsername,
    password, setPassword,
    user, setUser
  }
  */

  const [blogs, setBlogs] = useState([]);
  const blogProps = {
    blogs, setBlogs
  }

  const [error, setError] = useState(null);  
  const [message, setMessage] = useState(null);

  const Login = () => (
    <div>
      <h2>Please log in</h2>
      <Togglable 
        button={{toggled: 'Cancel', untoggled: 'Sign in'}}>
        <LoginForm 
          loginProps={loginProps}
          setError={setError}
          setMessage={setMessage}/>
      </Togglable>
    </div>
  )

    const logOut = () => {
      window.localStorage.removeItem('loggedUser');
      window.location.reload(false)    
    }

  const Content = () => (
    <div>
      <div>
        <h2>User</h2>
        <p>User {user.name} logged in 
          <button onClick={logOut}>logout</button>
        </p>
      </div>
      <Togglable 
        button={{toggled: 'Cancel', untoggled: 'New Blog'}}>
        <p>Submit new blog</p>
        <BlogForm
          setError={setError}
          setMessage={setMessage}
          blogProps={blogProps}/>
      </Togglable>
      <h2>Blogs</h2>
      <BlogsList
        props={blogProps}
        user={user} />    
      </div>
  )  

  return (
    <div>
      <ErrorMessage class="error"
        error={error}/>
      <Message class="message"
        message={message}/>
      {user === null && Login()}
      {user !== null && Content()}
    </div>
  )
}

export default App;