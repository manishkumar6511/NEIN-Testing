// import React from "react";
// import { Navigate,Outlet } from "react-router-dom";
// const PrivateComponent=()=>{
//     const auth=localStorage.getItem("user");
//     return auth? <Outlet />:<Navigate to="/SignUp" />;


// }
// export default  PrivateComponent;

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { userDetails } = useContext(UserContext);

  if (!userDetails.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
