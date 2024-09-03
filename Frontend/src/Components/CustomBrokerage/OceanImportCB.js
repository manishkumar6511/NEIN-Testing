import React,{useEffect, useState,useContext} from "react";
import { Card, CardContent, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {Select, FormControl, InputLabel, Grid } from '@mui/material';
import {TextField } from '@mui/material';
import {Button } from '@mui/material';
import './../CSS/OperationStyles.css';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import {IconButton} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import DisplayModal from "../centralized_components/AutoFieldModal";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'  
  


function OceanImportCB(){
  const [isOpen, setIsOpen] = useState(true);
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const[dates,setDates]=useState({
    TATCleared:'',
    TATBE:'',
    cartingDate:'',
    costSheetDate:'',
    shipmentArrivalDate:'',
    HBLMBLDate:'',
    BOEDate:'',
    shipmentClearedDate:'',
    DcDate:'',
    deliveryDate:'',
    vesselDate:'',
    vesselIGMDate:'',
    OBLReceivedDate:'',
    costSheetSendDate:'',

  
  
  })

  const handleDateChange = (date, key) => {
    setDates((prevDates) => ({
      ...prevDates,
      [key]: date,
    }));
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fields = [
    { label: 'Consignee', data: '1010101' },
    { label: 'IE Code', data: 'New York' },
    { label: 'Type Of BOE', data: 'Los Angeles' },
    { label: 'Consignor', data: 'John Doe' },
    { label: 'Origin', data: 'John Doe' },
    { label: 'No Of Packages', data: 'John Doe' },
    { label: 'Gross Weight', data: '1010101' },
    { label: 'Accessable Value', data: 'New York' },
    { label: 'Customs Duty', data: 'Los Angeles' },
    { label: 'Supplier Invoice No', data: 'John Doe' },
    { label: 'Invoice Date', data: 'John Doe' },
    { label: 'Invoice Value', data: 'John Doe' },
   
    // Add more fields as needed
  ];

const jobCancel=[
  {value:'Yes',label:'Yes'},
  {value:'No',label:'No'},
]
const FHD=[
    {value:'Yes',label:'Yes'},
    {value:'No',label:'No'},
  ]
const regionCode=[
  {value:'Tc1',label:'Tc1'},
  {value:'Tc2',label:'Tc2'},
  {value:'Tc3',label:'Tc3'},
  {value:'Japan',label:'Japan'},
]
const DDUCCP=[
  {value:'DDU',label:'DDU'},
  {value:'CCP',label:'CCP'},
]
const industryType=[
  {value:'',label:'Select'},
  {value:'Lifestyle',label:'Lifestyle'},
  {value:'Technology',label:'Technology'},
  {value:'Mobility',label:'Mobility'},
  {value:'pharma',label:'pharma'},
]
const hawbNo=[
  {value:'',label:''}
]
const mainProduct=[
  {value:'Select',label:'Select'}
]

return(
    <div>
        <Card className="main-card" >

<p className='card-title'>Ocean Import Details-Custom Brokerage. </p>

<CardContent>
  <Typography variant="h5" component="div">
    </Typography>
    <Grid container spacing={2}>
    <Grid item xs={6}>
        <FormControl fullWidth>
        
        <TextField
            className="custom-textfield"
          
            name="mawbNo"
            label="Job / Docket No" required
            
            size='small'
           
            InputLabelProps={{ style: { fontSize: '14px'} }}
            
          />
          </FormControl>
        </Grid>
       
    </Grid>
    </CardContent>
      
    </Card>
    <Card className="card">
<Grid container spacing={2}>
  <Grid item xs={10}>
  <p className='auto-card-title'>Auto Fields. </p>
  </Grid>
  <Grid item xs={2}>
    <Button className="toggle" onClick={toggleDetails}>
    {isOpen ? <ExpandLess /> : <ExpandMore />}
      </Button>
  </Grid>
</Grid>


<Divider className="divider"/>

      {isOpen && (
<CardContent>
<Typography variant="h5" component="div">
   <Grid container spacing={2}>
       <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  className="disabled-textfield"
    name="prefix"
    label="Consignee" required
    size='small'
    disabled
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
     className="disabled-textfield"
       name="prefix"
       label="IE Code" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       disabled
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
       className="disabled-textfield"
        name="qty"
        label="Type Of BOE" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
         className="disabled-textfield"
          name="fromSeries"
          label="Consignor" required
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
          disabled
           />
          </Grid>
          <Grid item xs={2}>
      <TextField
      className="disabled-textfield"
       name="prefix"
       label="Origin" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       disabled
       />
      </Grid>
      
        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
 className="disabled-textfield"
    name="prefix"
    label="No Of Packages" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    disabled
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
     className="disabled-textfield"
       name="prefix"
       label="Gross Weight" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       disabled
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
       className="disabled-textfield"
        name="qty"
        label="Assessable Value" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
        className="disabled-textfield"
          name="fromSeries"
          label="Customs Duty" required
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
          disabled
           />
          </Grid>
          <Grid item xs={2}>
      <TextField
      className="disabled-textfield"
       name="prefix"
       label="Supplier Invoice No" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       disabled
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
      className="disabled-textfield"
        name="qty"
        label="Invoice Date" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled
        />
        </Grid>

        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
 className="disabled-textfield"
    name="prefix"
    label="Invoice Value In INR" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    disabled
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
      className="disabled-textfield"
       name="prefix"
       label="Description" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       disabled
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
       className="disabled-textfield"
        name="qty"
        label="Total Containers" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
        className="disabled-textfield"
          name="fromSeries"
          label="CTH No" required
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
          disabled
           />
          </Grid>
          <Grid item xs={2}>
      <TextField
     className="disabled-textfield"
       name="prefix"
       label="Cleared Location" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       disabled
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
       className="disabled-textfield"
        name="qty"
        label="Port Of Clearing" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled
        />
        </Grid>

        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  className="disabled-textfield"
    name="prefix"
    label="Vessel Name" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    disabled
    />
</FormControl>
</Grid>

     
     
         
</Grid>
       </Typography>
     </CardContent>
      )}
   </Card>


    {/* Manual Fields */}
   <Card className="card">
<Grid container spacing={2}>
  <Grid item xs={11}>
  <p className='auto-card-title'>Manual Fields. </p>

  </Grid>
  <Grid item xs={1}>
  <IconButton onClick={handleOpen}>
      <InfoIcon style={{color:'#1A005D'}}/>
    </IconButton>
    <DisplayModal open={open} handleClose={handleClose} fields={fields} />
  </Grid>
</Grid>


<Divider className="divider"/>
<CardContent>
<Typography variant="h5" component="div">
   <Grid container spacing={2}>
       <Grid item xs={2}>
  <FormControl fullWidth>
  <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={mainProduct}
       //onChange={handleBranchChange}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Industry Type"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
          className="custom-textfield"
        />)}/> 
  
</FormControl>
</Grid>
<Grid item xs={2}>
<Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={industryType}
       //onChange={handleBranchChange}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Industry Type" required
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled
         className="disabled-textfield"
        />)}/> 
      </Grid>
      <Grid item xs={2}>
<Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={jobCancel}
       //onChange={handleBranchChange}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Job Cancel Status" required
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
         className="custom-textfield"
        />)}/> 
      </Grid>
        <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="shipmentClearedDate"
      value={dates.shipmentClearedDate ? dayjs(dates.shipmentClearedDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Shipment Cleared Date *' />

    </LocalizationProvider>
          </Grid>

          <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="BOE No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="BOEDate"
      value={dates.BOEDate ? dayjs(dates.BOEDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='BOE Date *' />

    </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="HBL/MBL No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="HBLMBLDate"
      value={dates.HBLMBLDate ? dayjs(dates.HBLMBLDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='HBL/MBL Date *' />

    </LocalizationProvider>
        </Grid>
        
         
          <Grid item xs={2}>
      <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={FHD}
       //onChange={handleBranchChange}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="FHD" required
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
         className="custom-textfield"
        />)}/> 
                                                                    
        </Grid>

      
      

        <Grid item xs={2}>
  <FormControl fullWidth>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="shipmentArrivalDate"
      value={dates.shipmentArrivalDate ? dayjs(dates.shipmentArrivalDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Shipment Arrival Date *' />

    </LocalizationProvider>
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
  
       className="custom-textfield"
       name="prefix"
       label="Challan No" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="IGM No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>
        <Grid item xs={2}>
  <FormControl fullWidth>
 
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="TATCleared"
      value={dates.TATCleared ? dayjs(dates.TATCleared, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='TAT Cleared Date *' />

    </LocalizationProvider>
</FormControl>
</Grid>
<Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="TATBE"
      value={dates.TATBE ? dayjs(dates.TATBE, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='TAT - BE DATE *' />

    </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Receipt No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Container No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="LCL" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="FCL" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>

        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Container Type" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Document Send For Billing" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
       
      
        </Grid>
        </Typography>
        </CardContent>
       
        </Card>


      {/* Optional Fields */}


<Card className="card">
<p className='card-title'>Optional Fields. </p>
<Divider className="divider"/>
<CardContent>
<Typography variant="h5" component="div">
   <Grid container spacing={2}>
       <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
   className="custom-textfield"
    name="prefix"
    label="Bond No" 
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
   
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="TATCleared"
      value={dates.cartingDate ? dayjs(dates.cartingDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Carting Date *' />

    </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="CBM"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
          className="custom-textfield"
          name="fromSeries"
          label="CFS"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
           </Grid>
           <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="CHA"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
           </Grid>
           <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Closed Open"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Container Seal No"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="costSheetDate"
      value={dates.costSheetDate ? dayjs(dates.costSheetDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Cost Sheet Preparation Date *' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="costSheetSendDate"
      value={dates.costSheetSendDate ? dayjs(dates.costSheetSendDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Cost Sheet send Date *' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="DC No"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="DcDate"
      value={dates.DcDate ? dayjs(dates.DcDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='DC Date *' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
        
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="deliveryDate"
      value={dates.deliveryDate ? dayjs(dates.deliveryDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Delivery Date *' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Transporter Details"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Vehicle No"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Vehicle Mode"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Waybill No"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Interest Amount"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Late Filing Penalty"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
           
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="OBLReceivedDate"
      value={dates.OBLReceivedDate ? dayjs(dates.OBLReceivedDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='OBL Final DOCS Received Date *' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Post Clearance Handover"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Post Clearance Received From CHA"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
       
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="vesselDate"
      value={dates.vesselDate ? dayjs(dates.vesselDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Vessel Date *' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
           
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="vesselIGMDate"
      value={dates.vesselIGMDate ? dayjs(dates.vesselIGMDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Vessel IGM Date *' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Volume In CBM"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Remarks"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>

          </Grid>
          </Typography>
          </CardContent>
        
          </Card>

        
           
           
            
           
              <Button  variant="contained" className="AirButton" style={{marginRight:'10px'}}>Submit</Button>
           
              <Button variant="contained" className="AirButton" >Reset</Button>
           
          
   
   
    </div>
)

}
export default OceanImportCB;