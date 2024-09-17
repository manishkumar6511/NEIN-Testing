import React,{useEffect, useState} from "react";
import { Card, CardContent, Typography } from '@mui/material';

import { FormControl, Grid } from '@mui/material';
import {TextField } from '@mui/material';
import {Button } from '@mui/material';
import './../CSS/OperationStyles.css';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';

import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'

import axios from 'axios';
import { useToast } from '../centralized_components/Toast';

import {  useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AirExport(){
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const location = useLocation();
  const dataReceived = location.state;
  const [mawbNo, setMawbNo] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
  
    if (dataReceived) {
      setMawbNo(dataReceived.mawbNo);
      const newValue=dataReceived.mawbNo;
      console.log("new value in useeffetc",newValue);
      handleOptionChange('',newValue);
    }else{
      setMawbNo('');
    }
  }, []); // Empty dependency array means this effect runs once on mount

  const [isOpen, setIsOpen] = useState(true);
  const { showToast } = useToast();
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };
  
 
  const[validated,setValidated]=useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [MAWBoptions, setMAWBOptions] = useState([]); // State to hold the options for autocomplete
  const [MAWBinputValue, setMAWBInputValue] = useState('');
  const [HAWBoptions, setHAWBOptions] = useState([]); // State to hold the options for autocomplete
 
  const [selectedOption, setSelectedOption] = useState(null);
  const[HAWBData,setHAWBData]=useState('');
  const [selectedHawb, setSelectedHawb] = useState('');
  const[industryOptions,setIndustryOptions]=useState('');
  const[industryData,setIndustryData]=useState('');
  const[userData,setUserData]=useState('');
  
  const [customClearanceDate, setCustomClearanceDate] = useState(null);
  const [CANDate, setCANDate] = useState(null);
  const [handOverDate, setHandOverDate] = useState(null);
  

  const[initiatorDetails,setInitiatorDetails]=useState({
    Initiator_id:'2849',
    Initiator_Name:'Gowthami B',
    Register_Branch_Id:'10',
    Register_Sub_branch:'10',
    
  })

const[autoFields,setAutoFields]=useState({
  MAWB_NO:'',
  MAWB_DATE:null,
  NOOF_PACKAGES:'',
  CHARGEABLE_WEIGHT:'',
  HAWB_NO:'',
  HAWB_DATE:null,
  GROSS_WEIGHT:'',
 
  SHIPPER:'',
  CONSIGNEE:'',
  ORIGIN:'',
  DEST_CITY:'',
  COUNTRY:'',
  COUNTRY_CODE:'',
  REGION_CODE:'',
  AIR_LINES:'',
  FLIGHT_NO:'',
  FLIGHT_DATE:null,
  CURRENCY:'',
  CITY_NAME:'',
})


  const [manualData,setManualData]=useState({
    MainProduct:'',
    Industry:'',
   
    SHIPMENT_TYPE:'',
    CAN_NO:'',
    CAN_DATE:'',
    CAN_AMOUNT:'',
    FC_BRO:'',
    FHD:'',
    DO_HANDED_OVER:'',
    DO_HANDOVER_DATE:'',
    
    clearanceDoneBy:'',
    // ClearedOn:'',
    CHA_NAME:'',
    
  });
  const[optionalFields,setOptionalFields]=useState({
    BRO_BANK_NAME:'',
    BREAK_BULK:'',
    REMARKS:'',
   

  });

  const shipmentType=[
    {value:'PP',label:'PP'},
    {value:'CC',label:'CC'},
  ]
  

  const FCBRO=[
    {value:'FC',label:'FC'},
    {value:'BRO',label:'BRO'},
  ]

  const FHD=[
    {value:'YES',label:'YES'},
    {value:'NO',label:'NO'},    
  ]


//   useEffect(() => {
//     console.log("coming UseEffect date");
//     if (HAWBData.BL_CONSO_DATE) {
//         // Update the date when HAWBData.MAWBDate is set
//         setCustomClearanceDate(dayjs(HAWBData.BL_CONSO_DATE, 'DD-MM-YY'));
//         setManualData(prevFields => ({
//           ...prevFields,
          
