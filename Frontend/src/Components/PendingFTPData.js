import React, { useState,useMemo,useEffect,useCallback } from "react";


import { Grid, TextField,FormControl } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import './CSS/Dashboard.css';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import SailingIcon from '@mui/icons-material/Sailing';
import axios from "axios";
import { useLoader } from "../PrivateRoute/LoaderContext";
import DataTable from "../Components/DataTable";
import DataTableFF from "./centralized_components/DataTableFF";
import { Button } from "antd";
import { useLocation } from 'react-router-dom';
import TruckLoder from "./centralized_components/truckLoder";




function PendingFTP() {

  const  [loading, setLoading] =  useState(false);
  const location = useLocation();
  const[API,setAPI]=useState('');
  const type = location.state?.type || 'Default Type'; // Store 'type' in a variable
  const[validated,setValidated]=useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
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
  const[subBranchOptions,setSubBranchOptions]=useState([]);
  const[selectedSubBranch,setSelectedSubBranch]=useState('');
const[airImportDetails,setAirImportDetails]=useState([]);
const[selectedFilter,setSelectedFilter]=useState('');
const [searchTerm, setSearchTerm] = useState('');
const[DateFilter,setDateFilter]=useState([
    {label:'Last 45 Days',value:'45'},
    {label:'Today',value:'Today'},
    {label:'Week',value:'Week'},
    {label:'Month',value:'Month'}
    
  ])
  const[sessionData,setSessionData]=useState({});
  


// const[reportingBranch,setReportingBranch]=useState("");
 
//   const storedUser = localStorage.getItem('userDetails');
//   if (storedUser) {
//     const userDetails = JSON.parse(storedUser);
//     setReportingBranch(userDetails.reportingBranch);
   
   
//   } else {
//     console.log("No menu details found in localStorage.");
//   }

  
  useEffect(() => {
   const fetchSubBranches=async()=>{
    let reportingBranch="";
    const storedUser = sessionStorage.getItem('userDetails');
    if (storedUser) {
      const userDetails = JSON.parse(storedUser);
      setSessionData(userDetails);
      reportingBranch=userDetails.reportingBranch;
     setSelectedSubBranch(userDetails.branchid);
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/User/subBranch`, {
        reportingBranch:reportingBranch,
       
      });
setSubBranchOptions(response.data);

    }  catch (error) {
      console.error('There was an error logging in!', error);
    }
  }
  const debounceFetch = setTimeout(fetchSubBranches, 300);

  return () => clearTimeout(debounceFetch);

}, []); // Effect runs when HAWBData.MAWBDate changes
 


 

 



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
  
    // Validate `fromDate` field
    if (fromDate===null || dayjs(fromDate, 'YYYY-MM-DD').isValid() === false) {
     
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

 


  

    const handleDateFilter = useCallback((event, value) => {
      if (selectedFilter !== value.value) {
        setSelectedFilter(value.value);
      }
    }, [selectedFilter]);



    const filteredData = useMemo(() => {
      
   console.log("selected sub branch",selectedSubBranch);
        const currentDate = dayjs();
  
  // Define the start dates for today, this week, and this month
  const todayStart = currentDate.startOf('day');
  const weekStart = currentDate.startOf('week');
  const monthStart = currentDate.startOf('month');


  const lastMonthStart = dayjs().subtract(1, 'month').startOf('month'); // July 1st
  const lastMonthEnd = dayjs().subtract(1, 'month').endOf('month');     // July 31st


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
    if(type==='Air Export'){
      let isSubBranchData=true;
      if (selectedSubBranch) {
        isSubBranchData = String(row.BRANCH) === String(selectedSubBranch);
        if (isSubBranchData) {
          console.log("Matching row:", row); // Log rows that match the selected sub-branch
        }else{
          console.log(" row:", row);
        }
      }
      
      
              // Return true if the row is within the date range and contains all search terms
               return isWithinDateRange && containsAllSearchTerms && isSubBranchData;
    }else{
      return isWithinDateRange && containsAllSearchTerms;
    }

        
      });
   
    }, [searchTerm, selectedFilter, data,selectedSubBranch]);


    

const handleSubBranch=(event,newValue)=>{
 console.log("subbranch",newValue);
 console.log("data",data);
 setSelectedSubBranch(newValue.branch_type_code);

 

}


const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  if(type==='Air Export'){
    return `${day}-${month}-${year}`;

  }else{
    return `${year}-${month}-${day}`;
  }
  
};

// Function to calculate dates and send data to API
const FreightForwardingFTP = async (fromDate, toDate, branchId,operation) => {
  
  console.log("coming to freight forwarding FTP")
 
  console.log("from Date",fromDate);
  console.log("To Date",toDate);
  console.log("branchId in pending ftp",branchId);

  if (!(fromDate instanceof Date) || !(toDate instanceof Date)) {
    console.error('Invalid date objects:', { fromDate, toDate });
    return;
  }
 
  
  
  try {
    //console.log("operation",operation);
    setLoading(true);
    const requestData = {
      FromDate: formatDate(fromDate),
      Todate: formatDate(toDate),
      ...(operation === 'AirImport' ? { BranchCode:branchId  } : { BranchId: branchId })
    };
console.log("request data for pending details",requestData);

      setLoading(true);

    const response = await axios.post(`${API_BASE_URL}/dashboard/${operation}`, requestData);
    
    setData(response.data);
    console.log('Response dashboard:', response.data);
    

  } catch (error) {
    console.error('Error sending dates to API:', error);
  }
 finally {
  // Hide loader regardless of success or failure
   setLoading(false);
}
};

useEffect(() => {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() - 90);
 
 let APIType="";
 let branchTypeCodes=";"
 switch (type) {
  case 'Air Import':
    APIType="AirImport";
    setLink("/Operations/FreightForwarding/AirImport");
    branchTypeCodes=sessionData.branchCode;
    break;
  case 'Air Export':
    APIType="AirExport"
    setLink("/Operations/FreightForwarding/AirExport");
    branchTypeCodes = subBranchOptions.map(branch => branch.branch_type_code).join(', ');
setSubBranch(branchTypeCodes);
    break;
  case 'Ocean Import':
     APIType="OceanImport"
     setLink("/Operations/FreightForwarding/OceanImport");
     branchTypeCodes=sessionData.branchid;
    break;
  case 'Ocean Export':
   
     APIType="OceanExport"
     setLink("/Operations/FreightForwarding/OceanExport");
     branchTypeCodes=sessionData.branchid;
    break;
  default:
   
}


setAPI(APIType);
  FreightForwardingFTP(fromDate, today, branchTypeCodes,APIType);
}, [type,subBranchOptions]);








  return (
    <div>

{(loading ? ( <TruckLoder/> ) :"")}





    

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
              sx: {
                '& .MuiInputBase-input': {
                  padding: '8.5px',
                },
                '& .MuiInputLabel-root': {
                  top: '-5px', // Adjust this value as needed
                },
              },
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
              sx: {
                '& .MuiInputBase-input': {
                  padding: '8.5px',
                },
                '& .MuiInputLabel-root': {
                  top: '-5px', // Adjust this value as needed
                },
              },
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

   {type&&type==='Air Export' &&(
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
        DateFilter={DateFilter}
        handleDateFilter={handleDateFilter}
        subBranchOptions={subBranchOptions}
        handleSubBranch={handleSubBranch}
        selectedSubBranch={selectedSubBranch}
      />
    )}
 {type&&type!=='Air Export' &&(
<DataTableFF
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
        DateFilter={DateFilter}
        handleDateFilter={handleDateFilter}
      
      />
 )}
      
    </div>
  );
}

export default PendingFTP;
