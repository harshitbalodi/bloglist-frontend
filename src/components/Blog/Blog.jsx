import { useState } from "react";
import blogService from "../../services/blogService";
import { useDispatch, useSelector } from "react-redux";
import { BlogThunk, setBlogs } from "../../store/blogsSlice";
import './Blog.css';
import { DeleteOutline, ThumbUp } from "@mui/icons-material";

const Blog = ({ blog, index }) => {
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
        const oldblogs = blogs.filter(eachblog => eachblog.id !== blog.id);
        dispatch(setBlogs(oldblogs));
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="blog">
      <div className="blog-header">
        <span className="blog-title" data-testid="title">
          {blog?.title}
        </span>
        <span className="blog-author" data-testid="author">
          {blog?.author}
        </span>
      </div>
      <div className="blog-body">
        <a className="blog-url" data-testid="url" href={blog?.url} target="_blank" rel="noopener noreferrer">
          {blog?.url}
        </a>
        <div className="blog-likes" data-testid="likes">
          <ThumbUp onClick={handleLike} className="icon like-icon" />
          <span>{blog?.likes}</span>
        </div>
      </div>
      <div className="blog-footer">
        <span className="blog-user" data-testid="name">
          {blog?.user?.name}
        </span>
        {user?.username === blog?.user?.username && (
          <DeleteOutline onClick={handleRemove} className="icon delete-icon" />
        )}
      </div>
    </div>
  );
}

export default Blog;