import React, { useEffect, useState } from "react";
import { Grid, TextField, FormControl } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Button } from "antd";
 import ExportDefaultToolbar from "./CWR";

import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import SailingIcon from '@mui/icons-material/Sailing';
import {Tab,Tabs} from "@mui/material"; 
import VerticalTabs from "./Tabs";
import AEFRegister from "./AEFReg";
import DailyStatus from "./DailyStatus";



 
function Report() {
  const [subBranch, setSubBranch] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedModule, setSelectedModule] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedComponent, setSelectedComponent] = useState(null); // For loading the selected component
  const [open, setOpen] = useState(false);
const[tabLabels,setTabLabels]=useState([]);
const[selectedSubDivision,setSelectedSubDivision]=useState('');
const[currentConfig,setCurrentConfig]=useState({});



const moduleConfig = {
  ff: {
    AirImport: {
      report1: {
        headers: [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'name', headerName: 'Name', width: 150 },
        ],
        apiEndpoint: '/api/ff/air-import/report1'
      },
      report2: {
        headers: [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'description', headerName: 'Description', width: 150 },
        ],
        apiEndpoint: '/api/ff/air-import/report2'
      },
      // Add up to 10 reports here
    },
    OceanExport: {
      report1: {
        headers: [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'shipment', headerName: 'Shipment', width: 150 },
        ],
        apiEndpoint: '/api/ff/ocean-export/report1'
      },
      report2: {
        headers: [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'date', headerName: 'Date', width: 110 },
        ],
        apiEndpoint: '/api/ff/ocean-export/report2'
      },
      // Add up to 10 reports here
    },
  },
  cha: {
    // Define submodules and reports similar to ff
  },
  removals: {
    // Define submodules and reports similar to ff
  },
};


useEffect(()=>{


  console.log("current config ",currentConfig);
})


