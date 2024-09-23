import React, { useEffect, useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Divider,
  IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade, TextField, Grid, Autocomplete
} from '@mui/material';
import dayjs from 'dayjs';

const Pic = ({ props }) => {

    const dataMonthly = [
        { Executive: 'BHARATH', SHPTS: '36' ,Mawb:'38083'},
        { Executive: 'HAREESH', SHPTS: '22' ,Mawb:'9622'},
        { Executive: 'LAURANCE', SHPTS: '19' ,Mawb:'7205'},
        { Executive: 'PRATHAP', SHPTS: '29' ,Mawb:'27205'},
        { Executive: 'PUNITH', SHPTS: '38' ,Mawb:'35237'},

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


      return (
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -40px'}>
            <Grid item xs={6}>
          <Typography variant="h6" align="center" >
            PIC
          </Typography>
          </Grid>
            <Grid item xs={6} >
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
              <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Executive/Name</TableCell>
              <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>No Of Shipments</TableCell>
              <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>MAWB C.weight</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {dataMonthly.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.Executive}</TableCell>
                <TableCell>{row.SHPTS}</TableCell>
                <TableCell>{row.Mawb}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

            )

}
export default Pic;