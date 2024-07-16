import { useEffect } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BlogsPage from './Pages/BlogsPage/BlogsPage'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/userSlice'
import './index.css';
import token from './services/token'
import loginService from './services/loginService'
import { useLocation } from 'react-router-dom'
import FriendRequests from './components/FriendRequests'
import FriendsList from './components/FriendList'
import LoginPage from './Pages/LoginPage/LoginPage'

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const location = useLocation();

  useEffect(() => {
    const isUserExist = async () => {
      console.log("useeffect");
      try {
        const { data } = await loginService.refresh();

        console.log("data when hitting the login/refresh", data);
        dispatch(setUser(data));
        localStorage.setItem('userLoggedIn', JSON.stringify(data));
      } catch (error) {
        console.warn("error in refresh token auth", error)
        if (error.status === 401) {
          const res = await loginService.logout();
          console.log(res);
          // token.setToken(null);
          // dispatch(setUser(null));
        }
      }
    }
    isUserExist();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('token');
    if (accessToken) {
      console.log("token", accessToken);
      token.setToken(accessToken);
      localStorage.setItem('userLoggedIn', JSON.stringify({ accessToken }));
      dispatch(setUser({ accessToken: token }));
      window.history.replaceState({}, document.title, '/');
    }
  }, [location.search]);

  return (
    <div>
      {/* <Header /> */}
      <div className='main-container'>
        {
          !user ?
            <LoginPage />
            :
            <>
              <Header />
              <BlogsPage />
              <FriendRequests />
              <FriendsList />
            </>
        }
      </div>
      <Footer />
    </div>
  )
}

export default App


