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
  
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: ""
  })

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
  //for jest testing uncomment this
  // const handleLike = async (id) => {
  //   try {
  //     const data = await blogService.likeBlog(blog.id);
  //     const oldblogs = [...blogs];
  //     oldblogs[index] = data;
  //     setBlogs(oldblogs);
  //   } catch (error) {
  //     setErrorMessage(error.response.data);
  //     setTimeout(() => setErrorMessage(null), 5000);
  //   }
  // }

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Logout...")
    localStorage.removeItem('userLoggedIn');
    setUser(null);
  }

  const handleBlog = async (e) => {
    e.preventDefault();
    try {
        const data = await blogService.createBlog(blog);
        console.log(data);
        setAddMessage(`a new blog ${blog.title} by ${blog.author}`)
        setTimeout(() => setAddMessage(null), 5000);
        setBlogs([...blogs, data])
        setBlog({
            title: "",
            author: "",
            url: ""
        })
        console.log("new blog added...")
    } catch (error) {
        console.log("error in create blog")
        setErrorMessage(error.response.data);
        setTimeout(() => setErrorMessage(null), 5000);
    }
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
                setBlog={setBlog}
                handleBlog={handleBlog}
                blog={blog}
              />


              {
                blogs.map((blog, index) =>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    blogs={blogs} 
                    setBlogs={setBlogs}
                    setErrorMessage={setErrorMessage}
                    index={index}
                    user={user}
                  />
                )
              }
            </div>)
      }

    </div>
  )
}

export default App