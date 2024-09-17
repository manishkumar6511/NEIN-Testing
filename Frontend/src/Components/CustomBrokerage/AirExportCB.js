import React,{ useState} from "react";
import { Card, CardContent, Typography } from '@mui/material';

import { FormControl,Grid } from '@mui/material';
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
  


function AirExportCB(){
  const [isOpen, setIsOpen] = useState(true);
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const[dates,setDates]=useState({
    MAWBDate:'',
    HAWBDate:'',
    customClearanceDate:'',
    shippingBillDate:'',
   
  
  
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
    { label: 'IE Code', data: '1010101' },
   
    { label: 'MAWB No Of Pkgs', data: 'Los Angeles' },
    { label: 'Shipper', data: 'John Doe' },
    { label: 'Consignee', data: 'John Doe' },
    { label: 'Description Of Goods', data: 'John Doe' },
    { label: 'Destination', data: 'John Doe' },
    { label: 'Shipper Invoice No', data: 'John Doe' },
    { label: 'FOB Value', data: 'John Doe' },
   
    // Add more fields as needed
  ];

const jobCancel=[
  {value:'Yes',label:'Yes'},
  {value:'No',label:'No'},
]

  const ShimentType=[
    {value:'PP',label:'PP'},
    {value:'CC',label:'CC'},
  ]

const DDUCCP=[
  {value:'DDU',label:'DDU'},
  {value:'DDP',label:'DDP'},
]
const industryType=[
  {value:'',label:'Select'},
  {value:'Lifestyle',label:'Lifestyle'},
  {value:'Technology',label:'Technology'},
  {value:'Mobility',label:'Mobility'},
  {value:'pharma',label:'pharma'},
]

const mainProduct=[
  {value:'Select',label:'Select'}
]

return(
    <div>
        <Card className="main-card" >

<p className='card-title'>Air Export Details-Custom Brokerage. </p>

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
    label="IE Code" required
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
       label="MAWB No Of Packages" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       disabled
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
       className="disabled-textfield"
        name="qty"
        label="Shipper" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
         className="disabled-textfield"
          name="fromSeries"
          label="Consignee" required
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
          disabled
           />
          </Grid>
          <Grid item xs={2}>
      <TextField
      className="disabled-textfield"
       name="prefix"
       label="Description Of Goods" required
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
    label="Destination" required
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
       label="Shipper Invoice No" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       disabled
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
       className="disabled-textfield"
        name="qty"
        label="FOB Value INR" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled
        />
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
<Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={ShimentType}
       //onChange={handleBranchChange}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Shipment Type" required
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
         className="custom-textfield"
        />)}/> 
      </Grid>
        

      
      <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="NEWINS Reference No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>

        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
 
   className="custom-textfield"
    name="prefix"
    label="MAWB No" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="MAWBDate"
      value={dates.MAWBDate ? dayjs(dates.MAWBDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='MAWB Date *' />

    </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="MAWB Chargeable Weight(KG)" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="MAWB Total Freight Amount" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
      
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="HAWB No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>
        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="HAWBDate"
      value={dates.HAWBDate ? dayjs(dates.HAWBDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='HAWB Date *' />

    </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="HAWB Total Amount" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="HAWB Gross Weight" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>

        <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="HAWB Chargeable Weight(KG)" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="HAWB No Of Packages" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="Origin" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="Country" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="Country Code" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
        <TextField
       className="custom-textfield"
        name="qty"
        label="Region Code" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>
        <Grid item xs={2}>
        <TextField
       className="custom-textfield"
        name="qty"
        label="Airline Name" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
        <TextField
       className="custom-textfield"
        name="qty"
        label="Flight No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="customClearanceDate"
      value={dates.customClearanceDate ? dayjs(dates.customClearanceDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Customs Clearance Date *' />

    </LocalizationProvider>
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
    label="Commodity Code" 
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
       className="custom-textfield"
       name="prefix"
       label="Shipping Bill No"
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       />
      </Grid>
      <Grid item xs={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="shippingBillDate"
      value={dates.shippingBillDate ? dayjs(dates.shippingBillDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Shipping Bill Date *' />

    </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
         <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Name Of Agent"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
           </Grid>
           <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="IATA Agent"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
           </Grid>
           <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Sub Agent"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
<Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={DDUCCP}
       //onChange={handleBranchChange}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="DDU/DDP" 
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
         className="custom-textfield"
        />)}/> 
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
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="EC Copy Dispatch At"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="DOcument Courier Way Bill No"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="EP Copy Dispatch At"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Bills Dispatch At"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Bills Couried Way Bill No"
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
export default AirExportCB;