import React, { useEffect, useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Divider,
  IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade, TextField, Grid, Autocomplete
} from '@mui/material';
import dayjs from 'dayjs';
import TruckLoder from "../centralized_components/truckLoder";
import axios from "axios";
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';  // Import xlsx for Excel export
const Pic = ({ props }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const[OperationPic,setOperationPic]=useState([]);
  const[SalesPic,setSalesPic]=useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const  [loading, setLoading] =  useState(false);


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
  
    
          const firstDate = selectedDate.format('MM-YY'); // e.g., '09-24'
          const secondDate = selectedDate.subtract(1, 'month').format('MM-YY'); // e.g., '08-24'
    
          setLoading(true);
          try {
    
            // First API call
            const response1 = await axios.post(`${API_BASE_URL}/Reports/PIC`,{
              subBranch:props.subBranch,
              fromDate:props.fromDate,
              toDate:props.toDate,
            });
            
            setOperationPic(response1.data);

            const response2 = await axios.post(`${API_BASE_URL}/Reports/getSalesPIC`,{
              subBranch:props.subBranch,
              fromDate:props.fromDate,
              toDate:props.toDate,
            });
            
            setSalesPic(response1.data);
           
            
           
            
          
          } catch (error) {
            console.error('Error fetching data:', error);
          }finally{
            setLoading(false);
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
        // Prepare data for the Excel file
        const combinedData = [];
      
        // Operation PIC section
        combinedData.push([{ v: 'Operation PIC', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }]); // Add a bold, centered header
        combinedData.push([
          'Executive/Name', 'No Of Shipments', 'MAWB C.weight' // Add column headers
        ]);
        OperationPic.forEach(row => {
          combinedData.push([
            row.OperationPerson || 'NA',  // Executive/Name
            row.NumberOfEntries,          // No Of Shipments
            row.TotalChargeableWeightKG   // MAWB C.weight
          ]);
        });
      
        // Add a blank row between sections
        combinedData.push([]);
      
        // Sales PIC section
        combinedData.push([{ v: 'Sales PIC', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }]); // Add a bold, centered header
        combinedData.push([
          'Executive/Name', 'No Of Shipments', 'MAWB C.weight' // Add column headers
        ]);
        SalesPic.forEach(row => {
          combinedData.push([
            row.OperationPerson || 'NA',  // Executive/Name
            row.NumberOfEntries,          // No Of Shipments
            row.TotalChargeableWeightKG   // MAWB C.weight
          ]);
        });
      
        // Create a worksheet with the combined data
        const worksheet = XLSX.utils.aoa_to_sheet(combinedData);
      
        // Merge cells for the Operation PIC and Sales PIC headers
        worksheet['!merges'] = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }, // Merge Operation PIC header across 3 columns
          { s: { r: combinedData.length - SalesPic.length - 3, c: 0 }, e: { r: combinedData.length - SalesPic.length - 3, c: 2 } } // Merge Sales PIC header across 3 columns
        ];
      
        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "PIC");
      
        // Write the file
        XLSX.writeFile(workbook, `PIC.xlsx`);
      };
      


      return (
        <div className="main-div">
           {(loading ? ( <TruckLoder/> ) :"")}
        <div className="main-div1" style={{ width: '100%',marginBottom:'10px' }}>
          <div className="sub-div1" style={{ width: '500px',margin: '0px 34px 0px 0px'}}>
          
        <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -40px'}>
            <Grid item xs={11}>
          <Typography variant="h6" align="center" >
            OPERATION PIC
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
              <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Executive/Name</TableCell>
              <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>No Of Shipments</TableCell>
              <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>MAWB C.weight</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {OperationPic.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.OperationPerson || 'NA'}</TableCell>
                <TableCell>{row.NumberOfEntries}</TableCell>
                <TableCell>{row.TotalChargeableWeightKG}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
      </div>
      <div className="sub-div1" style={{ width: '500px',margin: '10px 34px 0px 0px'}}>
      <TableContainer component={Paper}>
          <Grid container spacing={2} margin={'1px 0px 0px -40px'}>
            <Grid item xs={11}>
          <Typography variant="h6" align="center" >
           SALES PIC
          </Typography>
          </Grid>
          
            </Grid>
            <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>Executive/Name</TableCell>
              <TableCell sx={{backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>No Of Shipments</TableCell>
              <TableCell sx={{ backgroundColor: '#1A005D' , fontWeight: 'bold',color:'white' }}>MAWB C.weight</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {SalesPic.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.OperationPerson||'NA'}</TableCell>
                <TableCell>{row.NumberOfEntries}</TableCell>
                <TableCell>{row.TotalChargeableWeightKG}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
      </div>
      </div>
      </div>
            )

}
export default Pic;