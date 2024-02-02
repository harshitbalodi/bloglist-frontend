import { useState } from "react"
import '../index.css'
import blogService from "../services/blogService";

const Blog = ({ setBlogs, blogs, index, blog, setErrorMessage }) => {
  const [isView, setIsView] = useState(false);

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
  const handleRemove = async () => {
    const action = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (action) {
      try {
        await blogService.deleteBlog(blog.id);
      } catch (error) {
        setErrorMessage(error.message);
        setTimeout(() => setErrorMessage(null), 5000);
      }
    }
  }
  return (
    <div className="blog">
      {
        isView
          ?
          <div>
            <p>
              {blog?.title}
              ,{blog?.author}
              <button onClick={() => setIsView(!isView)}>hide</button>
            </p>

            <a href={blog?.url}> {blog?.url}</a>
            <p>
              {blog?.likes}
              <button onClick={handleLike}>like</button>
            </p>
            <p> {blog?.user?.name} </p>
            <button onClick={handleRemove}>remove</button>
          </div>
          :
          <p>
            {blog.title} ,{blog.author}
            <button onClick={() => setIsView(!isView)}>view</button>
          </p>
      }
    </div>

  )
}

export default Blog