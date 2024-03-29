import { useState } from "react"
import blogService from "../../services/blogService";
import { useDispatch, useSelector } from "react-redux";
import { BlogThunk, setBlogs } from "../../store/blogsSlice";
import './Blog.css';
import DeleteIcon from '../../assets/delete-icon.svg';


const Blog = ({ blog, index }) => {
  // const [isView, setIsView] = useState(false);
  const [user, blogs] = useSelector(state => [state.user, state.blogs]);
  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      const data = await blogService.likeBlog(blog.id);
      const oldblogs = [...blogs];
      oldblogs[index] = data;
      dispatch(BlogThunk());
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemove = async () => {
    const action = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (action) {
      try {
        await blogService.deleteBlog(blog.id);
        const oldblogs = blogs.filter(eachblog => eachblog.id != blog.id)
        setBlogs(oldblogs);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="blog">
      <div>
        <span data-testid="title">
          {blog?.title},
        </span>
        <span data-testid="author">
          {blog?.author}
        </span>
        <button onClick={() => setIsView(!isView)}>hide</button>
        <div>
          <a data-testid="url" href={blog?.url}>{blog?.url}</a>
          <p data-testid="likes">
            {blog?.likes} likes
          </p>
          <button data-testid="like" id="like" onClick={handleLike}> like</button>
          <p data-testid="name"> {blog?.user?.name} </p>
          {user?.username === blog?.user?.username &&
            <img onClick={handleRemove} id="remove" src={DeleteIcon} alt="" />
          }
        </div>

      </div>


    </div>

  )
}

export default Blog