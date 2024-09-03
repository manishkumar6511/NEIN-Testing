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
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'  
import DisplayModal from "../centralized_components/AutoFieldModal";
import axios from "axios";
import { ToastProvider, useToast } from '../centralized_components/Toast';

function OceanImportRM(){

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const[validated,setValidated]=useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(true);
  const[industryOptions,setIndustryOptions]=useState([]);
  const[industryData,setIndustryData]=useState('');
const[dates,setDates]=useState({
    ETA:'',
    ETD:'',
    CAN_RECVD_ON:'',
    RAILED_OUT_DATE:'',
 
    DELIVERY_DATE:'',
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
  PAYMENT_TERMS:'',
  HBL:'',
  MBL:'',
  NO_OF_PACKAGES:'',
  GROSS_WEIGHT:'',
  VOLUME:'',
  ETD:'',
  ETA:'',
  CAN_RECVD_ON:'',
  PIC_NAME:'',
  SHPT_CLEARED_ON:'',

})
const[optionalFields,setOptionalFields]=useState({
    CONTAINER_NO:'',
    RAILED_OUT_DATE:'',
    ETA_NEW_DELHI:'',
    HANDOVER_AT_ICD_CFS:'',
    DELIVERY_DATE:'',
    ARRIVAL_CLEARNCE_PORT:'',
    ARRIVAL_SEA_PORT:'',
    GROSS_MARGIN:'',
    TRANSPORTATION_ESTIMATE:'',
    TRASPORTATION_COST:'',
    TRANSPORTATION_MARGIN:'',
    CWC_CHARGES:'',
    RECEIPT_NO:'',
    CUSTOM_DUTY:'',
    CUSTOM_DUTY_CHQ_NO:'',
    REMARKS:'',


})

const[initiatorDetails,setInitiatorDetails]=useState({
  initiator_id:'2849',
  initiator_name:'Gowthami B',
  register_branch:'10',
  register_sub_branch:'10',
  
  
})


const [open, setOpen] = useState(false);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);


const handleDateChange = (date, key) => {
  setDates((prevDates) => ({
    ...prevDates,
    [key]: date,
  }));
  if(key==='RAILED_OUT_DATE' || key==='DELIVERY_DATE'){
    setOptionalFields((prevFields)=>({
      ...prevFields,
      [key]: date.format('YYYY-MM-DD'),
        }))
      }else{
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
  e.preventDefault(); 
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
 
console.log(TotaData);
  
  
   try {
    const response = await axios.post(`${API_BASE_URL}/removals/oi_jobinsert`, TotaData);
    showToast("Ocean Import Data Inserted Successfully", "success");
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
  PAYMENT_TERMS:'',
  HBL:'',
  MBL:'',
  NO_OF_PACKAGES:'',
  GROSS_WEIGHT:'',
  VOLUME:'',
  ETD:'',
  ETA:'',
  CAN_RECVD_ON:'',
  PIC_NAME:'',
  SHPT_CLEARED_ON:'',

  })
  setOptionalFields({
    CONTAINER_NO:'',
    RAILED_OUT_DATE:'',
    ETA_NEW_DELHI:'',
    HANDOVER_AT_ICD_CFS:'',
    DELIVERY_DATE:'',
    ARRIVAL_CLEARNCE_PORT:'',
    ARRIVAL_SEA_PORT:'',
    GROSS_MARGIN:'',
    TRANSPORTATION_ESTIMATE:'',
    TRASPORTATION_COST:'',
    TRANSPORTATION_MARGIN:'',
    CWC_CHARGES:'',
    RECEIPT_NO:'',
    CUSTOM_DUTY:'',
    CUSTOM_DUTY_CHQ_NO:'',
    REMARKS:'',

  })
  setDates({
    ETA:'',
    ETD:'',
    CAN_RECVD_ON:'',
    RAILED_OUT_DATE:'',
 
    DELIVERY_DATE:'',
  SHPT_CLEARED_ON:'',

  })
  setValidationErrors({});
}


