import React,{useEffect, useState} from "react";
import { Card, CardContent, Typography } from '@mui/material';

import {FormControl, Grid } from '@mui/material';
import {TextField } from '@mui/material';
import {Button } from '@mui/material';
import './../CSS/OperationStyles.css';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';


import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'  

import axios from "axios";
import {  useToast } from '../centralized_components/Toast';

function DomesticRM(){
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const[validated,setValidated]=useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { showToast } = useToast();
  
  const[industryOptions,setIndustryOptions]=useState([]);
  const[industryData,setIndustryData]=useState('');
const[dates,setDates]=useState({
  
  DELIVERY_DATE:'',
 


})

const[MandatoryFields,setMandatoryFields]=useState({
  JOB_DOCKET_NO:'',
  MainProduct:'',
  INDUSTRY:'',
  ACCOUNT:'',
  SHIPPER:'',
  TYPE:'',
  MODE:'',
  ORIGIN:'',
  DESTINATION:'',
  VOLUME:'',
 
  NO_OF_PACKAGES:'',
  PAYMENT_TERMS:'',
  DELIVERY_DATE:'',

})
const[optionalFields,setOptionalFields]=useState({
   
    GROSS_MARGIN:'',
    TRANSPORTATION_ESTIMATE:'',
    TRASPORTATION_COST:'',
    TRANSPORTATION_MARGIN:'',
    REMARKS:'',

})

const[initiatorDetails,setInitiatorDetails]=useState({
  initiator_id:'',
  initiator_name:'',
  register_branch:'',
  Register_Branch_Code:'',
  
  
})

useEffect(()=>{
  let SessionDetails = {};
  const storedUser = localStorage.getItem('userDetails');
  if (storedUser) {
    const userDetails = JSON.parse(storedUser);
  
   if(userDetails){
    setInitiatorDetails((prevState) => ({
      ...prevState,
      initiator_id:userDetails.empid ,
      initiator_name:userDetails.empname,
      register_branch:userDetails.branchid,
      Register_Branch_Code:userDetails.branchCode,

    }));
   }
    
  } else {
    console.log("No menu details found in localStorage.");
  }

},[])



const handleDateChange = (date, key) => {
  setDates((prevDates) => ({
    ...prevDates,
    [key]: date,
  }));
  if(key==='DELIVERY_DATE'){
    setMandatoryFields((prevFields)=>({
      ...prevFields,
      [key]: date.format('YYYY-MM-DD'),
        }))
      }
};




useEffect(() => {
  const fetchIndustrys = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ff/Industry`);
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
          setMandatoryFields({ ...MandatoryFields, INDUSTRY: foundIndustry.industry_name,MainProduct:value});
      }
  }
};


const handleManualDataChange = (e) => {
  const { name, value } = e.target;
  setMandatoryFields({ ...MandatoryFields, [name]: value });
};

const handleOptionalDataChange = (e) => {
  const { name, value } = e.target;
  setOptionalFields({ ...optionalFields, [name]: value });
};

const handleSubmit=async(e)=>{
 
  let errors = {};
  for (const [fieldName, fieldValue] of Object.entries(MandatoryFields)) {
    if (typeof fieldValue === 'string') {
      if (fieldValue.trim() === '') {
        errors[fieldName] = true; // Mark field as having an error
      }
    } else if (fieldValue === null || fieldValue === undefined) {
      errors[fieldName] = true; // Mark field as having an error
    }
  }

  // If there are any errors, do not proceed with form submission
  if (Object.keys(errors).length > 0) {
    setValidationErrors(errors); // Set the validation errors state
    showToast("Please fill in all required fields", "error");
    return;
  }

  // If all fields are validated successfully
  setValidated(true);

  // Combine the updated mandatory fields with optional fields
  const TotaData = { ...MandatoryFields, ...optionalFields,...initiatorDetails };
  
  
  
   try {
    const response = await axios.post(`${API_BASE_URL}/removals/Domestic_jobinsert`, TotaData);
    showToast("Submitted Successfully", "success");
    setTimeout(() => {
     resetFields();
    }, 3000);
  } catch (error) {
    showToast("Error inserting data", "error");
  }
  

}

const resetFields=()=>{
  setMandatoryFields({
    JOB_DOCKET_NO:'',
    MainProduct:'',
    INDUSTRY:'',
    ACCOUNT:'',
    SHIPPER:'',
    TYPE:'',
    MODE:'',
    ORIGIN:'',
    DESTINATION:'',
    VOLUME:'',
   
    NO_OF_PACKAGES:'',
    PAYMENT_TERMS:'',
    DELIVERY_DATE:'',

  })

  setOptionalFields({
    GROSS_MARGIN:'',
    TRANSPORTATION_ESTIMATE:'',
    TRASPORTATION_COST:'',
    TRANSPORTATION_MARGIN:'',
    REMARKS:'',


  })
  setDates({
    DELIVERY_DATE:'',

  })
  setValidationErrors({});
}

return(
    <div>
        <Card className="main-card" >

<p >Domestic-Removals. </p>


      
    </Card>
    <Card className="card">
    <p className='card-title'>Mandatory Fields. </p>


<Divider className="divider"/>

      
<CardContent>
<Typography variant="h5" component="div">
   <Grid container spacing={2}>
   <Grid item xs={2}>
        <FormControl fullWidth>
        
        <TextField
            className="custom-textfield"
          value={MandatoryFields.JOB_DOCKET_NO}
          onChange={handleManualDataChange}
            name="JOB_DOCKET_NO"
            label="Job / Docket No" required
            
            size='small'
           
            InputLabelProps={{ style: { fontSize: '14px'} }}
            error={validationErrors.JOB_DOCKET_NO && (MandatoryFields.JOB_DOCKET_NO === '')}
          />
          </FormControl>
        </Grid>


   <Grid item xs={2}>
  <FormControl fullWidth>
  <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
      options={industryOptions}
      value={MandatoryFields.MainProduct}
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
          className="custom-textfield"
          error={validationErrors.MainProduct && (MandatoryFields.MainProduct === '')}
        />)}/> 
  
</FormControl>
</Grid>
<Grid item xs={2}>
<TextField
  className="custom-textfield"
  value={MandatoryFields.INDUSTRY}
    name="INDUSTRY"
    label="Industry" required
    size='small'
    InputProps={{
      readOnly: true,
    }}
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.INDUSTRY && (MandatoryFields.INDUSTRY === '')}
    />
      </Grid>

       <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  value={MandatoryFields.ACCOUNT}
  onChange={handleManualDataChange}
  className="custom-textfield"
    name="ACCOUNT"
    label="Account" required
    size='small'
  
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.ACCOUNT && (MandatoryFields.ACCOUNT === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
       value={MandatoryFields.SHIPPER}
       onChange={handleManualDataChange}
     className="custom-textfield"
       name="SHIPPER"
       label="Shipper" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.SHIPPER && (MandatoryFields.SHIPPER === '')}
      
       />
      </Grid>
      <Grid item xs={2}>
      <TextField
       value={MandatoryFields.TYPE}
       onChange={handleManualDataChange}
     className="custom-textfield"
       name="TYPE"
       label="Type" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.TYPE && (MandatoryFields.TYPE === '')}
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
        value={MandatoryFields.MODE}
        onChange={handleManualDataChange}
       className="custom-textfield"
        name="MODE"
        label="Mode" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        error={validationErrors.MODE && (MandatoryFields.MODE === '')}
        />
        </Grid>
      
          <Grid item xs={2}>
      <TextField
       value={MandatoryFields.ORIGIN}
       onChange={handleManualDataChange}
      className="custom-textfield"
       name="ORIGIN"
       label="ORIGIN" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.ORIGIN && (MandatoryFields.ORIGIN === '')}
       />
      </Grid>
      
        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
   value={MandatoryFields.DESTINATION}
   onChange={handleManualDataChange}
 className="custom-textfield"
    name="DESTINATION"
    label="Destination" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.DESTINATION && (MandatoryFields.DESTINATION === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
   value={MandatoryFields.VOLUME}
   onChange={handleManualDataChange}
   onWheel={(e) => e.target.blur()} 
   type="number" 
 className="custom-textfield"
    name="VOLUME"
    label="Volume" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.VOLUME && (MandatoryFields.VOLUME === '')}
    />
</FormControl>
</Grid>

      
      <Grid item xs={2}>
       <TextField
        value={MandatoryFields.NO_OF_PACKAGES}
        onChange={handleManualDataChange}
        onWheel={(e) => e.target.blur()} 
        type="number" 
      className="custom-textfield"
        name="NO_OF_PACKAGES"
        label="No Of Packages" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        error={validationErrors.NO_OF_PACKAGES && (MandatoryFields.NO_OF_PACKAGES === '')}
        />
        </Grid>

   
      <Grid item xs={2}>
      <TextField
       value={MandatoryFields.PAYMENT_TERMS}
       onChange={handleManualDataChange}
     className="custom-textfield"
       name="PAYMENT_TERMS"
       label="Payment Terms" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.PAYMENT_TERMS && (MandatoryFields.PAYMENT_TERMS === '')}
       />
      </Grid>
      
    
      <Grid item xs={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="DELIVERY_DATE"
      value={dates.DELIVERY_DATE ? dayjs(dates.DELIVERY_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'DELIVERY_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Delivery Date *'
      slotProps={{
        textField: {
          error: validationErrors.DELIVERY_DATE && !dates.DELIVERY_DATE, 
          sx: {
            '& .MuiInputBase-input': {
              padding: '6.5px',
            },
            '& .MuiInputLabel-root': {
              top: '-2px', 
              fontSize:'14px',
              color:'#1a005d',
            },
          },
        },
      }}
      
      />

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
       {/* <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
   className="custom-textfield"
    //name="prefix"
    label="Repeated Shipment Job No" 
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    />
</FormControl>
</Grid> */}


       

      <Grid item xs={2}>
       <TextField
        value={optionalFields.GROSS_MARGIN}
        onChange={handleOptionalDataChange}
        onWheel={(e) => e.target.blur()} 
        type="number" 
        className="custom-textfield"
        name="GROSS_MARGIN"
        label="Gross Margin"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        />
        </Grid>
     
          <Grid item xs={2}>
            <TextField
              value={optionalFields.TRANSPORTATION_ESTIMATE}
              onChange={handleOptionalDataChange}
              onWheel={(e) => e.target.blur()} 
              type="number" 
          className="custom-textfield"
          name="TRANSPORTATION_ESTIMATE"
          label="Transportation Estimate"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={optionalFields.TRASPORTATION_COST}
              onChange={handleOptionalDataChange}
              onWheel={(e) => e.target.blur()} 
              type="number" 
          className="custom-textfield"
          name="TRASPORTATION_COST"
          label="Transportation Cost"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={optionalFields.TRANSPORTATION_MARGIN}
              onChange={handleOptionalDataChange}
              onWheel={(e) => e.target.blur()} 
              type="number" 
          className="custom-textfield"
          name="TRANSPORTATION_MARGIN"
          label="Transportation Margin"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={optionalFields.REMARKS}
              onChange={handleOptionalDataChange}
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
export default DomesticRM;