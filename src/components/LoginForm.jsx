import { useState } from 'react';
import loginService from '../services/loginService';
import blogService from '../services/blogService';
import ErrorNotitfication from './ErrorNotification';
const LoginForm = ({setUser, setErrorMessage, errorMessage}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const data = await loginService.login({ username: username, password: password });
          blogService.setToken(data.token);
          localStorage.setItem('userLoggedIn', JSON.stringify(data));
          setUser(data);
          setUsername("");
          setPassword("");
        } catch (error){
          console.log("Login Error:", error);
          if(error?.response?.data){
            setErrorMessage(error?.response?.data);
          }else{
            setErrorMessage(error?.message);
          }
          
          setTimeout(() => setErrorMessage(null), 5000);
        }
      }
    return (
        <div>
            <h2>Login to application</h2>
            <ErrorNotitfication errorMessage={errorMessage} />
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        name="Username"
                        value={username}
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        name="Password"
                        value={password}
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" id='login'>login</button>
            </form>
        </div>
    )
}

export default LoginForm