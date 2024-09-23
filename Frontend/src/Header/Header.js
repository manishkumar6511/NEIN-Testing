import { React, useContext, useEffect, useState } from "react";

import Logo from '../Images/nippon.svg'; // Import your logo
import './../Components/CSS/Header.css';
import HelpButton from "../Components/centralized_components/Help";
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { SwipeableDrawer } from '@mui/material';
import UserContext from "../Context/UserContext";
function Header() {
  const {userDetails,logout } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header1');
      const navbar = document.querySelector('.navbar');


      if (window.scrollY > 0) {
        header.classList.add('shrink');
        navbar.classList.add('shrink');
      } else {
        header.classList.remove('shrink');
        navbar.classList.remove('shrink');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

//   const { userDetails, login, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchor, setAnchor] = useState(false);

  const toggleDrawer = () => {
    setAnchor(!anchor);
  };




  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    logout(); // Perform logout
    navigate('/login'); // Redirect to login page
  };
  let name = {};
  let initial="";
  const storedUser = localStorage.getItem('userDetails');
  if (storedUser) {
    const userDetails = JSON.parse(storedUser);
   name=userDetails.empname;
   initial=name.charAt(0);
    console.log("name object:",initial); 
    
    
  } 
  

  return (
    <>
      <header>
        <div id="header1">
          <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <Link to="/Dashboard" style={{ margin:0}}> */}
            <img src={Logo} alt="Logo" style={{ width: '180px', height: '40px', marginLeft: '50px', paddingTop: '2px' }} /> {/* Logo */}
{/* 
            <div style={{ display: 'flex' }}>
              <span sx={{  fontFamily: 'Arial', fontWeight: 'bold' }}> Welcome : Gowthami</span>
          
              <Button color="inherit" sx={{ color: '#1A005D', fontFamily: 'Arial', fontWeight: 'bold' }}>Home</Button>
              <Button color="inherit" sx={{ color: '#1A005D', fontFamily: 'Arial', fontWeight: 'bold' }}>About</Button>
              <Button color="inherit" sx={{ color: '#1A005D', fontFamily: 'Arial', fontWeight: 'bold' }}>Services</Button>
              <Button color="inherit" sx={{ color: '#1A005D', fontFamily: 'Arial', fontWeight: 'bold' }}>Contact</Button>




            </div> */}

<div style={{ display: 'flex' }}>
<IconButton onClick={handleClick}>
<Avatar
        sx={{ bgcolor: '#1A005D' }}
        alt={initial} 
        src="/broken-image.jpg"
      />
       </IconButton>
       <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem >
          <AccountCircleIcon style={{ marginRight: '8px' }} />
          Profile
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <LogoutIcon style={{ marginRight: '8px' }} />
          Logout
        </MenuItem>
      </Menu>

</div>

            {/* <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ paddingRight: '8px' }}

                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip> */}
              {/* <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                sx={{ zIndex: '99999' }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>

            <Button onClick={toggleDrawer}>Click me</Button> */}


            <SwipeableDrawer
              anchor="right" // Specify the anchor position here
              open={anchor}
              onClose={() => setAnchor(false)}
              onOpen={() => setAnchor(true)}
              sx={{ width: '500px' }}
            >
              {/* Drawer content */}
              <h1>this is right bar </h1>
            </SwipeableDrawer>



          </div>
        </div>
        <HelpButton/>
      </header>
      
    </>
  );
}

export default Header;
