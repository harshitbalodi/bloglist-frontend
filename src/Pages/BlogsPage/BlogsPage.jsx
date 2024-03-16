import './BlogsPage.css';
import Blog from '../../components/Blog/Blog';
import CreateBlog from '../../components/CreateBlog'
import { useDispatch, useSelector } from 'react-redux';
import { BlogThunk } from '../../store/blogsSlice';
import { useEffect } from 'react';
import { setUser } from '../../store/UserSlice';

const BlogsPage = () => {
  const [user, blogs] = useSelector(state => [state.user, state.blogs]);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    const onLogin = async () => {
      if (user) {
        try {
          dispatch(BlogThunk());
        } catch (error) {
          console.log(error);
        }
      }
    }
    onLogin();
  }, [user])

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Logout...")
    localStorage.removeItem('userLoggedIn');
    dispatch(setUser(null));
  }
  return (
    <div className='blogs-wrapper'>
      {/* <span> {user.name} is logged in</span> */}
      {/* <button onClick={handleLogout} > Logout </button> */}
      <CreateBlog />
      <div className='blogs-container'>
        {
          blogs.map((blog, index) =>
            <Blog key={blog.id} blog={blog} index={index} />
          )
        }
        </div>
    </div>
  )
}

export default BlogsPage