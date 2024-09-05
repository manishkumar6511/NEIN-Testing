import React, { useState } from 'react';
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,
  IconButton, Collapse, Box, Typography, TablePagination, Menu, MenuItem, Fade,TextField,Grid,Autocomplete
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';



const DataTable = ({
  data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage,
  handleRowClick, openRow, handleMenuClick, anchorEl, isMenuOpen,
  handleMenuClose, selectedType, link, selectedTab,searchTerm,handleSearch,DateFilter,handleDateFilter
}) => {
  const[selectedMawbNo,setSelectedMawbNo]=useState('');
  const navigate = useNavigate();
  console.log("Selected MAWB No:", selectedMawbNo);
  let groupedData;

if (selectedTab === 0 && selectedType === "Air Export") {
    groupedData = groupByMAWB(data);
} else if (selectedTab === 0 && selectedType.includes('Ocean')) {
    groupedData = groupByMBL(data);
} else {
    groupedData = groupByMAWBNo(data);
}

const handleNavigationWithData = (event,row) => {
  const selectedMawbNo1 = row.MAWB_BL_NO || row.MAWB_NO || row.MBL_No;
  setSelectedMawbNo(selectedMawbNo1);
  const dataToSend = { mawbNo: selectedMawbNo1 }; // Replace with your data
  navigate(link, { state: dataToSend });
  handleMenuClose(); // Close the menu after navigation
};


  const renderHeaders = () => {
    console.log("headers");
    console.log("tab",selectedTab);
    console.log("type",selectedType);

    if (selectedTab === 0) {
      return (
        <>
          <TableCell></TableCell>
          <TableCell><b>#</b></TableCell>
          <TableCell><b>{selectedType.includes('Air') ? 'MAWB NO' : 'MBL NO'}</b></TableCell>
          <TableCell><b>{selectedType.includes('Air') ? 'DEPARTURE' : 'PORT LOADING'}</b></TableCell>
          <TableCell><b>{selectedType.includes('Air') ? 'DESTINATION' : 'PORT DISCHARGE'}</b></TableCell>
          <TableCell><b>CONSIGNEE</b></TableCell>
          <TableCell><b>{selectedType.includes('Air') ? 'HAWB COUNT' : 'HBL COUNT'}</b></TableCell>
          <TableCell><b>ACTION</b></TableCell>
        </>
      );
    } else if (selectedTab === 1) {
      return (
        <>
          <TableCell></TableCell>
          <TableCell><b>#</b></TableCell>
          <TableCell><b>Job/Docket No</b></TableCell>
          <TableCell><b>{selectedType.includes('Air') ? 'MAWB No' : 'IE Code'}</b></TableCell>
          <TableCell><b>Consignee</b></TableCell>
          <TableCell><b>Industry</b></TableCell>
          <TableCell><b>Action</b></TableCell>
        </>
      );
    }
  };

  const renderRows = (row, index, group) => {

   

    // console.log("rows");
    // console.log("tab",selectedTab);
    // console.log("type",selectedType);
    // console.log(row); 
    // console.log(index);
    console.log("group",group);

    if (selectedTab === 0 && selectedType==='Air Export')  {
      const hawbCount = group.filter(hawbRow => hawbRow.MASTER_HOUSE_BL || hawbRow.HBL).length;
      return (
        <>
          <TableRow className={index % 2 === 0 ? 'tableRowEven' : 'tableRowOdd'}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(row.Id)}
                disabled={hawbCount===0}
                >
                {openRow === row.Id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </TableCell>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{row.MAWB_BL_NO || row.MBL}</TableCell>
            <TableCell>{row.DEPARTURE_CITY || row.PortLoading}</TableCell>
            <TableCell>{row.DESTINATION_CITY || row.PortDischarge}</TableCell>
            <TableCell>{row.CONSIGNEE_NAME}</TableCell>
            <TableCell>{hawbCount}</TableCell> {/* Display the HAWB count */}
            <TableCell>
              <IconButton onClick={(event) => handleNavigationWithData(event, row)}>
                <CreateIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
              <Collapse in={openRow === row.Id} timeout="auto" unmountOnExit>
                <Box margin={1}>
                {hawbCount > 0 ? (
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>{selectedType.includes('Air') ? 'HAWB NO' : 'HBL NO'}</TableCell>
                        <TableCell>{selectedType.includes('Air') ? 'HAWB DATE' : 'HBL DATE'}</TableCell>
                        <TableCell>{selectedType.includes('Air') ? 'HAWB TOTAL AMOUNT' : 'HBL TOTAL AMOUNT'}</TableCell>
                        <TableCell>{selectedType.includes('Air') ? 'HAWB GROSS WEIGHT' : 'HBL GROSS WEIGHT'}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {group.map((hawbRow) => (
                        (hawbRow.MASTER_HOUSE_BL || hawbRow.HBL) && ( // Only render rows with HAWB data
                        <TableRow key={hawbRow.HAWB}>
                          <TableCell>{hawbRow.MASTER_HOUSE_BL || hawbRow.HBL}</TableCell>
                          <TableCell>{(hawbRow.MASTER_HOUSE_BL)?hawbRow.BL_CONSO_DATE:'' || hawbRow.HAWBDate}</TableCell>
                          <TableCell>{(hawbRow.MASTER_HOUSE_BL)?hawbRow.CHARGE_TOTAL_CC:'' || hawbRow.HAWBTotal}</TableCell>
                          <TableCell>{(hawbRow.MASTER_HOUSE_BL)?hawbRow.TOTAL_ACTUAL_WEIGHT:''|| hawbRow.HAWBGross }</TableCell>
                        </TableRow>
                        )
                      ))}
                    </TableBody>
                  </Table>
                   ) : (
                    <Typography variant="body2" color="textSecondary">
                      No additional data available.
                    </Typography>
                  )}
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      );

    }else if(selectedTab === 0 && selectedType==='Air Import'){
      const hawbCount = group.filter(hawbRow => hawbRow.HAWB_NO || hawbRow.HBL).length;
      console.log("air import data table",hawbCount);
      return (
        <>
          <TableRow className={index % 2 === 0 ? 'tableRowEven' : 'tableRowOdd'}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(row.Id)}
                disabled={hawbCount===0}
                >
                {openRow === row.Id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </TableCell>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{row.MAWB_NO}</TableCell>
            <TableCell>{row.ORIGIN || row.PortLoading}</TableCell>
            <TableCell>{row.DESTINATION_NAME || row.PortDischarge}</TableCell>
            <TableCell>{row.CONSIGNEE}</TableCell>
            <TableCell>{hawbCount}</TableCell> {/* Display the HAWB count */}
            <TableCell>
              <IconButton onClick={(event) => handleNavigationWithData(event, row)}>
                <CreateIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
              <Collapse in={openRow === row.Id} timeout="auto" unmountOnExit>
                <Box margin={1}>
                {hawbCount > 0 ? (
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>{selectedType.includes('Air') ? 'HAWB NO' : 'HBL NO'}</TableCell>
                        <TableCell>{selectedType.includes('Air') ? 'HAWB Date' : 'HBL Date'}</TableCell>
                        <TableCell>{selectedType.includes('Air') ? 'HAWB Total Amount' : 'HBL Total Amount'}</TableCell>
                        <TableCell>{selectedType.includes('Air') ? 'HAWB Gross Weight' : 'HBL Gross Weight'}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {group.map((hawbRow) => (
                        (hawbRow.MAWB_NO) && ( // Only render rows with HAWB data
                        <TableRow key={hawbRow.HAWB_NO}>
                          <TableCell>{hawbRow.HAWB_NO}</TableCell>
                          <TableCell>{(hawbRow.MAWB_NO)?hawbRow.HAWB_DATE:'' || hawbRow.HAWBDate}</TableCell>
                          <TableCell>{(hawbRow.MAWB_NO)?hawbRow.TOTAL_FREIGHT_CHARGE:'' || hawbRow.HAWBTotal}</TableCell>
                          <TableCell>{(hawbRow.MAWB_NO)?hawbRow.GROSS_WEIGHT:''|| hawbRow.HAWBGross }</TableCell>
                        </TableRow>
                        )
                      ))}
                    </TableBody>
                  </Table>
                   ) : (
                    <Typography variant="body2" color="textSecondary">
                      No additional data available.
                    </Typography>
                  )}
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      );

    }else if(selectedTab === 0 && selectedType.includes('Ocean')){
      const hawbCount = group.filter(hawbRow => hawbRow.HBL_No).length;
      console.log("ocean import data table",hawbCount);
      return (
        <>
          <TableRow className={index % 2 === 0 ? 'tableRowEven' : 'tableRowOdd'}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(row.id)}
                disabled={hawbCount===0}
                >
                {openRow === row.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </TableCell>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{row.MBL_No}</TableCell>
            <TableCell>{row.PortofLoading}</TableCell>
            <TableCell>{row.PortofDischarge}</TableCell>
            <TableCell>{row.Consignee}</TableCell>
            <TableCell>{hawbCount}</TableCell> {/* Display the HAWB count */}
            <TableCell>
              <IconButton onClick={(event) => handleMenuClick(event, row)}>
                <CreateIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
              <Collapse in={openRow === row.id} timeout="auto" unmountOnExit>
                <Box margin={1}>
                {hawbCount > 0 ? (
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>HBL NO</TableCell>
                        <TableCell>ETD</TableCell>
                        <TableCell>Shipper</TableCell>
                        <TableCell>HBL Gross Weight</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {group.map((hawbRow) => (
                        (hawbRow.HBL_No) && ( // Only render rows with HAWB data
                        <TableRow key={hawbRow.HBL_No}>
                          <TableCell>{hawbRow.HBL_No}</TableCell>
                          <TableCell>{(hawbRow.HBL_No)?hawbRow.ETD:'' }</TableCell>
                          <TableCell>{(hawbRow.HBL_No)?hawbRow.Shipper:'' }</TableCell>
                          <TableCell>{(hawbRow.HBL_No)?hawbRow.GrossWeight:'' }</TableCell>
                        </TableRow>
                        )
                      ))}
                    </TableBody>
                  </Table>
                   ) : (
                    <Typography variant="body2" color="textSecondary">
                      No additional data available.
                    </Typography>
                  )}
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      );

    } else if (selectedTab === 1) {
      return (
        <>
          <TableRow className={index % 2 === 0 ? 'tableRowEven' : 'tableRowOdd'}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(row.id)}>
                {openRow === row.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </TableCell>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.DocketNo}</TableCell>
            <TableCell>{row.MAWB || row.IECode}</TableCell>
            <TableCell>{row.Consignee}</TableCell>
            <TableCell>{row.Industry}</TableCell>
            <TableCell>
              <IconButton onClick={(event) => handleMenuClick(event, row)}>
                <MoreHorizIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
              <Collapse in={openRow === row.id} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    Additional Information
                  </Typography>
                  {/* <Typography variant="body1">
                    Some detailed information about {row.differentField1}: {row.differentField1}
                  </Typography> */}
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      );
    }
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: '29px' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
      <p style={{ margin: '10px 0px -40px 16px',textAlign:'left' }}><b>{selectedType}</b></p>
      </Grid>
      <Grid item xs={3}>
      <Autocomplete size="small"  freeSolo id="free-solo-2-demo" disableClearable 
      options={DateFilter}
      onChange={handleDateFilter}
    
      //value={subBranch || null} 
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Last 45 Days"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        style={{margin:'12px 0px 0px 2px'}}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        required
       className="dashboard-autocomplete"
        />)}/> 
      </Grid>
      <Grid item xs={3}>
          <TextField
            className="textfield"
          value={searchTerm || ''}
            name="search"
            label="Search..."
            size="small"
            onChange={handleSearch}
           
            InputLabelProps={{ style: { fontSize: '14px'} }}
           
          />
