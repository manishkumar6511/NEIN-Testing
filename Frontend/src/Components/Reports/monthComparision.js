import React, { useEffect, useState } from "react";
import {
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,
    IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade,TextField,Grid,Autocomplete
  } from '@mui/material';
  import BarChartIcon from "@mui/icons-material/BarChart";
  import dayjs from 'dayjs';
  import { Modal } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import TruckLoder from "../centralized_components/truckLoder";
import * as XLSX from 'xlsx'; // Import the XLSX library
import DownloadIcon from '@mui/icons-material/Download';



  
  // Modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
    justifyContent: 'space-between',
  };


  const MonthComparision = ({ props }) => {
    const  [loading, setLoading] =  useState(false);
  let year=dayjs().year();
  let previousYear=dayjs().year()-1;
  
  
 
    const[header1,setHeader1]=useState(null);
    const[header2,setHeader2]=useState(null);
    const[header3,setHeader3]=useState(null);


    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const[firstData,setFirstData]=useState([]);
const[secondData,setSecondData]=useState([]);
const[thirdData,setThirdData]=useState([]);
const [selectedMonth, setSelectedMonth] = useState('');
const selectedDate1 = dayjs(props.toDate);






const fillMissingDates = (data, yearMonth) => {
  const totalDaysInMonth = 31; // Always assume 31 days
  const completeData = [];

  // Create a complete list of dates for the month (from 01 to 31)
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const date = `${String(day).padStart(2, '0')}-${yearMonth}`; // Format: 'DD-MM-YYYY'
console.log("date format",date);
    // Find the corresponding entry in the API response
    const existingEntry = data.find(item => item.Date === date);

    if (existingEntry) {
      // If entry exists, add it to the completeData array
      completeData.push(existingEntry);
    } else {
      // If entry is missing, fill with default values
      completeData.push({
        Date: date,
        Total_Entries: 0,
        TOTAL_CHARGEABLE_WGT: 0,
      });
    }
  }

  return completeData;
};


