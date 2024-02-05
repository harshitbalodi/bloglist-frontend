import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogService'

const CreateBlog = ({ blogs, setBlogs, setErrorMessage, setAddMessage }) => {

    const [blog, setBlog] = useState({
        title: "",
        author: "",
        url: ""
    })
    const [createBlogVisible, setCreateBlogVisible] = useState(false);

    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

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
            setErrorMessage(error.message);
            setTimeout(() => setErrorMessage(null), 5000);
        }
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button data-testid="create-blog" onClick={() => setCreateBlogVisible(true)}>create Blog</button>
            </div>
            <div style={showWhenVisible}>
              <h2>create new Blog</h2>
                <form onSubmit={handleBlog}>
                    <div>
                        <input
                            type="text"
                            name="Title"
                            value={blog.title}
                            placeholder="title"
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="Author"
                            value={blog.author}
                            placeholder='author'
                            onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                        />

                    </div>
                    <div>
                        <input
                            type="text"
                            name="Url"
                            value={blog.url}
                            placeholder='url'
                            onChange={(e) => setBlog({ ...blog, url: e.target.value })}
                        />

                    </div>
                    <button data-testid='create' type='submit'> Create</button>

                </form>
                <button  onClick={() => setCreateBlogVisible(false)}>cancel</button>
            </div>

        </div>
    )
}

export default CreateBlog