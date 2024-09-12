import React, { useEffect, useState } from "react";
import {
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,
    IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade,TextField,Grid,Autocomplete
  } from '@mui/material';

function MonthComparision(){

    return (
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead style={{ backgroundColor: '#1a005d', color: '#fff' }}>
              <TableRow>
                <TableCell>Jan-2023</TableCell>
                <TableCell>Dec-2023</TableCell>
                <TableCell>Jan-2024</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>188</TableCell>
                        <TableCell>134567</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
                <TableCell>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>188</TableCell>
                        <TableCell>134567</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
                <TableCell>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>188</TableCell>
                        <TableCell>134567</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
    };
    


export default MonthComparision;