import { useState } from "react"
// import '../index.css'
import blogService from "../services/blogService";

const Blog = ({ blog, setErrorMessage, handleLike }) => {
  const [isView, setIsView] = useState(false);

  
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
            <span data-testid="title">
              {blog?.title}
            </span>
            <span data-testid="author">
              {blog?.author}
            </span>
              <button  onClick={() => setIsView(!isView)}>hide</button>
            <a data-testid="url" href={blog?.url}>{blog?.url}</a>
            <span data-testid="likes">
              {blog?.likes} likes  
            </span>
            <button data-testid="like" onClick={handleLike}> like</button>
            <p data-testid="name"> {blog?.user?.name} </p>
            <button onClick={handleRemove}>remove</button>
          </div>
          :
          <div>
            <span data-testid="title">
            {blog.title}
            </span>
            <span data-testid="author">
              {blog.author}
            </span>
          <button  data-testid="view" onClick={() => setIsView(!isView)}>view</button>
          </div>
          
      }
    </div>

  )
}

export default Blog