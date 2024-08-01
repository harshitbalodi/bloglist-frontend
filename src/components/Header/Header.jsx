import React, { useState } from 'react';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDown from '../../assets/arrow-down.svg';
import { setUser } from '../../store/userSlice';
import loginService from '../../services/loginService';
import PeopleIcon from '../../assets/customSVG/PeopleIcon';
import MessageIcon from '../../assets/customSVG/MessageIcon';
import NotificationIcon from '../../assets/customSVG/NotificationIcon';
import HomeIcon from '../../assets/customSVG/HomeIcon';
import NavigationLink from '../NavigationLink/NavigationLink';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async (e) => {
    try {
      const response = await loginService.logout();
      e.preventDefault();
      console.log("Logout...");
      localStorage.removeItem('userLoggedIn');
      dispatch(setUser(null));
      console.log(response);
    } catch (error) {
      console.warn(error);
    }
  };

  const navArray = [
    { to: '/home', Icon: HomeIcon, label: 'Home' },
    { to: '/message', Icon: MessageIcon, label: 'Message' },
    { to: '/notification', Icon: NotificationIcon, label: 'Notification' },
    { to: '/people', Icon: PeopleIcon, label: 'People' },
  ];

  return (
    <div className='header'>
      <div>
        <h3 className='logo'>Bloglist</h3>
      </div>
      <div className='nav-links'>
        {navArray.map((nav, index) => (
          <NavigationLink key={index} {...nav} />
        ))}
      </div>
      {user && (
        <div className='dropdown-container'
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div
            className='dropdown-btn'
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              className={`arrow ${isOpen ? 'rotate' : ''}`}
              src={ArrowDown}
              width={25}
              alt="Arrow"
            />
          </div>
          {isOpen && (
            <ul
              className='dropdown-menu'
              onMouseEnter={e => e.stopPropagation()}
            >
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
