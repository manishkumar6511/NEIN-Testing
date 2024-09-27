import React, { useState, useEffect } from 'react';
import { Grid, Typography, Switch, FormControlLabel, Box, TextField, Button, Divider ,Autocomplete} from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useToast } from '../centralized_components/Toast';

const modules = [
  {
    moduleName: 'Freight Forwarding',
    submodules: ['Air Export', 'Air Import', 'Ocean Export', 'Ocean Import'],
  },
  {
    moduleName: 'Custom Brokerage',
    submodules: ['Air Export', 'Air Import', 'Ocean Export', 'Ocean Import'],
  },
  {
    moduleName: 'Removals',
    submodules: ['Air Export', 'Air Import', 'Ocean Export', 'Ocean Import', 'Domestic'],
  },
  {
    moduleName: 'Other Modules',
    submodules: ['Dashboard', 'Finance', 'View/Edit', 'Masters', 'Reports','Authority To Edit'],
  },
];

const SlideSwitchPage = () => {
  const { showToast } = useToast();
  const[userData,setUserData]=useState('');
const[Userbranch,setUserBranch]=useState('');
const[UserName,setUserName]=useState('');

let empid="";
  const storedUser = localStorage.getItem('userDetails');
  if (storedUser) {
    // Parse the JSON string into an object
    const userDetails = JSON.parse(storedUser);
  
    // Access the branchName property
     empid = userDetails.empid;
  
    // Log or use the branchName as needed
    console.log("empid:", empid);
  } else {
    console.log("No user details found in localStorage.");
  }
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [userId, setUserId] = useState('');
  const [switchState, setSwitchState] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const handleUserIdChange = (event, value) => {
    
    const selectedUser = userData.find(user => `${user.user_name} (${user.emp_id})` === value);
    if (selectedUser) {
       
    setUserId(selectedUser.emp_id);
    }
  };

  const handleSwitchChange = (module, submodule) => (event) => {
    setSwitchState({
      ...switchState,
      [`${module}-${submodule}`]: event.target.checked,
    });
    setHasChanges(true); // Track if there are changes to be saved
  };

  const fetchUserAccess = async () => {
    try {
      console.log("userId",userId);
      const response = await axios.post(`${API_BASE_URL}/User/Access`, { userid: userId });
      console.log(response.data);
      if(response.data!=="No access found for user"){
          // Ensure the response data is properly structured
    const menus = response.data.userAccess.access_config;
const Userbranch=response.data.userDetails.b_name;
console.log("UserName",response.data);
setUserBranch(Userbranch);
const UserName=response.data.userDetails.full_name;

setUserName(UserName);
    // Log the type of menus to understand its structure
    console.log("Type of menus:", typeof menus);
    console.log("Fetched menus of employee:", menus);

    // Check if menus is a string and parse if necessary
    const parsedMenus = typeof menus === 'string' ? JSON.parse(menus) : menus;

    // Ensure parsedMenus is an object with correct key-value pairs
    if (typeof parsedMenus === 'object' && parsedMenus !== null) {
      setSwitchState(parsedMenus); // Update state with fetched access data
      setHasChanges(false); // Reset changes state as the data is freshly fetched
    } else {
      console.error('Fetched menus are not in the expected format:', parsedMenus);
    }
  }else{
    resetFields();
  }
    } catch (error) {
      console.error('Failed to fetch user access:', error);
    }
  };

  // Debugging: Add a useEffect to check if the switchState is being updated correctly
  useEffect(() => {
    console.log('Switch State Updated:', switchState);
    console.log('userId ', userId);
  }, [switchState]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/ff/User`);
        const details=response.data;
        setUserData(details);
        // const userName = details.map(item => item.user_name);
        // setIndustryOptions(industry); // Set the fetched options
        // console.log("industry", response.data);
      } catch (error) {
        console.error('Error fetching user Details:', error);
      }
    };

  const debounceFetch = setTimeout(fetchUsers, 300);

  return () => clearTimeout(debounceFetch); // Cleanup the timeout

}, []); // Empty dependency array to run only once when the component mounts

  const handleSave = async () => {
    const accessData = JSON.stringify(switchState);
    console.log('Saving access data:', switchState);
    console.log('initiator id:', empid);

    try {
      
      await axios.post(`${API_BASE_URL}/User/update`, { userId, accessData,empid });
      setHasChanges(false); // Reset changes state after successful save
      showToast("Saved Successfully", "success");
    setTimeout(() => {
      setUserId('');
      resetFields();
      
    }, 3000);
    } catch (error) {
      console.error('Failed to save access data:', error);
    }
  };
const resetFields=()=>{
  

setSwitchState({});
}



  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={3} margin={'10px'}>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={userData&&userData.map(user => `${user.user_name} (${user.emp_id})`)} // Format options
        onChange={handleUserIdChange} // Handle selection change
       value={userId}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="User Id"
        InputProps={{
        ...params.InputProps,
      
        type: 'search',
        readOnly: true,
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        required
        
         className="custom-textfield"
        />)}/>
        </Grid>
       
        <Grid item xs={2} margin={'10px'}>
          <Button
            variant="outlined"
            onClick={fetchUserAccess}
            sx={{ mb: 1 }}
            style={{ backgroundColor: '#1A005D', color: 'white' }}
          >
            Fetch Access
          </Button>
         
        </Grid>
      </Grid>
      <Divider />

      {modules.map((module) => (
        <Box key={module.moduleName} sx={{ mb: 3 }}>
          <Typography variant="h6" style={{ textAlign: 'left', fontSize: '18px', color: '#1A005D' }}>
            {module.moduleName}
          </Typography>
          <Grid container spacing={2} wrap="nowrap">
            {module.submodules.map((submodule) => (
              <Grid item key={submodule}>
                <FormControlLabel
                  control={
                    <Switch
                      // Make sure switchState is being checked properly
                      checked={switchState[`${module.moduleName}-${submodule}`] || false}
                      onChange={handleSwitchChange(module.moduleName, submodule)}
                    />
                  }
                  label={submodule}
                />
              </Grid>
            ))}
          </Grid>
          <Divider />
        </Box>
      ))}

      <Button
        variant="contained"
        style={{ color: 'white' }}
        onClick={handleSave}
        
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default SlideSwitchPage;
