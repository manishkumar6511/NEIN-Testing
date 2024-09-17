import React, { useEffect, useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Divider,
  IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade, TextField, Grid, Autocomplete
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement for Pie charts
);
const CWRData = ({ props }) => {

  const dataMonthly = [
    { sn:'1',Industry: 'Pharma', mainProduct: 'Pharma/Lifesciences/Pharma Chemicals/Medical devices.',
      SHNo:'101',GWeight:'82414',CWeight:'86929',share:'76.8%'
     },
     { sn:'2',Industry: 'Technology', mainProduct: 'Electrical,Electronics,Office Automation,Solar,All Engg,Industrial,etc.',
      SHNo:'13',GWeight:' 3,831 ',CWeight:' 5,062 ',share:'3.6%'
     },
     { sn:'3',Industry: 'Pharma', mainProduct: 'Automobile,EV,Farm equipment,Mining equipment, Earth Moving equipment,Railway,Aerospace,etc.',
      SHNo:'19',GWeight:' 7,853 ',CWeight:' 11,670 ',share:'7.3%'
     },
     { sn:'4',Industry: 'Lifestyle', mainProduct: 'Hi-fashion, Fast fashion,Yarn,FMCG,Furniture,Linen,Ceramic wares, Construction materials, etc.',
      SHNo:'10',GWeight:' 13,197 ',CWeight:' 13,676 ',share:'12.3%'
     },
  ]

  const cumulativeData = [
    { sn:'1',Industry: 'Pharma', mainProduct: 'Pharma/Lifesciences/Pharma Chemicals/Medical devices.',
      SHNo:'400',GWeight:'82414',CWeight:'86929',share:'66.2%'
     },
     { sn:'2',Industry: 'Technology', mainProduct: 'Electrical,Electronics,Office Automation,Solar,All Engg,Industrial,etc.',
      SHNo:'82',GWeight:' 3,831 ',CWeight:' 5,062 ',share:'9.9%'
     },
     { sn:'3',Industry: 'Pharma', mainProduct: 'Automobile,EV,Farm equipment,Mining equipment, Earth Moving equipment,Railway,Aerospace,etc.',
      SHNo:'85',GWeight:' 7,853 ',CWeight:' 11,670 ',share:'7.3%'
     },
     { sn:'4',Industry: 'Lifestyle', mainProduct: 'Hi-fashion, Fast fashion,Yarn,FMCG,Furniture,Linen,Ceramic wares, Construction materials, etc.',
      SHNo:'59',GWeight:' 13,197 ',CWeight:' 13,676 ',share:'16.7%'
     },
  ]

  const pieChartDataMonthly = {
    labels: dataMonthly.map((row) => row.Industry), // Labels for each industry
    datasets: [
      {
        data: dataMonthly.map((row) => parseFloat(row.share)), // Values from the 'share' field
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Color for each segment
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };
  
  const pieChartDataCumulative = {
    labels: cumulativeData.map((row) => row.Industry),
    datasets: [
      {
        data: cumulativeData.map((row) => parseFloat(row.share)),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };
  
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Industry Share - Monthly',
      },
    },
  };
  
 



  return (
    <div className="main-div">
    <div className="main-div1" style={{ display: 'flex', width: '100%',marginBottom:'10px' }}>
      <div className="sub-div1" style={{ width: '700px',margin: '0px 34px 0px 0px'}}>
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -30px'}>
            <Grid item xs={9}>
              <Typography variant="h6" align="center">
                Commodity Wise Report-Monthly
              </Typography>
            </Grid>
           
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>SN</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Industry</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Main Products</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>No Of SHPT</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Gross Weight</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Chargeable</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataMonthly.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{row.Industry}</TableCell>
                  <TableCell>{row.mainProduct}</TableCell>
                  <TableCell>{row.SHNo}</TableCell>
                  <TableCell>{row.GWeight}</TableCell>
                  <TableCell>{row.CWeight}</TableCell>
                  <TableCell>{row.share}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="sub-div2" style={{ width: '234px' ,height:'269px'}}>
      <Pie data={pieChartDataMonthly} options={pieChartOptions} width={400} height={269} />
      </div>
      
    </div>
    <Divider/>
    <div className="main-div2" style={{ display: 'flex', width: '100%' ,marginTop:'10px'}}>
    <div className="sub-div1" style={{ width: '700px',margin: '0px 34px 0px 0px'}}>
    <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -30px'}>
            <Grid item xs={9}>
              <Typography variant="h6" align="center">
                Commodity Wise Report-Cumulative
              </Typography>
            </Grid>
           
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>SN</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Industry</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Main Products</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>No Of SHPT</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Gross Weight</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Chargeable</TableCell>
                <TableCell sx={{ backgroundColor: '#9BC2E6', fontWeight: 'bold' }}>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cumulativeData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{row.Industry}</TableCell>
                  <TableCell>{row.mainProduct}</TableCell>
                  <TableCell>{row.SHNo}</TableCell>
                  <TableCell>{row.GWeight}</TableCell>
                  <TableCell>{row.CWeight}</TableCell>
                  <TableCell>{row.share}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>

    <div className="sub-div2" style={{ width: '234px' ,height:'269px'}}>
    <Pie data={pieChartDataCumulative} options={pieChartOptions} width={400} height={269} />
    </div>
    
  </div>
  </div>
  )
}

export default CWRData;
