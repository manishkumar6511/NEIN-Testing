import React, { useEffect, useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Divider,
  IconButton, Collapse, Box, Typography, Modal, Menu, MenuItem, Fade, TextField, Grid, Autocomplete
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import TruckLoder from "../centralized_components/truckLoder";
import axios from "axios";
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';  // Import xlsx for Excel export
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PieChart from './../../Images/pie-chart.png';
import BarChartIcon from "@mui/icons-material/BarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement for Pie charts
);


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'space-between',
};
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
           subBranch:props.subBranch,
            fromDate:props.fromDate,
            toDate:props.toDate,
        });
        
        setFirstData(response1.data);
        console.log('First Response:', response1.data);
        const fromDate = dayjs().startOf('year').format('YYYY-MM-DD'); // 2024-01-01
        const toDate = dayjs().endOf('month').format('YYYY-MM-DD'); // Last day of the current month
        
        
        // Second API call
        const response2 =  await axios.post(`${API_BASE_URL}/Reports/CWR`,{
          subBranch:props.subBranch,
            fromDate:fromDate,
            toDate:toDate,
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
  
  const pieChartOptionsMonthly = {
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

  const pieChartOptionsCumulative = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Industry Share - Cumulative',
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
  


  const exportToExcel = () => {
    // Prepare data for the Excel file
    const combinedData = [];
  
    // Operation PIC section
    combinedData.push([{ v: 'Commodity Report-Monthly', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }]); // Add a bold, centered header
    combinedData.push([
      'Industry','Main Products','No Of Shipments','Gross Weight', 'Chargeable','Percentage' // Add column headers
    ]);
    monthlyData.forEach(row => {
      combinedData.push([
        row.MainProduct ,
        row.industry_code,          
        row.NoOfShipments ,
        row.TotalGrossWeight ,  
        row.TotalChargeableWeight ,
        row.percentage ,
      ]);
    });
  
    // Add a blank row between sections
    combinedData.push([]);
  
    // Sales PIC section
    combinedData.push([{ v: 'Commodity Report-Cumulative', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }]); // Add a bold, centered header
    combinedData.push([
      'Industry','Main Products','No Of Shipments','Gross Weight', 'Chargeable','Percentage'
    ]);
    commodityData.forEach(row => {
      combinedData.push([
        row.MainProduct ,
        row.industry_code,          
        row.NoOfShipments ,
        row.TotalGrossWeight ,  
        row.TotalChargeableWeight ,
        row.percentage ,
      ]);
    });
  
    // Create a worksheet with the combined data
    const worksheet = XLSX.utils.aoa_to_sheet(combinedData);
  
    // Merge cells for the Operation PIC and Sales PIC headers
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }, // Merge Operation PIC header across 3 columns
      { s: { r: combinedData.length - monthlyData.length - 3, c: 0 }, e: { r: combinedData.length - monthlyData.length - 3, c: 2 } } // Merge Sales PIC header across 3 columns
    ];
  
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Commodity");
  
    // Write the file
    XLSX.writeFile(workbook, `Commodity.xlsx`);
  };
  









  const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

  return (
    <div className="main-div">
      {(loading ? ( <TruckLoder/> ) :"")}
    <div className="main-div1" style={{ display: 'flex', width: '100%',marginBottom:'10px' }}>
      <div className="sub-div1" style={{ width: '900px',margin: '0px 34px 0px 0px'}}>
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -30px'}>
            <Grid item xs={10}>
              <Typography variant="h6" align="center">
                Commodity Wise Report-Monthly
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
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>SN</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Industry</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Main Products</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>No Of SHPT</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Gross Weight</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white'}}>Chargeable</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white'}}>Percentage</TableCell>
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
                <TableCell><b>Total</b></TableCell>
                <TableCell><b>{firstDataTotals.totalShipments}</b></TableCell>
                <TableCell><b>{firstDataTotals.totalGWeight}</b></TableCell>
                <TableCell><b>{firstDataTotals.totalCWeight}</b></TableCell>
                <TableCell><b>100%</b></TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* <div className="sub-div2" style={{ width: '280px' ,height:'700px',alignContent:'center'}}>
      <Pie data={pieChartDataMonthly} options={pieChartOptions} width={400} height={269} />
      </div> */}
      
    </div>
    <Divider/>
    <div className="main-div2" style={{ display: 'flex', width: '100%' ,marginTop:'10px'}}>
    <div className="sub-div1" style={{ width: '900px',margin: '0px 34px 0px 0px'}}>
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
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white'}}>SN</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Industry</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Main Products</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>No Of SHPT</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white'}}>Gross Weight</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Chargeable</TableCell>
                <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white'}}>Percentage</TableCell>
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
                <TableCell><b>Total</b></TableCell>
                <TableCell><b>{firstDataTotals.totalShipments}</b></TableCell>
                <TableCell><b>{firstDataTotals.totalGWeight}</b></TableCell>
                <TableCell><b>{firstDataTotals.totalCWeight}</b></TableCell>
                <TableCell><b>100%</b></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    </div>

    {/* <div className="sub-div2" style={{ width: '280px' ,height:'700px',alignContent:'center'}}>
    <Pie data={pieChartDataCumulative} options={pieChartOptions} width={400} height={269} />
    </div> */}
       <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div style={{ width: '280px', height: '400px' }}>
            <Pie data={pieChartDataMonthly} options={pieChartOptionsMonthly} />
          </div>
          <div style={{ width: '280px', height: '400px' }}>
            <Pie data={pieChartDataCumulative} options={pieChartOptionsCumulative} />
          </div>
        </Box>
      </Modal>
    
  </div>
  </div>
  )
}

export default CWRData;
