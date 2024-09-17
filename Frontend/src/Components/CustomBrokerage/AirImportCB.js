import React,{useEffect, useState} from "react";
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
import {  useToast } from '../centralized_components/Toast';
import axios from 'axios';


function AirImportCB(){
  const { showToast } = useToast();
  const[industryOptions,setIndustryOptions]=useState('');
  const[industryData,setIndustryData]=useState('');
  const [isOpen, setIsOpen] = useState(true);
const[dates,setDates]=useState({
  BOE_DATE:'',
  HAWB_MAWB_DATE:'',
  SHIPT_ARRIVAL_DATE:'',
  IGM_DATE:'',
  INVOICE_DATE:'',
  SHPT_CLEARED_DATE:'',
  CYCLE_TIME_ARR_BE_DATE:'',
  CYCLE_TIME_CLEARED_DATE:'',
  COST_SHEET_SEND_DATE:'',
  COST_SHEET_PREPARATION_DATE:'',
  CARTING_DATE:'',
  DELIVERY_DATE:'',
  DC_DATE:'',
 


})
const[autoFields,setAutoFields]=useState({
  CONSIGNEE:'',
  IE_CODE:'',
  BOE_NO:'',
  BOE_DATE:'',
  TYPE_OF_BOE:'',
  CONSIGNOR:'',
  ORIGIN:'',
  HAWB_MAWB_NO:'',
  HAWB_MAWB_DATE:'',
  SHIPT_ARRIVAL_DATE:'',
  NO_OF_PACKAGES:'',
  CHARGEABLE_WEIGHT:'',
  ASSESSABLE_VALUE:'',
  CUSTOMS_DUTY:'',
  IGM_NO:'',
  IGM_DATE:'',
  SUPPLIER_INVOICE_NO:'',
  INVOICE_DATE:'',
  INVOICE_VALUE_IN_INR:'',
  DESCRIPTION:'',
  C_T_H_NO:'',
  



})
const[manualFields,setManualFields]=useState({
  MainProduct:'',
  INDUSTRY:'',
  JOB_STATUS:'',
  SHPT_CLEARED_DATE:'',
  FHD_YES_NO:'',
  CHALLAN_NO:'',
  CYCLE_TIME_CLEARED_DATE:'',
  CYCLE_TIME_ARR_BE_DATE:'',
  DOC_SEND_FOR_BILLING:'',
})

const[initiatorDetails,setInitiatorDetails]=useState({
  initiator_id:'2849',
  initiator_name:'Gowthami B',
  register_branch:'10',
  register_sub_branch:'10',
  
})

const[optionalFields,setOptionalFields]=useState({
  BOND_NO:'',
  CARTING_DATE:'',
  CHA:'',
  CLEARED_LOCATION:'',
  CLOSED_OPEN:'',
  COST_SHEET_PREPARATION_DATE:'',
  COST_SHEET_SEND_DATE:'',
  DC_NO:'',
  DC_DATE:'',
  DELIVERY_DATE:'',
  TRANSPORTER_DETAILS:'',
  VEHICLE_NO:'',
  VEHICLE_MODE:'',
  WAYBILL_NO:'',
  INTEREST_AMOUNT:'',
  LATE_FILING_PENALTY:'',
  REMARKS:'',



})

const handleOptional=(e)=>{
  const { name, value } = e.target;
  setOptionalFields((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

const handleManualDataChange=(e)=>{
  const { name, value } = e.target;
  setManualFields((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

const handleAutoFields=(e)=>{
  const { name, value } = e.target;
  setAutoFields((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};


const [open, setOpen] = useState(false);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const fields = [
  { label: 'Consignee', data: '1010101' },
  { label: 'IE Code', data: 'New York' },
  { label: 'BOE No', data: 'Los Angeles' },
  { label: 'BOE Date', data: 'John Doe' },
  { label: 'Type Of BOE', data: 'John Doe' },
  { label: 'Consignor', data: 'John Doe' },
 
  // Add more fields as needed
];

const handleDateChange = (date, key) => {
  setDates((prevDates) => ({
    ...prevDates,
    [key]: date,
  }));
if(key==='INVOICE_DATE' || key==='IGM_DATE' || key==='SHIPT_ARRIVAL_DATE' || key==='HAWB_MAWB_DATE' || key==='BOE_DATE'){
  setAutoFields((prevFields) => ({
    ...prevFields,
    [key]: date.format('YYYY-MM-DD'),
  }));
}else if(key==='SHPT_CLEARED_DATE' || key==='CYCLE_TIME_CLEARED_DATE' || key==='CYCLE_TIME_ARR_BE_DATE'){
  setManualFields((prevFields) => ({
    ...prevFields,
    [key]: date.format('YYYY-MM-DD'),
  }));
}else{
  setOptionalFields((prevFields) => ({
    ...prevFields,
    [key]: date.format('YYYY-MM-DD'),
  }));
}


};
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

const jobCancel=[
  {value:'Yes',label:'Yes'},
  {value:'No',label:'No'},
]
const FHD=[
    {value:'Yes',label:'Yes'},
    {value:'No',label:'No'},
  ]

useEffect(() => {
  const fetchIndustrys = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ff/Industry');
      const details=response.data;
      setIndustryData(details);
      const industry = details.map(item => item.MainProduct);
      setIndustryOptions(industry); // Set the fetched options
      console.log("industry", response.data);
    } catch (error) {
      console.error('Error fetching Industry Details:', error);
    }
  };
  const debounceFetch = setTimeout(fetchIndustrys, 300);

  return () => clearTimeout(debounceFetch); // Cleanup the timeout

}, []); // Empty dependency array to run only once when the component mounts

const handleIndustryChange = (event, value) => {
  if (value) {
    
    console.log("value",value);
      const foundIndustry = industryData.find(industry => industry.MainProduct === value);
      if (foundIndustry) {
         // setSelectedIndustryName(foundIndustry.industry_name);
          setManualFields({ ...manualFields, INDUSTRY: foundIndustry.industry_name,MainProduct:value});
      }
  }
};

const handleOptionChange = async (event) => {
  const newValue=event.target.value;
  if (newValue) {
    try {
      const response = await axios.post('http://localhost:5000/cha/ai_JobData', {
        jobNo: newValue
      });
      console.log('Response data:', response.data);
      const details = response.data;
      console.log("1st response",details);
      if(details&&details[0].initiator_name){
        console.log("MAWB Details Already Entered By");
        showToast(`MAWB Details Already Entered By ${details[0].initiator_name}`,"error")
      }
    }catch (error) {
       console.error('Unexpected error:', error);
  }
}
}


const handleSubmit=async(e)=>{
  
   
  //console.log(manualData);
  
     const TotaData={...autoFields,...manualFields,...optionalFields,...initiatorDetails}
     console.log("Total Data",TotaData);
     try {
      const response = await axios.post('http://localhost:5000/cha/ai_jobinsert', TotaData);
      showToast("Air Import Details Inserted Successfully", "success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      showToast("Error inserting data", "error");
    }
  
  
  
  
  }

return(
    <div>
        <Card className="main-card" >

<p className='card-title'>Air Import Details-Custom Brokerage. </p>

<CardContent>
  <Typography variant="h5" component="div">
    </Typography>
    <Grid container spacing={2}>
    <Grid item xs={6}>
        <FormControl fullWidth>
        
        <TextField
            className="custom-textfield"
            name="JOB_DOCKET_NO"
            label="Job / Docket No" required
            size='small'
           InputLabelProps={{ style: { fontSize: '14px'} }}
           onKeyDown={handleOptionChange}
            
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
  value={autoFields.CONSIGNEE}
  onChange={handleAutoFields}
  className="custom-textfield"
    name="CONSIGNEE"
    label="Consignee" required
    size='small'
  
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
      value={autoFields.IE_CODE}
      onChange={handleAutoFields}
     className="custom-textfield"
       name="IE_CODE"
       label="IE Code" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
      
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
       value={autoFields.BOE_NO}
       onChange={handleAutoFields}
       className="custom-textfield"
        name="BOE_NO"
        label="BOE No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>
        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="BOE_DATE"
      value={dates.BOE_DATE ? dayjs(dates.BOE_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'BOE_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='BOE Date *' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
      <TextField
      value={autoFields.TYPE_OF_BOE}
      onChange={handleAutoFields}
      className="custom-textfield"
       name="TYPE_OF_BOE"
       label="Type Of BOE" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
      
       />
      </Grid>
      
        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  value={autoFields.CONSIGNOR}
  onChange={handleAutoFields}
 className="custom-textfield"
    name="CONSIGNOR"
    label="Consignor" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
   
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
      value={autoFields.ORIGIN}
      onChange={handleAutoFields}
     className="custom-textfield"
       name="ORIGIN"
       label="Origin" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
      
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
        value={autoFields.HAWB_MAWB_NO}
        onChange={handleAutoFields}
       className="custom-textfield"
        name="HAWB_MAWB_NO"
        label="HAWB/MAWB No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
    
        />
        </Grid>
        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="HAWB_MAWB_DATE"
      value={dates.HAWB_MAWB_DATE ? dayjs(dates.HAWB_MAWB_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'HAWB_MAWB_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='HAWB/MAWB Date *' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="SHIPT_ARRIVAL_DATE"
      value={dates.SHIPT_ARRIVAL_DATE ? dayjs(dates.SHIPT_ARRIVAL_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'SHIPT_ARRIVAL_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Shipment arrival Date *' />

    </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
       <TextField
        value={autoFields.NO_OF_PACKAGES}
        onChange={handleAutoFields}
      className="custom-textfield"
        name="NO_OF_PACKAGES"
        label="No Of Packages" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>

        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  value={autoFields.CHARGEABLE_WEIGHT}
  onChange={handleAutoFields}
 className="custom-textfield"
    name="CHARGEABLE_WEIGHT"
    label="Gross Weight" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
   
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
      value={autoFields.ASSESSABLE_VALUE}
      onChange={handleAutoFields}
      className="custom-textfield"
       name="ASSESSABLE_VALUE"
       label="Assesable Value" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
    
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
       value={autoFields.CUSTOMS_DUTY}
       onChange={handleAutoFields}
       className="custom-textfield"
        name="CUSTOMS_DUTY"
        label="Customs Duty" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
         value={autoFields.IGM_NO}
         onChange={handleAutoFields}
        className="custom-textfield"
          name="IGM_NO"
          label="IGM No" required
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
         
           />
          </Grid>
          <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="IGM_DATE"
      value={dates.IGM_DATE ? dayjs(dates.IGM_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'IGM_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='IGM Date *' />

    </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
       <TextField
       value={autoFields.SUPPLIER_INVOICE_NO}
       onChange={handleAutoFields}
       className="custom-textfield"
        name="SUPPLIER_INVOICE_NO"
        label="Supplier Invoice No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
      
        />
        </Grid>

        <Grid item xs={2}>
  <FormControl fullWidth>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="INVOICE_DATE"
      value={dates.INVOICE_DATE ? dayjs(dates.INVOICE_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'INVOICE_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Invoice Date *' />

    </LocalizationProvider>
</FormControl>
</Grid>

      <Grid item xs={2}>
       <TextField
       value={autoFields.INVOICE_VALUE_IN_INR}
       onChange={handleAutoFields}
        className="custom-textfield"
        name="INVOICE_VALUE_IN_INR"
        label="Invoice Value In INR" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
    
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
         value={autoFields.DESCRIPTION}
         onChange={handleAutoFields}
          className="custom-textfield"
          name="DESCRIPTION"
          label="Description" required
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
     
           />
          </Grid>
          <Grid item xs={2}>
      <TextField
      value={autoFields.C_T_H_NO}
      onChange={handleAutoFields}
       className="custom-textfield"
       name="C_T_H_NO"
       label="CTH No" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
     
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
        options={industryOptions}
        value={manualFields.MainProduct}
       onChange={handleIndustryChange}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Main Product"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        required
         className="custom-textfield"
        />)}/> 
  
</FormControl>
</Grid>
<Grid item xs={2}>
<TextField
      value={manualFields.INDUSTRY}
     className="disabled-textfield"
       name="INDUSTRY"
       label="Industry"
       required
       disabled
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
       />

      </Grid>
      <Grid item xs={2}>
<Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={jobCancel}
       onChange={(event, newValue) => {
        setManualFields((prevFields) => ({
          ...prevFields,
          JOB_STATUS: newValue,
        }));
      }}
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
      name="SHPT_CLEARED_DATE"
      value={dates.SHPT_CLEARED_DATE ? dayjs(dates.SHPT_CLEARED_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'SHPT_CLEARED_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Shipment Cleared Date *' />

    </LocalizationProvider>
          </Grid>
         
          <Grid item xs={2}>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={FHD}
        onChange={(event, newValue) => {
          setManualFields((prevFields) => ({
            ...prevFields,
            FHD_YES_NO: newValue,
          }));
        }}
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
       <TextField
       value={manualFields.CHALLAN_NO}
       onChange={handleManualDataChange}
        className="custom-textfield"
        name="CHALLAN_NO"
        label="Challan No" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        />
        </Grid>

        <Grid item xs={2}>
  <FormControl fullWidth>
  {/* <TextField
  //   label='TAT - CLEARED DATE & SHIPT ARRIVAL DATE'
   className="custom-textfield"
    name="prefix"
    label="TAT Cleared Date" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    /> */}
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="CYCLE_TIME_CLEARED_DATE"
      value={dates.CYCLE_TIME_CLEARED_DATE ? dayjs(dates.CYCLE_TIME_CLEARED_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'CYCLE_TIME_CLEARED_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='TAT Cleared Date *' />

    </LocalizationProvider>
</FormControl>
</Grid>
<Grid item xs={2}>
      {/* <TextField
    //   label='TAT - BE DATE & CLEARED DATE'
       className="custom-textfield"
       name="prefix"
       label="TAT - BE DATE" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="CYCLE_TIME_ARR_BE_DATE"
      value={dates.CYCLE_TIME_ARR_BE_DATE ? dayjs(dates.CYCLE_TIME_ARR_BE_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'CYCLE_TIME_ARR_BE_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='TAT BE Date *' />

    </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
       <TextField
        value={manualFields.DOC_SEND_FOR_BILLING}
        onChange={handleManualDataChange}
       className="custom-textfield"
        name="DOC_SEND_FOR_BILLING"
        label="Doc Send For Billing" required
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
  value={optionalFields.BOND_NO}
  onChange={handleOptional}
   className="custom-textfield"
    name="BOND_NO"
    label="Bond No" 
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="CARTING_DATE"
      value={dates.CARTING_DATE ? dayjs(dates.CARTING_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'CARTING_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Carting Date' />

    </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
       <TextField
        value={optionalFields.CHA}
        onChange={handleOptional}
        className="custom-textfield"
        name="CHA"
        label="CHA"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
          value={optionalFields.CLEARED_LOCATION}
          onChange={handleOptional}
          className="custom-textfield"
          name="CLEARED_LOCATION"
          label="Cleared Location"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
           </Grid>
           <Grid item xs={2}>
            <TextField
            value={optionalFields.CLOSED_OPEN}
            onChange={handleOptional}
          className="custom-textfield"
          name="CLOSED_OPEN"
          label="Closed Open"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
           </Grid>
           <Grid item xs={2}>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="COST_SHEET_PREPARATION_DATE"
      value={dates.COST_SHEET_PREPARATION_DATE ? dayjs(dates.COST_SHEET_PREPARATION_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'COST_SHEET_PREPARATION_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Cost Sheet Preparation Date' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="COST_SHEET_SEND_DATE"
      value={dates.COST_SHEET_SEND_DATE ? dayjs(dates.COST_SHEET_SEND_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'COST_SHEET_SEND_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Cost Sheet Send Date' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <TextField
            value={optionalFields.DC_NO}
            onChange={handleOptional}
          className="custom-textfield"
          name="DC_NO"
          label="DC No"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="DC_DATE"
      value={dates.DC_DATE ? dayjs(dates.DC_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'DC_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='DC Date' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="DELIVERY_DATE"
      value={dates.DELIVERY_DATE ? dayjs(dates.DELIVERY_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'DELIVERY_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Delivery Date' />

    </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <TextField
            value={optionalFields.TRANSPORTER_DETAILS}
            onChange={handleOptional}
          className="custom-textfield"
          name="TRANSPORTER_DETAILS"
          label="Transporter Details"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
            value={optionalFields.VEHICLE_NO}
            onChange={handleOptional}
          className="custom-textfield"
          name="VEHICLE_NO"
          label="Vehicle No"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
            value={optionalFields.VEHICLE_MODE}
            onChange={handleOptional}
          className="custom-textfield"
          name="VEHICLE_MODE"
          label="Vehicle Mode"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
            value={optionalFields.WAYBILL_NO}
            onChange={handleOptional}
          className="custom-textfield"
          name="WAYBILL_NO"
          label="Waybill No"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
            value={optionalFields.INTEREST_AMOUNT}
            onChange={handleOptional}
          className="custom-textfield"
          name="INTEREST_AMOUNT"
          label="Interest Amount"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
            value={optionalFields.LATE_FILING_PENALTY}
            onChange={handleOptional}
          className="custom-textfield"
          name="LATE_FILING_PENALTY"
          label="Late Filing Penalty"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
            value={optionalFields.REMARKS}
            onChange={handleOptional}
          className="custom-textfield"
          name="REMARKS"
          label="Remarks"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>

          </Grid>
          </Typography>
          </CardContent>
        
          </Card>

        
           
           
            
           
              <Button  variant="contained" className="AirButton" style={{marginRight:'10px'}} onClick={handleSubmit}>Submit</Button>
           
              <Button variant="contained" className="AirButton" >Reset</Button>
           
          
   
   
    </div>
)

}
export default AirImportCB;