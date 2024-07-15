import React, { useState } from 'react';
import { Card, Button } from 'antd';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './LoginPage.css';
import loginImageIllustration from '../../assets/login-page-illustration.png';
import logo from '../../assets/bloglist-logo.jpg';

const LoginPage = () => {
  const [activeComponent, setActiveComponent] = useState('newUser');

  return (
    <div className="login-page">
      <div className="login-box">
        
        <div className="login-form-wrapper">
          <Card className="login-card">
            <img src={logo} alt="Logo" className="logo" />
            <h2 className="form-title">Welcome {activeComponent === 'login' ? <>Back!</> : <>to BlogList</>}</h2>
            <p>Please login or register to continue</p>
            {/* <div className="btn-wrapper">
              <Button
                type={activeComponent === 'login' ? 'primary' : 'default'}
                onClick={() => setActiveComponent('login')}
              >
                Login
              </Button>
              <Button
                type={activeComponent === 'newUser' ? 'primary' : 'default'}
                onClick={() => setActiveComponent('newUser')}
              > 
                Register
              </Button>
            </div>*/}


            {activeComponent === 'login' && <LoginForm />}
            {activeComponent === 'newUser' && <RegisterForm />}
            {
              activeComponent === 'login' ? 
              <p>Don't have an account? <span className='clickable' onClick={() => setActiveComponent('newUser')}>Register</span></p> 
              : 
              <p>Already have an account? <span className='clickable' onClick={() => setActiveComponent('login')}>Login</span></p>
            }
          </Card>
        </div>
        <div className="illustration-wrapper">
          <img src={loginImageIllustration} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
