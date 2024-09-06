import React,{useEffect, useState,useContext} from "react";
import {
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,
    IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade,TextField,Grid,Autocomplete
  } from '@mui/material';

// import './ScrollableTable.css';
function AEFRegister(){
    const rows = [
        { slNo: 1, dktNo: 'DK001', refNo: 'RF001', mawbNo: 'MAWB001', mawbDt: '01/01/2024', mawbGWeight: '100kg' },
        { slNo: 2, dktNo: 'DK002', refNo: 'RF002', mawbNo: 'MAWB002', mawbDt: '02/01/2024', mawbGWeight: '200kg' },
        // Add more static rows as needed
    ];

return(
<div className="table-container">

<TableContainer component={Paper} style={{width:'900px'}}>
                <Table stickyHeader aria-label="sticky table" style={{width:'max-content'}} >
                    <TableHead>
                        <TableRow>
        
            <TableCell  >SL NO</TableCell>
            <TableCell  >DKT NO</TableCell>
            <TableCell  >REF NO</TableCell>
            <TableCell  >MAWB NO</TableCell>
            <TableCell  >MAWB DT</TableCell>
            <TableCell  >MAWB G.WEIGHT</TableCell>
            <TableCell  >MAWB C.WEIGHT</TableCell>
            <TableCell  >HAWB</TableCell>
            <TableCell  >HAWB DT</TableCell>
            <TableCell  >MAWB/HAWB PICES</TableCell>
            <TableCell  >HAWB G.WEIGHT</TableCell>
            <TableCell  >HAWB C.WEIGHT</TableCell>
            <TableCell  >EXPORTER</TableCell>
            <TableCell  >COMMODITY</TableCell>
            <TableCell  >CONSIGNEE</TableCell>
            <TableCell  >DEST</TableCell>
            <TableCell  >DEST-COUNTRY</TableCell>
            <TableCell  >AREA</TableCell>
            <TableCell  >AIRLINE</TableCell>
            <TableCell  >INV NO DT</TableCell>
            <TableCell  >DESCRIPTION</TableCell>
            <TableCell  >PICK UP DATE</TableCell>
            <TableCell  >CUSTOMS CLR DT</TableCell>
            <TableCell  >FLIGHT DETAILS</TableCell>
            <TableCell  >1ST FLIGHT</TableCell>
            <TableCell  >2ND FLIGHT</TableCell>
            <TableCell  >MAWB PP/CC</TableCell>
            <TableCell  >MAWB NET FT AMT</TableCell>
            <TableCell  >MAWB TOTAL PP AMT</TableCell>
            <TableCell  >HAWB PP/CC</TableCell>
            <TableCell  >HAWB CURRENCY</TableCell>
            <TableCell  >HAWB AMOUNT</TableCell>
            <TableCell  >SB NO & DATE</TableCell>
            <TableCell  >FOB AMT</TableCell>
            <TableCell  >SB COPY DISPATCH DT</TableCell>
            <TableCell  >DOCUMENTS COURIER WAYBILL NO</TableCell>
            <TableCell  >HANDLING AMOUNT</TableCell>
            <TableCell  >NIPPON INV DT</TableCell>
            <TableCell  >BILLS DISPATCH DT</TableCell>
            <TableCell  >BILLS COURIED WAYBILL NO</TableCell>
            <TableCell  >DDU/DDP INV & DT</TableCell>
            <TableCell  >DDU/DDP INV DISPATCH DT</TableCell>
            <TableCell  >INCOTERM</TableCell>
            <TableCell  >REMARK</TableCell>
            <TableCell  > PUBLISH RATES</TableCell>
            <TableCell  >BUYING NET RATES</TableCell>
            <TableCell  >FSC</TableCell>
            <TableCell  >SCC</TableCell>
            <TableCell  >OTHER SURCHARGES</TableCell>
            <TableCell  >GENERAL/FLASH</TableCell>
            <TableCell  >TYPE OF SERVICE(DG/TEMP)</TableCell>
            <TableCell  >SELLING NET RATES</TableCell>
            <TableCell  >DIFFERENCE</TableCell>
            <TableCell  >PROFIT/LOSS</TableCell>
            <TableCell  >TOTAL ALL IN FREIGHT NEED TO PAY TO CARRIER</TableCell>
            <TableCell  >TOTAL ALL IN FREIGHT BILLING TO CUSTOMER</TableCell>

            <TableCell  >PREPARED BY/REG/NAME</TableCell>
            <TableCell  >EXECUTIVE NAME</TableCell>
          
            </TableRow>
            </TableHead>
            </Table>
            </TableContainer>


</div>



)



}

export default AEFRegister;