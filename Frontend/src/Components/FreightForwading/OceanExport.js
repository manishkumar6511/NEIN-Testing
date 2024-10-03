import React,{useEffect, useState,useContext} from "react";
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
import {  useToast } from '../centralized_components/Toast';
import {  useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TruckLoder from "../centralized_components/truckLoder";

function OceanExport(){
  const  [loading, setLoading] =  useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const dataReceived = location.state;
  const [mawbNo, setMawbNo] = useState('');

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
  const [MBLoptions, setMBLoptions] = useState([]); // State to hold the options for autocomplete
  const [MBLInputValue, setMBLInputValue] = useState('');
  const [HBLoptions, setHBLoptions] = useState([]); // State to hold the options for autocomplete

  const [selectedOption, setSelectedOption] = useState(null);
  const[HAWBData,setHAWBData]=useState('');
  const [selectedHBL, setselectedHBL] = useState('');
  const[industryOptions,setIndustryOptions]=useState('');
  const[industryData,setIndustryData]=useState('');
  const[userData,setUserData]=useState('');
  const[selectedEmpid,setSelectedEmpId]=useState('');

 const[dates,setDates]=useState({
  CLEARED_ON:'',
  SHIPPING_BILL_DATE:'',
 })
  

  const[initiatorDetails,setInitiatorDetails]=useState({
    Initiator_id:'',
    Initiator_Name:'',
    Register_Branch_Id:'',
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
        Initiator_id:userDetails.empid ,
        Initiator_Name:userDetails.empname,
        Register_Branch_Id:userDetails.branchid,
        Register_Branch_Code:userDetails.branchCode,
  
      }));
     }
      
    } else {
      console.log("No menu details found in localStorage.");
    }
  
  },[])

