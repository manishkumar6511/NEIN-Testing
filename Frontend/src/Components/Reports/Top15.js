import React, { useEffect, useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Divider,
  IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade, TextField, Grid, Autocomplete
} from '@mui/material';
import dayjs from 'dayjs';
import axios from "axios";
import TruckLoder from "../centralized_components/truckLoder";

const Top15 = ({ props }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const[top15Data,setTop15Data]=useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const  [loading, setLoading] =  useState(false);
    const dataMonthly = [
        { Exporter: 'OMNIACTIVE HEALTH TECHNOLOGIES LTD', Mawb: '24.42 t' ,Total:'6.58 M'},
        { Exporter: 'MICRO LABS LIMITED', Mawb: '17.4 t' ,Total:'4.24 M'},
        { Exporter: 'SHAHI EXPORTS PVT LTD', Mawb: '7.5 t' ,Total:'0.75 M'},
        { Exporter: 'MEDREICH LIMITED', Mawb: '6.5 t' ,Total:'1.61 M'},
        { Exporter: 'MICRO LABS LIMITED', Mawb: '6.5 t' ,Total:'0.60 M'},
        { Exporter: 'CONTINENTAL AUTOMOTIVE COMPONENTS INDIA PVT LTD', Mawb: '5.5 t' ,Total:'0.86 M'},
        { Exporter: 'RESIL CHEMICALS PVT LTD', Mawb: '5.5 t' ,Total:'0.72 M'},
        { Exporter: 'RENRAM INTERNATIONAL', Mawb: '4.5 t' ,Total:'0.6 M'},
        { Exporter: 'SAMI-SABINSA GROUP LTD', Mawb: '4.3 t' ,Total:'0.5 M'},
        { Exporter: 'TOYOTA KIRLOSKAR MOTOR PVT LTD', Mawb: '4.2 t' ,Total:'0.4 M'},
        { Exporter: 'VIDYA HERBS PVT LTD', Mawb: '3.8 t' ,Total:'0.6 M'},
        { Exporter: 'MULTIBIZ NATURAL PRODUCTS', Mawb: '3. 5 t' ,Total:'0.91 M'},
        { Exporter: 'JUBILANT PHARMOVA LTD', Mawb: '3.0 t' ,Total:'0.88 M'},
        { Exporter: 'WIPRO GE HEALTHCARE PVT LTD', Mawb: '2.5 t' ,Total:'0.87 M'},
        { Exporter: 'SILVER SPARK APPAREL LTD', Mawb: '2.2 t' ,Total:'0.77 M'},
        { Exporter: 'ABB INDIA LTD', Mawb: '.00 t' ,Total:'0.00 M'},

      ]


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
              "date":firstDate,
              "BranchId":props.subBranch,
            });
            
            setTop15Data(response1.data);
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


      return (
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -40px'}>
            <Grid item xs={9}>
          <Typography variant="h6" align="center" >
            Top 15 Customer- Tonnage Wise
          </Typography>
          </Grid>
            <Grid item xs={2.5} >
            <Autocomplete
            disableClearable
      options={monthOptions}
      getOptionLabel={(option) => option.label}
      onChange={handleMonthChange}
      
      renderInput={(params) => <TextField {...params} label="Select Month" variant="outlined" size="small"/>}
      value={selectedMonth}
    />
              
            </Grid>
            </Grid>
            <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Exporter</TableCell>
              <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>MAWB C.weight</TableCell>
              <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Total All In Freight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top15Data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.ShipperName}</TableCell>
                <TableCell>{row.TotalChargeableWeightKG}</TableCell>
                <TableCell>{row.TotalFreightAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

            )

}
export default Top15;