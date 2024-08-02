import React, { useState } from 'react';
import './CreateContent.css';
import CrossIcon from '../../assets/cross-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
// import MediaIcon from '../../assets/media-icon.svg'; // Assuming you have an icon for Media
// import EventIcon from '../../assets/event-icon.svg'; // Assuming you have an icon for Event
import ArticleIcon from '../../assets/article-icon.svg';
import PopUpArea from '../PopUpArea/PopUpArea';
import BlogForm from '../BlogForm';

const CreateContent = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const [contentType, setContentType] = useState(null);
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: ""
  });

  const handleBlog = async (e) => {
    e.preventDefault();
    try {
      const data = await blogService.createBlog(blog);
      console.log(data);
      setAddMessage(`a new blog ${blog.title} by ${blog.author}`);
      setTimeout(() => setAddMessage(null), 5000);
      setBlogs([...blogs, data]);
      setBlog({
        title: "",
        author: "",
        url: ""
      });
      console.log("new blog added...");
    } catch (error) {
      console.log("error in create blog");
      setErrorMessage(error.response.data);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div className='create-content-wrapper'>
      {!contentVisible && (
        <div className='create-options'>
          <input
            className='create-input'
            placeholder='Start a post, try writing with AI'
            onFocus={() => setContentVisible(true)}
          />
          <div className='content-icons'>
            {/* <div className='content-option' onClick={() => setContentType('media')}>
              <img src={MediaIcon} alt="Media" />
              <span>Media</span>
            </div>
            <div className='content-option' onClick={() => setContentType('event')}>
              <img src={EventIcon} alt="Event" />
              <span>Event</span>
            </div> */}
            <div className='content-option' onClick={() => setContentType('article')}>
              <img src={ArticleIcon} alt="Article" />
              <span>Write article</span>
            </div>
          </div>
        </div>
      )}
      {contentVisible && (
        <PopUpArea onClick={() => setContentVisible(false)}>
          <button className='cross-icon' onClick={() => setContentVisible(false)}>
            <img src={CrossIcon} width={30} alt="Close" />
          </button>
          {contentType === 'article' && (
            <form onSubmit={handleBlog}>
              <div>
                <input
                  type="text"
                  name="Title"
                  value={blog.title}
                  placeholder="Title"
                  id='title'
                  onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="Author"
                  value={blog.author}
                  placeholder='Author'
                  id='author'
                  onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="Url"
                  value={blog.url}
                  placeholder='URL'
                  id='url'
                  onChange={(e) => setBlog({ ...blog, url: e.target.value })}
                  required
                />
              </div>
              <button className='post-blog' type='submit'>Post</button>
            </form>
          )}
          {/* You can add more forms for other content types here */}
          <BlogForm />
        </PopUpArea>
      )}
    </div>
  );
};

export default CreateContent;
