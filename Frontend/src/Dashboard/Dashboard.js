import React, { useState,useMemo,useEffect,useCallback } from "react";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Grid, Tabs, Tab, TextField,FormControl } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import SailingIcon from '@mui/icons-material/Sailing';
import axios from "axios";
import './../../src/Components/CSS/Dashboard.css';
import DataTable from "../Components/DataTable";
import { Button } from "antd";
import { useLocation } from 'react-router-dom';





function DashboardOR() {
  const location = useLocation();
  const[API,setAPI]=useState('');
  const type = location.state?.type || 'Default Type'; // Store 'type' in a variable
  const[validated,setValidated]=useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  console.log('Type:', type);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [selectedMawbNo, setSelectedMawbNo] = React.useState(null);
  const [openRow, setOpenRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedType, setSelectedType] = useState('AirImport');
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const[fromDate,setFromDate]=useState(null);
  const[toDate,SetToDate]=useState(null);
  const[link,setLink]=useState("/Operations/FreightForwarding/AirImport");

  const[subBranch,setSubBranch]=useState('');
  const[subBranchOptions,setSubBranchOptions]=useState([
    {label:'Bangalore',value:'10'},
    {label:'chennai',value:'40'},
    {label:'mumbai',value:'30'}
  ]);

const[airImportDetails,setAirImportDetails]=useState([]);



  const [searchTerm, setSearchTerm] = useState('');

  const[DateFilter,setDateFilter]=useState([
    {label:'Last 45 Days',value:'45'},
    {label:'Today',value:'Today'},
    {label:'Week',value:'Week'},
    {label:'Month',value:'Month'}
    
  ])

  const[selectedFilter,setSelectedFilter]=useState('');


 

  const airImportCB=[
{id:1,DocketNo:'AIC/BLR/12905/2024',MAWB:'BIE53210365',Consignee:'GE POWER INDIA LIMITED',Industry:'Health Care'},
{id:2,DocketNo:'AIC/BLR/12618/2024',MAWB:'NEE41037205',Consignee:'EUROBELT BELTING SOLUTIONS PVT LTD',Industry:'Electicals'},
{id:3,DocketNo:'AIC/BLR/12858/2024',MAWB:'MNL0184721',Consignee:'ESSILOR INDIA PVT LTD',Industry:'Automotive'},
  ]

  const airExportCB=[
    {id:1,DocketNo:'AEC/MUM/7161/2024',MAWB:'23248931201',Consignee:'BAGOHLIC  SVERIGE AB',Industry:'Pharmaceutical'},
    {id:2,DocketNo:'AEC/MUM/7168/2024',MAWB:'15762103101',Consignee:'HONDA MALAYSIA',Industry:'Automotive'},
    
      ]

      const oceanImportCB=[
        {id:1,DocketNo:'OIC/CHN/02973/2024',IECode:'0516517911',Consignee:'MITIL POLYMER PRIVATE LIMITED',Industry:'Others'},
        {id:2,DocketNo:'OIC/CHN/02927/2024',IECode:'0398028559',Consignee:'YAZAKI INDIA PRIVATE LIMITED',Industry:'Automotive'},
        
          ]

          const oceanExportCB=[
            {id:1,DocketNo:'OEC/BLR/00469/2024',IECode:'0707019532',Consignee:'M/S. GENERICS Maputo',Industry:'Pharma'},
            {id:2,DocketNo:'OEC/BLR/00468/2024',IECode:'0710002017',Consignee:'YAZAKI INDIA PRIVATE LIMITED',Industry:'Automotive'},
            
              ]



  const handleFromDate=(newDate)=>{
    setFromDate(newDate.format('YYYY-MM-DD'));
   // console.log(fromDate);
   setValidationErrors((prevErrors) => ({
    ...prevErrors,
    fromDate: newDate && dayjs(newDate).isValid() ? false : true,
  }));
  }

  const handleToDate=(newDate)=>{
    SetToDate(newDate.format('YYYY-MM-DD'));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      toDate: newDate && dayjs(newDate).isValid() ? false : true,
    }));
  }

  const fetchData=()=>{


    const fromDates = new Date(fromDate);
    const toDates = new Date(toDate);
    const errors = {}; // Object to store validation errors

    // Validate `subBranch` field
    if (!subBranch || subBranch.trim() === "") {
      errors.subBranch = true; // Mark as an error if empty
    }
    console.log("from Date",fromDate);
    // Validate `fromDate` field
    if (fromDate===null || dayjs(fromDate, 'YYYY-MM-DD').isValid() === false) {
      console.log("false");
      errors.fromDate = true; // Mark as an error if invalid or empty
    }

    // Validate `toDate` field
    if (!toDate || dayjs(toDate, 'YYYY-MM-DD').isValid() === false) {
      errors.toDate = true; // Mark as an error if invalid or empty
    }
  
    // If there are any errors, do not proceed with form submission
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Set validation errors state
     // showToast("Please fill in all required fields", "error");
      return;
    }
  
    // If all fields are validated successfully
    setValidated(true);

   if(fromDates && toDates){

    FreightForwardingFTP(fromDates, toDates, subBranch,API);
   }

  }

  const [data, setData] = useState(airImportDetails);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue===1){
      // console.log("coming here");
      setData(airImportCB);    
      setLink('/Operations/CustomBrokerage/AirImport');
    }
      else{
        setSelectedType('AirImport');
       
        setData(airImportDetails);
       
        
      }
  };

  const handleTableData = (actionName) => {
    // console.log("table Data");
    
    // console.log("actionName",actionName);
    if(value===0){
      
    switch (actionName) {
      case 'Air Import':
        setSelectedType('AirImport');
       // setData(airImportDetails);
        setLink("/Operations/FreightForwarding/AirImport");
        break;
      case 'Air Export':
        setSelectedType('AirExport');
       // setData(airExportDetails);
        setLink("/Operations/FreightForwarding/AirExport");
        break;
      case 'Ocean Import':
        setSelectedType('OceanImport');
       // setData(oceanImportFF);
        setLink("/Operations/FreightForwarding/OceanImport");
        break;
      case 'Ocean Export':
        setSelectedType('OceanExport');
        //setData(oceanExportFF);
        setLink("/Operations/FreightForwarding/OceanExport");
        break;
      default:
       // console.log('Unknown action');
    }
  }else{
   // console.log("Custom Brokerage");
    switch (actionName) {
    case 'Air Import':
        //setData(airImportCB);
        setLink("/Operations/CustomBrokerage/AirImport");
        break;
      case 'Air Export':
        
        //setData(airExportCB);
        setLink("/Operations/CustomBrokerage/AirExport");
        break;

        case 'Ocean Import':
        setData(oceanImportCB);
        setLink("/Operations/CustomBrokerage/OceanImport");
        break;

        case 'Ocean Export':
        setData(oceanExportCB);
        setLink("/Operations/CustomBrokerage/OceanExport");
        break;

        default:
         // console.log('Unknown action');
    }
  }
  };
  let linkToOperations ="";
