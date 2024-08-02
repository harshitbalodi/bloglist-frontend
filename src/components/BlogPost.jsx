import React from 'react';
//react html parser is deprecated,find a new html parser
import ReactHtmlParser from 'react-html-parser';

const BlogPost = ({ blog }) => {
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>By {blog.author}</p>
      <p>Type: {blog.type}</p>
      {blog.type === 'article' ? (
        <div>{ReactHtmlParser(blog.content)}</div>
      ) : (
        <div>
          <p>{blog.content}</p>
          {blog.images && blog.images.map((image, index) => (
            <img key={index} src={image} alt={`Blog image ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPost;
