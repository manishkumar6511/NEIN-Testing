import React, { useEffect, useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Divider,
  IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade, TextField, Grid, Autocomplete
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import TruckLoder from "../centralized_components/truckLoder";
import axios from "axios";
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';  // Import xlsx for Excel export
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PieChart from './../../Images/pie-chart.png';
import BarChartIcon from "@mui/icons-material/BarChart";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const AWR = ({ props }) => {

  const[monthlyData,setMonthlyData]=useState([]);
  const[cumulativeData,setCumulativeData]=useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const  [loading, setLoading] =  useState(false);
  useEffect(()=>{
    const comparisionDate=async()=>{
      const currentYear = dayjs().year();
   

 

      setLoading(true);
      try {

        // First API call
        const response1 = await axios.post(`${API_BASE_URL}/Reports/getAreaReport`,{
           subBranch:props.subBranch,
            fromDate:props.fromDate,
            toDate:props.toDate,
        });
        
        setMonthlyData(response1.data);
        
        const fromDate = dayjs().startOf('year').format('YYYY-MM-DD'); // 2024-01-01
        const toDate = dayjs().endOf('month').format('YYYY-MM-DD'); // Last day of the current month
        
        
        // Second API call
        const response2 =  await axios.post(`${API_BASE_URL}/Reports/getAreaReport`,{
          subBranch:props.subBranch,
            fromDate:fromDate,
            toDate:toDate,
        });
        
        setCumulativeData(response2.data);
        console.log('Second Response:', response2.data);
      
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }
   
    comparisionDate();

  },[ props.toDate, props.subBranch]);

  


  const barChartData = {
    labels: cumulativeData.map(row => `Area ${row.Area}`),
    datasets: [
      {
        label: 'Total Tons',
        data: cumulativeData.map(row => row.Total_Chargeable_Weight),
        backgroundColor: 'rgba(141, 195, 0,0.6)',
        borderColor: 'rgba(142, 242, 111, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Area Wise Report - Cumulative',
      },
    },
  };

  const barChartDataMonthly = {
    labels: monthlyData.map(row => `Area ${row.Area}`),
    datasets: [
      {
        label: 'Total Tons',
        data: monthlyData.map(row => row.Total_Chargeable_Weight),
        backgroundColor: 'rgba(141, 195, 0,0.6)',
        borderColor: 'rgba(142, 242, 111, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptionsMonthly = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Area Wise Report - Monthly',
      },
    },
  };


  const exportToExcel = () => {
    // Prepare data for the Excel file
    const combinedData = [];
  
    // Operation PIC section
    combinedData.push([{ v: 'Area Wise Report-Monthly', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }]); // Add a bold, centered header
    combinedData.push([
      'Area','Total-Ton' // Add column headers
    ]);
    monthlyData.forEach(row => {
      combinedData.push([
        row.Area ,
        row.Total_Chargeable_Weight,          
      
      ]);
    });
  
    // Add a blank row between sections
    combinedData.push([]);
  
    // Sales PIC section
    combinedData.push([{ v: 'Area Wise Report-Cumulative', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }]); // Add a bold, centered header
    combinedData.push([
      'Area','Total-Ton'
    ]);
    cumulativeData.forEach(row => {
      combinedData.push([
        row.Area ,
        row.Total_Chargeable_Weight,   
      ]);
    });
  
    // Create a worksheet with the combined data
    const worksheet = XLSX.utils.aoa_to_sheet(combinedData);
  
    // Merge cells for the Operation PIC and Sales PIC headers
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }, // Merge Operation PIC header across 3 columns
      { s: { r: combinedData.length - monthlyData.length - 3, c: 0 }, e: { r: combinedData.length - monthlyData.length - 3, c: 2 } } // Merge Sales PIC header across 3 columns
    ];
  
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Area");
  
    // Write the file
    XLSX.writeFile(workbook, `Area.xlsx`);
  };
  

  return (
    <div className="main-div">
        {(loading ? ( <TruckLoder/> ) :"")}
    <div className="main-div1" style={{ display: 'flex', width: '100%',marginBottom:'10px' }}>
      <div className="sub-div1" style={{ width: '500px',margin: '0px 34px 0px 0px'}}>
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -30px'}>
            <Grid item xs={9}>
              <Typography variant="h6" align="center">
                Area Wise Report-Monthly
              </Typography>
            </Grid>
            <Grid item xs={1} >
              <IconButton onClick={exportToExcel}>
                <DownloadIcon/>
              </IconButton>
              
           </Grid>
            {/* <Grid item xs={2.5}>
              <Autocomplete
                disableClearable
                options={monthOptions}
                getOptionLabel={(option) => option.label}
                onChange={handleMonthChange}
                renderInput={(params) => <TextField {...params} label="Select Month" variant="outlined" size="small" />}
                value={selectedMonth}
              />
            </Grid> */}
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Area</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Total-Ton</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlyData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.Area}</TableCell>
                  <TableCell>{row.Total_Chargeable_Weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="sub-div2" style={{ width: '400px' ,height:'269px'}}>
      <Bar data={barChartDataMonthly} options={barChartOptionsMonthly}    width={400}  // Explicit width
    height={269}/>
      </div>
      
    </div>
    <Divider/>
    <div className="main-div2" style={{ display: 'flex', width: '100%' ,marginTop:'10px'}}>
    <div className="sub-div1" style={{ width: '500px',margin: '0px 34px 0px 0px'}}>
      <TableContainer component={Paper}>
        <Grid container spacing={2} margin={'1px 0px 0px -30px'}>
          <Grid item xs={9}>
            <Typography variant="h6" align="center">
              Area Wise Report-Cumulative
            </Typography>
          </Grid>
          {/* <Grid item xs={2.5}>
            <Autocomplete
              disableClearable
              options={monthOptions}
              getOptionLabel={(option) => option.label}
              onChange={handleMonthChange}
              renderInput={(params) => <TextField {...params} label="Month" variant="outlined" size="small" />}
              value={selectedMonth}
            />
          </Grid> */}
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Area</TableCell>
              <TableCell sx={{ backgroundColor: '#1A005D', fontWeight: 'bold',color:'white' }}>Total-Ton</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cumulativeData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.Area}</TableCell>
                <TableCell>{row.Total_Chargeable_Weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

    <div className="sub-div2" style={{ width: '400px' ,height:'269px'}}>
    <Bar data={barChartData} options={barChartOptions}    width={400}  // Explicit width
  height={269}/>
    </div>
    
  </div>
  </div>
  )
}

export default AWR;
