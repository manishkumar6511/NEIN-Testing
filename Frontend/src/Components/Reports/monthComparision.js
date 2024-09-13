import React, { useEffect, useState } from "react";
import {
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,
    IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade,TextField,Grid,Autocomplete
  } from '@mui/material';

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
    
      return (
        <TableContainer component={Paper}>
          <Typography variant="h6" align="center" sx={{ margin: '16px 0' }}>
            COMPARISION OF SHIPMENT DETAILS FOR 2023 vs 2024 - FEBRUARY 2024
          </Typography>
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