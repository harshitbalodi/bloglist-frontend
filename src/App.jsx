import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import AddNotification from './components/AddNotification'
import ErrorNotitfication from './components/ErrorNotification'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
const App = () => {

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  
  const [addMessage, setAddMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const onLogin = async () => {
      if (!user) {
        const blogs = await blogService.getAll()
        setBlogs(blogs.sort((a, b) => b.likes - a.likes));
      }
    }
    onLogin();
  }, [user])

  useEffect(() => {
    const userDetaills = localStorage.getItem('userLoggedIn');
    if (userDetaills) {
      const accesstokenData = JSON.parse(userDetaills);

      setUser(accesstokenData);
      blogService.setToken(accesstokenData.token);
    }

  }, [])

  const handleLike = async () => {
    try {
      const data = await blogService.likeBlog(blog.id);
      const oldblogs = [...blogs];
      oldblogs[index] = data;
      setBlogs(oldblogs);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Logout...")
    localStorage.removeItem('userLoggedIn');
    setUser(null);
  }

  return (
    <div>
      {
        !user ?
          <LoginForm
            setUser={setUser}
            setErrorMessage={setErrorMessage} 
            errorMessage={errorMessage}
          />
          :
          (
            <div>
              <h2>blogs</h2>
              <AddNotification
                addMessage={addMessage}
              />
              <ErrorNotitfication
                errorMessage={errorMessage}
              />
              <span> {user.name} is logged in</span>
              <button onClick={handleLogout} > Logout </button>
              <CreateBlog
                blogs={blogs}
                setBlogs={setBlogs}
                setErrorMessage={setErrorMessage}
                setAddMessage={setAddMessage}
              />


              {
                blogs.map((blog, index) =>
                  <Blog
                    handleLike={handleLike}
                    key={blog.id}
                    blog={blog}
                    setErrorMessage={setErrorMessage}
                  />
                )
              }
            </div>)
      }

    </div>
  )
}

export default App