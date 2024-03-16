import { useEffect } from 'react'
import blogService from './services/blogService'
import { ToastContainer } from 'react-toastify'
import NewUser from './Pages/NewUser/NewUser'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BlogsPage from './Pages/BlogsPage/BlogsPage'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/userSlice'

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const userDetaills = localStorage.getItem('userLoggedIn');
    if (userDetaills) {
      const accesstokenData = JSON.parse(userDetaills);
      dispatch(setUser(accesstokenData))
      blogService.setToken(accesstokenData.token);
    }
  }, [])

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className='main-container'>
        {
          !user ?
            <NewUser />
            :
            <BlogsPage />
        }
      </div>
      <Footer />
    </div>
  )
}

export default App