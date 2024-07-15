import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import userService from '../../services/userService';
import { toast } from 'react-toastify';
import './RegisterForm.css';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    if (values.password !== values.confirmPassword) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }
    try {
      const { data } = await userService.createUser(values);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Form name="register" onFinish={onFinish}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input placeholder="Name" />
      </Form.Item>
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
      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: 'Please confirm your password!' }]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className='register-btn' loading={loading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
