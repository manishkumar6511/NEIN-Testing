import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    isAuthenticated: false,
    branchName: '',
    email: '',
    empid: '',
    empname: '',
    branchid: '',
    reportingBranch: '',
    branchCode: '',
    menus: '',
  });

  useEffect(() => {
    const storedUserDetails = sessionStorage.getItem('userDetails');
    console.log("storedUserDetails", storedUserDetails);
    if (storedUserDetails) {
      const parsedDetails = JSON.parse(storedUserDetails);
      const currentTime = new Date().getTime();
  
      if (parsedDetails.expirationTime && currentTime > parsedDetails.expirationTime) {
        // Session has expired
        sessionStorage.removeItem('userDetails');
        setUserDetails(null);
        alert('Session has expired. Please log in again.');
        window.location.href = '/login';
      } else {
        setUserDetails(parsedDetails);
      }
    }
  }, []);

  // Automatically log out the user when the session expires
  useEffect(() => {
    if (userDetails.isAuthenticated) {
      const sessionTimeout = userDetails.expirationTime - new Date().getTime();
  
      if (sessionTimeout > 0) {
        const timer = setTimeout(() => {
          alert('Your session has expired. Please log in again.');
          logout();
          window.location.href = '/login';  // Redirect to login after session expiration
        }, sessionTimeout);

        return () => clearTimeout(timer);  // Clear timeout on component unmount
      }
    }
  }, [userDetails]);

  const login = (details) => {
    const sessionDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
    const expirationTime = new Date().getTime() + sessionDuration;
    console.log("expirationTime", expirationTime);
    const newDetails = {
      isAuthenticated: true,
      branchName: details.branchName,
      email: details.email,
      empid: details.empid,
      empname: details.empname,
      branchid: details.branchid,
      branchCode: details.branchCode,
      reportingBranch: details.reportingBranch,
      menus: details.menus,
      expirationTime,
    };
    console.log("new", newDetails);
    setUserDetails(newDetails);
    sessionStorage.setItem('userDetails', JSON.stringify(newDetails));  // Use sessionStorage
  };

  const logout = () => {
    const newDetails = {
      isAuthenticated: false,
      branchName: '',
      email: '',
      empid: '',
      empname: '',
      branchid: '',
      user_right: '',
      job_role: '',
      employeeRoleType: '',
      menus: '',
    };
    setUserDetails(newDetails);
    sessionStorage.removeItem('userDetails');  // Use sessionStorage
  };

  return (
    <UserContext.Provider value={{ userDetails, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
