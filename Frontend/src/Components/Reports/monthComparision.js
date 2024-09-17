import React, { useEffect, useState } from "react";
import {
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,
    IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade,TextField,Grid,Autocomplete
  } from '@mui/material';
  import BarChartIcon from "@mui/icons-material/BarChart";
  import dayjs from 'dayjs';
  import { Modal } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
  {
    name: 'Mar-23',
    shipments: 166,
    weight: 164952,
  },
  {
    name: 'Feb-24',
    shipments: 244,
    weight: 125362,
  },
  {
    name: 'Mar-24',
    shipments: 144,
    weight: 117352,
  },
];

  
  // Modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const MonthComparision = ({ props }) => {
console.log('props',props);
    const data2023 = [
        { slNo: 1, date: '1/1/2023', shipments: 1, weight: 510 },
        { slNo: 2, date: '1/2/2023', shipments: 12, weight: 5598 },
        { slNo: 3, date: '1/3/2023', shipments: 9, weight: 9863 },
        // Add more rows as needed
      ];
    
      const data2024 = [
        { slNo: 1, date: '1/1/2024', shipments: 5, weight: 1545 },
        { slNo: 2, date: '1/2/2024', shipments: 4, weight: 789 },
        { slNo: 3, date: '1/3/2024', shipments: 13, weight: 1200 },
        // Add more rows as needed
      ];
    
      const data2023Dec = [
        { slNo: 1, date: '12/1/2023', shipments: 50, weight: 250 },
        { slNo: 2, date: '12/2/2023', shipments: 10, weight: 34 },
        { slNo: 3, date: '12/3/2023', shipments: 11, weight: 22},
        // Add more rows as needed
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
      const [selectedMonth, setSelectedMonth] = useState(null);

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
    
      return (
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -40px'}>
            <Grid item xs={9}>
          <Typography variant="h6" align="center" >
            COMPARISION OF SHIPMENT DETAILS FOR 2023 vs 2024 - FEBRUARY 2024
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
            <Grid item xs={0.5}>
              <IconButton onClick={handleOpen}>
                <BarChartIcon/>
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
              <CartesianGrid strokeDasharray="3 3" />
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
                <TableCell colSpan={4} align="center" sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Jan-23</TableCell>
                <TableCell colSpan={4} align="center" sx={{ backgroundColor: '#FFD966', fontWeight: 'bold' }}>Dec-23</TableCell>
                <TableCell colSpan={4} align="center" sx={{ backgroundColor: '#A9D18E', fontWeight: 'bold' }}>Jan-24</TableCell>
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
              {data2023.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.slNo}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.shipments}</TableCell>
                  <TableCell align="center">{row.weight}</TableCell>
    
                  <TableCell align="center">{data2023Dec[index]?.slNo || ''}</TableCell>
                  <TableCell align="center">{data2023Dec[index]?.date || ''}</TableCell>
                  <TableCell align="center">{data2023Dec[index]?.shipments || ''}</TableCell>
                  <TableCell align="center">{data2023Dec[index]?.weight || ''}</TableCell>
    
                  <TableCell align="center">{data2024[index]?.slNo || ''}</TableCell>
                  <TableCell align="center">{data2024[index]?.date || ''}</TableCell>
                  <TableCell align="center">{data2024[index]?.shipments || ''}</TableCell>
                  <TableCell align="center">{data2024[index]?.weight || ''}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      );
    };
    


export default MonthComparision;