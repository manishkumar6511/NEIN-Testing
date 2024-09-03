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
import axios from 'axios';
import { ToastProvider, useToast } from '../centralized_components/Toast';
import { useLocation } from 'react-router-dom'; 

function AirExport(){

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const location = useLocation();
  const dataReceived = location.state;
  const [mawbNo, setMawbNo] = useState('');

  useEffect(() => {
  
    if (dataReceived) {
      setMawbNo(dataReceived.mawbNo);
    }else{
      setMawbNo('');
    }
  }, []); // Empty dependency array means this effect runs once on mount

  const [isOpen, setIsOpen] = useState(true);
  const { showToast } = useToast();
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };
  
  const[shippingBillDate,setShippingBillDate]=useState(null);
  const[validated,setValidated]=useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [MBLoptions, setMBLoptions] = useState([]); // State to hold the options for autocomplete
  const [MBLInputValue, setMBLInputValue] = useState('');
  const [HBLoptions, setHBLoptions] = useState([]); // State to hold the options for autocomplete
  const [HAWBinputValue, setHAWBInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const[HAWBData,setHAWBData]=useState('');
  const [selectedHBL, setselectedHBL] = useState('');
  const[industryOptions,setIndustryOptions]=useState('');
  const[industryData,setIndustryData]=useState('');
  const[userData,setUserData]=useState('');
  const[selectedEmpid,setSelectedEmpId]=useState('');
  const [ETAMaa, setETAMaa] = useState(null);
  const [ETABlr, setETABlr] = useState(null);
  const [clearedOn, setClearedOn] = useState(null);
  

  const[initiatorDetails,setInitiatorDetails]=useState({
    Initiator_id:'2849',
    Initiator_Name:'Gowthami B',
    Register_Branch_Id:'10',
    Register_Sub_branch:'10',
    
  })

  const[dates,setDates]=useState({
    ETA_MAA:'',
    ETA_BLR:'',
    ClearedOn:'',
  
  })

const[autoFields,setAutoFields]=useState({
  MBL_NO:'',
  MBL_DATE:null,
  HBL_NO:'',
  HBL_DATE:null,
  SHIPMENT_TYPE:'',
  IMPORTER:'',
  SHIPPER:'',
  MANIFEST:'',
  CURRENCY:'',
  PORT_OF_LOADING:'',
  PORT_OF_DISCHARE:'',
  PLACE_OF_DELIVERY:'',
  PORT_CODE:'',
  NO_OF_CONTAINERS:'',
  NOOF_PACKAGES:'',
  TEUS:'',
  ETD:null,
  REGION_CODE:'',
  REGION_NAME:'',
  COUNTRY_OF_LOADING:'',
  INCO_TERMS:'',
  CONTAINER_TYPE:'',
  CONTAINER_NO:'',
  VESSEL_NO:'',
})


  const [manualData,setManualData]=useState({
    MainProduct:'',
    Industry:'',
    FCL:'',
   
    LCL_CBM:'',
    COMMODITY:'',
    CURRENCY:'',
    ETA_BLR:'',
    ETA_MAA:'',
    BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD:'',
    SELLING_FREIGHT_RATE_USD:'',
    TOTAL_FREIGHT_IN_INR:'',
    MARGIN:'',
    AGENT:'',
    LINER_PAYMENT:'',
    FCL_DES:'',
    PROFIT_SHARE_USD:'',
    clearanceDoneBy:'',
    ClearedOn:'',
    // CHA_NAME:'',
    
  });
  const[optionalFields,setOptionalFields]=useState({
    CTN:'',
   
    REMARKS:'',
   

  });

  const FCL=[
    {value:'NA',label:'NA'},
    {value:'20 FF',label:'20 FF'},
    {value:'40 FF',label:'40 FF'},
  ]
  


  const handleManualDataChange = (e) => {
    const { name, value } = e.target;
    setManualData({ ...manualData, [name]: value });
  };

  const handleDateChange = (date, key) => {
    setDates((prevDates) => ({
      ...prevDates,
      [key]: date.format('YYYY-MM-DD'), // Ensure the date is formatted as 'DD/MM/YYYY'
    }));
   
      setManualData((prevFields)=>({
        ...prevFields,
        [key]: date.format('YYYY-MM-DD'),
          }))
        
      }


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
      if (MBLInputValue) {
        try {
          const response = await axios.post(`${API_BASE_URL}/ff/oi_AllMaster`, {
            MAWB_NO: MBLInputValue
          });
          console.log("response",response.data);
          setMBLoptions(response.data); // Set the fetched options
        
          if(response.data.length<=0){
            console.log("MAWB No already Exists");
          }
        } catch (error) {
          console.error('Error fetching MAWB suggestions:', error);
        }
      } else {
        setMBLoptions([]); // Clear options if input is empty
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300); // Debounce to limit API calls

    return () => clearTimeout(debounceFetch); // Cleanup the timeout on component unmount
  }, [MBLInputValue]);



  

  const handleOptionChange = async (event, newValue) => {
    console.log(newValue);
    if (newValue) {
      try {
        const response = await axios.post(`${API_BASE_URL}/ff/oi_masterData`, {
          MAWB_NO: newValue
        });
        console.log('Response data:', response.data);
        const details = response.data;
        console.log("1st response",details);
        if(details&&details[0].Initiator_Name){
          console.log("MAWB Details Already Entered By");
          showToast(`MAWB Details Already Entered By ${details[0].Initiator_Name}`,"error")
        }
        const hawbNumbers = details.map(item => item.HBL_No);
        console.log('HAWB details:', hawbNumbers);
        setHBLoptions(hawbNumbers);
        setSelectedOption(details);
        console.log(hawbNumbers.length);
        if (hawbNumbers.length === 0 || hawbNumbers.every(number => number === "")) {
          console.log("coming in if");
          setHAWBData(details[0]);
          updateAutoFields(details[0]);
          console.log("HAWB Dataaaa", details); // Log the updated data
        }
        if (hawbNumbers.length === 1 && hawbNumbers[0] !== "") {
          setselectedHBL(hawbNumbers[0]); // Set the selected HAWB
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
      setHBLoptions([]);
    }
  };


  const handleHawbChange = (event, newValue, optionDetails) => {
    setselectedHBL(newValue);
    const selectedOptionDetails = Array.isArray(optionDetails)?optionDetails : selectedOption;
    if (newValue) {
      if (selectedOptionDetails) {
        const selectedHBLDetails = selectedOptionDetails.find(item => item.HBL_No === newValue);
        if (selectedHBLDetails) {
          console.log('Selected HAWB Details:', selectedHBLDetails);
          setHAWBData(selectedHBLDetails);
          updateAutoFields(selectedHBLDetails);
        } else {
          console.error('Selected HAWB not found in selectedOption:', newValue);
        }
      } else {
        console.error('selectedOption is not defined');
      }
    }
  };


  const updateAutoFields = (hawbData) => {
    const a=hawbData.Freight_PC;

    let regionCode = "";
				if (hawbData.RegionCode==='0') {
					regionCode = "JAPAN";
				} else if (hawbData.RegionCode==='1') {
					regionCode = "TC1";
				} else if (hawbData.RegionCode==='2') {
					regionCode = "TC2";
				} else {
					regionCode = "TC3";
				}
    console.log("a value",a);
    const containerType=hawbData.ContainerType;
    const containerCount = containerType.split('/').length;
    setAutoFields({
      MBL_NO:hawbData.MBL_No || '',
      MBL_DATE:hawbData.ETD ? dayjs(hawbData.ETD, 'DD/MM/YYYY') : null,
      HBL_NO:hawbData.HBL_No || '',
      HBL_DATE:hawbData.ETD ? dayjs(hawbData.ETD, 'DD/MM/YYYY') : null,
    
      SHIPMENT_TYPE:(a==="P"?'PP':'CC') || '',
      IMPORTER:hawbData.Consignee || '',
      SHIPPER:hawbData.Shipper || '',
      MANIFEST:hawbData.Manifest || '',
      CURRENCY:'',
      PORT_OF_LOADING:hawbData.PortofLoading   || '',
      PORT_OF_DISCHARE:hawbData.PortofDischarge || '',
      PLACE_OF_DELIVERY:hawbData.PlaceofDelivery || '',
      PORT_CODE:hawbData.PortofLoading || '',
      NO_OF_CONTAINERS:containerCount || '',
      NOOF_PACKAGES:hawbData.NoofPackage || '',
      TEUS:hawbData.TEU || '',
      ETD:hawbData.ETD ? dayjs(hawbData.ETD, 'DD/MM/YYYY') : null,
      REGION_CODE:regionCode || '',
      REGION_NAME:hawbData.RegionName || '',
    
     INCO_TERMS:hawbData.Incoterms || '',
     ORIGIN:hawbData.PortofLoading   || '',
    CONTAINER_TYPE:hawbData.ContainerType   || '',
  CONTAINER_NO:hawbData.ContainerNo||'',
  GROSS_WEIGHT:hawbData.GrossWeight || '',
  VESSEL_NO:hawbData.Vessel || '',
COUNTRY_OF_LOADING:hawbData.CountryofLoadingPort || ''



    });
  };



  const handleInputChange = (e) => {
    setMBLInputValue(e.target.value); // Update the input value
  };



  const handleShippingDate=(newDate)=>{
    setShippingBillDate(newDate);
    setManualData(prevFields => ({
      ...prevFields,
      
      SHIPPING_BILL_DATE:newDate,
}));
  
  }

  const handleCustomDate=(newDate)=>{
   // setCustomClearanceDate(newDate.format('DD/MM/YYYY'));
  
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fields = [
    { label: 'MAWB', data: '1010101' },
    { label: 'MAWB Date', data: 'New York' },
    { label: 'MAWB No Of Pkgs', data: 'Los Angeles' },
    { label: 'MAWB CW', data: 'John Doe' },
    { label: 'MAWB Total Freight', data: 'John Doe' },
    { label: 'Shipment Type', data: 'John Doe' },
   
    // Add more fields as needed
  ];

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
const handleUserChange = (event, value) => {
  if (value) {
      // Extract empid from the selected value
      const selectedUser = userData.find(user => `${user.user_name} (${user.emp_id})` === value);
      if (selectedUser) {
          setSelectedEmpId(selectedUser.emp_id); // Set the empid
          setManualData({ ...manualData, salesPicBranch: selectedUser.branch_name,SalesPic:value });
      }
  } else {
      setSelectedEmpId(''); // Clear empid if nothing is selected
  }
}
const handleOperationPic = (event, value) => {
  setManualData({ ...manualData, OperationPic: value });
}
  

const handleClearanceChange=(event,value)=>{
  if(value){
    const selectedType = clearanceDoneBy.find(user => `${user.label}` === value);
    if (selectedType) {
       
        setManualData({ ...manualData,clearanceDoneBy:value });
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

   const TotaData={...autoFields,...manualData,...optionalFields,...initiatorDetails,flag:1,TypeOfEntery: "Manual"}
   console.log("Total Data",TotaData);
   try {
    const response = await axios.post(`${API_BASE_URL}/ff/oi_insert`, TotaData);
    showToast("Ocean Import Details Inserted Successfully", "success");
    setTimeout(() => {
      resetFields();
    }, 3000);
  } catch (error) {
    showToast("Error inserting data", "error");
  }

}

const resetFields = () => {
  setAutoFields({

    MBL_NO:'',
    MBL_DATE:null,
    HBL_NO:'',
    HBL_DATE:null,
    SHIPMENT_TYPE:'',
    IMPORTER:'',
    SHIPPER:'',
    MANIFEST:'',
    CURRENCY:'',
    PORT_OF_LOADING:'',
    PORT_OF_DISCHARE:'',
    PLACE_OF_DELIVERY:'',
    PORT_CODE:'',
    NO_OF_CONTAINERS:'',
    NOOF_PACKAGES:'',
    TEUS:'',
    ETD:null,
    REGION_CODE:'',
    REGION_NAME:'',
    COUNTRY_OF_LOADING:'',
    INCO_TERMS:'',
    CONTAINER_TYPE:'',
    CONTAINER_NO:'',
    VESSEL_NO:'',
  })
  setManualData({
    MainProduct:'',
    Industry:'',
    FCL:'',
   
    LCL_CBM:'',
    COMMODITY:'',
    CURRENCY:'',
    ETA_BLR:'',
    ETA_MAA:'',
    BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD:'',
    SELLING_FREIGHT_RATE_USD:'',
    TOTAL_FREIGHT_IN_INR:'',
    MARGIN:'',
    AGENT:'',
    LINER_PAYMENT:'',
    FCL_DES:'',
    PROFIT_SHARE_USD:'',
    clearanceDoneBy:'',
    ClearedOn:'',

  })

  setOptionalFields({
    CTN:'',
   
    REMARKS:'',

  })
  setDates({
    ETA_MAA:'',
    ETA_BLR:'',
    ClearedOn:'',
  })
  setHBLoptions([]);
  setMawbNo('');
  setValidationErrors({});

}


return(
    <div>
        <Card className="main-card" >

<p className='card-title'>Ocean Import Details. </p>

<CardContent>
  <Typography variant="h5" component="div">
    </Typography>
    <Grid container spacing={2}>
    <Grid item xs={6}>
        <FormControl fullWidth>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={MBLoptions.map(option => option.MBL_No)}
       onInputChange={(event, newInputValue) => {
        setMBLInputValue(newInputValue); // Update input value
       
      }} 
      value={mawbNo || ''}
      onChange={handleOptionChange}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
            // Get the current input value
            const currentValue = MBLInputValue;

            // Call the onChange function manually
            handleOptionChange(event, currentValue); // Call onChange with the current input value
            
            // Optional: You can also prevent the default behavior if needed
            // event.preventDefault();
        }
      }}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="MBL No"
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
        {HBLoptions.length > 0 && !HBLoptions.every(option => option === "") && (
        <Grid item xs={6}>
        <FormControl fullWidth>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
      options={HBLoptions}
      onChange={handleHawbChange}
    
      value={selectedHBL || null} 
       renderInput={(params) => (
       <TextField 
        {...params}
        label="HBL No"
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
  value={autoFields.MBL_NO||''}
  className="disabled-textfield"
     name="MBL_NO"
    label="MBL No"
    size='small'
    InputProps={{
      readOnly: true,
    }}
    required
    InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <MobileDatePicker
      name="MBL_DATE"
       value={autoFields.MBL_DATE}
      //onChange={handleCustomDate}
      InputProps={{
        readOnly: true,
      }}
    
      inputFormat="DD/MM/YYYY"
      label='MBL Date *' />
   
    </LocalizationProvider>
     
      </Grid>
     

        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
   value={(autoFields.HBL_NO)||''}
 className="disabled-textfield"
    name="HBL_NO"
    label="HBL No"
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
   InputProps={{
    readOnly: true,
  }}
    required
    />
</FormControl>
</Grid>
<Grid item xs={2}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <MobileDatePicker
      name="HBL_DATE"
      value={autoFields.HBL_DATE}
      onChange={handleCustomDate}
      InputProps={{
        readOnly: true,
      }}
    
      inputFormat="DD/MM/YYYY"
      label='HBL Date *' />
   
    </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
      <TextField
      value={autoFields.SHIPMENT_TYPE}
      className="disabled-textfield"
       name="SHIPMENT_TYPE"
       label="Shipment Type"
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
          value={autoFields.IMPORTER}
        className="disabled-textfield"
          name="IMPORTER"
          label="Importer"
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
        value={autoFields.MANIFEST}
      className="disabled-textfield"
        name="MANIFEST"
        label="Manifest"
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
      value={autoFields.INCO_TERMS}
      //onChange={handleManualDataChange}
      className="disabled-textfield"
       name="INCO_TERMS"
       label="INCO Terms" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       InputProps={{
        readOnly: true,
      }}
       />
       </Grid>
       <Grid item xs={2}>
        <TextField
      value={autoFields.CONTAINER_TYPE}
      //onChange={handleManualDataChange}
      className="disabled-textfield"
       name="CONTAINER_TYPE"
       label="Container Type" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       InputProps={{
        readOnly: true,
      }}
       />
      </Grid>
      <Grid item xs={2}>
        <TextField
      value={autoFields.CONTAINER_NO}
      //onChange={handleManualDataChange}
      className="custom-textfield"
       name="CONTAINER_NO"
       label="Container No" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       InputProps={{
        readOnly: true,
      }}
       />
      </Grid>

         <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
    value={autoFields.PORT_OF_LOADING}
 className="disabled-textfield"
    name="PORT_OF_LOADING"
    label="Port Of Loading"
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
        value={autoFields.PORT_OF_DISCHARE}
      className="disabled-textfield"
       name="PORT_OF_DISCHARE"
       label="Port Of Discharge"
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
         value={autoFields.PLACE_OF_DELIVERY}
       className="disabled-textfield"
        name="PLACE_OF_DELIVERY"
        label="Place Of Delivery"
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
          value={autoFields.PORT_CODE}
        className="disabled-textfield"
          name="PORT_CODE"
          label="Port Code"
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
       value={autoFields.NO_OF_CONTAINERS}
     className="disabled-textfield"
       name="NO_OF_CONTAINERS"
       label="No Of Containers"
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
       value={autoFields.NOOF_PACKAGES}
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
        value={(autoFields.TEUS)||''}
       className="disabled-textfield"
        name="TEUS"
        label="TEUS"
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
   value={(autoFields.GROSS_WEIGHT)||''}
  className="disabled-textfield"
    name="GROSS_WEIGHT"
    label="Gross Weight"
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
<LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <MobileDatePicker
      name="ETD"
      value={autoFields.ETD}
      onChange={handleCustomDate}
      InputProps={{
        readOnly: true,
      }}
    
      inputFormat="DD/MM/YYYY"
      label='ETD *' />
   
    </LocalizationProvider>

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
           value={(autoFields.REGION_NAME)||''}
          className="disabled-textfield"
          name="REGION_NAME"
          label="Region Name"
          InputProps={{
            readOnly: true,
          }}
          size='small'
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
         
           />
          </Grid>
          <Grid item xs={2}>
          <TextField
//date field

      value={(autoFields.COUNTRY_OF_LOADING)||''}
     className="disabled-textfield"
       name="COUNTRY_OF_LOADING"
       label="Country Of Loading"
       required
       InputProps={{
        readOnly: true,
      }}
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
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
        options={FCL}
        value={manualData.FCL}
        onChange={(event, value) => setManualData({ ...manualData, FCL: value.value })}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="FCL"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        required
         className="custom-textfield"
         error={validationErrors.FCL && (manualData.FCL === '')}
        />)}/> 
          </Grid>
      
      <Grid item xs={2}>
        <TextField
      value={manualData.LCL_CBM}
      onChange={handleManualDataChange}
      className="custom-textfield"
       name="LCL_CBM"
       label="LCL CBM" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.LCL_CBM && (manualData.LCL_CBM === '')}
       
       />
      </Grid>
      <Grid item xs={2}>
        <TextField
      value={manualData.COMMODITY}
      onChange={handleManualDataChange}
      className="custom-textfield"
       name="COMMODITY"
       label="Commodity" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.COMMODITY && (manualData.COMMODITY === '')}
       />
      </Grid>
      <Grid item xs={2}>
        <TextField
      value={manualData.CURRENCY}
      onChange={handleManualDataChange}
      className="custom-textfield"
       name="CURRENCY"
       label="Currency" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.CURRENCY && (manualData.CURRENCY === '')}
       />
      </Grid>
      <Grid item xs={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
       name="ETA_BLR"
       value={dates.ETA_BLR ? dayjs(dates.ETA_BLR, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'ETA_BLR')}
     
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='ETA BLR *' 
      slotProps={{
        textField: {
          error: validationErrors.ETA_BLR && !dates.ETA_BLR, 
        },
      }}
      
      />

    </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
       name="ETA_MAA"
       value={dates.ETA_MAA ? dayjs(dates.ETA_MAA, 'DD/MM/YYYY') : null}
       onChange={(date) => handleDateChange(date, 'ETA_MAA')}
     
      className="custom-Datepicker"
      inputFormat="DD/MM/YYYY"
      label='ETA MAA *'
      slotProps={{
        textField: {
          error: validationErrors.ETA_MAA && !dates.ETA_MAA, 
        },
      }}
      />

    </LocalizationProvider>
        </Grid>

        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  value={manualData.BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD}
   className="custom-textfield"
    name="BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD"
    label="Buying Rate Ocean Freight Local USD" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD && (manualData.BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  value={manualData.SELLING_FREIGHT_RATE_USD}
   className="custom-textfield"
    name="SELLING_FREIGHT_RATE_USD"
    label="Selling Freight Rate USD" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.SELLING_FREIGHT_RATE_USD && (manualData.SELLING_FREIGHT_RATE_USD === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  value={manualData.TOTAL_FREIGHT_IN_INR}
   className="custom-textfield"
    name="TOTAL_FREIGHT_IN_INR"
    label="Total Freight In INR" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.TOTAL_FREIGHT_IN_INR && (manualData.TOTAL_FREIGHT_IN_INR === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  value={manualData.MARGIN}
   className="custom-textfield"
    name="MARGIN"
    label="Margin" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.MARGIN && (manualData.MARGIN === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  value={manualData.AGENT}
   className="custom-textfield"
    name="AGENT"
    label="Agent" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.AGENT && (manualData.AGENT === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  value={manualData.LINER_PAYMENT}
   className="custom-textfield"
    name="LINER_PAYMENT"
    label="Liner Payment" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.LINER_PAYMENT && (manualData.LINER_PAYMENT === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  value={manualData.FCL_DES}
   className="custom-textfield"
    name="FCL_DES"
    label="FCL DES" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.FCL_DES && (manualData.FCL_DES === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  value={manualData.PROFIT_SHARE_USD}
   className="custom-textfield"
    name="PROFIT_SHARE_USD"
    label="Profit Share USD" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.PROFIT_SHARE_USD && (manualData.PROFIT_SHARE_USD === '')}
    />
</FormControl>
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <MobileDatePicker
      name="ClearedOn"
      value={dates.ClearedOn ? dayjs(dates.ClearedOn, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'ClearedOn')}
     
    
      inputFormat="DD/MM/YYYY"
      label='Cleared On *' 
      slotProps={{
        textField: {
          error: validationErrors.ClearedOn && !dates.ClearedOn, 
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
       <Grid item xs={3}>
  <FormControl fullWidth>
  <TextField
  className="custom-textfield"
  value={optionalFields.CTN}
  onChange={handleOptional}
    name="CTN"
    label="CTN"
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    
    />
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