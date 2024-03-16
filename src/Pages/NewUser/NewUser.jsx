import React from 'react'
import LoginForm from '../../components/LoginForm'
import CreateUser from '../../components/CreateUser'
import { useState } from 'react'
import './NewUser.css';

const NewUser = () => {
  const [activeComponent, setActiveComponent] = useState('login');
  return (
    <div className='form-wrapper'>
      <div className='form-container'>
        <div className='btn-wrapper'>
          <div className='btn-container'>
            <button
              className={activeComponent === 'login' ? 'active' : ''}
              onClick={() => setActiveComponent('login')}>
              Login
            </button>
            <button
              className={activeComponent === 'newUser' ? 'active' : ''}
              onClick={() => setActiveComponent('newUser')}>
              Register
            </button>
            <div
              className='btn-indicator'
              style={{
                transform: `translateX(${activeComponent === 'login' ? '0%' : '100%'})`, // Move indicator based on active component
                width: `calc(50%)` 
              }}
            >
            </div>
          </div>
        </div>
         {/* <div className='btn-wrapper'>
          <div className='btn-container'>
            <button
              className={activeComponent === 'login' ? 'active' : ''}
              onClick={() => setActiveComponent('login')}>
              Login
            </button>
            <button
              className={activeComponent === 'newUser' ? 'active' : ''}
              onClick={() => setActiveComponent('newUser')}>
              Register
            </button>
             Indicator to show active button 
            
          </div>
        </div> */}


        {activeComponent === 'login' && <LoginForm />}
        {activeComponent === 'newUser' && <CreateUser />}
      </div>
    </div>
  )
}

export default NewUser