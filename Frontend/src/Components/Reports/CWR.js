import React, { useEffect, useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Divider,
  IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade, TextField, Grid, Autocomplete
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import TruckLoder from "../centralized_components/truckLoder";
import axios from "axios";
import dayjs from 'dayjs';

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
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const  [loading, setLoading] =  useState(false);
  const[firstData,setFirstData]=useState([]);
const[secondData,setSecondData]=useState([]);
const[monthlyData,setMonthlyData]=useState([]);
const[commodityData,setCommodityData]=useState([]);
const[TotalCWeight,setTotalCWeight]=useState(0);
const[CommoditityTotal,setCommoditityTotal]=useState(0);
const [selectedMonth, setSelectedMonth] = useState('');

 

 

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
        const response1 = await axios.post(`${API_BASE_URL}/Reports/CWR`,{
          "date":firstDate,
          "BranchId":props.subBranch,
        });
        
        setFirstData(response1.data);
        console.log('First Response:', response1.data);
       
        
        // Second API call
        const response2 =  await axios.post(`${API_BASE_URL}/Reports/CWR`,{
          "date":secondDate,
          "BranchId":props.subBranch,
        });
        
        setSecondData(response2.data);
        console.log('Second Response:', response2.data);
      
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }
   
    comparisionDate();

  },[selectedMonth, props.toDate, props.subBranch]);

 
  const totalShipmentsAndWeight = (data) => {
    return data.reduce(
      (acc, item) => {
        acc.totalShipments += item.NoOfShipments;
        acc.totalCWeight += item.TotalChargeableWeight;
        acc.totalGWeight+=item.TotalGrossWeight;
        return acc;
      },
      { totalShipments: 0, totalCWeight: 0,totalGWeight:0 }
    );
  };
  
  const firstDataTotals = totalShipmentsAndWeight(firstData);
  console.log("first data",firstData);
  console.log("firstDataTotals",firstDataTotals);
  const secondDataTotals = totalShipmentsAndWeight(secondData);


  
  
  useEffect(()=>{
    const updatedData = firstData.map(item => {
      const percentage = ((item.TotalChargeableWeight *100) /firstDataTotals.totalCWeight).toFixed(2);
      return {
        ...item,
        percentage: `${percentage}%`
      };
    });
  
    const updatedData1 = secondData.map(item => {
      const percentage = ((item.TotalChargeableWeight *100) /firstDataTotals.totalCWeight).toFixed(2);
      return {
        ...item,
        percentage: `${percentage}%`
      };
    });
    setMonthlyData(updatedData);
    setCommodityData(updatedData1);


  },[firstData,secondData])


  const pieChartDataMonthly = {
    labels: monthlyData.map((row) => row.MainProduct), // Labels for each industry
    datasets: [
      {
        data: monthlyData.map((row) => parseFloat(row.percentage)), // Values from the 'share' field
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Color for each segment
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };
  
  const pieChartDataCumulative = {
    labels: commodityData.map((row) => row.MainProduct),
    datasets: [
      {
        data: commodityData.map((row) => parseFloat(row.percentage)),
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
    <div className="main-div">
      {(loading ? ( <TruckLoder/> ) :"")}
    <div className="main-div1" style={{ display: 'flex', width: '100%',marginBottom:'10px' }}>
      <div className="sub-div1" style={{ width: '700px',margin: '0px 34px 0px 0px'}}>
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -30px'}>
            <Grid item xs={8}>
              <Typography variant="h6" align="center">
                Commodity Wise Report-Monthly
              </Typography>
            </Grid>
            <Grid item xs={4} >
            <Autocomplete
            disableClearable
      options={monthOptions}
      getOptionLabel={(option) => option.label}
      value={selectedMonth.value}
      onChange={handleMonthChange}
      
      renderInput={(params) => <TextField {...params} label="Select Month" variant="outlined" size="small"/>}
      
    />
              
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
              {monthlyData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{row.MainProduct}</TableCell>
                  <TableCell>{row.industry_code}</TableCell>
                  <TableCell>{row.NoOfShipments}</TableCell>
                  <TableCell>{row.TotalGrossWeight}</TableCell>
                  <TableCell>{row.TotalChargeableWeight}</TableCell>
                  <TableCell>{row.percentage}</TableCell>
                  
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Total</TableCell>
                <TableCell>{firstDataTotals.totalShipments}</TableCell>
                <TableCell>{firstDataTotals.totalGWeight}</TableCell>
                <TableCell>{firstDataTotals.totalCWeight}</TableCell>
                <TableCell>100%</TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="sub-div2" style={{ width: '280px' ,height:'700px',alignContent:'center'}}>
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
              {commodityData.map((row, index) => (
                <TableRow key={index}>
               <TableCell>{index+1}</TableCell>
                  <TableCell>{row.MainProduct}</TableCell>
                  <TableCell>{row.industry_code}</TableCell>
                  <TableCell>{row.NoOfShipments}</TableCell>
                  <TableCell>{row.TotalGrossWeight}</TableCell>
                  <TableCell>{row.TotalChargeableWeight}</TableCell>
                  <TableCell>{row.percentage}</TableCell>
                  
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Total</TableCell>
                <TableCell>{secondDataTotals.totalShipments}</TableCell>
                <TableCell>{secondDataTotals.totalGWeight}</TableCell>
                <TableCell>{secondDataTotals.totalCWeight}</TableCell>
                <TableCell>100%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    </div>

    <div className="sub-div2" style={{ width: '280px' ,height:'700px',alignContent:'center'}}>
    <Pie data={pieChartDataCumulative} options={pieChartOptions} width={400} height={269} />
    </div>
    
  </div>
  </div>
  )
}

export default CWRData;
