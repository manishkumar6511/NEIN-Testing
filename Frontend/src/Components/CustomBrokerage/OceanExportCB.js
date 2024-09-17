import React,{ useState} from "react";
import { Card, CardContent, Typography } from '@mui/material';

import { FormControl, Grid } from '@mui/material';
import {TextField } from '@mui/material';
import {Button } from '@mui/material';
import './../CSS/OperationStyles.css';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import {IconButton} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'  
import DisplayModal from "../centralized_components/AutoFieldModal";



function OceanExportCB(){
  const [isOpen, setIsOpen] = useState(true);
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const[dates,setDates]=useState({
    MBLDate:'',
    HBLDate:'',
    shippingBillDate:'',
    sailingDate:'',
    clearedOn:'',
    EcCopyDate:'',
    EpCopyDate:'',
    billsDispatch:'',
  
  
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
    { label: 'Shipper', data: 'New York' },
    { label: 'Consignee', data: 'Los Angeles' },
    { label: 'Invoice No', data: 'John Doe' },
    { label: 'Invoice Date', data: 'John Doe' },
    { label: 'Invoice Amount', data: 'John Doe' },
   
    // Add more fields as needed
  ];

const jobCancel=[
  {value:'Yes',label:'Yes'},
  {value:'No',label:'No'},
]


  const ShipmentType=[
    {value:'PP',label:'PP'},
    {value:'CC',label:'CC'},
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

<p className='card-title'>Ocean Export Details-Custom Brokerage. </p>

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
       label="Shipper" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       disabled
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
       className="disabled-textfield"
        name="qty"
        label="Consignee" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
         className="disabled-textfield"
          name="fromSeries"
          label="Invoice No" required
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
          disabled
           />
          </Grid>
          <Grid item xs={2}>
      <TextField
      className="disabled-textfield"
       name="prefix"
       label="Invoice Date" required
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
    label="Invoice Amount" required
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
       label="Origin" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       disabled
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
       className="disabled-textfield"
        name="qty"
        label="Commodity" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
        className="disabled-textfield"
          name="fromSeries"
          label="No Of Packages" required
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
          disabled
           />
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
        label="Container No" required
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
    label="CTN" required
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
<Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={ShipmentType}
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
          name="fromSeries"
          label="Payable To Overseas USD" required
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>

          <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Buying Rate(USD)" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Selling Rate(USD) " required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Total Freight(INR)" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Marging" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        
         
        

      
      

        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  //   label='TAT - CLEARED DATE & SHIPT ARRIVAL DATE'
   className="custom-textfield"
    name="prefix"
    label="MBL No" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      {/* <TextField
  
       className="custom-textfield"
       name="prefix"
       label="MBL Date" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       /> */}
       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="MBLDate"
      value={dates.MBLDate ? dayjs(dates.MBLDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='MBL Date *' />

    </LocalizationProvider>
        
      </Grid>
      <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="qty"
        label="HBL No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>
        <Grid item xs={2}>
  <FormControl fullWidth>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="HBLDate"
      value={dates.HBLDate ? dayjs(dates.HBLDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='HBL Date *' />

    </LocalizationProvider>
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
    //   label='TAT - BE DATE & CLEARED DATE'
       className="custom-textfield"
       name="prefix"
       label="FCL" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="LCL CBM" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="TEUS" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Chargeable Weight" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Currency" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>

        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="FCL TEUS" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Shipping Line" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Shipping Bill No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
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
        name="qty"
        label="Liner" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>

        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Assesable Value" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>

        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="Sector" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
        />
        </Grid>

        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="sailingDate"
      value={dates.sailingDate ? dayjs(dates.sailingDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Sailing Date *' />

    </LocalizationProvider>
        </Grid>

        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="clearedOn"
      value={dates.clearedOn ? dayjs(dates.clearedOn, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Cleared On *' />

    </LocalizationProvider>
        </Grid>

        <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="SB,CC,GR,NO" required
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
    label="Exporter INV No" 
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
       className="custom-textfield"
       name="prefix"
       label="VSL Voyage"
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
        className="custom-textfield"
        name="qty"
        label="CHA Name"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Cargo Received"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
           </Grid>
           <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="ETD"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
           </Grid>
           <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="ETA"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Closed/Open"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="FC BRO OK"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="ETA(ICD/CFS)"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="ETA Mother Port"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
        
           
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="EcCopyDate"
      value={dates.EcCopyDate ? dayjs(dates.EcCopyDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='EC Copy Dispatch Date *' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <TextField
          className="custom-textfield"
          name="fromSeries"
          label="Document Courier Way Bill No"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
          
          
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="EpCopyDate"
      value={dates.EpCopyDate ? dayjs(dates.EpCopyDate, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='EP Copy Dispatch Date *' />

    </LocalizationProvider>

          </Grid>
          <Grid item xs={2}>
       
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="billsDispatch"
      value={dates.billsDispatch ? dayjs(dates.billsDispatch, 'DD/MM/YYYY') : null}
      onChange={handleDateChange}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Bills Dispatch Date *' />

    </LocalizationProvider>
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
export default OceanExportCB;