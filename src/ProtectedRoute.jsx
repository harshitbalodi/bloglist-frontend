import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';

const ProtectedRoute = () => {
  const user = useSelector(state => state.user);

  return (
    user ? (
      <>
        <Header />
        <Outlet />
      </>
    ) : (
      <Navigate to='/login' />
    )
  );
};

export default ProtectedRoute;
