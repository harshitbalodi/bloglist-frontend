import React from 'react'
import Header from './components/Header/Header';
import FriendRequests from './components/FriendRequests';
import FriendsList from './components/FriendList';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import MessagePage from './Pages/MessagePage/MessagePage';
import PeoplePage from './Pages/PeoplePage/PeoplePage';
import NotificationPage from './Pages/NotificationPage/NotificationPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
const ProtectedApp = () => {
  return (
    <div>
        <>
            <Header/>
            <div className='main-container'>
              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/message' element={<MessagePage/>}/>
                <Route path='/people' element={<PeoplePage/>}/>
                <Route path='/notification' element={<NotificationPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
              </Routes>
            </div>
              
        </>
    </div>
  )
}

export default ProtectedApp;