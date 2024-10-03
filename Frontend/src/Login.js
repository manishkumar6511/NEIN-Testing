import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // for accessing query parameters
import UserContext from './Context/UserContext';
import { Button, Card, CardContent, Grid } from '@mui/material';
import { ToastProvider, useToast } from './Components/centralized_components/Toast';
import bgImage from './Images/bg3.jpg';
import TruckLoder from './Components/centralized_components/truckLoder';


const Login = () => {
  const  [loading, setLoading] =  useState(false);
  const { showToast } = useToast();
  const { login } = useContext(UserContext);
  const [empid, setEmpid] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation(); // Hook to access query parameters
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Automatically extract userId and password from URL on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search); // Get query parameters
    const userIdFromURL = queryParams.get('userId');
   
    const passwordFromURL = queryParams.get('password');
    const decodedString =decodeURIComponent(passwordFromURL);
console.log("decoded string",decodedString);
    if (userIdFromURL && decodedString) {
      setEmpid(userIdFromURL); // Set the received userId to state
      setPassword(decodedString); // Set the received password to state
      handleSubmit(userIdFromURL, decodedString); // Auto-submit with the credentials
    }
  }, [location.search]); // Runs every time the URL changes

  const handleSubmit = async (userId, password) => {

    console.log("user and password",userId,password);
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/User/login`, {
        userid: userId,
        password: password,
      });

      const userDetails = response.data.userDetails;
      if (userDetails) {
        const menus = response.data.userAccess?.access_config || '';

        login({
          branchName: userDetails.branch_name,
          email: userDetails.email,
          empid: userDetails.emp_id,
          empname: userDetails.full_name,
          branchid: userDetails.branch_type_code,
          branchCode: userDetails.branch_code,
          reportingBranch: userDetails.reporting_branch_lta,
          menus: menus,
        });

        //showToast("Login successful!", "success");
      } else {
        showToast("Invalid Credentials", "error");
      }
    } catch (error) {
      console.error('Error logging in!', error);
      showToast("Login failed. Please try again.", "error");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div>
      {(loading ? ( <TruckLoder/> ) :"")}
    </div>
  )
};

export default Login;