return(
    <div>
        <Card className="main-card" >

<p >Ocean Import Details-Removals. </p>


      
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
   disabled
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
        value={MandatoryFields.HBL}
        onChange={handleManualDataChange}
       className="custom-textfield"
        name="HBL"
        label="HBL" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        error={validationErrors.HBL && (MandatoryFields.HBL === '')}
        />
        </Grid>
      <Grid item xs={2}>
       <TextField
        value={MandatoryFields.MBL}
        onChange={handleManualDataChange}
       className="custom-textfield"
        name="MBL"
        label="MBL" required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        error={validationErrors.MBL && (MandatoryFields.MBL === '')}
        
        />
        </Grid>
       
        
      
      
      <Grid item xs={2}>
       <TextField
        value={MandatoryFields.NO_OF_PACKAGES}
        onChange={handleManualDataChange}
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
       value={MandatoryFields.VOLUME}
       onChange={handleManualDataChange}
      className="custom-textfield"
       name="VOLUME"
       label="Volume" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.VOLUME && (MandatoryFields.VOLUME === '')}
       />
      </Grid>
      <Grid item xs={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="ETA"
      value={dates.ETA ? dayjs(dates.ETA, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'ETA')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='ETA *'
      
      slotProps={{
        textField: {
          error: validationErrors.ETA && !dates.ETA, 
        },
      }}
      />

    </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="ETD"
      value={dates.ETD ? dayjs(dates.ETD, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'ETD')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='ETD *'
      slotProps={{
        textField: {
          error: validationErrors.ETD && !dates.ETD, 
        },
      }}
      />

    </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="CAN_RECVD_ON"
      value={dates.CAN_RECVD_ON ? dayjs(dates.CAN_RECVD_ON, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'CAN_RECVD_ON')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='CAN Received On *'
      slotProps={{
        textField: {
          error: validationErrors.CAN_RECVD_ON && !dates.CAN_RECVD_ON, 
        },
      }}
      />

    </LocalizationProvider>
      </Grid>
    
    
          <Grid item xs={2}>
      <TextField
       value={MandatoryFields.PIC_NAME}
       onChange={handleManualDataChange}
     className="custom-textfield"
       name="PIC_NAME"
       label="PIC Name" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.PIC_NAME && (MandatoryFields.PIC_NAME === '')}
       
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
       <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
   className="custom-textfield"
    //name="prefix"
    label="Repeated Shipment Job No" 
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
       <TextField
        value={optionalFields.CONTAINER_NO}
        onChange={handleOptionalDataChange}
        className="custom-textfield"
        name="CONTAINER_NO"
        label="Container No"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        />
        </Grid>
<Grid item xs={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="RAILED_OUT_DATE"
      value={dates.RAILED_OUT_DATE ? dayjs(dates.RAILED_OUT_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'RAILED_OUT_DATE')}
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='Railed Out Date' />

    </LocalizationProvider>
        </Grid>
       

      <Grid item xs={2}>
       <TextField
        value={optionalFields.ETA_NEW_DELHI}
        onChange={handleOptionalDataChange}
        className="custom-textfield"
        name="ETA_NEW_DELHI"
        label="ETA New Delhi"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
           value={optionalFields.HANDOVER_AT_ICD_CFS}
           onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="HANDOVER_AT_ICD_CFS"
          label="Handover At ICD CFS"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
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
      label='Delivery Date' />

    </LocalizationProvider>
      </Grid>



           <Grid item xs={2}>
            <TextField
              value={optionalFields.ARRIVAL_CLEARNCE_PORT}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="ARRIVAL_CLEARNCE_PORT"
          label="Arrival Clearance Port"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
           </Grid>
          
          
        
          <Grid item xs={2}>
            <TextField
              value={optionalFields.ARRIVAL_SEA_PORT}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="ARRIVAL_SEA_PORT"
          label="Arrival Sea Port"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          
          <Grid item xs={2}>
            <TextField
              value={optionalFields.GROSS_MARGIN}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="GROSS_MARGIN"
          label="Gross Margin"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={optionalFields.TRANSPORTATION_ESTIMATE}
              onChange={handleOptionalDataChange}
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
          className="custom-textfield"
          name="TRANSPORTATION_MARGIN"
          label="Transportation Margin"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={optionalFields.CWC_CHARGES}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="CWC_CHARGES"
          label="CWC Charges"
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
              value={optionalFields.CUSTOM_DUTY}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="CUSTOM_DUTY"
          label="Custom Duty"
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'  } }}
           />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={optionalFields.CUSTOM_DUTY_CHQ_NO}
              onChange={handleOptionalDataChange}
          className="custom-textfield"
          name="CUSTOM_DUTY_CHQ_NO"
          label="Custom Duty Cheque No"
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
export default OceanImportRM;