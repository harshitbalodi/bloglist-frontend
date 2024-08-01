import React from 'react'
import { useState } from 'react'
import './CreateBlog.css';
import CrossIcon from '../../assets/cross-icon.svg'
import PlusIcon from '../../assets/plus-icon.svg';

const CreateBlog = () => {
    const [createBlogVisible, setCreateBlogVisible] = useState(false);
    const [blog, setBlog] = useState({
        title: "",
        author: "",
        url: ""
      })    

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
            setErrorMessage(error.response.data);
            setTimeout(() => setErrorMessage(null), 5000);
        }
    }
    
    return (
        <div className='create-blog-wrapper'>
            <div style={hideWhenVisible}>
                <button data-testid="create-blog" className='show-form' onClick={() => setCreateBlogVisible(true)}>
                    Post Blog
                    <img src={PlusIcon} width={25} alt="" />
                </button>
            </div>
            <div className='blog-form' style={showWhenVisible}>
                <button className='cross-icon' onClick={() => setCreateBlogVisible(false)}>
                    <img src={CrossIcon} width={30} alt="" />
                </button>
                <form  onSubmit={handleBlog}>
                    <div>
                        <input
                            type="text"
                            name="Title"
                            value={blog.title}
                            placeholder="title"
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
                            placeholder='author'
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
                            placeholder='url'
                            id='url'
                            onChange={(e) => setBlog({ ...blog, url: e.target.value })}
                            required
                        />

                    </div>
                    <button data-testid='create' className='post-blog' type='submit'> Post</button>

                </form>
                
            </div>

        </div>
    )
}

export default CreateBlog