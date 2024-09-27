import React, { useEffect, useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Divider,
  IconButton, Modal, Box, Typography, TablePagination, Menu, MenuItem, Fade, TextField, Grid, Autocomplete
} from '@mui/material';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import TruckLoder from "../centralized_components/truckLoder";
import axios from "axios";
import * as XLSX from 'xlsx';  // Import xlsx for Excel export
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import BarChartIcon from "@mui/icons-material/BarChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'space-between',
};
const TopCarrier = ({ props }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const[topCarrier,setTopCarrier]=useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const  [loading, setLoading] =  useState(false);
   

      const convertToNumber = (value) => parseFloat(value.replace(/[^\d.-]/g, ''));

      // Create the bar chart data
      const barChartDataMonthly = {
        labels: topCarrier.map(row => `${row.AirlineName}`),
        datasets: [
          {
            label: 'MAWB C.Weight (T)',
            data: topCarrier.map(row => (row.TotalChargeableWeightKG / 1000).toFixed(2)), // In tons (T)
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Total All in Freight (M)',
            data: topCarrier.map(row => (row.TotalFreightAmount / 1000000).toFixed(2)), // In millions (M)
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
      useEffect(()=>{
        const comparisionDate=async()=>{
          const currentYear = dayjs().year();
          const selectedDate = selectedMonth ? dayjs(`${currentYear}-${selectedMonth.value}-01`) : dayjs(props.toDate);
    console.log("selected date from props or ranch",selectedDate);
    
          const firstDate = selectedDate.format('MM-YY'); // e.g., '09-24'
          const secondDate = selectedDate.subtract(1, 'month').format('MM-YY'); // e.g., '08-24'
    
          setLoading(true);
          try {
    
            // First API call
            const response1 = await axios.post(`${API_BASE_URL}/Reports/getTopCarrier`,{
              subBranch:props.subBranch,
            fromDate:props.fromDate,
            toDate:props.toDate,
            });
            
            setTopCarrier(response1.data);
            setLoading(false);
            console.log('First Response:', response1.data);
           
            
          
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    
        }
       
        comparisionDate();
    
      },[selectedMonth, props.toDate, props.subBranch]);
    
      const handleMonthChange = (event, newValue) => {
        setSelectedMonth(newValue);
        if (newValue) {
          const currentYear = dayjs().year();
          console.log(`Selected month: ${newValue.label}, Month value: ${newValue.value}, Year: ${currentYear}`);
          // You can now handle the selected month and use it for further operations
        }
      };


      const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
          topCarrier.map((row, index) => ({
            S_N: index + 1,
            Airline: row.AirlineName,
            "MAWB C.weight": (row.TotalChargeableWeightKG / 1000).toFixed(2),
            "Total All In Freight": (row.TotalFreightAmount / 1000000).toFixed(2),
          }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Top 15 Customers");
        XLSX.writeFile(wb, "Top_15_Customers.xlsx");
      };
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

      return (
        <div className="main-div1" style={{ display: 'flex', width: '100%',marginBottom:'10px' }}>
            {(loading ? ( <TruckLoder/> ) :"")}
      <div className="sub-div1" style={{ width: '500px',margin: '0px 34px 0px 0px'}}>
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -80px'}>
            <Grid item xs={10}>
          <Typography variant="h6" align="center" >
            Top Carrier
          </Typography>
          </Grid>
          <Grid item xs={1}>
              <IconButton onClick={handleOpen}>
                <BarChartIcon/>
              </IconButton>

            </Grid>
          <Grid item xs={1} >
              <IconButton onClick={exportToExcel}>
                <DownloadIcon/>
              </IconButton>
              
           </Grid>
         
            </Grid>
            <Table>
          <TableHead>
            <TableRow>
            <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white'}}>S.N</TableCell>
              <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Airline</TableCell>
              <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>MAWB C.weight</TableCell>
              <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Total All In Freight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topCarrier.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{row.AirlineName}</TableCell>
                <TableCell>{(row.TotalChargeableWeightKG / 1000).toFixed(2)+ 'T'}</TableCell>
                <TableCell>{(row.TotalFreightAmount / 1000000).toFixed(2)+ 'M'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <div>
    <Modal open={open} onClose={handleClose}>
    <Box sx={style}>
    <Bar data={barChartDataMonthly} options={barChartOptionsMonthly} width= {600} height={400} />
    </Box>
    </Modal>
  </div>
  </div>
 

            )

}
export default TopCarrier;