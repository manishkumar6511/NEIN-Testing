import React, { useEffect, useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Divider,
  IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade, TextField, Grid, Autocomplete
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const AWR = ({ props }) => {

  const dataMonthly = [
    { Area: '1', Total: '28.5' },
    { Area: '2', Total: '53.5' },
    { Area: '3', Total: '34.6' },
  ]

  const cumulativeData = [
    { Area: '1', Total: '79.5' },
    { Area: '2', Total: '232.5' },
    { Area: '3', Total: '101.3' },
  ]

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
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleMonthChange = (event, newValue) => {
    setSelectedMonth(newValue);
    if (newValue) {
      const currentYear = dayjs().year();
      console.log(`Selected month: ${newValue.label}, Month value: ${newValue.value}, Year: ${currentYear}`);
      // You can now handle the selected month and use it for further operations
    }
  };


  const barChartData = {
    labels: cumulativeData.map(row => `Area ${row.Area}`),
    datasets: [
      {
        label: 'Total Tons',
        data: cumulativeData.map(row => row.Total),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
    labels: dataMonthly.map(row => `Area ${row.Area}`),
    datasets: [
      {
        label: 'Total Tons',
        data: dataMonthly.map(row => row.Total),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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

  return (
    <div className="main-div">
    <div className="main-div1" style={{ display: 'flex', width: '100%',marginBottom:'10px' }}>
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
                renderInput={(params) => <TextField {...params} label="Select Month" variant="outlined" size="small" />}
                value={selectedMonth}
              />
            </Grid> */}
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Area</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Total-Ton</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cumulativeData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.Area}</TableCell>
                  <TableCell>{row.Total}</TableCell>
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
    <Divider/>
    <div className="main-div2" style={{ display: 'flex', width: '100%' ,marginTop:'10px'}}>
    <div className="sub-div1" style={{ width: '500px',margin: '0px 34px 0px 0px'}}>
      <TableContainer component={Paper}>
        <Grid container spacing={2} margin={'1px 0px 0px -30px'}>
          <Grid item xs={9}>
            <Typography variant="h6" align="center">
              Area Wise Report-Monthly
            </Typography>
          </Grid>
          <Grid item xs={2.5}>
            <Autocomplete
              disableClearable
              options={monthOptions}
              getOptionLabel={(option) => option.label}
              onChange={handleMonthChange}
              renderInput={(params) => <TextField {...params} label="Month" variant="outlined" size="small" />}
              value={selectedMonth}
            />
          </Grid>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Area</TableCell>
              <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Total-Ton</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataMonthly.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.Area}</TableCell>
                <TableCell>{row.Total}</TableCell>
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
  </div>
  )
}

export default AWR;
