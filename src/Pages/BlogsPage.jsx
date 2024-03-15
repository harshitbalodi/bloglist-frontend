import { useState } from 'react'
import LoginForm from '../components/LoginForm';

const BlogsPage = () => {
    const [currentComponent, setCurrentComponet] = useState('login');
  return (
    <div>
       <LoginForm/>
    </div>
  )
}

export default BlogsPage