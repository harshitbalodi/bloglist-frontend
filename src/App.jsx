import { useEffect } from 'react'
import blogService from './services/blogService'
import { ToastContainer } from 'react-toastify'
import NewUser from './Pages/NewUser/NewUser'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BlogsPage from './Pages/BlogsPage/BlogsPage'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/userSlice'
import './index.css';
import token from './services/token'
import loginService from './services/loginService'

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const isUserExist= async()=>{
      try{
        const {data} = await loginService.refresh();
        console.log("data when hitting the login/refresh",data);
        dispatch(setUser(data));
      }catch(error){
        console.warn("error in refresh token auth", error)
        if(error.status===401){
          token.setToken(null); 
        }
      }

    }
    isUserExist();
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