if(selectedType==='AirExport'){
   linkToOperations = `/Operations/airExport`;
}
  




  const handleRowClick = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId);
    //console.log(rowId);
  };

  const handleSearchTerm=(e)=>{
    setSearchTerm(e.target.value);
    console.log("search term",e.target.value);

  }


  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);

    const selectedMawbNo = row.MAWB_BL_NO || row.MAWB_NO || row.MBL_No;

  setSelectedMawbNo(selectedMawbNo);
  sessionStorage.setItem('mawbNo', selectedMawbNo);

  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleActionClick = (action) => {
   // console.log(`Action: ${action} on row`, selectedRow);
    handleMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

const userRights=[
  {empid:'1665',right:'101'},
  {empid:'1665',right:'102'},
  {empid:'1665',right:'103'},
  {empid:'1665',right:'104'},
 
]
  
  const actions = [
    { icon: <AirplanemodeActiveIcon style={{ transform: 'rotate(180deg)' }} color="success"/>, name: 'Air Import',right:'101' },
    { icon: <AirplanemodeActiveIcon color="success"/>, name: 'Air Export',right:'102' },
    { icon: <DirectionsBoatFilledIcon color="success"/>, name: 'Ocean Import',right:'103' },
    { icon: <SailingIcon color="success" />, name: 'Ocean Export' ,right:'104'},
  ];
  const allowedActions = actions.filter(action =>
    userRights.some(userRight => userRight.right === action.right)
  );
  console.log(allowedActions);
 

    const [direction, setDirection] = useState('down');
    const [hidden, setHidden] = useState(false);
   
    const handleDirectionChange = (event) => {
      setDirection(event.target.value);
    };
    const StyledSpeedDial = useMemo(() => styled(SpeedDial)(({ theme }) => ({
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    })), []);


    const handleDateFilter = useCallback((event, value) => {
      if (selectedFilter !== value.value) {
        setSelectedFilter(value.value);
      }
    }, [selectedFilter]);



    const filteredData = useMemo(() => {
       console.log("calling filtered data",data);
   
        const currentDate = dayjs();
  
  // Define the start dates for today, this week, and this month
  const todayStart = currentDate.startOf('day');
  const weekStart = currentDate.startOf('week');
  const monthStart = currentDate.startOf('month');


  const lastMonthStart = dayjs().subtract(1, 'month').startOf('month'); // July 1st
  const lastMonthEnd = dayjs().subtract(1, 'month').endOf('month');     // July 31st

  console.log("lastMonthStart",lastMonthStart);
  console.log("lastMonthEnd",lastMonthEnd);
  const last45DaysStart = currentDate.subtract(45, 'day');
  // console.log("month week",weekStart);
  return data.filter(row => {
    let rowDate='';
    if (!row.createdDate) {
     // console.error(`Missing createdDate for row:`, row);
      // return false;
    }
    if(row.createdDate){
      rowDate = dayjs((row.createdDate), 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    }else if(row.CreatedDate){
      rowDate = dayjs((row.CreatedDate), 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    }else if(row.Created_date){
      rowDate = dayjs((row.Created_date), 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    }else if(row.created_date){
      rowDate = dayjs((row.created_date), 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    }

  

    if (!rowDate.isValid()) {
      console.error(`Invalid date format for createdDate: ${row.createdDate}`);
      return false;
    }
    
    let isWithinDateRange = true;
  

    if (selectedFilter === 'Today') {
      isWithinDateRange = rowDate.isSame(todayStart, 'day');
      //console.log("coming today",isWithinDateRange);
    } else if (selectedFilter === 'Week') {
      isWithinDateRange = rowDate.isAfter(weekStart.subtract(1, 'day')) && rowDate.isBefore(weekStart.add(7, 'day'));
    } else if (selectedFilter === 'Month') {
      
      isWithinDateRange = rowDate.isAfter(lastMonthStart.subtract(1, 'day')) && rowDate.isBefore(lastMonthEnd.add(1, 'day'));
   // console.log(isWithinDateRange);
    } else if (selectedFilter === '45') {
     // console.log("45 days",rowDate);
      isWithinDateRange = rowDate.isAfter(last45DaysStart.subtract(1, 'day')) && rowDate.isBefore(currentDate.add(1, 'day'));
    }
  
          const rowString = `
          ${row.MAWB_BL_NO || ''} 
          ${row.MAWB_NO || ''} 
          ${row.MBL || ''} 
          ${row.DocketNo || ''} 
          ${row.DEPARTURE_CITY || ''} 
          ${row.PortLoading || ''} 
          ${row.IECode || ''} 
          ${row.DESTINATION_CITY || ''} 
          ${row.PortDischarge || ''} 
          ${row.Industry || ''} 
          ${row.CONSIGNEE_NAME || ''} 
           ${row.ORIGIN || ''} 
            ${row.DESTINATION_NAME || ''}
             ${row.CONSIGNEE || ''}
        `.toLowerCase();
    
        // Split the search terms and check if all are included in the row string
        const searchTerms = searchTerm.toLowerCase().split(' ');
        const containsAllSearchTerms = searchTerms.every(term => rowString.includes(term));
    
        // Return true if the row is within the date range and contains all search terms
         return isWithinDateRange && containsAllSearchTerms;
        
      });
   
    }, [searchTerm, selectedFilter, data]);


    

const handleSubBranch=(event,newValue)=>{
  const branch=newValue.value;
  setSubBranch(newValue.value);
  setValidationErrors((prevErrors) => ({
    ...prevErrors,
    subBranch: branch.trim() === "" ? true : false, 
  }));

}


const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

// Function to calculate dates and send data to API
const FreightForwardingFTP = async (fromDate, toDate, branchId,operation) => {
  console.log("coming to freight forwarding FTP")
  // console.log("operation",operation);
  // console.log("dates",typeof(fromDate));
  console.log("from Date",fromDate);
  console.log("To Date",toDate);

  if (!(fromDate instanceof Date) || !(toDate instanceof Date)) {
    console.error('Invalid date objects:', { fromDate, toDate });
    return;
  }
 
  
  
  try {
    //console.log("operation",operation);
   
    const requestData = {
      FromDate: formatDate(fromDate),
      Todate: formatDate(toDate),
      ...(operation === 'AirImport' ? { BranchCode: 'DEL' } : { BranchId: branchId })
    };


    const response = await axios.post(`${API_BASE_URL}/dashboard/${operation}`, requestData);
    
    setData(response.data);
    console.log('Response dashboard:', response.data);
    

  } catch (error) {
    console.error('Error sending dates to API:', error);
  }
};

useEffect(() => {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() - 45);
 //console.log("coming to useEffect");
 let APIType="";
 switch (type) {
  case 'Air Import':
    APIType="AirImport";
    setLink("/Operations/FreightForwarding/AirImport");
    break;
  case 'Air Export':
    APIType="AirExport"
    setLink("/Operations/FreightForwarding/AirExport");
    break;
  case 'Ocean Import':
     APIType="OceanImport"
     setLink("/Operations/FreightForwarding/OceanImport");
    break;
  case 'Ocean Export':
     APIType="OceanExport"
     setLink("/Operations/FreightForwarding/OceanExport");
    break;
  default:
   // console.log('Unknown action');
}
setAPI(APIType);
  FreightForwardingFTP(fromDate, today, '10',APIType);
}, [type]);

  return (
    <div>
    

          <p style={{textAlign:'left'}}>NX-OPERATION REGISTER</p>
         
{/* <Grid item xs={1}>
      
          <Box sx={{ position: 'absolute', right: 0 ,marginRight:'90px',marginTop:'-6px'}}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={hidden}
          icon={<SpeedDialIcon color="yellow"/>}
          direction={direction}
        >
          {allowedActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleTableData(action.name)}
            />
          ))}
        </StyledSpeedDial>
        </Box>
        </Grid> */}
       
<Grid container spacing={2} style={{marginTop:'10px'}}>
  <Grid item xs={3}>
  <FormControl fullWidth>
  <Autocomplete size="small"  freeSolo id="free-solo-2-demo" disableClearable 
      options={subBranchOptions}
      onChange={handleSubBranch}
    
    //  value={subBranch || ''} 
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Sub Branch"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        required
       className="dashboard-autocomplete"
       error={!!validationErrors?.subBranch && (subBranch==='')} // Use the error prop
       
        />)}/> 
    </FormControl>
  </Grid>
<Grid item xs={3}>
<FormControl fullWidth>
<LocalizationProvider dateAdapter={AdapterDayjs}>
     
          <MobileDatePicker
          name="fromDate"
          value={fromDate ? dayjs(fromDate, 'DD/MM/YYYY') : null}
          onChange={handleFromDate}
         size='small'
         style={{marginTop:'10px'}}
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
        <Grid item xs={3}>



        <FormControl fullWidth>       
<LocalizationProvider dateAdapter={AdapterDayjs}>
   
        
          <MobileDatePicker
          name="toDate"
          value={toDate ? dayjs(toDate, 'DD/MM/YYYY') : null}
          onChange={handleToDate}
         size='small'
       
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
          <Button variant="contained" style={{backgroundColor:'#1a005d',color:'white',height:'40px'}} onClick={fetchData}>Submit</Button>
        </Grid>
        </Grid>
        {/* <Grid container spacing={2} style={{alignItems:'revert'}}>
          <Grid item xs={2}>
          <TextField
            className="textfield"
          
            name="search"
            label="Search..."
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
           
            InputLabelProps={{ style: { fontSize: '14px'} }}
           
          />
</Grid>
<Grid item xs={2}>
<Autocomplete size="small"  freeSolo id="free-solo-2-demo" disableClearable 
      options={DateFilter}
      onChange={handleDateFilter}
    
      //value={subBranch || null} 
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Last 45 Days"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        style={{margin:'12px 0px 0px 2px'}}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        required
       className="dashboard-autocomplete"
        />)}/> 
</Grid>
</Grid> */}
        <DataTable
        data={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleRowClick={handleRowClick}
        openRow={openRow}
        handleMenuClick={handleMenuClick}
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        selectedType={type}
        link={link}
        selectedTab={value}
        selectedMawbNo={selectedMawbNo}
        searchTerm={searchTerm}
        handleSearch={handleSearchTerm}
      />
      
    </div>
  );
}

export default DashboardOR;
