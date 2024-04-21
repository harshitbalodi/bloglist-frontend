import React, { useState } from 'react'
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDown from '../../assets/arrow-down.svg';
import { setUser } from '../../store/userSlice';


const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Logout...")
    localStorage.removeItem('userLoggedIn');
    dispatch(setUser(null));
  }
  return (
    <div className='header'>
     <div>
      <img src="../../assets/bloglist-logo.jpg" alt="Bloglist" />
      {/* <h3>Bloglist</h3> */}
      </div> 
      {user && <div className='dropdown-container'
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div
          className='dropdown-btn'
          onClick={() => setIsOpen(!isOpen)}

        >
          {user.name.slice(0, 9)}{user.name.length > 9 && '...'}
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