const tabs = {
  ff:{
    AirImport:[
    {label:'Air import 1',component:<ExportDefaultToolbar  prop="name"  gowthmi={currentConfig} />},
    {label:'Air import 2',component:<h1>ff Air import2 componnet</h1>} ,
    {label:'Air import 3',component:<h1>ff Air import 3 componnet</h1>} ,
    {label:'Air import 4',component:<h1>ff Air import 4 componnet</h1>} ,
    ],
   
    AirExport: [
      {label:'AEF REGISTER',component:<AEFRegister/>},
      {label:'DAILY STATUS',component:<DailyStatus/>},
      {label:'2023 v 2024',component:<h1>2023 v 2024</h1>},
      {label:'CHA',component:<h1>CHA</h1>},
      {label:'AWR',component:<h1>AWR</h1>},
      {label:'CWR',component:<ExportDefaultToolbar 
        header={currentConfig} />},
      {label:'TOP 15',component:<h1>TOP 15</h1>},
      {label:'TOP CARRIER',component:<h1>TOP CARRIER</h1>},
      {label:'PIC',component:<h1>AEF PIC</h1>},
      {label:'CUSTOM REPORT',component:<h1>CUSTOM REPORT</h1>},
    ],
    OceanImport: [
      {label:'Ocean import 1',component:<h1>ff Ocean import 1 componnet</h1>} ,
      {label:'Ocean import 2',component:<h1>Ocean import2 componnet</h1>} ,
      {label:'Ocean import 3',component:<h1>Ocean import 3 componnet</h1>} ,
      {label:'Ocean import 4',component:<h1>Ocean import 4 componnet</h1>} ,
    ],
    OceanExport:[
      {label:'Ocean Export 1',component:<h1>ff Ocean Export 1 componnet</h1>} ,
      {label:'Ocean Export 2',component:<h1>ff Ocean Export componnet</h1>} ,
      {label:'Ocean Export 3',component:<h1>ff Ocean Export 3 componnet</h1>} ,
      {label:'Ocean Export 4',component:<h1>ff Ocean Export 4 componnet</h1>} ,
    ]
  },
  cha:{
    AirImport:[
      {label:'Air import 1',component:<h1>cha Air import 1 componnet</h1>} ,
      {label:'Air import 2',component:<h1>cha Air import2 componnet</h1>} ,
      {label:'Air import 3',component:<h1>cha Air import 3 componnet</h1>} ,
      {label:'Air import 4',component:<h1>cha Air import 4 componnet</h1>} ,
      ],
     
      AirExport: [
        {label:'Air Export 1',component:<h1>cha Air Export 1 componnet</h1>} ,
      {label:'Air Export 2',component:<h1>cha Air Export componnet</h1>} ,
      {label:'Air Export 3',component:<h1>cha Air Export 3 componnet</h1>} ,
      {label:'Air Export 4',component:<h1>cha Air Export 4 componnet</h1>} ,
      ],
      OceanImport: [
        {label:'Ocean import 1',component:<h1>cha Ocean import 1 componnet</h1>} ,
        {label:'Ocean import 2',component:<h1> cha Ocean import2 componnet</h1>} ,
        {label:'Ocean import 3',component:<h1>cha Ocean import 3 componnet</h1>} ,
        {label:'Ocean import 4',component:<h1>cha Ocean import 4 componnet</h1>} ,
      ],
      OceanExport:[
        {label:'Ocean Export 1',component:<h1>cha Ocean Export 1 componnet</h1>} ,
        {label:'Ocean Export 2',component:<h1>cha Ocean Export componnet</h1>} ,
        {label:'Ocean Export 3',component:<h1>cha Ocean Export 3 componnet</h1>} ,
        {label:'Ocean Export 4',component:<h1>cha Ocean Export 4 componnet</h1>} ,
      ]
  },
  removals:{
    AirImport:[
      {label:'Air import 1',component:<h1>rm Air import 1 componnet</h1>} ,
      {label:'Air import 2',component:<h1>rm Air import2 componnet</h1>} ,
      {label:'Air import 3',component:<h1>rm Air import 3 componnet</h1>} ,
      {label:'Air import 4',component:<h1>rm Air import 4 componnet</h1>} ,
      ],
     
      AirExport: [
        {label:'Air Export 1',component:<h1>rm Air Export 1 componnet</h1>} ,
      {label:'Air Export 2',component:<h1>rm Air Export componnet</h1>} ,
      {label:'Air Export 3',component:<h1>rm Air Export 3 componnet</h1>} ,
      {label:'Air Export 4',component:<h1>rm Air Export 4 componnet</h1>} ,
      ],
      OceanImport: [
        {label:'Ocean import 1',component:<h1>rm Ocean import 1 componnet</h1>} ,
        {label:'Ocean import 2',component:<h1> rm Ocean import2 componnet</h1>} ,
        {label:'Ocean import 3',component:<h1>rm Ocean import 3 componnet</h1>} ,
        {label:'Ocean import 4',component:<h1>rm Ocean import 4 componnet</h1>} ,
      ],
      OceanExport:[
        {label:'Ocean Export 1',component:<h1>rm Ocean Export 1 componnet</h1>} ,
        {label:'Ocean Export 2',component:<h1>rm Ocean Export componnet</h1>} ,
        {label:'Ocean Export 3',component:<h1>rm Ocean Export 3 componnet</h1>} ,
        {label:'Ocean Export 4',component:<h1>rm Ocean Export 4 componnet</h1>} ,
      ]

  }
  };


 

  const subBranchOptions = [
    { label: 'Bangalore', value: '10' },
    { label: 'Chennai', value: '40' },
    { label: 'Mumbai', value: '30' }
  ];
 
  const moduleOptions = [
    { label: 'Freight Forwarding', value: 'ff' },
    { label: 'Custom Brokerage', value: 'cha' },
    { label: 'Removals', value: 'removals' }
  ];
  const subDivisions = [
    { label: 'Air Export', value: 'AirExport' },
    { label: 'Air Import', value: 'AirImport' },
    { label: 'Ocean Export', value: 'OceanExport' },
    { label: 'Ocean Import', value: 'OceanImport' }
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  
 
  // Define submodules for each module
  const submodulesMap = { 
    ff: [
      { 
        icon: <AirplanemodeActiveIcon style={{ transform: 'rotate(180deg)' }} color="success"/>,
         name: 'Air Import',value:'AirImport',
         right:'101',
        //  tab : {
        //   AirImport:[
        //   {label:'Air import 1',component:<h1>Air import 1 componnet</h1>} ,
        //   {label:'Air import 2',component:<h1>Air import2 componnet</h1>} ,
        //   {label:'Air import 3',component:<h1>Air import 3 componnet</h1>} ,
        //   {label:'Air import 4',component:<h1>Air import 4 componnet</h1>} ,
        //   ]}
        
        
        },
      { icon: <AirplanemodeActiveIcon color="success"/>, name: 'Air Export',value:'AirExport',component:<VerticalTabs/>,right:'102' },
      { icon: <DirectionsBoatFilledIcon color="success"/>, name: 'Ocean Import',value:'OceanImport',right:'103' },
      { icon: <SailingIcon color="success" />, name: 'Ocean Export',value:'OceanExport' ,right:'104'},
    ],
    cha: [
      { icon: <AirplanemodeActiveIcon style={{ transform: 'rotate(180deg)' }} color="success"/>, name: 'Air Import',right:'101' },
      { icon: <AirplanemodeActiveIcon color="success"/>, name: 'Air Export',right:'102' },
      { icon: <DirectionsBoatFilledIcon color="success"/>, name: 'Ocean Import',right:'103' },
      { icon: <SailingIcon color="success" />, name: 'Ocean Export' ,right:'104'},
    ],
    removals: [
      { icon: <AirplanemodeActiveIcon style={{ transform: 'rotate(180deg)' }} color="success"/>, name: 'Air Import',right:'101' },
      { icon: <AirplanemodeActiveIcon color="success"/>, name: 'Air Export',right:'102' },
      { icon: <DirectionsBoatFilledIcon color="success"/>, name: 'Ocean Import',right:'103' },
      { icon: <SailingIcon color="success" />, name: 'Ocean Export' ,right:'104'},
    ]
  };
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  const handleModuleChange = (event, newValue) => {
    setSelectedModule(newValue?.value || '');
  };
 const handleSubDivision=(event,newValue)=>{
  setSelectedSubDivision(newValue?.value || '');
 }
 
 
  const handleSubBranch = (event, newValue) => {
    const branch = newValue.value;
    setSubBranch(branch);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      subBranch: branch.trim() === "" ? true : false,
    }));
  };
 
  const handleFromDate = (newDate) => {
    setFromDate(newDate.format('YYYY-MM-DD'));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      fromDate: newDate && dayjs(newDate).isValid() ? false : true,
    }));
  };
 
  const handleToDate = (newDate) => {
    setToDate(newDate.format('YYYY-MM-DD'));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      toDate: newDate && dayjs(newDate).isValid() ? false : true,
    }));
  };
  
  const handleSubmoduleClick = (event,newValue) => {

  
   

    setSelectedComponent(newValue.value ? tabs[selectedModule][newValue.value] : null);
    setSelectedSubDivision(newValue.value);
    setCurrentConfig(moduleConfig[selectedModule]?.[newValue.value]?.['report1']);
    
    
   
  };
 
  return (
    <>
      <div>
       
        <Grid container spacing={2} style={{ marginTop: '10px' }}  >
          <Grid item xs={2}>
            <FormControl fullWidth>
              <Autocomplete
                size="small"
                freeSolo
                disableClearable
                options={subBranchOptions}
                onChange={handleSubBranch}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Branch"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    required
                    error={!!validationErrors?.subBranch && (subBranch === '')}
                  />
                )}
              />
            </FormControl>
          </Grid>
 
          <Grid item xs={2}>
            <FormControl fullWidth>
              <Autocomplete
                size="small"
                freeSolo
                disableClearable
                options={moduleOptions}
                onChange={handleModuleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Division"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    required
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl fullWidth>
              <Autocomplete
                size="small"
                freeSolo
                disableClearable
                options={subDivisions}
                onChange={handleSubmoduleClick}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sub-Division"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    required
                  />
                )}
              />
            </FormControl>
          </Grid>
 
          <Grid item xs={2}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  name="fromDate"
                  value={fromDate ? dayjs(fromDate, 'DD/MM/YYYY') : null}
                  onChange={handleFromDate}
                  inputFormat="DD/MM/YYYY"
                  label='From Date *'
                  slotProps={{
                    textField: {
                      error: !!validationErrors?.fromDate,
                    },
                  }}
                  error={validationErrors.fromDate && (fromDate === null)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
 
          <Grid item xs={2}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  name="toDate"
                  value={toDate ? dayjs(toDate, 'DD/MM/YYYY') : null}
                  onChange={handleToDate}
                  inputFormat="DD/MM/YYYY"
                  label='To Date *'
                  slotProps={{
                    textField: {
                      error: !!validationErrors?.toDate,
                    },
                  }}
                  error={validationErrors.toDate && (toDate === null)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
 
          <Grid item xs={1}>
            <Button variant="contained" style={{ backgroundColor: '#1a005d', color: 'white', height: '40px' }} onClick={() => console.log('Submit data')}>Submit</Button>
          </Grid>

          {/* SpeedDial with dynamic submodules */}
         {/* <Grid item xs={1}>
            <Box sx={{  transform: 'translateZ(0px)', flexGrow: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial controlled open example"
                sx={{ position: 'absolute', top: -10, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="down"
              >
                {submodulesMap[selectedModule]?.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => handleSubmoduleClick(action)}
                  />
                ))}
              </SpeedDial>
            </Box>
        
 </Grid> */}
 </Grid>
        {/* Render the selected component */}
        <div style={{ marginTop: '20px' }}>



        

        {selectedComponent && (    
          <VerticalTabs tabs={selectedComponent} division={selectedModule} subDivision={selectedSubDivision}
/>
        )}
        </div> 
      </div>
    </>
  );
}
 
export default Report;