const[autoFields,setAutoFields]=useState({
  MBL_NO:'',
  MBL_DATE:null,
  HBL_NO:'',
  HBL_DATE:null,
  SHIPMENT_TYPE:'',
  SHIPPER:'',
  CONSIGNEE:'',
  PORT_OF_LOADING:'',
  PORT_OF_DEPARTURE:'',
  PLACE_OF_DELIVERY:'',
  SHIPPING_COLOADER_NAME:'',
  VESSEL_VOYAGE:'',
  ETD_SOB_DATE:null,
  NO_OF_CONTAINER:'',
  VOLUME_CBM:'',
  CONTAINER_NO:'',
  ORIGIN:'',
  FCL:'',
  LCL_CBM:'',
  COMMODITY:'',
  NOOF_PACKAGES:'',
  TEUS:'',
  GROSS_WEIGHT:'',
  CURRENCY:'',
  FCL_TUES:'',
  SAILING_DATE:null,
  REGION_CODE:'',
  REGION_NAME:'',
  ETD:null,
  ETA:null,
  
})


  const [manualData,setManualData]=useState({
    MainProduct:'',
    Industry:'',
    SEAL_NO:'',
    BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD:'',
    SELLING_FREIGHT_RATE_USD:'',
    GST:'',
    TOTAL_FREIGHT_IN_INR:'',
    MARGIN:'',
    SHIPPING_BILL_NO:'',
    SHIPPING_BILL_DATE:'',
    SECTOR:'',
    CLEARED_ON:'',
   clearanceDoneBy:'',
    
  });
  const[optionalFields,setOptionalFields]=useState({
    EXPORTER_INV_NO:'',
    VSL_VOYAGE:'',
    CHA_NAME:'',
    CARGO_RECEIVED:'',
    CLOSED_OPEN:'',
    FC_BRO_OK:'',
    ETA_ICD_CFS:'',
    ETA_MOTHER_PORT:'',
    CTN:'',
    CSPIC_SALESPIC:'',
    REMARKS:'',
   

  });

 
  const informationStatus=[
    {value:'Closed',label:'Closed'},
    {value:'Open',label:'Open'},
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
          const response = await axios.post(`${API_BASE_URL}/ff/oe_AllMaster`, {
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
      setLoading(true);
      try {
        const response = await axios.post(`${API_BASE_URL}/ff/oe_masterData`, {
          MAWB_NO: newValue
        });
        console.log('Response data:', response.data);
        const details = response.data;
        setLoading(false);
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
    let lcl="";
    
    if(hawbData.SIservicetype==='FCL'){
      lcl='0';
    }else{
      lcl=hawbData.GrossVolume;
    

    }




    setAutoFields({
      MBL_NO:hawbData.MBL_No || '',
      MBL_DATE:hawbData.ETD ? dayjs(hawbData.ETD, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
      HBL_NO:hawbData.HBL_No || '',
      HBL_DATE:hawbData.ETD ? dayjs(hawbData.ETD, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
      SHIPMENT_TYPE:(a==="P"?'PP':'CC') || '',
      SHIPPER:hawbData.Shipper || '',
      CONSIGNEE:hawbData.Consignee || '',
      PORT_OF_LOADING:hawbData.PortofLoading || '',
      PORT_OF_DEPARTURE:hawbData.PortofDischarge || '',
      PLACE_OF_DELIVERY:hawbData.PlaceofDelivery || '',
      SHIPPING_COLOADER_NAME:hawbData.CarrierName || '',
      VESSEL_VOYAGE:hawbData.Voyage || '',
      ETD_SOB_DATE:hawbData.ETD ? dayjs(hawbData.ETD, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
      NO_OF_CONTAINER:hawbData.TEU || '',
      VOLUME_CBM:hawbData.GrossVolume || '',
      CONTAINER_NO:hawbData.ContainerNo || '',
      ORIGIN:hawbData.PlaceofReceiptName || '',
      FCL:(hawbData.SIservicetype==="FCL")?hawbData.CONTAINETSIZE: 'LCL',
      LCL_CBM:lcl || '',
      COMMODITY:hawbData.CommodityCode || '',
      NOOF_PACKAGES:hawbData.NoofPackage || '',
      TEUS:hawbData.TEU || '',
      GROSS_WEIGHT:hawbData.GrossWeight || '',
      CURRENCY:'INR',
      FCL_TUES:hawbData.TEU || '',
      SAILING_DATE:hawbData.ETD ? dayjs(hawbData.ETD, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
      REGION_CODE:regionCode || '',
      REGION_NAME:hawbData.RegionName || '',
      ETD:hawbData.ETD ? dayjs(hawbData.ETD, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
      ETA:hawbData.ETA ? dayjs(hawbData.ETA, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,


    });
  };



  





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

   const TotaData={...autoFields,...manualData,...optionalFields,...initiatorDetails,flag:1,TypeOfEntery: "Manual",Status:'1'}
   console.log("Total Data",TotaData);
   try {
    const response = await axios.post(`${API_BASE_URL}/ff/oe_insert`, TotaData);
    showToast("Submitted Successfully", "success");
    setTimeout(() => {
      resetFields();
      navigate('/Operation/Pending', { state: { type: 'Ocean Export' } });
    }, 5000);
  } catch (error) {
    showToast("Error inserting data", "error");
  }

}

const resetFields=()=>{

  setAutoFields({
    MBL_NO:'',
    MBL_DATE:null,
    HBL_NO:'',
    HBL_DATE:null,
    SHIPMENT_TYPE:'',
    SHIPPER:'',
    CONSIGNEE:'',
    PORT_OF_LOADING:'',
    PORT_OF_DEPARTURE:'',
    PLACE_OF_DELIVERY:'',
    SHIPPING_COLOADER_NAME:'',
    VESSEL_VOYAGE:'',
    ETD_SOB_DATE:null,
    NO_OF_CONTAINER:'',
    VOLUME_CBM:'',
    CONTAINER_NO:'',
    ORIGIN:'',
    FCL:'',
    LCL_CBM:'',
    COMMODITY:'',
    NOOF_PACKAGES:'',
    TEUS:'',
    GROSS_WEIGHT:'',
    CURRENCY:'',
    FCL_TUES:'',
    SAILING_DATE:null,
    REGION_CODE:'',
    REGION_NAME:'',
    ETD:null,
    ETA:null,

  })

  setManualData({
    MainProduct:'',
    Industry:'',
    SEAL_NO:'',
    BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD:'',
    SELLING_FREIGHT_RATE_USD:'',
    GST:'',
    TOTAL_FREIGHT_IN_INR:'',
    MARGIN:'',
    SHIPPING_BILL_NO:'',
    SHIPPING_BILL_DATE:'',
    SECTOR:'',
    CLEARED_ON:'',
   clearanceDoneBy:'',

  })

  setOptionalFields({
    EXPORTER_INV_NO:'',
    VSL_VOYAGE:'',
    CHA_NAME:'',
    CARGO_RECEIVED:'',
    CLOSED_OPEN:'',
    FC_BRO_OK:'',
    ETA_ICD_CFS:'',
    ETA_MOTHER_PORT:'',
    CTN:'',
    CSPIC_SALESPIC:'',
    REMARKS:'',

  })
  setMBLoptions([]);
 setDates({
  CLEARED_ON:'',
  SHIPPING_BILL_DATE:'',

 })
 setMawbNo('');
 setValidationErrors({});
 setHBLoptions([]);


}



return(
    <div>
      {(loading ? ( <TruckLoder/> ) :"")}
        <Card className="main-card" >

<p className='card-title'>Ocean Export Details. </p>

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
<TextField
  value={autoFields.MBL_DATE||''}
  className="disabled-textfield"
     name="MBL_DATE"
    label="MBL Date"
    size='small'
    InputProps={{
      readOnly: true,
    }}
    required
    InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    />

     
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
<TextField
  value={autoFields.HBL_DATE||''}
  className="disabled-textfield"
     name="HBL_DATE"
    label="HBL Date"
    size='small'
    InputProps={{
      readOnly: true,
    }}
    required
    InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    />

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
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      InputProps={{
        readOnly: true,
      }}
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
        value={autoFields.PORT_OF_LOADING}
      className="disabled-textfield"
        name="PORT_OF_LOADING"
        label="Port Of Loading"
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
      value={autoFields.PORT_OF_DEPARTURE}
      //onChange={handleManualDataChange}
      className="disabled-textfield"
       name="PORT_OF_DEPARTURE"
       label="Port Of Discharge" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       InputProps={{
        readOnly: true,
      }}
       />
       </Grid>
       <Grid item xs={2}>
        <TextField
      value={autoFields.PLACE_OF_DELIVERY}
      //onChange={handleManualDataChange}
      className="disabled-textfield"
       name="PLACE_OF_DELIVERY"
       label="Place Of Delivery" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       InputProps={{
        readOnly: true,
      }}
       />
      </Grid>
      <Grid item xs={2}>
        <TextField
      value={autoFields.SHIPPING_COLOADER_NAME}
      //onChange={handleManualDataChange}
      className="custom-textfield"
       name="CONTAINER_NO"
       label="Shipping / Coloader Name" required
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
    value={autoFields.VESSEL_VOYAGE}
 className="disabled-textfield"
    name="VESSEL_VOYAGE"
    label="Vessel Voyage"
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
  value={autoFields.ETD_SOB_DATE||''}
  className="disabled-textfield"
     name="ETD_SOB_DATE"
    label="ETD/SOB Date"
    size='small'
    InputProps={{
      readOnly: true,
    }}
    required
    InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    />

      </Grid>
      <Grid item xs={2}>
       <TextField
         value={autoFields.NO_OF_CONTAINER}
       className="disabled-textfield"
        name="NO_OF_CONTAINER"
        label="No Of Containers"
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
          value={autoFields.VOLUME_CBM}
        className="disabled-textfield"
          name="VOLUME_CBM"
          label="Volume(CBM)"
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
       value={autoFields.CONTAINER_NO}
     className="disabled-textfield"
       name="CONTAINER_NO"
       label="Container No"
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
       value={autoFields.ORIGIN}
     className="disabled-textfield"
       name="ORIGIN"
       label="Place Of Receipt/Origin"
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
        value={(autoFields.FCL)||''}
       className="disabled-textfield"
        name="FCL"
        label="FCL"
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
   value={(autoFields.LCL_CBM)||''}
  className="disabled-textfield"
    name="LCL_CBM"
    label="LCL CBM"
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
      value={(autoFields.COMMODITY)||''}
     className="disabled-textfield"
       name="COMMODITY"
       label="Commodity"
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
           value={(autoFields.NOOF_PACKAGES)||''}
          className="disabled-textfield"
          name="NOOF_PACKAGES"
          label="No Of Packages "
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
//date field

      value={(autoFields.TEUS)||''}
     className="disabled-textfield"
       name="TEUS"
       label="TEUS"
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
       value={autoFields.GROSS_WEIGHT}
      
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
          size='small'
          InputLabelProps={{ style: { fontSize: '14px'} }}
          InputProps={{
            readOnly: true,
          }}
          />
        
          </Grid> 
          <Grid item xs={2}>
         
         <TextField
         value={autoFields.FCL_TUES}
        
         className="disabled-textfield"
          name="FCL_TUES"
          label="FCL TEUS"
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
  value={autoFields.SAILING_DATE||''}
  className="disabled-textfield"
     name="SAILING_DATE"
    label="Sailing Date"
    size='small'
    InputProps={{
      readOnly: true,
    }}
    required
    InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    />


      </Grid>

      <Grid item xs={2}>
         
         <TextField
         value={autoFields.REGION_CODE}
        
         className="disabed-textfield"
          name="REGION_CODE"
          label="Region Code"
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
         value={autoFields.REGION_NAME}
        
         className="disabled-textfield"
          name="REGION_NAME"
          label="Region Name"
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
  value={autoFields.ETD || ''}
  className="disabled-textfield"
     name="ETD"
    label="ETD"
    size='small'
    InputProps={{
      readOnly: true,
    }}
    required
    InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    />


      </Grid>
      <Grid item xs={2}>
      <TextField
  value={autoFields.ETA||''}
  className="disabled-textfield"
     name="ETA"
    label="ETA"
    size='small'
    InputProps={{
      readOnly: true,
    }}
    required
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
       InputProps={{
        readOnly: true,
      }}
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      error={validationErrors.Industry && (manualData.Industry === '')}
       />
      </Grid>
    
      <Grid item xs={2}>
        <TextField
      value={manualData.SEAL_NO}
      onChange={handleManualDataChange}
      className="custom-textfield"
       name="SEAL_NO"
       label="Seal No" required
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.SEAL_NO && (manualData.SEAL_NO === '')}
       
       />
      </Grid>
      <Grid item xs={2}>
        <TextField
      value={manualData.BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD}
      onChange={handleManualDataChange}
      onWheel={(e) => e.target.blur()} 
      className="custom-textfield"
       name="BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD"
       label="Buying Rate Ocean Freigh Local USD" required
       size='small'
       type="number" 
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD && (manualData.BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD === '')}
       />
      </Grid>
      <Grid item xs={2}>
        <TextField
      value={manualData.SELLING_FREIGHT_RATE_USD}
      onChange={handleManualDataChange}
      onWheel={(e) => e.target.blur()} 
      className="custom-textfield"
       name="SELLING_FREIGHT_RATE_USD"
       label="Selling Freight Rate USD" required
       type="number" 
       size='small'
       InputLabelProps={{ style: { fontSize: '14px'  } }}
       error={validationErrors.SELLING_FREIGHT_RATE_USD && (manualData.SELLING_FREIGHT_RATE_USD === '')}
       
       />
      </Grid>
      
       

        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  value={manualData.GST}
   className="custom-textfield"
    name="GST"
    label="Shipping Line/Liner Debit Note GST" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.GST && (manualData.GST === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  onWheel={(e) => e.target.blur()} 
  value={manualData.TOTAL_FREIGHT_IN_INR}
   className="custom-textfield"
    name="TOTAL_FREIGHT_IN_INR"
    label="Total Freight in INR" required
    size='small'
    type="number" 
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.TOTAL_FREIGHT_IN_INR && (manualData.TOTAL_FREIGHT_IN_INR === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  onWheel={(e) => e.target.blur()} 
  value={manualData.MARGIN}
   className="custom-textfield"
    name="MARGIN"
    label="Margin" required
    type="number" 
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
  value={manualData.SHIPPING_BILL_NO}
   className="custom-textfield"
    name="SHIPPING_BILL_NO"
    label="Shipping Bill No" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.SHIPPING_BILL_NO && (manualData.SHIPPING_BILL_NO === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>

<LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <MobileDatePicker
      name="SHIPPING_BILL_DATE"
      value={dates.SHIPPING_BILL_DATE ? dayjs(dates.SHIPPING_BILL_DATE, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'SHIPPING_BILL_DATE')}
    
      inputFormat="DD/MM/YYYY"
      label='Shipping Bill Date *'
      slotProps={{
        textField: {
          error: validationErrors.SHIPPING_BILL_DATE && !dates.SHIPPING_BILL_DATE, 
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
  <FormControl fullWidth>
  <TextField
  onChange={handleManualDataChange}
  value={manualData.SECTOR}
   className="custom-textfield"
    name="SECTOR"
    label="Sector" required
    size='small'
    InputLabelProps={{ style: { fontSize: '14px'  } }}
    error={validationErrors.SECTOR && (manualData.SECTOR === '')}
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
      name="CLEARED_ON"
      value={dates.CLEARED_ON ? dayjs(dates.CLEARED_ON, 'DD/MM/YYYY') : null}
      onChange={(date) => handleDateChange(date, 'CLEARED_ON')}
      
      inputFormat="DD/MM/YYYY"
      label='Cleared On *' 
      slotProps={{
        textField: {
          error: validationErrors.CLEARED_ON && !dates.CLEARED_ON, 
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
       <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  className="custom-textfield"
  value={optionalFields.EXPORTER_INV_NO}
  onChange={handleOptional}
    name="EXPORTER_INV_NO"
    label="Exporter INV No"
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  className="custom-textfield"
  value={optionalFields.VSL_VOYAGE}
  onChange={handleOptional}
    name="VSL_VOYAGE"
    label="VSL Voyage"
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  className="custom-textfield"
  value={optionalFields.CHA_NAME}
  onChange={handleOptional}
    name="CHA_NAME"
    label="CHA Name"
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  className="custom-textfield"
  value={optionalFields.CARGO_RECEIVED}
  onChange={handleOptional}
    name="CARGO_RECEIVED"
    label="Cargo Received"
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={informationStatus}
        value={optionalFields.CLOSED_OPEN}
        onChange={(event, value) => setOptionalFields({ ...optionalFields, CLOSED_OPEN: value.value })}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Closed/Open"
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
  <FormControl fullWidth>
  <TextField
  className="custom-textfield"
  value={optionalFields.FC_BRO_OK}
  onChange={handleOptional}
    name="FC_BRO_OK"
    label="FC_BRO_OK"
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  className="custom-textfield"
  value={optionalFields.ETA_ICD_CFS}
  onChange={handleOptional}
    name="ETA_ICD_CFS"
    label="ETA_ICD_CFS "
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    
    />
</FormControl>
</Grid>
<Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
  className="custom-textfield"
  value={optionalFields.ETA_MOTHER_PORT}
  onChange={handleOptional}
    name="ETA_MOTHER_PORT"
    label="ETA MOTHER PORT"
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    
    />
</FormControl>
</Grid>






      <Grid item xs={2}>
      <FormControl fullWidth>
       <TextField
       className="custom-textfield"
        name="CTN"
        onChange={handleOptional}
        value={optionalFields.CTN}
        label="CTN"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        />
        </FormControl>
        </Grid>
        <Grid item xs={2}>
        <FormControl fullWidth>
         <TextField
         value={optionalFields.CSPIC_SALESPIC}
         className="custom-textfield"
          name="CSPIC_SALESPIC"
          label="CSPIC_SALESPIC"
          size='small'
        onChange={handleOptional}
          
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
           />
           </FormControl>
          </Grid>
          <Grid item xs={2}>
        <FormControl fullWidth>
         <TextField
         value={optionalFields.REMARKS}
         className="custom-textfield"
          name="REMARKS"
          label="Remarks"
          size='small'
          onChange={handleOptional}
          
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
export default OceanExport;