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

function OceanExportRM(){
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const[validated,setValidated]=useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { showToast } = useToast();
  
  const[industryOptions,setIndustryOptions]=useState([]);
  const[industryData,setIndustryData]=useState('');
const[dates,setDates]=useState({
  
    ETD:'',
    EXCHANGE_RATES_BILLING_DATE:'',
   
    SHPT_CLEARED_ON:'',


})

const[MandatoryFields,setMandatoryFields]=useState({
  JOB_DOCKET_NO:'',
  MainProduct:'',
  INDUSTRY:'',
  ACCOUNT:'',
  SHIPPER:'',
  MODE:'',
  ORIGIN:'',
  DESTINATION:'',
  NO_OF_PACKAGES:'',
  GROSS_WEIGHT:'',
  CHARGEABLE_WEIGHT:'',
  PAYMENT_TERMS:'',
  OCEAN_FREIGHT:'',
  SHPT_CLEARED_ON:'',

})
const[optionalFields,setOptionalFields]=useState({
    HBL:'',
    MBL:'',
    CONTAINER_NO:'',
    ETD:'',
    IHC_BL_OTHERS_CHARGES:'',
    GROSS_MARGIN:'',
    TRANSPORTATION_ESTIMATE:'',
    TRANSPORTATION_COST:'',
    TRANSPORTATION_MARGIN:'',
    PACKING_LIST_CURRENCY:'',
    PACKING_LIST_TOTAL_AMOUNT:'',
    PREMIUM:'',
    INSURANCE_AMOUNT_JPY_CUR:'',
    INSURANCE_AMOUNT:'',
    EXCHANGE_RATES_BILLING_DATE:'',
    INSURANCE_AMOUNT_INR:'',
    PREMIUM_AMOUNT_USD:'',
    VESSEL:'',
    RECEIPT_NO:'',
    PIC_NAME:'',

})
const[initiatorDetails,setInitiatorDetails]=useState({
  initiator_id:'',
  initiator_name:'',
  register_branch:'',
  Register_Branch_Code:'',
  
  
})

useEffect(()=>{
  let SessionDetails = {};
  const storedUser = sessionStorage.getItem('userDetails');
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
  if(key==='SHPT_CLEARED_ON'){
    setMandatoryFields((prevFields)=>({
      ...prevFields,
      [key]: date.format('YYYY-MM-DD'),
        }))
   

  }else{
    setOptionalFields((prevFields)=>({
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
  }else{
    console.log("no industry");
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
    const response = await axios.post(`${API_BASE_URL}/removals/oe_jobinsert`, TotaData);
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
    MODE:'',
    ORIGIN:'',
    DESTINATION:'',
    NO_OF_PACKAGES:'',
    GROSS_WEIGHT:'',
    CHARGEABLE_WEIGHT:'',
    PAYMENT_TERMS:'',
    OCEAN_FREIGHT:'',
    SHPT_CLEARED_ON:'',

  })
  setOptionalFields({
    HBL:'',
    MBL:'',
    CONTAINER_NO:'',
    ETD:'',
    IHC_BL_OTHERS_CHARGES:'',
    GROSS_MARGIN:'',
    TRANSPORTATION_ESTIMATE:'',
    TRANSPORTATION_COST:'',
    TRANSPORTATION_MARGIN:'',
    PACKING_LIST_CURRENCY:'',
    PACKING_LIST_TOTAL_AMOUNT:'',
    PREMIUM:'',
    INSURANCE_AMOUNT_JPY_CUR:'',
    INSURANCE_AMOUNT:'',
    EXCHANGE_RATES_BILLING_DATE:'',
    INSURANCE_AMOUNT_INR:'',
    PREMIUM_AMOUNT_USD:'',
    VESSEL:'',
    RECEIPT_NO:'',
    PIC_NAME:'',

  })
  setDates({
    ETD:'',
    EXCHANGE_RATES_BILLING_DATE:'',
   
    SHPT_CLEARED_ON:'',

  })
  setValidationErrors({});
}


return(
    <div>
        <Card className="main-card" >

<p >Ocean Export Details-Removals. </p>


      
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
  <FormControl fullWidth>
  <TextField
   value={MandatoryFields.GROSS_WEIGHT}
   onChange={handleManualDataChange}
   onWheel={(e) => e.target.blur()} 
   type="number" 
 className="custom-textfield"
    name="GROSS_WEIGHT"
    label="Gross Weight" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.GROSS_WEIGHT && (MandatoryFields.GROSS_WEIGHT === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
       value={MandatoryFields.CHARGEABLE_WEIGHT}
       onChange={handleManualDataChange}
       onWheel={(e) => e.target.blur()} 
       type="number" 
      className="custom-textfield"
       name="CHARGEABLE_WEIGHT"
       label="Chargeable Weight" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.CHARGEABLE_WEIGHT && (MandatoryFields.CHARGEABLE_WEIGHT === '')}
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
       <TextField
        value={MandatoryFields.OCEAN_FREIGHT}
        onChange={handleManualDataChange}
        onWheel={(e) => e.target.blur()} 
        type="number" 
       className="custom-textfield"
        name="OCEAN_FREIGHT"
        label="Ocean Freight" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        error={validationErrors.OCEAN_FREIGHT && (MandatoryFields.OCEAN_FREIGHT === '')}
        />
        </Grid>
    
      <Grid item xs={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="SHPT_CLEARED_ON"
      value={dates.SHPT_CLEARED_ON ? dayjs(dates.SHPT_CLEARED_ON, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'SHPT_CLEARED_ON')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Shipment Cleared Date *'
      slotProps={{
        textField: {
          error: validationErrors.SHPT_CLEARED_ON && !dates.SHPT_CLEARED_ON, 
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
   // name="prefix"
    label="Repeated Shipment Job No" 
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    />
</FormControl>
</Grid> */}
<Grid item xs={2}>
            <TextField
              value={optionalFields.HBL}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="HBL"
          label="HBL"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={optionalFields.MBL}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="MBL"
          label="MBL"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          
          <Grid item xs={2}>
            <TextField
              value={optionalFields.CONTAINER_NO}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="CONTAINER_NO"
          label="Container No"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          
           <Grid item xs={2}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="ETD"
      value={dates.ETD ? dayjs(dates.ETD, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'ETD')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='ETD'
      
      slotProps={{
        textField: {
          
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


<Grid item xs={2}>
       <TextField
        value={optionalFields.IHC_BL_OTHERS_CHARGES}
        onChange={handleOptionalDataChange}
        onWheel={(e) => e.target.blur()} 
        type="number" 
        className="custom-textfield"
        name="IHC_BL_OTHERS_CHARGES"
        label="IHC_BL_OTHERS_CHARGES "
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        />
        </Grid>

       

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
              value={optionalFields.TRANSPORTATION_COST}
              onChange={handleOptionalDataChange}
              onWheel={(e) => e.target.blur()} 
              type="number" 
          className="custom-textfield"
          name="TRANSPORTATION_COST"
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
              value={optionalFields.PACKING_LIST_CURRENCY}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="PACKING_LIST_CURRENCY"
          label="Packing List(Currency)"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField  
            value={optionalFields.PACKING_LIST_TOTAL_AMOUNT}
          onChange={handleOptionalDataChange}
          onWheel={(e) => e.target.blur()} 
          type="number" 
          className="custom-textfield"
          name="PACKING_LIST_TOTAL_AMOUNT"
          label="Packing List(Total Amount)"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={optionalFields.PREMIUM}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="PREMIUM"
          label="Premium(%)"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={optionalFields.INSURANCE_AMOUNT_JPY_CUR}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="INSURANCE_AMOUNT_JPY_CUR"
          label="Insurance Amount(JPY Currency)"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          
          <Grid item xs={2}>
            <TextField
              value={optionalFields.INSURANCE_AMOUNT}
              onChange={handleOptionalDataChange}
              onWheel={(e) => e.target.blur()} 
              type="number" 
          className="custom-textfield"
          name="INSURANCE_AMOUNT"
          label="Insurance Amount"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          
           <Grid item xs={2}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="EXCHANGE_RATES_BILLING_DATE"
      value={dates.EXCHANGE_RATES_BILLING_DATE ? dayjs(dates.EXCHANGE_RATES_BILLING_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'EXCHANGE_RATES_BILLING_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Exchange Rates(Billing Date)' 
      slotProps={{
        textField: {
        
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
      }}/>

    </LocalizationProvider>
      </Grid>



           <Grid item xs={2}>
            <TextField
              value={optionalFields.INSURANCE_AMOUNT_INR}
              onChange={handleOptionalDataChange}
              onWheel={(e) => e.target.blur()} 
              type="number" 
          className="custom-textfield"
          name="INSURANCE_AMOUNT_INR"
          label="Insurance Amount(INR)"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
           </Grid>
          
          
        
          <Grid item xs={2}>
            <TextField
              value={optionalFields.PREMIUM_AMOUNT_USD}
              onChange={handleOptionalDataChange}
              onWheel={(e) => e.target.blur()} 
              type="number" 
          className="custom-textfield"
          name="PREMIUM_AMOUNT_USD"
          label="Premium Amount(USD)"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          
          <Grid item xs={2}>
            <TextField
              value={optionalFields.VESSEL}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="VESSEL"
          label="Vessel"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={optionalFields.RECEIPT_NO}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="RECEIPT_NO"
          label="Receipt No"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={optionalFields.PIC_NAME}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="PIC_NAME"
          label="PIC Name"
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
export default OceanExportRM;