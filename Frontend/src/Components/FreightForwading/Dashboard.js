import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip
import { Grid, TextField,FormControl,Button } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export default function StackBars() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const[fromDate,setFromDate]=useState(null);
  const[toDate,SetToDate]=useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(()  => {
    const currentDate = dayjs().format('YYYY-MM-DD'); // Get current date in YYYY-MM-DD format
  const thirtyDaysAgo = dayjs().subtract(30, 'day').format('YYYY-MM-DD'); // Subtract 30 days

  // Fetch data with the current date and 30 days ago
  fetchData(thirtyDaysAgo, currentDate);
  }, []);

  const fetchData = async (fromDate, toDate) => {
    // If dates are not provided (initial load), use the current month’s start and end dates
    
  
    // Use provided dates or fall back to current month dates
    
  
    try {
      const response = await axios.post(`${API_BASE_URL}/Dashboard/AirImporttFF`, {
        FromDate: fromDate,
        Todate: toDate,
      });
      console.log(response.data);
  
      setData(response.data); // Update the data state with the response
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  // Handle bar click
  const handleBarClick = (branch, category) => {

    console.log('Branch:', branch, 'Category:', category);
    setSelectedBranch(branch);
    setSelectedCategory(category);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleModalRedirect = () => {
    // Navigate to a specific route with branch and category data
    navigate(`/details/${selectedBranch}/${selectedCategory}`);
    handleClose(); // Close modal after navigation
  };

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


  const handleSubmit=()=>{


    const fromDates = dayjs(fromDate).format('YYYY-MM-DD');
const toDates = dayjs(toDate).format('YYYY-MM-DD');

console.log("From Date (user selected):", fromDates);
console.log("To Date (user selected):", toDates);

    const errors = {}; // Object to store validation errors

 
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
    fetchData(fromDates,toDates);
  
    // If all fields are validated successfully
    //setValidated(true);

  //  if(fromDates && toDates){

  //   FreightForwardingFTP(fromDates, toDates, subBranch,API);
  //  }

  }


  return (
    <>
    <h3>Air Export</h3>

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
          <Button variant="contained" style={{backgroundColor:'#1a005d',color:'white',height:'40px'}} onClick={handleSubmit}>Submit</Button>
        </Grid>
        </Grid>

        <BarChart
        dataset={data}
        series={[
          { 
            dataKey: 'completed_count', 
            stack: 'tasks', 
            color: '#8EC300', 
            label: 'Completed', 
            onClick: (e) => handleBarClick(e.row.branch_code, 'completed_count'),
          },
          { 
            dataKey: 'incomplete_count', 
            stack: 'tasks', 
            color: 'red', 
            label: 'Incomplete', 
            onClick: (e) => handleBarClick(e.row.branch_code, 'incomplete_count'),
          },
          { 
            dataKey: 'fiancecapture_complete_count', 
            stack: 'finance', 
            color: '#2196f3', 
            label: 'Finance Complete', 
            onClick: (e) => handleBarClick(e.row.branch_code, 'fiancecapture_complete_count'),
          },
          { 
            dataKey: 'fianceincomplete', 
            stack: 'finance', 
            color: '#ff9800', 
            label: 'Finance Incomplete', 
            onClick: (e) => handleBarClick(e.row.branch_code, 'fianceincomplete'),
          },
        ]}
        xAxis={[{ scaleType: 'band', dataKey: 'branch_code' }]}
        slotProps={{
          legend: { hidden: true }, // Hide legend if needed
          tooltip: {
            renderTooltip: (params) => {
              const branch = params.row.branch_code;

              // Filter the series to only include those with non-zero values
              const filteredSeries = params.series.filter((seriesItem) => {
                return params.row[seriesItem.dataKey] > 0;
              });
          
              // Limit the tooltip to only 2 labels
              const limitedSeries = filteredSeries.slice(0, 2);
            
    return (
      <div>
        <strong>{branch}</strong>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {limitedSeries.map((seriesItem, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: seriesItem.color,
                  display: 'inline-block',
                  marginRight: 5,
                }}
              />
              <span>{seriesItem.label}: {params.row[seriesItem.dataKey]}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  },
}
        }}
        width={1100}
        height={400}
      />
       

      <Modal open={open} onClose={handleClose}>
        <div style={{ padding: 20 }}>
          <h2>{`Details for ${selectedBranch} - ${selectedCategory}`}</h2>
          <p>Show the respective data here</p>
          <button onClick={handleModalRedirect}>Go to Full Details</button>
        </div>
      </Modal>
    </>
  );
}