</Grid>

      </Grid>
      <Table stickyHeader aria-label="sticky table">
        <TableHead style={{backgroundColor:'#1a005d',color:'#fff'}}>
          <TableRow>
            {renderHeaders()}
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedTab === 0
            ? Object.entries(groupedData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(([mawb, group], index) => (
              <React.Fragment key={mawb}>
                {renderRows(group[0], index, group)}
              </React.Fragment>
            ))
            : data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <React.Fragment key={row.id}>
                {renderRows(row, index)}
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={selectedTab === 0 ? Object.keys(groupedData).length : data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default DataTable;

const groupByMAWB = (data) => {
  return data.reduce((acc, item) => {
    const { MAWB_BL_NO } = item;
    if (!acc[MAWB_BL_NO]) {
      acc[MAWB_BL_NO] = [];
    }
    acc[MAWB_BL_NO].push(item);
    return acc;
  }, {});
};

const groupByMAWBNo = (data) => {
  return data.reduce((acc, item) => {
    const { MAWB_NO } = item;
    if (!acc[MAWB_NO]) {
      acc[MAWB_NO] = [];
    }
    acc[MAWB_NO].push(item);
    return acc;
  }, {});
};

const groupByMBL=(data)=>{
  console.log("coming to groupByMBL");
return data.reduce((acc,item)=>{
  console.log("Processing item:", item);
const{MBL_No}=item;
if(!acc[MBL_No]){
acc[MBL_No]=[];
}
acc[MBL_No].push(item);
return acc;
},{});
}
