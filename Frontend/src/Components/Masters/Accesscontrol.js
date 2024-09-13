import React, { useState } from 'react';
import { Grid, Typography, Switch, FormControlLabel, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

// Define the structure of the modules and submodules
const modules = [
  {
    moduleName: 'Module 1',
    submodules: ['Submodule 1', 'Submodule 2', 'Submodule 3', 'Submodule 4'],
  },
  {
    moduleName: 'Module 2',
    submodules: ['Submodule 1', 'Submodule 2', 'Submodule 3', 'Submodule 4'],
  },
  {
    moduleName: 'Module 3',
    submodules: ['Submodule 1', 'Submodule 2', 'Submodule 3', 'Submodule 4', 'Submodule 5'], // 5 submodules
  },
];

const SlideSwitchPage = () => {
  const [userId, setUserId] = useState('');
  const [switchState, setSwitchState] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Handle input change for user ID
  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  // Handle switch toggling
  const handleSwitchChange = (module, submodule) => (event) => {
    setSwitchState({
      ...switchState,
      [`${module}-${submodule}`]: event.target.checked,
    });
    setHasChanges(true); // Track if there are changes to be saved
  };

  // Function to simulate fetching user access based on user ID
  const fetchUserAccess = async () => {
    try {
      // Simulate API call to get user access data
      const accessData = {
        'Module 1-Submodule 1': true,
        'Module 1-Submodule 2': false,
        'Module 2-Submodule 1': true,
        'Module 3-Submodule 1': false,
        'Module 3-Submodule 5': true,
      };
      setSwitchState(accessData); // Update switches based on access data
    } catch (error) {
      console.error('Failed to fetch user access:', error);
    }
  };

  // Handle save button click
  const handleSave = async () => {
    const accessData = JSON.stringify(switchState);
    console.log('Saving access data:', accessData);

    try {
      // Simulate sending the data to the API
      await axios.post('/api/save-access', { userId, accessData });
      setHasChanges(false); // Reset changes state after successful save
    } catch (error) {
      console.error('Failed to save access data:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Input box for user ID */}
      <TextField
        label="User ID"
        value={userId}
        onChange={handleUserIdChange}
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
      />

      <Button variant="outlined" onClick={fetchUserAccess} sx={{ mb: 3 }}>
        Fetch User Access
      </Button>


      {/* Render each module */}
      {modules.map((module) => (
        <Box key={module.moduleName} sx={{ mb: 3 }}>
          <Typography variant="h6">{module.moduleName}</Typography>
          <Grid container spacing={2} wrap="nowrap">
            {module.submodules.map((submodule) => (
              <Grid item key={submodule}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={switchState[`${module.moduleName}-${submodule}`] || false}
                      onChange={handleSwitchChange(module.moduleName, submodule)}
                    />
                  }
                  label={submodule}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Save button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={!hasChanges} // Disable button if no changes
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default SlideSwitchPage;
