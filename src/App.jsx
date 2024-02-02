import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import AddNotification from './components/AddNotification'
import ErrorNotitfication from './components/ErrorNotification'
import CreateBlog from './components/CreateBlog'
const App = () => {

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [addMessage, setAddMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const onLogin = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    }
    onLogin();
  }, [])

  useEffect(() => {
    const userDetaills = localStorage.getItem('userLoggedIn');
    if (userDetaills) {
      const accesstokenData = JSON.parse(userDetaills);

      setUser(accesstokenData.name);
      blogService.setToken(accesstokenData.token);
    }

  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginService.login({ username: username, password: password });
      console.log(data);
      console.log(data.token);
      blogService.setToken(data.token);
      localStorage.setItem('userLoggedIn', JSON.stringify(data));
      setUser(data);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("Login Error:", error);
      console.log("Error message:", error.message);
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
          <div>
            <h2>Login in to application</h2>
            <ErrorNotitfication errorMessage={errorMessage} />
            <form onSubmit={handleLogin}>
              <div>
                username
                <input
                  type="text"
                  name="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                password
                <input
                  type="password"
                  name="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" >login</button>
            </form>
          </div>
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
              <span> {user} is logged in</span>
              <button onClick={handleLogout} > Logout </button>
              <CreateBlog
                blogs={blogs}
                setBlogs={setBlogs}
                setErrorMessage={setErrorMessage}
                setAddMessage={setAddMessage}
              />

              <h2>create new</h2>

              {
                blogs.map((blog, index) =>
                  <Blog
                    setBlogs={setBlogs}
                    blogs={blogs}
                    index={index}
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