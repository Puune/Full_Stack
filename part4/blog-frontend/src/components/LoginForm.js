import React from 'react'
import loginService from '../services/login';
import blogService from '../services/blog';


const LoginForm = (props) => {
    
  const login = props.loginProps;
  const username = login.username;
  const password = login.password;

  const loginHandler = async (event) => {
    event.preventDefault();
  
    try{
      const creds = {
        username: username.value,
        password: password.value
      }
      const user = await loginService.login({...creds});

      blogService.setToken(user.token);

      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      login.setUser(user);
      password.reset();
      username.reset();

      props.setMessage("Login accepted")
      setTimeout(() => {
        props.setMessage(null)
      }, 3000);
    } catch(exception){
      login.setUser(null);
      props.setError("Wrong credentials")
      setTimeout(()=> {
        props.setError(null)
      }, 3000)
    }
  }

  return(
    <div>
      <form onSubmit={loginHandler}>
        <div>
          username: 
          <input 
            type={username.type}
            value={username.value}
            name="Username"
            onChange={username.onChange}
            />
        </div>
        <div>
          password: 
          <input
            type={password.type}
            value={password.value}
            name="Password"
            onChange={password.onChange}
            />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm;