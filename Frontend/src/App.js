import './App.css';
import Header from './Header/Header';
import MiniDrawer from './Slider-Menu/muiSlider';
import { ToastProvider } from './Components/centralized_components/Toast';
import axios from 'axios';
import UserContext from './Context/UserContext';
 
 
import { BrowserRouter, Routes, Route, Link,Navigate } from 'react-router-dom';
import { useContext, useState,useEffect } from 'react';
import ProtectedRoute from './PrivateRoute/PrivateComponent';
 
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useToast } from './Components/centralized_components/Toast';
 
 
 
function App() {
 
  const { userDetails } = useContext(UserContext);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { login } = useContext(UserContext);
 
 
  useEffect(() => {
 
    console.log("this is App function ");
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
 
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("token ",token);
      console.log("decodedToken ",decodedToken);
      console.log("decodedToken ",decodedToken.empid);
      console.log("decodedToken ",decodedToken.psw);
      // localStorage.setItem('token', token);
     
      // localStorage.setItem('userDetails', JSON.stringify(decodedToken));
 
      const handleSubmit = async () => {
        console.log("handle sub mit ");
        console.log(API_BASE_URL);
      try {
        const response = await axios.post(`${API_BASE_URL}/User/login`, {
          userid:decodedToken.empid,
          password:decodedToken.psw,
        });
        const userDetails = response.data.userDetails;
  const menus=response.data.userAccess.access_config;
        console.log("userDetails ",userDetails);
        console.log("menus" +menus);
       
       
        if (response.data) {
          login({
            branchName: userDetails.branch_name,
            email: userDetails.email,
            empid: userDetails.emp_id,
        empname: userDetails.full_name,
        branchid: userDetails.branch_type_code,
        branchCode:userDetails.branch_code,
        reportingBranch:userDetails.reporting_branch_lta,
        menus:menus,
       
          });
 
          window.open(`https://neinsoft1.nittsu.co.in:8185/Dashboard`, '_blank');
        } else {
          // showToast("Invalid Credentials", "error");
        }
      } catch (error) {
        console.error('There was an error logging in!', error);
      }
 
      }
 
      handleSubmit();
    }
  }, );
 
  return (
    <div className="App">
 
 
     <BrowserRouter>
     <div>
 
 
<ToastProvider>
   
   
  {userDetails?.isAuthenticated && <Header />}
  {userDetails?.isAuthenticated && <MiniDrawer />}
         
  {/* <Header />
  <MiniDrawer /> */}
         
          <div>
          <Routes>
              <Route path="/login"  element={userDetails?.isAuthenticated  ? <Navigate to="/Dashboard" /> : <Login  />}/>
           
           
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
 
                 
                  </ProtectedRoute>
                }
              />
           
           
            </Routes>
           
          </div>
        </ToastProvider>
      </div>
    </BrowserRouter>
 
 
 
 
 
 
 
   
 
    </div>
  );
}
 
export default App;