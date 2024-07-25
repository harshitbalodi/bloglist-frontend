import React, { useState } from 'react'
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDown from '../../assets/arrow-down.svg';
import { setUser } from '../../store/userSlice';
import loginService from '../../services/loginService';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export const NavigationLink = ({to, Icon, label}) => {
  location = useLocation();
  const isActive = location.pathname === to;
  return (
    <div>
      <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
        <Icon width={20} height={20} />
        <span className='nav-label'>{label}</span>
      </Link>
    </div>
  )
}


const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async (e) => {
    try {
      const response = await loginService.logout();
      e.preventDefault();
      console.log("Logout...")
      localStorage.removeItem('userLoggedIn');
      dispatch(setUser(null));
      console.log(response);
    } catch (error) {
      console.warn(error);
    }
  }
  return (
    <div className='header'>
      <div>
        {/* <img src="../../assets/bloglist-logo.jpg" alt="Bloglist" /> */}
        <h3 className='logo'>Bloglist</h3>
      </div>
    
      {user && <div className='dropdown-container'
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div
          className='dropdown-btn'
          onClick={() => setIsOpen(!isOpen)}

        >
          {/* {user.name && user.name.slice(0, 9)}{user.name.length > 9 && '...'} */}
          <img
            className={`arrow ${isOpen ? 'rotate' : ''}`}
            src={ArrowDown}
            width={25}
            alt="&gt;"
          />
        </div>
        {isOpen && <ul
          className='dropdown-menu'
          onMouseEnter={e => e.stopPropagation()}
        >
          <li onClick={handleLogout} >Logout</li>
        </ul>
        }
      </div>
      }
    </div>
  )
}

export default Header