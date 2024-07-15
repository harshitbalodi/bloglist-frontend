import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import loginService from '../../services/loginService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import token from '../../services/token';
import googleIcon from '../../assets/google-icon.svg';
import './LoginForm.css';  // Import the CSS file

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await loginService.login(values);
      token.setToken(data.accessToken);
      localStorage.setItem('userLoggedIn', JSON.stringify(data));
      dispatch(setUser(data));
      setLoading(false);
    } catch (error) {
      console.log("Login Error:", error);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URI}/api/auth/google`;
  };

  return (
    <Form name="login" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} className="full-width">
          Login
        </Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={googleLogin} className="full-width google-btn">
          <img src={googleIcon} alt="" />
          Login with Google
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
