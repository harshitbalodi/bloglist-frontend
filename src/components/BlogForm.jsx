import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [type, setType] = useState('post');

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(imageUrls);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, content, images, type });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required
        />
      </div>
      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="post">Post</option>
          <option value="article">Article</option>
        </select>
      </div>
      <div>
        <label>Content</label>
        {type === 'post' ? (
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            required
          />
        ) : (
          <ReactQuill 
            value={content} 
            onChange={setContent} 
            required
          />
        )}
      </div>
      {type === 'post' && (
        <div>
          <label>Images</label>
          <input 
            type="file" 
            multiple 
            onChange={handleImageUpload} 
          />
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogForm;