console.log(props);
    useEffect(()=>{
      const comparisionDate=async()=>{
        const currentYear = dayjs().year();
        const selectedDate = selectedMonth ? dayjs(`${currentYear}-${selectedMonth.value}-01`) : dayjs(props.toDate);
  
        const firstDateHeaders = selectedDate.format('MMM-YYYY'); 
 const secondDateHeaders = selectedDate.subtract(1, 'month').format('MMM-YYYY'); 
 const thirdDateHeaders = selectedDate.subtract(1, 'year').format('MMM-YYYY');

 setHeader3(thirdDateHeaders);
 setHeader1(firstDateHeaders);
 setHeader2(secondDateHeaders);
        // First: Same month and year as the props date
        const firstDate = selectedDate.format('MM-YY'); // e.g., '09-24'
        const firstYearMonth=selectedDate.format('MM-YYYY');
        
        // Second: Previous month, same year
        const secondDate = selectedDate.subtract(1, 'month').format('MM-YY'); // e.g., '08-24'
        const secondYearMonth=selectedDate.subtract(1, 'month').format('MM-YYYY');
        // Third: Same month, previous year
        const thirdDate = selectedDate.subtract(1, 'year').format('MM-YY'); // e.g., '09-23'
        const thirdYearMonth=selectedDate.subtract(1, 'year').format('MM-YYYY');
        setLoading(true);
        try {

          // First API call
          const response1 = await axios.post(`${API_BASE_URL}/Reports/Comparison`,{
            "date":firstDate,
            "BranchId":props.subBranch,
          });
          const filledFirstData = fillMissingDates(response1.data, firstYearMonth);
          setFirstData(filledFirstData);
          console.log('First Response:', response1.data);
          console.log('First call data:', filledFirstData);
          
          // Second API call
          const response2 =  await axios.post(`${API_BASE_URL}/Reports/Comparison`,{
            "date":secondDate,
            "BranchId":props.subBranch,
          });
          const filledSecondData = fillMissingDates(response2.data, secondYearMonth);
          setSecondData(filledSecondData);
          console.log('Second Response:', response2.data);
          console.log('Second call data:', filledSecondData);
          
          // Third API call
          const response3 =  await axios.post(`${API_BASE_URL}/Reports/Comparison`,{
            "date":thirdDate,
            "BranchId":props.subBranch,
          });
          const filledThirdData = fillMissingDates(response3.data, thirdYearMonth);
        setThirdData(filledThirdData);
        console.log('Third Response:', response3.data);
        console.log('Third call data:', filledThirdData);

          
        } catch (error) {
          console.error('Error fetching data:', error);
        }finally{
          setLoading(false);
        }

      }
     
      comparisionDate();

    },[selectedMonth, props.toDate, props.subBranch]);

   

    const totalShipmentsAndWeight = (data) => {
      return data.reduce(
        (acc, item) => {
          acc.totalShipments += item.Total_Entries;
          acc.totalWeight += item.TOTAL_CHARGEABLE_WGT;
          return acc;
        },
        { totalShipments: 0, totalWeight: 0 }
      );
    };
    
    const firstDataTotals = totalShipmentsAndWeight(firstData);
    console.log("firstDataTotals",firstDataTotals);
    const secondDataTotals = totalShipmentsAndWeight(secondData);
    const thirdDataTotals = totalShipmentsAndWeight(thirdData);


    const data = [
      {
        name: header3,
        shipments: thirdDataTotals.totalShipments,
        weight: thirdDataTotals.totalWeight,
      },
      {
        name: header2,
        shipments: secondDataTotals.totalShipments,
        weight: secondDataTotals.totalWeight,
      },
      {
        name: header1,
        shipments: firstDataTotals.totalShipments,
        weight: firstDataTotals.totalWeight,
      },
    ];


      const monthOptions = [
        { label: 'January', value: 1 },
        { label: 'February', value: 2 },
        { label: 'March', value: 3 },
        { label: 'April', value: 4 },
        { label: 'May', value: 5 },
        { label: 'June', value: 6 },
        { label: 'July', value: 7 },
        { label: 'August', value: 8 },
        { label: 'September', value: 9 },
        { label: 'October', value: 10 },
        { label: 'November', value: 11 },
        { label: 'December', value: 12 },
      ];
      

      const handleMonthChange = (event, newValue) => {
        setSelectedMonth(newValue);
        if (newValue) {
          const currentYear = dayjs().year();
          console.log(`Selected month: ${newValue.label}, Month value: ${newValue.value}, Year: ${currentYear}`);
          // You can now handle the selected month and use it for further operations
        }
      };      

      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);


      const handleDownloadExcel = () => {
        const worksheetData = firstData.map((item, index) => ({
          SN: index + 1,
          Date: item.Date,
          [`Shipments (${header1})`]: item.Total_Entries,
          [`Weight (${header1})`]: item.TOTAL_CHARGEABLE_WGT,
          [`Shipments (${header2})`]: secondData[index]?.Total_Entries || 0,
          [`Weight (${header2})`]: secondData[index]?.TOTAL_CHARGEABLE_WGT || 0,
          [`Shipments (${header3})`]: thirdData[index]?.Total_Entries || 0,
          [`Weight (${header3})`]: thirdData[index]?.TOTAL_CHARGEABLE_WGT || 0,
        }));
    
        const ws = XLSX.utils.json_to_sheet(worksheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Comparison Data');
        XLSX.writeFile(wb, `comparison_data_${header1}.xlsx`);
      };
    
      return (
        <div>
          {(loading ? ( <TruckLoder/> ) :"")}
        
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -40px'}>
            <Grid item xs={9}>
          <Typography variant="h6" align="center" >
            Comparision Of Shipment Details For {previousYear} vs {year} - {header1}
          </Typography>
          </Grid>
            {/* <Grid item xs={2.5} >
            <Autocomplete
            disableClearable
      options={monthOptions}
      getOptionLabel={(option) => option.label}
      value={selectedMonth.value}
      onChange={handleMonthChange}
      
      renderInput={(params) => <TextField {...params} label="Select Month" variant="outlined" size="small"/>}
      
    />
              
            </Grid> */}
            <Grid item xs={0.5}>
              <IconButton onClick={handleOpen}>
                <BarChartIcon/>
              </IconButton>

            </Grid>
            <Grid item xs={0.5}>
            <IconButton onClick={handleDownloadExcel}>
             <DownloadIcon/>
            </IconButton>
          </Grid>


          </Grid>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-modal-title">Shipment and Weight Charts</h2>
          {/* First Chart: No of Shipments */}
          <h3>No of Shipments</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'No of Shipments', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="shipments" fill="#FFC107" name="No of Shipments" />
            </BarChart>
          </ResponsiveContainer>

          {/* Second Chart: Weight */}
          <h3>Weight</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="weight" fill="#82ca9d" name="Weight" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Modal>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell colSpan={4} align="center" sx={{ backgroundColor: '#A9D18E', fontWeight: 'bold' }}>{header3}</TableCell>
                <TableCell colSpan={4} align="center" sx={{ backgroundColor: '#FFD966', fontWeight: 'bold' }}>{header2}</TableCell>
                <TableCell colSpan={4} align="center" sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>{header1}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">SN</TableCell>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center">SHIPMENTS</TableCell>
                <TableCell align="center">WEIGHT</TableCell>
    
                <TableCell align="center">SN</TableCell>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center">SHIPMENTS</TableCell>
                <TableCell align="center">WEIGHT</TableCell>
    
                <TableCell align="center">SN</TableCell>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center">SHIPMENTS</TableCell>
                <TableCell align="center">WEIGHT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {thirdData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index+1}</TableCell>
                  <TableCell align="center">{row.Date}</TableCell>
                  <TableCell align="center">{row.Total_Entries}</TableCell>
                  <TableCell align="center">{row.TOTAL_CHARGEABLE_WGT}</TableCell>
    
                  <TableCell align="center">{index+1}</TableCell>
                  <TableCell align="center">{secondData[index]?.Date || '0'}</TableCell>
                  <TableCell align="center">{secondData[index]?.Total_Entries || '0'}</TableCell>
                  <TableCell align="center">{secondData[index]?.TOTAL_CHARGEABLE_WGT || '0'}</TableCell>
    
                  <TableCell align="center">{index+1}</TableCell>
                  <TableCell align="center">{firstData[index]?.Date || '0'}</TableCell>
                  <TableCell align="center">{firstData[index]?.Total_Entries || '0'}</TableCell>
                  <TableCell align="center">{firstData[index]?.TOTAL_CHARGEABLE_WGT || '0'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        
      );
    };
    


export default MonthComparision;