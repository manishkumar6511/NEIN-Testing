import React,{useEffect, useState,useContext} from "react";
import {
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,
    IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade,TextField,Grid,Autocomplete
  } from '@mui/material';
  import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

//import './ScrollableTable.css';
function DailyStatus(){

    const rows = [
        {
            slNo: 1, dktNo: 'DK001', refNo: 'RF001', mawbNo: 'MAWB001', mawbDt: '01/01/2024', mawbGWeight: '100kg',
            mawbCWeight: '120kg', hawb: 'HAWB001', hawbDt: '02/01/2024', mawbHawbPieces: '10', hawbGWeight: '50kg', 
            hawbCWeight: '60kg', customClrDt: '03/01/2024', exporter: 'ABC Exporter', dest: 'NYC', nomination: 'Yes',
            cha: 'CHA001', pickUp: 'Warehouse', diffKg: '10kg', profitLoss: '500 USD', negativeMargin: 'No', 
            molexMargin: '5%', shahiNegative: 'No', marginPercentage: '10%'
        },
        {
            slNo: 2, dktNo: 'DK002', refNo: 'RF002', mawbNo: 'MAWB002', mawbDt: '02/01/2024', mawbGWeight: '200kg',
            mawbCWeight: '210kg', hawb: 'HAWB002', hawbDt: '03/01/2024', mawbHawbPieces: '20', hawbGWeight: '70kg', 
            hawbCWeight: '80kg', customClrDt: '04/01/2024', exporter: 'XYZ Exporter', dest: 'LAX', nomination: 'No',
            cha: 'CHA002', pickUp: 'Port', diffKg: '5kg', profitLoss: '300 USD', negativeMargin: 'Yes', 
            molexMargin: '7%', shahiNegative: 'Yes', marginPercentage: '8%'
        },
        {
            slNo: 3, dktNo: 'DK003', refNo: 'RF003', mawbNo: 'MAWB003', mawbDt: '03/01/2024', mawbGWeight: '150kg',
            mawbCWeight: '160kg', hawb: 'HAWB003', hawbDt: '04/01/2024', mawbHawbPieces: '15', hawbGWeight: '55kg', 
            hawbCWeight: '65kg', customClrDt: '05/01/2024', exporter: 'DEF Exporter', dest: 'ORD', nomination: 'Yes',
            cha: 'CHA003', pickUp: 'Airport', diffKg: '8kg', profitLoss: '600 USD', negativeMargin: 'No', 
            molexMargin: '6%', shahiNegative: 'No', marginPercentage: '12%'
        },
        {
            slNo: 4, dktNo: 'DK004', refNo: 'RF004', mawbNo: 'MAWB004', mawbDt: '04/01/2024', mawbGWeight: '180kg',
            mawbCWeight: '190kg', hawb: 'HAWB004', hawbDt: '05/01/2024', mawbHawbPieces: '18', hawbGWeight: '65kg', 
            hawbCWeight: '75kg', customClrDt: '06/01/2024', exporter: 'GHI Exporter', dest: 'MIA', nomination: 'No',
            cha: 'CHA004', pickUp: 'Dock', diffKg: '6kg', profitLoss: '400 USD', negativeMargin: 'Yes', 
            molexMargin: '9%', shahiNegative: 'No', marginPercentage: '11%'
        },
        {
            slNo: 5, dktNo: 'DK005', refNo: 'RF005', mawbNo: 'MAWB005', mawbDt: '05/01/2024', mawbGWeight: '130kg',
            mawbCWeight: '140kg', hawb: 'HAWB005', hawbDt: '06/01/2024', mawbHawbPieces: '12', hawbGWeight: '45kg', 
            hawbCWeight: '55kg', customClrDt: '07/01/2024', exporter: 'JKL Exporter', dest: 'SEA', nomination: 'Yes',
            cha: 'CHA005', pickUp: 'Terminal', diffKg: '7kg', profitLoss: '550 USD', negativeMargin: 'No', 
            molexMargin: '10%', shahiNegative: 'Yes', marginPercentage: '14%'
        },
        {
            slNo: 6, dktNo: 'DK006', refNo: 'RF006', mawbNo: 'MAWB006', mawbDt: '06/01/2024', mawbGWeight: '170kg',
            mawbCWeight: '180kg', hawb: 'HAWB006', hawbDt: '07/01/2024', mawbHawbPieces: '17', hawbGWeight: '60kg', 
            hawbCWeight: '70kg', customClrDt: '08/01/2024', exporter: 'MNO Exporter', dest: 'DFW', nomination: 'No',
            cha: 'CHA006', pickUp: 'Depot', diffKg: '9kg', profitLoss: '450 USD', negativeMargin: 'No', 
            molexMargin: '8%', shahiNegative: 'No', marginPercentage: '9%'
        },
        {
            slNo: 7, dktNo: 'DK007', refNo: 'RF007', mawbNo: 'MAWB007', mawbDt: '07/01/2024', mawbGWeight: '160kg',
            mawbCWeight: '170kg', hawb: 'HAWB007', hawbDt: '08/01/2024', mawbHawbPieces: '16', hawbGWeight: '58kg', 
            hawbCWeight: '68kg', customClrDt: '09/01/2024', exporter: 'PQR Exporter', dest: 'ATL', nomination: 'Yes',
            cha: 'CHA007', pickUp: 'Yard', diffKg: '10kg', profitLoss: '700 USD', negativeMargin: 'Yes', 
            molexMargin: '4%', shahiNegative: 'No', marginPercentage: '13%'
        },
        {
            slNo: 8, dktNo: 'DK008', refNo: 'RF008', mawbNo: 'MAWB008', mawbDt: '08/01/2024', mawbGWeight: '140kg',
            mawbCWeight: '150kg', hawb: 'HAWB008', hawbDt: '09/01/2024', mawbHawbPieces: '14', hawbGWeight: '48kg', 
            hawbCWeight: '58kg', customClrDt: '10/01/2024', exporter: 'STU Exporter', dest: 'PHL', nomination: 'No',
            cha: 'CHA008', pickUp: 'Warehouse', diffKg: '4kg', profitLoss: '250 USD', negativeMargin: 'Yes', 
            molexMargin: '6%', shahiNegative: 'Yes', marginPercentage: '7%'
        },
        {
            slNo: 9, dktNo: 'DK009', refNo: 'RF009', mawbNo: 'MAWB009', mawbDt: '09/01/2024', mawbGWeight: '190kg',
            mawbCWeight: '200kg', hawb: 'HAWB009', hawbDt: '10/01/2024', mawbHawbPieces: '19', hawbGWeight: '75kg', 
            hawbCWeight: '85kg', customClrDt: '11/01/2024', exporter: 'VWX Exporter', dest: 'BOS', nomination: 'Yes',
            cha: 'CHA009', pickUp: 'Airport', diffKg: '11kg', profitLoss: '800 USD', negativeMargin: 'No', 
            molexMargin: '7%', shahiNegative: 'No', marginPercentage: '15%'
        },
        {
            slNo: 10, dktNo: 'DK010', refNo: 'RF010', mawbNo: 'MAWB010', mawbDt: '10/01/2024', mawbGWeight: '210kg',
            mawbCWeight: '220kg', hawb: 'HAWB010', hawbDt: '11/01/2024', mawbHawbPieces: '20', hawbGWeight: '80kg', 
            hawbCWeight: '90kg', customClrDt: '12/01/2024', exporter: 'YZA Exporter', dest: 'SFO', nomination: 'No',
            cha: 'CHA010', pickUp: 'Dock', diffKg: '12kg', profitLoss: '900 USD', negativeMargin: 'Yes', 
            molexMargin: '9%', shahiNegative: 'Yes', marginPercentage: '16%'
        },
        {
            slNo: 1, dktNo: 'DK001', refNo: 'RF001', mawbNo: 'MAWB001', mawbDt: '01/01/2024', mawbGWeight: '100kg',
            mawbCWeight: '120kg', hawb: 'HAWB001', hawbDt: '02/01/2024', mawbHawbPieces: '10', hawbGWeight: '50kg', 
            hawbCWeight: '60kg', customClrDt: '03/01/2024', exporter: 'ABC Exporter', dest: 'NYC', nomination: 'Yes',
            cha: 'CHA001', pickUp: 'Warehouse', diffKg: '10kg', profitLoss: '500 USD', negativeMargin: 'No', 
            molexMargin: '5%', shahiNegative: 'No', marginPercentage: '10%'
        },
        {
            slNo: 2, dktNo: 'DK002', refNo: 'RF002', mawbNo: 'MAWB002', mawbDt: '02/01/2024', mawbGWeight: '200kg',
            mawbCWeight: '210kg', hawb: 'HAWB002', hawbDt: '03/01/2024', mawbHawbPieces: '20', hawbGWeight: '70kg', 
            hawbCWeight: '80kg', customClrDt: '04/01/2024', exporter: 'XYZ Exporter', dest: 'LAX', nomination: 'No',
            cha: 'CHA002', pickUp: 'Port', diffKg: '5kg', profitLoss: '300 USD', negativeMargin: 'Yes', 
            molexMargin: '7%', shahiNegative: 'Yes', marginPercentage: '8%'
        },
        {
            slNo: 3, dktNo: 'DK003', refNo: 'RF003', mawbNo: 'MAWB003', mawbDt: '03/01/2024', mawbGWeight: '150kg',
            mawbCWeight: '160kg', hawb: 'HAWB003', hawbDt: '04/01/2024', mawbHawbPieces: '15', hawbGWeight: '55kg', 
            hawbCWeight: '65kg', customClrDt: '05/01/2024', exporter: 'DEF Exporter', dest: 'ORD', nomination: 'Yes',
            cha: 'CHA003', pickUp: 'Airport', diffKg: '8kg', profitLoss: '600 USD', negativeMargin: 'No', 
            molexMargin: '6%', shahiNegative: 'No', marginPercentage: '12%'
        },
        {
            slNo: 4, dktNo: 'DK004', refNo: 'RF004', mawbNo: 'MAWB004', mawbDt: '04/01/2024', mawbGWeight: '180kg',
            mawbCWeight: '190kg', hawb: 'HAWB004', hawbDt: '05/01/2024', mawbHawbPieces: '18', hawbGWeight: '65kg', 
            hawbCWeight: '75kg', customClrDt: '06/01/2024', exporter: 'GHI Exporter', dest: 'MIA', nomination: 'No',
            cha: 'CHA004', pickUp: 'Dock', diffKg: '6kg', profitLoss: '400 USD', negativeMargin: 'Yes', 
            molexMargin: '9%', shahiNegative: 'No', marginPercentage: '11%'
        },
        {
            slNo: 5, dktNo: 'DK005', refNo: 'RF005', mawbNo: 'MAWB005', mawbDt: '05/01/2024', mawbGWeight: '130kg',
            mawbCWeight: '140kg', hawb: 'HAWB005', hawbDt: '06/01/2024', mawbHawbPieces: '12', hawbGWeight: '45kg', 
            hawbCWeight: '55kg', customClrDt: '07/01/2024', exporter: 'JKL Exporter', dest: 'SEA', nomination: 'Yes',
            cha: 'CHA005', pickUp: 'Terminal', diffKg: '7kg', profitLoss: '550 USD', negativeMargin: 'No', 
            molexMargin: '10%', shahiNegative: 'Yes', marginPercentage: '14%'
        },
        {
            slNo: 6, dktNo: 'DK006', refNo: 'RF006', mawbNo: 'MAWB006', mawbDt: '06/01/2024', mawbGWeight: '170kg',
            mawbCWeight: '180kg', hawb: 'HAWB006', hawbDt: '07/01/2024', mawbHawbPieces: '17', hawbGWeight: '60kg', 
            hawbCWeight: '70kg', customClrDt: '08/01/2024', exporter: 'MNO Exporter', dest: 'DFW', nomination: 'No',
            cha: 'CHA006', pickUp: 'Depot', diffKg: '9kg', profitLoss: '450 USD', negativeMargin: 'No', 
            molexMargin: '8%', shahiNegative: 'No', marginPercentage: '9%'
        },
        {
            slNo: 7, dktNo: 'DK007', refNo: 'RF007', mawbNo: 'MAWB007', mawbDt: '07/01/2024', mawbGWeight: '160kg',
            mawbCWeight: '170kg', hawb: 'HAWB007', hawbDt: '08/01/2024', mawbHawbPieces: '16', hawbGWeight: '58kg', 
            hawbCWeight: '68kg', customClrDt: '09/01/2024', exporter: 'PQR Exporter', dest: 'ATL', nomination: 'Yes',
            cha: 'CHA007', pickUp: 'Yard', diffKg: '10kg', profitLoss: '700 USD', negativeMargin: 'Yes', 
            molexMargin: '4%', shahiNegative: 'No', marginPercentage: '13%'
        },
        {
            slNo: 8, dktNo: 'DK008', refNo: 'RF008', mawbNo: 'MAWB008', mawbDt: '08/01/2024', mawbGWeight: '140kg',
            mawbCWeight: '150kg', hawb: 'HAWB008', hawbDt: '09/01/2024', mawbHawbPieces: '14', hawbGWeight: '48kg', 
            hawbCWeight: '58kg', customClrDt: '10/01/2024', exporter: 'STU Exporter', dest: 'PHL', nomination: 'No',
            cha: 'CHA008', pickUp: 'Warehouse', diffKg: '4kg', profitLoss: '250 USD', negativeMargin: 'Yes', 
            molexMargin: '6%', shahiNegative: 'Yes', marginPercentage: '7%'
        },
        {
            slNo: 9, dktNo: 'DK009', refNo: 'RF009', mawbNo: 'MAWB009', mawbDt: '09/01/2024', mawbGWeight: '190kg',
            mawbCWeight: '200kg', hawb: 'HAWB009', hawbDt: '10/01/2024', mawbHawbPieces: '19', hawbGWeight: '75kg', 
            hawbCWeight: '85kg', customClrDt: '11/01/2024', exporter: 'VWX Exporter', dest: 'BOS', nomination: 'Yes',
            cha: 'CHA009', pickUp: 'Airport', diffKg: '11kg', profitLoss: '800 USD', negativeMargin: 'No', 
            molexMargin: '7%', shahiNegative: 'No', marginPercentage: '15%'
        },
        {
            slNo: 10, dktNo: 'DK010', refNo: 'RF010', mawbNo: 'MAWB010', mawbDt: '10/01/2024', mawbGWeight: '210kg',
            mawbCWeight: '220kg', hawb: 'HAWB010', hawbDt: '11/01/2024', mawbHawbPieces: '20', hawbGWeight: '80kg', 
            hawbCWeight: '90kg', customClrDt: '12/01/2024', exporter: 'YZA Exporter', dest: 'SFO', nomination: 'No',
            cha: 'CHA010', pickUp: 'Dock', diffKg: '12kg', profitLoss: '900 USD', negativeMargin: 'Yes', 
            molexMargin: '9%', shahiNegative: 'Yes', marginPercentage: '16%'
        }
    ];
return(
<div className="table-container">
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
      </DemoContainer>
    </LocalizationProvider>
<TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table" className="scrollable-table" >
                    <TableHead>
                        <TableRow>
        
            <TableCell className="table-header-cell scrollable-header"><b>CUSTOM CLR DT</b></TableCell>
            <TableCell className="table-header-cell scrollable-header">EXPORTER</TableCell>
            <TableCell className="table-header-cell scrollable-header">MAWB NO</TableCell>
            <TableCell className="table-header-cell scrollable-header">DEST</TableCell>
            <TableCell className="table-header-cell scrollable-header">NOMINATION</TableCell>
            <TableCell className="table-header-cell scrollable-header">CHA</TableCell>
            <TableCell className="table-header-cell scrollable-header">PICK UP</TableCell>
            <TableCell className="table-header-cell scrollable-header">DIFF/KG</TableCell>
            <TableCell className="table-header-cell scrollable-header">PROFIT/LOSS</TableCell>
            <TableCell className="table-header-cell scrollable-header">NEGATIVE MARGIN</TableCell>
            <TableCell className="table-header-cell scrollable-header">MOLEX MARGIN</TableCell>
            <TableCell className="table-header-cell scrollable-header">SHAHI NEGATIVE</TableCell>
            <TableCell className="table-header-cell scrollable-header">MARGIN %</TableCell>
            
          
            </TableRow>
            </TableHead>
            <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index} className={index % 2 === 0 ? 'tableRowEven' : 'tableRowOdd'}>
                             <TableCell>{row.customClrDt}</TableCell>
                            <TableCell>{row.exporter}</TableCell>
                            <TableCell>{row.mawbNo}</TableCell>
                            <TableCell>{row.dest}</TableCell>
                            <TableCell>{row.nomination}</TableCell>
                            <TableCell>{row.cha}</TableCell>
                            <TableCell>{row.pickUp}</TableCell>
                            <TableCell>{row.diffKg}</TableCell>
                            <TableCell>{row.profitLoss}</TableCell>
                            <TableCell>{row.negativeMargin}</TableCell>
                            <TableCell>{row.molexMargin}</TableCell>
                            <TableCell>{row.shahiNegative}</TableCell>
                            <TableCell>{row.marginPercentage}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>


</div>



)



}

export default DailyStatus;