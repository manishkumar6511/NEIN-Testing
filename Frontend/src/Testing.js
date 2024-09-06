import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import './Components/Reports/ScrollableTable.css';
import AEFRegister from './Components/Reports/AEFReg';
import DailyStatus from './Components/Reports/DailyStatus';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper'}}>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
      </DemoContainer>
    </LocalizationProvider> */}


    
      <AppBar position="static" >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="AEF Register" {...a11yProps(0)} />
          <Tab label="Daily Status" {...a11yProps(1)} />
          <Tab label="2023 v 2024" {...a11yProps(2)} />
          <Tab label="CHA" {...a11yProps(3)} />
          <Tab label="AWR" {...a11yProps(4)} />
          <Tab label="CWR" {...a11yProps(5)} />
          <Tab label="Top 15" {...a11yProps(6)} />
          <Tab label="Top Carrier" {...a11yProps(7)} />
          <Tab label="Pic" {...a11yProps(8)} />
          <Tab label="Custom Report" {...a11yProps(9)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
    <AEFRegister/>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
       <DailyStatus/>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
    </Box>
  );
}
