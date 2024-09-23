import React, { useEffect, useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Divider,
  IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade, TextField, Grid, Autocomplete
} from '@mui/material';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopCarrier = ({ props }) => {

    const dataMonthly = [
        { AirLine: 'SV', Mawb: '24.42 t' ,Total:'6.58 M'},
        { AirLine: 'QR', Mawb: '17.4 t' ,Total:'4.24 M'},
        { AirLine: 'SQ', Mawb: '7.5 t' ,Total:'0.75 M'},
        { AirLine: 'EK', Mawb: '6.5 t' ,Total:'1.61 M'},
        { AirLine: 'ET', Mawb: '6.5 t' ,Total:'0.60 M'},
        { AirLine: 'EY', Mawb: '5.5 t' ,Total:'0.86 M'},
        { AirLine: '6E', Mawb: '5.5 t' ,Total:'0.72 M'},
        { AirLine: 'UL', Mawb: '4.5 t' ,Total:'0.6 M'},
        { AirLine: 'JL', Mawb: '4.3 t' ,Total:'0.5 M'},
        { AirLine: 'TG', Mawb: '4.2 t' ,Total:'0.4 M'},
        { AirLine: 'LH', Mawb: '3.8 t' ,Total:'0.6 M'},
        { AirLine: 'MH', Mawb: '3. 5 t' ,Total:'0.91 M'},
        { AirLine: 'FD', Mawb: '3.0 t' ,Total:'0.88 M'},
        { AirLine: 'TK', Mawb: '2.5 t' ,Total:'0.87 M'},
        { AirLine: 'CX', Mawb: '2.2 t' ,Total:'0.77 M'},
        { AirLine: 'AF', Mawb: '.00 t' ,Total:'0.00 M'},

      ]


      const convertToNumber = (value) => parseFloat(value.replace(/[^\d.-]/g, ''));

      // Create the bar chart data
      const barChartDataMonthly = {
        labels: dataMonthly.map(row => `${row.AirLine}`),
        datasets: [
          {
            label: 'MAWB C.Weight (t)',
            data: dataMonthly.map(row => convertToNumber(row.Mawb)),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Total All in Freight (M)',
            data: dataMonthly.map(row => convertToNumber(row.Total)),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      };
      
      // Chart options
      const barChartOptionsMonthly = {
        responsive: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Top Carrier',
          },
        },
      };
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


      return (
        <div className="main-div1" style={{ display: 'flex', width: '100%',marginBottom:'10px' }}>
      <div className="sub-div1" style={{ width: '500px',margin: '0px 34px 0px 0px'}}>
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -80px'}>
            <Grid item xs={8}>
          <Typography variant="h6" align="center" >
            Top Carrier
          </Typography>
          </Grid>
            <Grid item xs={4} >
            <Autocomplete
            disableClearable
      options={monthOptions}
      getOptionLabel={(option) => option.label}
      onChange={handleMonthChange}
      
      renderInput={(params) => <TextField {...params} label="Month" variant="outlined" size="small"/>}
      value={selectedMonth}
    />
              
            </Grid>
            </Grid>
            <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Airline</TableCell>
              <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>MAWB C.weight</TableCell>
              <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Total All In Freight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataMonthly.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.AirLine}</TableCell>
                <TableCell>{row.Mawb}</TableCell>
                <TableCell>{row.Total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <div>
    <Bar data={barChartDataMonthly} options={barChartOptionsMonthly} width= {400} height={400} />
  </div>
  </div>
 

            )

}
export default TopCarrier;