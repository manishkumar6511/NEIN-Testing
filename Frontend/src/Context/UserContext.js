import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    isAuthenticated: false,
    branchName: '',
    email: '',
    empid: '',
      empname:'',
      branchid: '',
      user_right: '',
      job_role: '',
      employeeRoleType: '',
      menus: '',
  });

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    console.log("storedUserDetails",storedUserDetails);
    if (storedUserDetails) {
      const parsedDetails = JSON.parse(storedUserDetails);
      const currentTime = new Date().getTime();
  
      if (parsedDetails.expirationTime && currentTime > parsedDetails.expirationTime) {
        // Session has expired
        localStorage.removeItem('userDetails');
        setUserDetails(null);
        alert('Session has expired. Please log in again.');
       
        window.location.href = '/login';
      } else {
        setUserDetails(parsedDetails);
      }
    }
  }, []);

  const login = (details) => {

    const sessionDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
  const expirationTime = new Date().getTime() + sessionDuration;
  console.log("expirationTime",expirationTime);
    const newDetails = {
      isAuthenticated: true,
      branchName: details.branchName,
      email: details.email,
      empid: details.empid,
      empname: details.empname,
      branchid: details.branchid,
      user_right: details.user_right,
      job_role: details.job_role,
      employeeRoleType: details.employeeRoleType,
      menus:details.menus,
      expirationTime,
    };
    console.log("new",newDetails);
    setUserDetails(newDetails);
    localStorage.setItem('userDetails', JSON.stringify(newDetails));
  };

  const logout = () => {
    const newDetails = {
      isAuthenticated: false,
      branchName: '',
      email: '',
      empid: '',
      empname:'',
      branchid: '',
      user_right: '',
      job_role: '',
      employeeRoleType: '',
      menus: '',
    };
    setUserDetails(newDetails);
    localStorage.removeItem('userDetails');
  };

  return (
    <UserContext.Provider value={{ userDetails, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