//           CUSTOMS_CLEARANCE_DATE:dayjs(HAWBData.BL_CONSO_DATE, 'DD-MM-YY'),
//     }));
//         setMAWBDate(dayjs(HAWBData.BL_CONSO_DATE, 'DD-MM-YY'));

//     }
//     if(HAWBData.BL_CONSO_DATE && HAWBData.MASTER_HOUSE_BL){
//       setHAWBDate(dayjs(HAWBData.BL_CONSO_DATE, 'DD-MM-YY'));
//     }
// }, [HAWBData.BL_CONSO_DATE]); // Effect runs when HAWBData.MAWBDate changes


  const handleManualDataChange = (e) => {
    const { name, value } = e.target;
    setManualData({ ...manualData, [name]: value });
  };

  const handleDateChange = (name, date) => {
    switch (name) {
      case 'CANDate':
        setCANDate(date);
        setManualData(prevFields => ({
          ...prevFields,
          
          CAN_DATE:date.format('YYYY-MM-DD'),
        }))
        break;
      case 'handOverDate':
        setHandOverDate(date);
        setManualData(prevFields => ({
          ...prevFields,
          
          DO_HANDOVER_DATE:date.format('YYYY-MM-DD'),
        }))
        break;
      case 'customClearanceDate':
        setCustomClearanceDate(date);
        break;
      default:
        break;
    }
  };


  const handleOptional=(e)=>{
    const { name, value } = e.target;
    setOptionalFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/ff/User`);
        const details=response.data;
        setUserData(details);
        // const userName = details.map(item => item.user_name);
        // setIndustryOptions(industry); // Set the fetched options
        // console.log("industry", response.data);
      } catch (error) {
        console.error('Error fetching user Details:', error);
      }
    };

  const debounceFetch = setTimeout(fetchUsers, 300);

  return () => clearTimeout(debounceFetch); // Cleanup the timeout

}, []); // Empty dependency array to run only once when the component mounts

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (MAWBinputValue) {
        try {
          const response = await axios.post(`${API_BASE_URL}/ff/ai_AllMaster`, {
            MAWB_NO: MAWBinputValue
          });
          console.log("response",response.data);
          setMAWBOptions(response.data); // Set the fetched options
        
          if(response.data.length<=0){
            console.log("MAWB No already Exists");
          }
        } catch (error) {
          console.error('Error fetching MAWB suggestions:', error);
        }
      } else {
        setMAWBOptions([]); // Clear options if input is empty
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300); // Debounce to limit API calls

    return () => clearTimeout(debounceFetch); // Cleanup the timeout on component unmount
  }, [MAWBinputValue]);



  

  const handleOptionChange = async (event, newValue) => {
    console.log(newValue);
    if (newValue) {
      try {
        const response = await axios.post(`${API_BASE_URL}/ff/ai_masterData`, {
          MAWB_NO: newValue
        });
        console.log('Response data:', response.data);
        const details = response.data;
        console.log("1st response",details);
        if(details&&details[0].Initiator_Name){
          console.log("MAWB Details Already Entered By");
          showToast(`MAWB Details Already Entered By ${details[0].Initiator_Name}`,"error")
        }
        const hawbNumbers = details.map(item => item.HAWB_NO);
        console.log('HAWB details:', hawbNumbers);
        setHAWBOptions(hawbNumbers);
        setSelectedOption(details);
        console.log(hawbNumbers.length);
        if (hawbNumbers.length === 0 || hawbNumbers.every(number => number === "")) {
          console.log("coming in if");
          setHAWBData(details[0]);
          updateAutoFields(details[0]);
          console.log("HAWB Dataaaa", details); // Log the updated data
        }
        if (hawbNumbers.length === 1 && hawbNumbers[0] !== "") {
          setSelectedHawb(hawbNumbers[0]); // Set the selected HAWB
          handleHawbChange(null, hawbNumbers[0], details); // Pass details directly
        }
      }
        catch (error) {
          if (axios.isAxiosError(error)) {
              // Handle Axios error specifically
              console.error('Error fetching MAWB details:', error.message);
              if (error.response) {
                  showToast(`Error: ${error.response.data}`, "error");
              } else {
                  // The request was made but no response was received
                  console.error('Error request:', error.request);
                  showToast('No response received from server', "error");
              }
          } else {
              // Handle non-Axios errors
              console.error('Unexpected error:', error);
              showToast('An unexpected error occurred', "error");
          }
        }
      
    }else{
      setHAWBOptions([]);
    }
  };


  const handleHawbChange = (event, newValue, optionDetails) => {
    setSelectedHawb(newValue);
    const selectedOptionDetails = Array.isArray(optionDetails)?optionDetails : selectedOption;
    if (newValue) {
      if (selectedOptionDetails) {
        const selectedHAWBDetails = selectedOptionDetails.find(item => item.HAWB_NO === newValue);
        if (selectedHAWBDetails) {
          console.log('Selected HAWB Details:', selectedHAWBDetails);
          setHAWBData(selectedHAWBDetails);
          updateAutoFields(selectedHAWBDetails);
        } else {
          console.error('Selected HAWB not found in selectedOption:', newValue);
        }
      } else {
        console.error('selectedOption is not defined');
      }
    }
  };


  const updateAutoFields = (hawbData) => {
    console.log("hawb date",hawbData);
    setAutoFields({
     
      MAWB_NO: hawbData.MAWB_NO || '',
      MAWB_DATE: hawbData.MAWB_DATE ? dayjs(hawbData.MAWB_DATE, 'DD-MM-YYYY').format('YYYY-MM-DD') : null,// Default to current date if not set
      NOOF_PACKAGES: hawbData.NO_PARCELS || '',
      CHARGEABLE_WEIGHT: hawbData.CHARGEABLE_WEIGHT || '',
      // MAWB_TOTAL_FREIGHT_AMOUNT:(hawbData&&hawbData.FREIGHT_PC_SIGN==='C')?(hawbData&&hawbData.CHARGE_TOTAL_CC):(hawbData&&hawbData.CHARGE_TOTAL_PP),
      // SHIPMENT_TYPE:(hawbData&&hawbData.FREIGHT_PC_SIGN==='P')?'PP':'CC' || '',
	    HAWB_NO: hawbData.HAWB_NO || '',
      HAWB_DATE:(hawbData.HAWB_DATE && hawbData.HAWB_DATE) ? dayjs(hawbData.HAWB_DATE, 'DD-MM-YYYY').format('YYYY-MM-DD') : null,
     // HAWB_TOTAL_AMOUNT:(hawbData.MASTER_HOUSE_BL)? hawbData.CHARGE_TOTAL_CC : '',
      GROSS_WEIGHT: (hawbData.GROSS_WEIGHT)?hawbData.GROSS_WEIGHT : '',
      
      CURRENCY: hawbData.ORIGINAL_CURRENCY || '',
      SHIPPER: hawbData.SHIPPER || '',
      CONSIGNEE: hawbData.CONSIGNEE || '',
      ORIGIN: hawbData.CTCTNM || '',
      DEST_CITY: hawbData.DESTINATION_AIRPROT_CODE || '',
      COUNTRY: hawbData.CTCTNM || '',
      COUNTRY_CODE: hawbData.CTISO || '',
      REGION_CODE: hawbData.IATACODE || '',
      AIR_LINES: hawbData.AIR_LINE_CODE || '',
      FLIGHT_NO: hawbData.FLIGHT_NO || '',
      FLIGHT_DATE:hawbData.FLIGHT_DATE ? dayjs(hawbData.FLIGHT_DATE, 'DD-MM-YY') : null,
      CITY_NAME:hawbData.DESTINATION_NAME || '',
     // DDU_DDP: ((hawbData&&hawbData.FREE_HOUSE_SIGN==='I')?'DDP':'Select')||((hawbData&&hawbData.FREE_HOUSE_SIGN==='E')?'DDU':'Select'),
      //DESCRIPTION_OF_GOODS: hawbData.DESCRIPTION_OF_GOODS || '',
    });
  };



 

  const handleCustomDate=(newDate)=>{
    setCustomClearanceDate(newDate.format('DD/MM/YYYY'));
  
  }



 

const clearanceDoneBy=[
  {label:'Nippon',value:'Nippon Express (India) Private Limited.'},
  {label:'Others',value:''}
]


  const handleIndustryChange = (event, value) => {
    if (value) {
      
      console.log("value",value);
        const foundIndustry = industryData.find(industry => industry.MainProduct === value);
        if (foundIndustry) {
           // setSelectedIndustryName(foundIndustry.industry_name);
            setManualData({ ...manualData, Industry: foundIndustry.industry_name,MainProduct:value});
        }
    }
};

  

const handleClearanceChange=(event,value)=>{
  if(value){
    const selectedType = clearanceDoneBy.find(user => `${user.label}` === value);
    if (selectedType) {
       
        setManualData({ ...manualData, CHA_NAME: selectedType.value,clearanceDoneBy:value });
    }

  }
}


const handleSubmit=async(e)=>{
  
  let errors = {};
  for (const [fieldName, fieldValue] of Object.entries(manualData)) {
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



   const TotaData={...autoFields,...manualData,...optionalFields,...initiatorDetails,flag:1,Status:"1",TypeOfEntery: "Manual"}
   console.log("Total Data",TotaData);
   try {
    const response = await axios.post(`${API_BASE_URL}/ff/ai_insert`, TotaData);
    showToast("Air Import Details Inserted Successfully", "success");
    setTimeout(() => {
      resetFields();
      navigate('/Operation/Pending', { state: { type: 'Air Import' } });
    }, 3000);
  } catch (error) {
    showToast("Error inserting data", "error");
  }




}

const resetFields = () => {
setAutoFields({
  MAWB_NO:'',
  MAWB_DATE:null,
  NOOF_PACKAGES:'',
  CHARGEABLE_WEIGHT:'',
  HAWB_NO:'',
  HAWB_DATE:null,
  GROSS_WEIGHT:'',
 
  SHIPPER:'',
  CONSIGNEE:'',
  ORIGIN:'',
  DEST_CITY:'',
  COUNTRY:'',
  COUNTRY_CODE:'',
  REGION_CODE:'',
  AIR_LINES:'',
  FLIGHT_NO:'',
  FLIGHT_DATE:null,
  CURRENCY:'',
  CITY_NAME:'',

})

setManualData({
  MainProduct:'',
  Industry:'',
  SHIPMENT_TYPE:'',
  CAN_NO:'',
  CAN_DATE:'',
  CAN_AMOUNT:'',
  FC_BRO:'',
  FHD:'',
  DO_HANDED_OVER:'',
  DO_HANDOVER_DATE:'',
  clearanceDoneBy:'',
  ClearedOn:'',
  CHA_NAME:'',

})
setOptionalFields({
  BRO_BANK_NAME:'',
  BREAK_BULK:'',
  REMARKS:'',

})
setCANDate(null);
setHandOverDate(null);
setHAWBOptions([]);
setMawbNo('');
setValidationErrors({});

}




return(
    <div>
        <Card className="main-card" >

<p className='card-title'>Air Import Details. </p>

<CardContent>
  <Typography variant="h5" component="div">
    </Typography>
    <Grid container spacing={2}>
    <Grid item xs={6}>
        <FormControl fullWidth>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={MAWBoptions.map(option => option.MAWB_NO)}
       onInputChange={(event, newInputValue) => {
        setMAWBInputValue(newInputValue); // Update input value
       
      }} 
      value={mawbNo || ''}
      onChange={handleOptionChange}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
            // Get the current input value
            const currentValue = MAWBinputValue;

            // Call the onChange function manually
            handleOptionChange(event, currentValue); // Call onChange with the current input value
            
            // Optional: You can also prevent the default behavior if needed
            // event.preventDefault();
        }
      }}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="MAWB No"
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
        {HAWBoptions.length > 0 && !HAWBoptions.every(option => option === "") && (
        <Grid item xs={6}>
        <FormControl fullWidth>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
      options={HAWBoptions}
      onChange={handleHawbChange}
    
      value={selectedHawb || null} 
       renderInput={(params) => (
       <TextField 
        {...params}
        label="HAWB No"
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
        )}
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
  value={autoFields.MAWB_NO||''}
  className="disabled-textfield"
     name="MAWB_NO"
    label="MAWB No"
    size='small'
   
    required
    InputProps={{
      readOnly: true,
    }}
    InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
<TextField
  value={autoFields.MAWB_DATE||''}
  className="disabled-textfield"
     name="MAWB_DATE"
    label="MAWB Date"
    size='small'
   
    required
    InputProps={{
      readOnly: true,
    }}
    InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    />


     
      </Grid>
     
        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
   value={(autoFields.HAWB_NO)||''}
 className="disabled-textfield"
    name="HAWB_NO"
    label="HAWB No"
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
   
    required
    InputProps={{
      readOnly: true,
    }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
<TextField
  value={autoFields.HAWB_DATE||''}
  className="disabled-textfield"
     name="HAWB_DATE"
    label="HAWB Date"
    size='small'
   
    required
    InputProps={{
      readOnly: true,
    }}
    InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    />
      </Grid>
      
        <Grid item xs={2}>
         <TextField
          value={(autoFields.HAWB_NO)?autoFields.NOOF_PACKAGES:''}
        className="disabled-textfield"
          name="NOOF_PACKAGES"
          label="No Of Packages"
          required
          size='small'
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
         InputProps={{
          readOnly: true,
        }}
           />
          </Grid>
          <Grid item xs={2}>
      <TextField
       value={(autoFields.HAWB_NO)?autoFields.CHARGEABLE_WEIGHT:''}
      className="disabled-textfield"
       name="CHARGEABLE_WEIGHT"
       label="Chargeable Weight"
       required
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      InputProps={{
        readOnly: true,
      }}
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
        value={(autoFields.HAWB_NO)?autoFields.GROSS_WEIGHT:''}
      className="disabled-textfield"
        name="GROSS_WEIGHT"
        label="Gross Weight"
        required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        InputProps={{
          readOnly: true,
        }}
        />
        </Grid>

        <Grid item xs={2}>
      <TextField
      value={autoFields.CURRENCY}
     className="disabled-textfield"
       name="CURRENCY"
       label="Currency"
       required
       InputProps={{
        readOnly: true,
      }}
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
       />
       </Grid>

       
<Grid item xs={2}>
      <TextField
        value={autoFields.SHIPPER}
      className="disabled-textfield"
       name="SHIPPER"
       label="Shipper"
       required
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      InputProps={{
        readOnly: true,
      }}
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
         value={autoFields.CONSIGNEE}
       className="disabled-textfield"
        name="CONSIGNEE"
        label="Consignee"
        required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        InputProps={{
          readOnly: true,
        }}
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
          value={autoFields.ORIGIN}
        className="disabled-textfield"
          name="ORIGIN"
          label="Origin"
          required
          size='small'
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
         InputProps={{
          readOnly: true,
        }}
           />
          </Grid>
          <Grid item xs={2}>
      <TextField
       value={autoFields.DEST_CITY}
     className="disabled-textfield"
       name="DESTINATION"
       label="Destination"
       required
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      InputProps={{
        readOnly: true,
      }}
       />
      </Grid>
      <Grid item xs={2}>
      <TextField
       value={autoFields.CITY_NAME}
     className="disabled-textfield"
       name="CITY_NAME"
       label="City Name"
       required
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      InputProps={{
        readOnly: true,
      }}
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
        value={(autoFields.COUNTRY)||''}
       className="disabled-textfield"
        name="COUNTRY"
        label="Country"
        required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        InputProps={{
          readOnly: true,
        }}
        />
        </Grid>

        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
   value={(autoFields.COUNTRY_CODE)||''}
  className="disabled-textfield"
    name="COUNTRY_CODE"
    label="Country Code"
    required
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
   InputProps={{
    readOnly: true,
  }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
<TextField
      value={(autoFields.REGION_CODE)||''}
     className="disabled-textfield"
       name="REGION_CODE"
       label="Region Code"
       required
       InputProps={{
        readOnly: true,
      }}
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
       />

      </Grid>
      <Grid item xs={2}>
       <TextField
         value={(autoFields.AIR_LINES)||''}
        className="disabled-textfield"
        name="AIR_LINES"
        label="Airline Code"
        required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        InputProps={{
          readOnly: true,
        }}
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
           value={(autoFields.FLIGHT_NO)||''}
          className="disabled-textfield"
          name="FLIGHT_NO"
          label="Flight No"
          required
          size='small'
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
         InputProps={{
          readOnly: true,
        }}
           />
          </Grid>
          <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <MobileDatePicker
      name="FLIGHT_DATE"
      value={autoFields.FLIGHT_DATE}
      onChange={handleCustomDate}
      InputProps={{
        readOnly: true,
      }}
    
      inputFormat="DD/MM/YYYY"
      label='Flight Date *' />
   
    </LocalizationProvider>
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
  <p className='card-title'>Manual Fields. </p>

  </Grid>
  {/* <Grid item xs={1}>
  <IconButton onClick={handleOpen}>
      <InfoIcon style={{color:'#1A005D'}}/>
    </IconButton>
    <DisplayModal open={open} handleClose={handleClose} fields={fields} />
  </Grid> */}
</Grid>


<Divider className="divider"/>
<CardContent>
<Typography variant="h5" component="div">
   <Grid container spacing={2}>
       <Grid item xs={2}>
  <FormControl fullWidth>
  <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={industryOptions}
        value={manualData.MainProduct}
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
         error={validationErrors.MainProduct && (manualData.MainProduct === '')}
        />)}/> 
  
</FormControl>
</Grid>
<Grid item xs={2}>
<TextField
      value={manualData.Industry}
     className="disabled-textfield"
       name="Industry"
       label="Industry"
       required
       disabled
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      error={validationErrors.Industry && (manualData.Industry === '')}
       />
      </Grid>
     
        <Grid item xs={2}>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={shipmentType}
        value={manualData.SHIPMENT_TYPE}
        onChange={(event, value) => setManualData({ ...manualData, SHIPMENT_TYPE: value.value })}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Shipment Type"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        required
         className="custom-textfield"
         error={validationErrors.SHIPMENT_TYPE && (manualData.SHIPMENT_TYPE === '')}
        />)}/> 
          </Grid>
          <Grid item xs={2}>
      <TextField
      value={manualData.CAN_NO}
      onChange={handleManualDataChange}
      className="custom-textfield"
       name="CAN_NO"
       label="CAN No" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.CAN_NO && (manualData.CAN_NO === '')}
       
       />
      </Grid>
      <Grid item xs={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
       name="CAN_DATE"
       value={CANDate ? dayjs(CANDate, 'YYYY-MM-DD') : null}
       onChange={(date) => handleDateChange('CANDate', date)}
     
      className="custom-Datepicker"
      inputFormat="YYYY-MM-DD"
      label='CAN Date *'
      slotProps={{
        textField: {
          error: validationErrors.CAN_DATE && !CANDate, 
        },
      }}
      />

    </LocalizationProvider>
        </Grid>

        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  value={manualData.CAN_AMOUNT}
   className="custom-textfield"
    name="CAN_AMOUNT"
    label="CAN Amount" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.CAN_AMOUNT && (manualData.CAN_AMOUNT === '')}
    />
</FormControl>
</Grid>
      <Grid item xs={2}>
      <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={FCBRO}
        value={manualData.FC_BRO}
        onChange={(event, value) => setManualData({ ...manualData, FC_BRO: value.value })}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="FC/BRO"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        required
         className="custom-textfield"
         error={validationErrors.FC_BRO && (manualData.FC_BRO === '')}
        />)}/> 
        </Grid>

        <Grid item xs={2}>
  <FormControl fullWidth>
  <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={FHD}
        value={manualData.FHD}
        onChange={(event, value) => setManualData({ ...manualData, FHD: value.value })}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="FHD"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        required
         className="custom-textfield"
         error={validationErrors.FHD && (manualData.FHD === '')}
        />)}/> 
</FormControl>
</Grid>
<Grid item xs={2}>
<Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={FHD}
        value={manualData.DO_HANDED_OVER}
        onChange={(event, value) => setManualData({ ...manualData, DO_HANDED_OVER: value.value })}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Do Hand Over"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        required
         className="custom-textfield"
         error={validationErrors.DO_HANDED_OVER && (manualData.DO_HANDED_OVER === '')}
        />)}/> 
      </Grid>
      <Grid item xs={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
      name="DO_HANDOVER_DATE"
      value={handOverDate ? dayjs(handOverDate, 'YYYY-MM-DD') : null}
      onChange={(date) => handleDateChange('handOverDate', date)}
      className="custom-Datepicker"
      inputFormat="YYYY-MM-DD"
      label='Do Hand Over Date *' 
      slotProps={{
        textField: {
          error: validationErrors.DO_HANDOVER_DATE && !handOverDate, 
        },
      }}
      />

    </LocalizationProvider>
        </Grid>
        
        <Grid item xs={2}>
      <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={clearanceDoneBy.map(user => `${user.label}`)} // Format options
        onChange={handleClearanceChange} // Handle selection change
      value={manualData.clearanceDoneBy}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Clearance Done By"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        required
         className="disabled-textfield"
         error={validationErrors.clearanceDoneBy && (manualData.clearanceDoneBy === '')}
        />)}/>
        </Grid>
        <Grid item xs={2}>
       <TextField
       value={manualData.CHA_NAME || ''}
       onChange={handleManualDataChange}
       className="custom-textfield"
        name="CHA_NAME"
        label="CHA Name"
        required
      disabled={!!manualData.CHA_NAME}
        size='small'
        InputLabelProps={{ style: { fontSize: '14px',shrink:'true'} }}
        error={validationErrors.CHA_NAME && (manualData.CHA_NAME === '')}
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
       <Grid item xs={3}>
  <FormControl fullWidth>
  <TextField
  className="custom-textfield"
  value={optionalFields.BRO_BANK_NAME}
  onChange={handleOptional}
    name="BRO_BANK_NAME"
    label="BRO Bank Name"
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    
    />
</FormControl>
</Grid>
<Grid item xs={3}>
<FormControl fullWidth>
<Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={FHD} // Format options
        onChange={(event, value) => setOptionalFields({ ...optionalFields, BREAK_BULK: value.value })}
      value={optionalFields.BREAK_BULK}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="BRO BULK"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        
         className="disabled-textfield"
        />)}/>
       </FormControl>
      </Grid>
      <Grid item xs={3}>
      <FormControl fullWidth>
       <TextField
       className="custom-textfield"
        name="REMARKS"
        onChange={handleOptional}
        value={optionalFields.REMARKS}
        label="Remarks"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        />
        </FormControl>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
         <TextField
         value={initiatorDetails.Initiator_Name}
         className="custom-textfield"
          name="initiator"
          label="Initiator"
          size='small'
          required
          disabled
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
           />
           </FormControl>
          </Grid>
          </Grid>
          </Typography>
          </CardContent>
        
          </Card>

        
           
           
            
           
              <Button  variant="contained" className="AirButton" style={{marginRight:'10px'}} onClick={handleSubmit} >Submit</Button>
           
              <Button variant="contained" className="AirButton" >Reset</Button>
           
          
   
   
    </div>
)

}
export default AirExport;