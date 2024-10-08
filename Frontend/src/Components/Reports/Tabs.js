import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
 
function TabPanel(props) {
 // console.log("props",props);
  const { children, value, index, ...other } = props;
 
  return (
<div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
 
export default function VerticalTabs({ tabs }) {

  // console.log("tabs Componets  sub division",subDivision);
  // console.log("tabs Componets division ",division);
  // console.log("tabs Componets",tabs);
  const [value, setValue] = React.useState(0);
 
  const handleChange = (event, newValue) => {
    //console.log("tab value",newValue);
    setValue(newValue);
  };
 
  return (
<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 400 }}>
<Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
>
        {tabs.map((tab, index) => (
<Tab key={index} label={tab.label} 
{...a11yProps(index)} 
sx={{
  '&.Mui-selected': {
    color: '#8EC400', // Color when selected
    fontWeight: '700', // Font weight when selected
  },
  color: '#1A005D', // Default color when not selected
  fontWeight: '700', // Default font weight when not selected
}}

/>
        ))}
</Tabs>
      {tabs.map((tab, index) => (
<TabPanel key={index} value={value} index={index}>
          {tab.component}
</TabPanel>
      ))}
</Box>
  );
}
 
VerticalTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired
    })
  ).isRequired,
};