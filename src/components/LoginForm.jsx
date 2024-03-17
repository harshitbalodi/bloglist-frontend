import { useState } from 'react';
import loginService from '../services/loginService';
import blogService from '../services/blogService';
// import ErrorNotitfication from './ErrorNotification';
import TemplateForm from './TemplateForm/TemplateForm';
import { setUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const data = await loginService.login({ username: username, password: password });
          console.log(data);
          blogService.setToken(data.token);
          localStorage.setItem('userLoggedIn', JSON.stringify(data));
          dispatch(setUser(data));
          setUsername("");
          setPassword("");
        } catch (error){
          console.log("Login Error:", error);
          // if(error?.response?.data){
          //   setErrorMessage(error?.response?.data);
          // }else{
          //   setErrorMessage(error?.message);
          // }
          
          // setTimeout(() => setErrorMessage(null), 5000);
        }
      }
    return (
        <div>
            <TemplateForm>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        name="Username"
                        value={username}
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
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
                        required
                    />
                </div>
                <button type="submit" id='login'>login</button>
            </form>
            </TemplateForm>
        </div>
    )
}

export default LoginForm