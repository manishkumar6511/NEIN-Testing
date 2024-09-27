import React, { useEffect, useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Divider,
  IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade, TextField, Grid, Autocomplete
} from '@mui/material';
import dayjs from 'dayjs';
import axios from "axios";
import TruckLoder from "../centralized_components/truckLoder";
import * as XLSX from 'xlsx';  // Import xlsx for Excel export
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const Top15 = ({ props }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const[top15Data,setTop15Data]=useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const  [loading, setLoading] =  useState(false);
   

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
            const response1 = await axios.post(`${API_BASE_URL}/Reports/getTop15`,{
             subBranch:props.subBranch,
            fromDate:props.fromDate,
            toDate:props.toDate,
            });
            
            
            setTop15Data(response1.data);
            setLoading(false);
            console.log('First Response:', response1.data);
           
            
          
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    
        }
       
        comparisionDate();
    
      },[selectedMonth, props.toDate, props.subBranch]);

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

      const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
          top15Data.map((row, index) => ({
            S_N: index + 1,
            Exporter: row.ShipperName,
            "MAWB C.Weight (Tons)": (row.TotalChargeableWeightKG / 1000).toFixed(2),
            "Total All In Freight (Millions)": (row.TotalFreightAmount / 1000000).toFixed(2),
          }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Top 15 Customers");
        XLSX.writeFile(wb, "Top_15_Customers.xlsx");
      };


      return (
        <div>
          {(loading ? ( <TruckLoder/> ) :"")}
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -40px'}>
            <Grid item xs={11}>
          <Typography variant="h6" align="center" >
            Top 15 Customer- Tonnage Wise
          </Typography>
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
            <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white'}}>S.N</TableCell>
              <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Exporter</TableCell>
              <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>MAWB C.weight</TableCell>
              <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Total All In Freight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top15Data.map((row, index) => (
              <TableRow key={index}>
                 <TableCell>{index+1}</TableCell>
                <TableCell>{row.ShipperName}</TableCell>
                <TableCell>{(row.TotalChargeableWeightKG / 1000).toFixed(2)+ 'T'}</TableCell>
                <TableCell>{(row.TotalFreightAmount / 1000000).toFixed(2)+ 'M'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
            )

}
export default Top15;