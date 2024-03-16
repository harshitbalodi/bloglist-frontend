import React, { useState } from 'react'
import TemplateForm from './TemplateForm/TemplateForm'
import { toast } from 'react-toastify';
import userService from '../services/userService';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log("create new user");
    if(password !== confirmPassword){ 
      toast.error('password and confirm password should be same');
      return;
    }
    try{
      const {data} = await userService.createUser({name, username, password});
      console.log(data);
      setName('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
    }catch(error){
      console.log(error);
    }
  } 
  return (
    <div>
      <TemplateForm>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" id="cpassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
          </div>
          <button type='submit'>Create</button>
        </form>
      </TemplateForm>
    </div>
  )
}

export default CreateUser