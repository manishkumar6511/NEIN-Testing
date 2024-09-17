

import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './Context/UserContext';
import {TextField } from '@mui/material';
import {Button } from '@mui/material';
import bgImage from './Images/bg3.jpg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Grid } from '@mui/material';
import { ToastProvider, useToast } from './Components/centralized_components/Toast';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const { showToast } = useToast();
  const [empid, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        console.log("user submit ");
        // login({
        //   branchName: username,
        //   email: password,
        // });

        
    try {
      const response = await axios.post(`${API_BASE_URL}/User/login1`, {
        userid:empid,
        password:password,
      });
      const userDetails = response.data.userDetails;
const menus=response.data.userAccess.access_config;
      console.log(userDetails);
      console.log(menus);
      
      
      if (response.data) {
        login({
          branchName: userDetails.b_name,
          email: userDetails.email,
          empid: userDetails.emp_id,
      empname: userDetails.full_name,
      branchid: userDetails.b_no,
      menus:menus,
     
     
    //  menus: response.data.userDetails,
        });
      } else {
         showToast("Invalid Credentials", "error");
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        backgroundImage: `url(${bgImage})`, // If you want the background image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
      <TextField
         
          value={empid}
          onChange={(e) => setUsername(e.target.value)}
            
            label="Employee Id" required
            
            size='small'
           
            InputLabelProps={{ style: { fontSize: '14px'} }}
           
          />
          </Grid>
          <Grid item xs={12}>
           {/* <TextField
         
         value={password}
         onChange={(e) => setPassword(e.target.value)}
           type='password'
           label="Password" required
           
           size='small'
          
           InputLabelProps={{ style: { fontSize: '14px'} }}
          
         /> */}
          <FormControl sx={{ m: 0, width: '23ch' }} variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
       
          </Grid>
          <Grid item xs={12}>
         
        
        <Button type="submit" variant='contained' color='primary'>Login</Button>
        </Grid>
        </Grid>
      </form>
      </CardContent>
      </Card>
    </div>
   
  );
};

export default Login;

