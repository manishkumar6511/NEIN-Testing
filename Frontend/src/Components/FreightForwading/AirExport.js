import React,{useEffect, useState} from "react";
import { Card, CardContent, Typography } from '@mui/material';
import { FormControl, Grid } from '@mui/material';
import {TextField,InputAdornment } from '@mui/material';
import {Button } from '@mui/material';
import './../CSS/OperationStyles.css';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'
import DisplayModal from "../centralized_components/AutoFieldModal";
import axios from 'axios';
import {  useToast } from '../centralized_components/Toast';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TruckLoder from "../centralized_components/truckLoder"; 

function AirExport(){

let errors = {};

  const  [loading, setLoading] =  useState(false);
  const navigate = useNavigate();
// console.log("dataReceived",dataReceived.mawbNo);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const location = useLocation();
   const dataReceived = location.state;
   const { state } = location;
  
 // console.log("state",state); // Should output { type: 'Air Export' }
 
  const [mawbNo, setMawbNo] = useState('');
//   if(dataReceived){
// setMawbNo(dataReceived.mawbNo);
//   }

const Inco=[
  {label:'CIF',value:'CIF'},
  {label:'C&F',value:'C&F'},
  {label:'DDP',value:'DDP'},
  {label:'DDU',value:'DDU'},
  {label:'DAP',value:'DAP'},
  {label:'FOB/FCA',value:'FOB/FCA'},
  {label:'Ex-Works',value:'Ex-Works'},

]


const[docketPrefix,setDocketPrefix]=useState('');
const [userInput, setUserInput] = useState(''); // For the editable part

// Handle user input
const handleUserInputChange = (event) => {
  const value = event.target.value;
  const original=docketPrefix+value;
  setManualData(prevFields => ({
    ...prevFields,
    
    Orignal_Docket_No:original,
}));
  console.log("docket valaue",original);
  setUserInput(value);
};

  useEffect(() => {
  
    if (dataReceived) {
      setMawbNo(dataReceived.mawbNo);
      const newValue=dataReceived.mawbNo;
      console.log("new value in useeffetc",dataReceived);
      const year=dayjs().year();
      const docket=`NEIN/${dataReceived.branchCode}/${year}/`;
      console.log("docket format",docket);
      setDocketPrefix(docket);
     
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
  
  const[shippingBillDate,setShippingBillDate]=useState(null);
const[MAWBDate,setMAWBDate]=useState('');
const[HAWBDate,setHAWBDate]=useState('');
  const [MAWBoptions, setMAWBOptions] = useState([]); // State to hold the options for autocomplete
  const [MAWBinputValue, setMAWBInputValue] = useState('');
  const [HAWBoptions, setHAWBOptions] = useState([]); // State to hold the options for autocomplete
  
  const [selectedOption, setSelectedOption] = useState(null);
  const[HAWBData,setHAWBData]=useState('');
  const [selectedHawb, setSelectedHawb] = useState('');
  const[industryOptions,setIndustryOptions]=useState('');
  const[industryData,setIndustryData]=useState('');
  const[userData,setUserData]=useState('');
  const[selectedEmpid,setSelectedEmpId]=useState('');
  const [customClearanceDate, setCustomClearanceDate] = useState(null);
 

  const[initiatorDetails,setInitiatorDetails]=useState({
    Initiator_id:'',
    Initiator_Name:'',
    Register_Branch_Id:'',
    Register_Branch_Code:'',
    
  })
useEffect(()=>{
  let SessionDetails = {};
  const storedUser = localStorage.getItem('userDetails');
  if (storedUser) {
    const userDetails = JSON.parse(storedUser);
  
   if(userDetails&&dataReceived){
    setInitiatorDetails((prevState) => ({
      ...prevState,
      Initiator_id:userDetails.empid ,
      Initiator_Name:userDetails.empname,
      Register_Branch_Id:dataReceived.branchId,
      Register_Branch_Code:dataReceived.branchCode,

    }));
   }
    
  } else {
    console.log("No menu details found in localStorage.");
  }

},[])
 
const[autoFields,setAutoFields]=useState({
  MAWB_NO:'',
  MAWB_DATE:null,
  MAWB_NOOF_PKGS:'',
  MAWB_CHARGEABLE_WEIGHT_KG:'',
  MAWB_TOTAL_FREIGHT_AMOUNT:'',
  SHIPMENT_TYPE:'',
  HAWB_NO:'',
  HAWB_DATE:null,
  HAWB_TOTAL_AMOUNT:'',
  HAWB_GROSS_WEIGHT:'',
  HAWB_CHARGEABLE_WEIGHT_KG:'',
  HAWB_NOOF_PKGS:'',
  NEWINS_REFERENCE_NO:'',
  SHIPPER:'',
  CONSIGNEE:'',
  ORIGIN:'',
  DESTINATION:'',
  COUNTRY:'',
  COUNTRY_CODE:'',
  REGION_CODE:'',
  AIR_LINE_NAME:'',
  FLIGHT_NO:'',
  TARIFF_RATE:'',
  DDU_DDP:'',
  DESCRIPTION_OF_GOODS:'',
  FREIGHT_AMOUNT:'',
  DUE_CARRIER:'',
  NETDUE:'',
  Area:'',
})


  const [manualData,setManualData]=useState({
    MainProduct:'',
    industry:'',
    BUYING_RATE:'',
    SELL_RATE:'',
    MARGIN_KG:'',
    TOTAL_MARGIN:'',
    Orignal_Docket_No:'',
    SHIPPER_INVOICE_NO:'',
    SHIPPING_BILL_NO:'',
    SHIPPING_BILL_DATE:'',
    clearanceDoneBy:'',
    CUSTOMS_CLEARANCE_DATE:'',
    cha:'',
    SalesPic:'',
    salesPicBranch:'',
    OperationPic:'',
  });
  const[optionalFields,setOptionalFields]=useState({
    IATA_AGENT:'',
    SUB_AGENT:'',
    REMARKS:'',
   

  });



// if(shippingBillDate===null){

// console.log("shippppp",shippingBillDate);
// }else{
//   console.log("ship else");
// }

  useEffect(() => {
    console.log("coming UseEffect date");
    if (HAWBData.BL_CONSO_DATE) {
        // Update the date when HAWBData.MAWBDate is set
        setCustomClearanceDate(dayjs(HAWBData.BL_CONSO_DATE, 'DD-MM-YY'));
        setManualData(prevFields => ({
          ...prevFields,
          
          CUSTOMS_CLEARANCE_DATE:dayjs(HAWBData.BL_CONSO_DATE, 'DD-MM-YY').format('YYYY-MM-DD'),
    }));
        setMAWBDate(dayjs(HAWBData.BL_CONSO_DATE, 'DD-MM-YY'));

    }
    if(HAWBData.BL_CONSO_DATE && HAWBData.MASTER_HOUSE_BL){
      setHAWBDate(dayjs(HAWBData.BL_CONSO_DATE, 'DD-MM-YY'));
    }
}, [HAWBData.BL_CONSO_DATE]); // Effect runs when HAWBData.MAWBDate changes


  const handleManualDataChange = (e) => {
    const { name, value } = e.target;
    setManualData((prevData) => {
      const newData = { ...prevData, [name]: value };
      
      if (name === 'BUYING_RATE' || name === 'SELL_RATE') {
        const MARGIN_KG = (parseFloat(newData.SELL_RATE) - parseFloat(newData.BUYING_RATE)) || '';
        newData.MARGIN_KG = MARGIN_KG;
        if (HAWBData && HAWBData.TOTAL_CHARGEABLE_WGT) {
          newData.TOTAL_MARGIN = (MARGIN_KG * parseFloat(HAWBData.TOTAL_CHARGEABLE_WGT)).toFixed(2);
        }
       
      }
      if (name === 'FREIGHT_AMOUNT' || name === 'DUE_CARRIER') {
        const FREIGHT_AMOUNT = parseFloat(newData.FREIGHT_AMOUNT) || 0;
        const DUE_CARRIERAmount = parseFloat(newData.DUE_CARRIER) || 0;
        newData.NETDUE = (FREIGHT_AMOUNT + DUE_CARRIERAmount);
      }



      return newData;
    });
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
          console.log("suggestions",MAWBinputValue);
          const response = await axios.post(`${API_BASE_URL}/ff/ae_AllMaster`, {
            MAWB_NO: MAWBinputValue
          });
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
    console.log("coming handle Option change");
    console.log(newValue);
    setLoading(true);
    if (newValue) {
      try {
        const response = await axios.post(`${API_BASE_URL}/ff/ae_masterData`, {
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
        const hawbNumbers = details.map(item => item.MASTER_HOUSE_BL);
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
        const selectedHAWBDetails = selectedOptionDetails.find(item => item.MASTER_HOUSE_BL === newValue);
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
    const FREIGHT_AMOUNT = (hawbData&&hawbData.FREIGHT_PC_SIGN==='C')?parseFloat(hawbData&&hawbData.FREIGHT_CC).toFixed(2):parseFloat(hawbData&&hawbData.FREIGHT_PP).toFixed(2);
      const DUE_CARRIERAmount = parseFloat(hawbData.DUE_CARR) || 0;
      console.log("Freight Amount", parseInt(FREIGHT_AMOUNT));
      console.log("Due Amount",DUE_CARRIERAmount);
      console.log("net Due Amount",FREIGHT_AMOUNT+DUE_CARRIERAmount);
      const NETDUE = (parseInt(FREIGHT_AMOUNT) + parseInt(DUE_CARRIERAmount));

      const dueAgent = hawbData.DUE_AGENT || '';
const freightAmount = dueAgent ? parseFloat(dueAgent).toString() : '';
const duecarrier = hawbData.DUE_CARR || '';
const carrier = duecarrier ? parseFloat(duecarrier).toString() : '';
const freight = hawbData.FREIGHT_RATE || '';
const tariff = freight ? parseFloat(freight).toString() : '';

// const area=(hawbData.IATACODE)==="Tc1"
let area="";
if(hawbData.IATACODE==='TC1' ||hawbData.IATACODE==='TC-1'){
  area="1";
}else if(hawbData.IATACODE==='TC2'){
  area="2";
}else if(hawbData.IATACODE==='TC3'){
  area="3";
}else{
  area="JAPAN";
}

    setAutoFields({
      MAWB_NO: hawbData.MAWB_BL_NO || '',
      MAWB_DATE: hawbData.BL_CONSO_DATE ? dayjs(hawbData.BL_CONSO_DATE, 'DD-MM-YY').format('YYYY-MM-DD') : null,// Default to current date if not set
      MAWB_NOOF_PKGS: parseFloat(hawbData.TOTAL_NO_OF_PKGS).toFixed(2) || '',
      MAWB_CHARGEABLE_WEIGHT_KG: parseFloat(hawbData.TOTAL_CHARGEABLE_WGT).toFixed(2) || '',
      MAWB_TOTAL_FREIGHT_AMOUNT:(hawbData&&hawbData.FREIGHT_PC_SIGN==='C')?parseFloat(hawbData&&hawbData.CHARGE_TOTAL_CC).toFixed(2):parseFloat(hawbData&&hawbData.CHARGE_TOTAL_PP).toFixed(2),
      SHIPMENT_TYPE:(hawbData&&hawbData.FREIGHT_PC_SIGN==='P')?'PP':'CC' || '',
	    HAWB_NO: hawbData.MASTER_HOUSE_BL || '',
      HAWB_DATE:(hawbData.MASTER_HOUSE_BL && hawbData.BL_CONSO_DATE) ? dayjs(hawbData.BL_CONSO_DATE, 'DD-MM-YY').format('YYYY-MM-DD') : null,
      HAWB_TOTAL_AMOUNT:(hawbData.MASTER_HOUSE_BL)? parseFloat(hawbData.CHARGE_TOTAL_CC).toFixed(2) : '',
      HAWB_GROSS_WEIGHT: (hawbData.MASTER_HOUSE_BL)?parseFloat(hawbData.TOTAL_ACTUAL_WEIGHT).toFixed(2) : '',
      HAWB_CHARGEABLE_WEIGHT_KG: (hawbData.MASTER_HOUSE_BL)?parseFloat(hawbData.TOTAL_CHARGEABLE_WGT).toFixed(2) : '',
      HAWB_NOOF_PKGS:(hawbData.MASTER_HOUSE_BL)?parseFloat( hawbData.TOTAL_NO_OF_PKGS).toFixed(2) : '',
      NEWINS_REFERENCE_NO: hawbData.REF_NO_BR_DV_OR_REF_NO_SEQ || '',
      SHIPPER: hawbData.SHIPPER_NAME || '',
      CONSIGNEE: hawbData.CONSIGNEE_NAME || '',
      ORIGIN: hawbData.DEPARTURE_CITY || '',
      DESTINATION: hawbData.DESTINATION_CITY || '',
      COUNTRY: hawbData.CTCTNM || '',
      COUNTRY_CODE: hawbData.CTISO || '',
      REGION_CODE: hawbData.IATACODE || '',
      AIR_LINE_NAME: hawbData.FLIGHT_CARRIER_CODE || '',
      FLIGHT_NO: hawbData.FLIGHT_NO1 || '',
      TARIFF_RATE:hawbData.CURRENCY_OF_FREIGHT+'-'+tariff || '',
      DDU_DDP: ((hawbData&&hawbData.FREE_HOUSE_SIGN==='I')?'DDP':'')||((hawbData&&hawbData.FREE_HOUSE_SIGN==='E')?'DDU':''),
      DESCRIPTION_OF_GOODS: hawbData.DESCRITION_OF_GODD || '',
      FREIGHT_AMOUNT:(hawbData&&hawbData.FREIGHT_PC_SIGN==='C')?parseFloat(hawbData&&hawbData.FREIGHT_CC).toFixed(2):parseFloat(hawbData&&hawbData.FREIGHT_PP).toFixed(2),
      DUE_CARRIER:carrier || '',
      NETDUE:NETDUE||0,
      Area:area||'',
    });
  };



  



  const handleShippingDate=(newDate)=>{
    console.log("shipping bill",newDate.format('YYYY-MM-DD'));
    setShippingBillDate(newDate.format('YYYY-MM-DD'));
    setManualData(prevFields => ({
      ...prevFields,
      
      SHIPPING_BILL_DATE:newDate.format('YYYY-MM-DD'),
}));
  
  }

  const handleCustomDate=(newDate)=>{
    setCustomClearanceDate(newDate.format('YYYY-MM-DD'));
  
  }

  const [open, setOpen] = useState(false);

  
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
            setManualData({ ...manualData, industry: foundIndustry.industry_name,MainProduct:value});
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
       
        setManualData({ ...manualData, cha: selectedType.value,clearanceDoneBy:value });
        setOptionalFields({...optionalFields,IATA_AGENT:selectedType.value});
    }

  }
}


const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  const newErrors = { ...errors };
  for (const [fieldName, fieldValue] of Object.entries(manualData)) {
    if (typeof fieldValue === 'string') {
      if (fieldValue.trim() === '') {
        newErrors[fieldName] = true; // Mark field as having an error
      }
    } else if (fieldValue === null || fieldValue === undefined) {
      newErrors[fieldName] = true; // Mark field as having an error
    }
  }
  console.log("DDU_DDP value:", autoFields.DDU_DDP);
  console.log("autoFields object:", autoFields);
console.log("Keys in autoFields:", Object.keys(autoFields));
const DDU=autoFields.DDU_DDP;
  if (DDU.trim() === "") {
    console.log("empty Inco Terms");
   const fieldName="DDU_DDP";
   newErrors[fieldName] = true;
  }

  if (validationErrors.Orignal_Docket_No) {
    newErrors["Orignal_Docket_No"] = true; // Ensure that Docket No error persists
  }

  // If there are any errors, do not proceed with form submission
  if (Object.keys(newErrors).length > 0) {
    setValidationErrors(errors); // Set the validation errors state
    showToast("Please fill in all required fields", "error");
    return;
  }

  // If all fields are validated successfully
  setValidated(true);


  const TotaData = { ...autoFields, ...manualData, ...optionalFields, ...initiatorDetails, flag: 1 };
  console.log("Total Data", TotaData);

  // Check if TotaData contains meaningful data
  const isDataValid = Object.values(manualData).some(value => 
    value !== null && value !== '' && value !== undefined && 
    (typeof value !== 'object' || (Object.keys(value).length > 0))
  );
  console.log("Is Data Valid:", isDataValid);
  if (!isDataValid) {
    showToast("No data to submit", "warning");
   return;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/ff/ae_insert`, TotaData);
    showToast("Submitted Successfully", "success");
    setTimeout(() => {
      resetFields();
      navigate('/Operation/Pending', { state: { type: 'Air Export' } });
    }, 3000);
  } catch (error) {
    showToast("Error inserting data", "error");
  }
};

const resetFields = () => {
  setAutoFields({
    MAWB_NO: '',
    MAWB_DATE: null,
    MAWB_NOOF_PKGS: '',
    MAWB_CHARGEABLE_WEIGHT_KG: '',
    MAWB_TOTAL_FREIGHT_AMOUNT: '',
    SHIPMENT_TYPE: '',
    HAWB_NO: '',
    HAWB_DATE: null,
    HAWB_TOTAL_AMOUNT: '',
    HAWB_GROSS_WEIGHT: '',
    HAWB_CHARGEABLE_WEIGHT_KG: '',
    HAWB_NOOF_PKGS: '',
    NEWINS_REFERENCE_NO: '',
    SHIPPER: '',
    CONSIGNEE: '',
    ORIGIN: '',
    DESTINATION: '',
    COUNTRY: '',
    COUNTRY_CODE: '',
    REGION_CODE: '',
    AIR_LINE_NAME: '',
    FLIGHT_NO: '',
    TARIFF_RATE: '',
    DDU_DDP: '',
    DESCRIPTION_OF_GOODS: '',
    FREIGHT_AMOUNT: '',
    DUE_CARRIER: '',
    NETDUE: '',
  });

  setManualData({
    MainProduct: '',
    industry: '',
    BUYING_RATE: '',
    SELL_RATE: '',
    MARGIN_KG: '',
    TOTAL_MARGIN: '',
    
    SHIPPER_INVOICE_NO: '',
    SHIPPING_BILL_NO: '',
    SHIPPING_BILL_DATE: '',
    clearanceDoneBy: '',
    CUSTOMS_CLEARANCE_DATE: '',
    cha: '',
    SalesPic: '',
    salesPicBranch: '',
    OperationPic: '',
  });

  setOptionalFields({
    IATA_AGENT: '',
    SUB_AGENT: '',
    REMARKS: '',
  });
  setShippingBillDate(null);
  setCustomClearanceDate(null);
  setMawbNo('');
  setHAWBOptions([]);
  setValidationErrors({});
 
};

const handleIncoTerms=async(e)=>{
  const inco=e.target.value;
  setAutoFields(prevFields => ({
    ...prevFields,
    
    DDU_DDP:inco,
}));

}


const handleBlur = async () => {
  if (manualData.Orignal_Docket_No) {
    try {
      const response = await axios.post('http://localhost:5000/ff/ae_Docket', {
        Dokcet: manualData.Orignal_Docket_No,
      });
console.log("Blur",response.data);
      if (response.data.exists) {
        // errors['Orignal_Docket_No'] = true;
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          Orignal_Docket_No: 'Docket No already exists',
        }));
        showToast(`Docket Number Exists`,"error")
      } else {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          Orignal_Docket_No: '',
        }));
      }
    } catch (error) {
      console.error('Error checking Docket No:', error);
      // Optionally, handle the error and show a validation message
    }
  }
};


return(
    <div>

{(loading ? ( <TruckLoder/> ) :"")}
        <Card className="main-card" >
      
<p className='card-title'>Air Export Details. </p>

<CardContent>
  <Typography variant="h5" component="div">
    </Typography>
    <Grid container spacing={2}>
    <Grid item xs={6}>
        <FormControl fullWidth>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={MAWBoptions.map(option => option.MAWB_BL_NO)}
       onInputChange={(event, newInputValue) => {
        setMAWBInputValue(newInputValue); // Update input value
       
      }} 
      value={mawbNo || ''}
      onChange={handleOptionChange}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
            const currentValue = MAWBinputValue;
            handleOptionChange(event, currentValue); 
  
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
        autoComplete="off"
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
      value={(autoFields.MAWB_DATE)||''}
       className="disabled-textfield"
        name="MAWB_DATE"
        label="MAWB Date"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        InputProps={{
          readOnly: true,
        }}
        required
        />
     
      </Grid>
      <Grid item xs={2}>
       <TextField
      value={(autoFields.MAWB_NOOF_PKGS)||''}
       className="disabled-textfield"
        name="MAWB_NOOF_PKGS"
        label="MAWB No.Of Pkgs"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        InputProps={{
          readOnly: true,
        }}
        required
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
        value={(autoFields.MAWB_CHARGEABLE_WEIGHT_KG)||''}
         className="disabled-textfield"
          name="MAWB_CHARGEABLE_WEIGHT_KG"
          label="MAWB CW(KG)"
          size='small'
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
         InputProps={{
          readOnly: true,
        }}
          required
           />
          </Grid>
          <Grid item xs={2}>
      <TextField
      value={autoFields.MAWB_TOTAL_FREIGHT_AMOUNT||''}
     className="disabled-textfield"
       name="MAWB_TOTAL_FREIGHT_AMOUNT"
       label="MAWB Total Freight"
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
  <FormControl fullWidth>
  <TextField
   value={(autoFields.HAWB_NO)||''}
 className="disabled-textfield"
    name="HAWB_NO"
    label="HAWB No"
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
      value={(autoFields.HAWB_DATE)||''}
       className="disabled-textfield"
        name="HAWB_DATE"
        label="HAWB Date"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        InputProps={{
          readOnly: true,
        }}
        required
        />
      </Grid>
      <Grid item xs={2}>
       <TextField
        value={(autoFields.HAWB_NO)?autoFields.HAWB_TOTAL_AMOUNT:''}
       className="disabled-textfield"
        name="HAWB_TOTAL_AMOUNT"
        label="HAWB Total Amount"
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
          value={(autoFields.HAWB_NO)?autoFields.HAWB_GROSS_WEIGHT:''}
        className="disabled-textfield"
          name="HAWB_GROSS_WEIGHT"
          label="HAWB Gross Weight"
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
       value={(autoFields.HAWB_NO)?autoFields.HAWB_NOOF_PKGS:''}
      className="disabled-textfield"
       name="HAWB_NOOF_PKGS"
       label="HAWB No. Of Pkgs"
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
        value={(autoFields.HAWB_NO)?autoFields.HAWB_CHARGEABLE_WEIGHT_KG:''}
      className="disabled-textfield"
        name="HAWB_CHARGEABLE_WEIGHT_KG"
        label="HAWB CW(KG)"
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
    value={autoFields.NEWINS_REFERENCE_NO}
 className="disabled-textfield"
    name="NEWINS_REFERENCE_NO"
    label="NEWINS Reference No"
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
       value={autoFields.DESTINATION}
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
         value={(autoFields.AIR_LINE_NAME)||''}
        className="disabled-textfield"
        name="AIR_LINE_NAME"
        label="Airline Name"
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
      <TextField
       value={autoFields.TARIFF_RATE || ''}
      className="custom-textfield"
       name="TARIFF_RATE"
       label="Tariff Rate"
       required
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      InputProps={{
        readOnly: true,
      }}
       />
      </Grid>
      <Grid item xs={2}>
        {autoFields.DDU_DDP?(
      <TextField
      value={autoFields.DDU_DDP|| ''}
     className={HAWBData.FREE_HOUSE_SIGN===""?"custom-textfield":"disabled-textfield"}
       name="DDU_DDP"
       label="INCO Terms"
       required
       InputProps={{
        readOnly:(HAWBData.FREE_HOUSE_SIGN!==""),
      }}
      onChange={handleIncoTerms}
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      error={validationErrors.DDU_DDP && (autoFields.DDU_DDP === '')}
       />
      ): (
        <Autocomplete
          options={Inco}
          getOptionLabel={(option) => option.label} // Adjust based on your data structure
          renderInput={(params) => (
            <TextField
              {...params}
              label="INCO Terms"
              variant="outlined"
              size='small'
              InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              error={validationErrors.DDU_DDP}
            />
          )}
          onChange={(event, newValue) => {
            // Handle the change event here
            if (newValue) {
              // Set the selected value to autoFields.DDU_DDP
              setAutoFields((prevFields) => ({
                ...prevFields,
                DDU_DDP: newValue.value, // Adjust based on your data structure
              }));
            }
          }}
        />
      )}
     
        </Grid>
        <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
           value={(autoFields.FREIGHT_AMOUNT)||''}
          className="disabled-textfield"
          name="FREIGHT_AMOUNT"
          label="Freight Amount"
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
           value={(autoFields.DUE_CARRIER)||''}
          className="disabled-textfield"
          name="DUE_CARRIER"
          label="Due Carrier"
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
           value={(autoFields.NETDUE)||''}
          className="disabled-textfield"
          name="NETDUE"
          label="Net Due"
          required
          size='small'
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
         InputProps={{
          readOnly: true,
        }}
           />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
       <TextField
       value={autoFields.DESCRIPTION_OF_GOODS}
       onChange={(event) => setAutoFields({
        ...autoFields,
        DESCRIPTION_OF_GOODS: event.target.value,
      })}
      InputProps={{
        readOnly: true,
      }}
       className="custom-textfield"
        name="DESCRIPTION_OF_GOODS"
        label="Description Of Goods"
        required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        
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
  <p className='card-title'>Manual Fields. </p>

  </Grid>
  <Grid item xs={1}>
  {/* <IconButton onClick={handleOpen}>
      <InfoIcon style={{color:'#1A005D'}}/>
    </IconButton> */}
    <DisplayModal open={open} handleClose={handleClose} fields={fields} />
  </Grid>
</Grid>


<Divider className="divider"/>
<CardContent>
<Typography variant="h5" component="div">
   <Grid container spacing={2}>
   <Grid item xs={2}>
   <TextField
      value={manualData.Orignal_Docket_No}
      onChange={handleManualDataChange}
      onBlur={handleBlur}
      className="custom-textfield"
      name="Orignal_Docket_No"
      autoComplete="off"
      label="Docket No"
      required
      size="small"
    
      InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
      error={validationErrors.Orignal_Docket_No && (manualData.Orignal_Docket_No === ''||manualData.Orignal_Docket_No!=='')}
    />
          </Grid>
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
      value={manualData.industry}
     className="disabled-textfield-default" 
       name="industry"
       label="Industry"
       required
       InputProps={{
        readOnly: true,
      }}
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      error={validationErrors.industry && (manualData.industry === '')}
       />

{/* <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={industryType}
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
        disabled
        required
         className="disabled-textfield"
        />)}/>  */}
      </Grid>
      <Grid item xs={2}>
       <TextField
       value={manualData.BUYING_RATE}
       onChange={handleManualDataChange}
       onWheel={(e) => e.target.blur()} 
       className="custom-textfield"
        name="BUYING_RATE"
        autoComplete="off"
        label="Buying Rate"
        required
        type="number" 
      
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        error={validationErrors.BUYING_RATE && (manualData.BUYING_RATE==='')}
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
          value={manualData.SELL_RATE}
          onChange={handleManualDataChange}
          onWheel={(e) => e.target.blur()} 
         className="custom-textfield"
          name="SELL_RATE"
          autoComplete="off"
          label="Sell Rate"
          required
          type="number" 
          size='small'
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
         error={validationErrors.SELL_RATE &&(manualData.SELL_RATE==='')}
           />
          </Grid>
          <Grid item xs={2}>
      <TextField
       value={manualData.MARGIN_KG}
       onChange={handleManualDataChange}
      className="disabled-textfield-default"
       name="MARGIN_KG"
       autoComplete="off"
       label="MARGIN_KG / KG"
       required
       type="number" 
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      InputProps={{
        readOnly: true,
      }}
      error={validationErrors.MARGIN_KG && (manualData.MARGIN_KG === '')}
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
        value={manualData.TOTAL_MARGIN}
        onChange={handleManualDataChange}
        className="disabled-textfield-default"
        name="TOTAL_MARGIN"
        autoComplete="off"
        label="Total Margin"
        required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        InputProps={{
          readOnly: true,
        }}
        error={validationErrors.TOTAL_MARGIN && (manualData.TOTAL_MARGIN === '')}
        />
        </Grid>

        
        <Grid item xs={2}>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={userData&&userData.map(user => `${user.user_name} (${user.emp_id})`)} // Format options
        onChange={handleUserChange} // Handle selection change
       value={manualData.SalesPic}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Sales Pic"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        readOnly: true,
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        required
        error={validationErrors.SalesPic && (manualData.SalesPic === '')}
         className="custom-textfield"
        />)}/>
</Grid>
<Grid item xs={2}>
       <TextField
       value={manualData.salesPicBranch || ''}
        className="disabled-textfield-default"
        name="salesPicBranch"
        label="Sales Pic Branch"
        required
        InputProps={{
          readOnly: true,
        }}
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        error={validationErrors.salesPicBranch && (manualData.salesPicBranch === '')}
        />
        </Grid>


         {/* <TextField
         className="custom-textfield"
          name="salesPic"
          label="Sales Pic"
          required
          size='small'
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
           /> */}
          
          <Grid item xs={2}>
          <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={userData&&userData.map(user => `${user.user_name} (${user.emp_id})`)} // Format options
       value={manualData.OperationPic}
       onChange={handleOperationPic}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Operation Pic"
        InputProps={{
        ...params.InputProps,
        readOnly: true,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
        error={validationErrors.OperationPic && (manualData.OperationPic === '')}
       
        required
         className="custom-textfield"
        />)}/>
      </Grid>
     
        <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="SHIPPER_INVOICE_NO"
        value={manualData.SHIPPER_INVOICE_NO || ''}
        onChange={handleManualDataChange}
        label="Shipper Invoice No"
        required
        autoComplete="off"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        error={validationErrors.SHIPPER_INVOICE_NO && (manualData.SHIPPER_INVOICE_NO === '')}
        />
        </Grid>
        <Grid item xs={2}>
       <TextField
       className="custom-textfield"
        name="SHIPPING_BILL_NO"
        onChange={handleManualDataChange}
        value={manualData.SHIPPING_BILL_NO ||''}
        label="Shipping Bill No"
        required
        autoComplete="off"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        error={validationErrors.SHIPPING_BILL_NO && (manualData.SHIPPING_BILL_NO === '')}
        />
        </Grid>
        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <MobileDatePicker
          name="SHIPPING_BILL_DATE"
          value={shippingBillDate ? dayjs(shippingBillDate, 'YYYY-MM-DD') : null}
          onChange={handleShippingDate}
         
          
          className="custom-Datepicker"
          inputFormat="YYYY-MM-DD"
          label='Shipping Bill Date *'
          slotProps={{
            textField: {
              error: validationErrors.SHIPPING_BILL_DATE && !shippingBillDate, 
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
         className="custom-textfield"
         error={validationErrors.clearanceDoneBy && (manualData.clearanceDoneBy === '')}
        />)}/>
        </Grid>
        <Grid item xs={2}>
       <TextField
       value={manualData.cha || ''}
       className={manualData.clearanceDoneBy==='Nippon' ? 'disabled-textfield-default':'custom-textfield'  }
       onChange={handleManualDataChange}
        name="cha"
        label="CHA Name"
        required
        InputProps={{
          readOnly:(manualData.clearanceDoneBy==="Nippon"),
        }}
     autoComplete="off"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px',shrink:'true'} }}
        error={validationErrors.cha && (manualData.cha === '')}
        />
        </Grid>
        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      
          <MobileDatePicker
          name="CUSTOMS_CLEARANCE_DATE"
          value={customClearanceDate ? dayjs(customClearanceDate, 'YYYY-MM-DD') : null}
          onChange={handleCustomDate}
          
        
          inputFormat="YYYY-MM-DD"
          label='Custom Clearance Date *'
          slotProps={{
            textField: {
              error: validated && !customClearanceDate, 
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
          error={validationErrors.CUSTOMS_CLEARANCE_DATE && (customClearanceDate === null)}
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
     className={manualData.clearanceDoneBy==='Nippon' ? 'disabled-textfield-default':'custom-textfield'  }
  value={optionalFields.IATA_AGENT || ''}
  onChange={handleOptional}
    name="IATA_AGENT"
    label="IATA Agent"
    size='small'
    autoComplete="off"
    InputProps={{
      readOnly:(manualData.clearanceDoneBy==="Nippon"),
    }}
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
    
    />
</FormControl>
</Grid>
<Grid item xs={3}>
<FormControl fullWidth>
      <TextField
      className="custom-textfield"
       name="SUB_AGENT"
       onChange={handleOptional}
       value={optionalFields.SUB_AGENT}
       label="Sub Agent"
       size='small'
       autoComplete="off"
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
          autoComplete="off"
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
          InputProps={{
            readOnly:true
          }}
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
           />
           </FormControl>
          </Grid>
          </Grid>
          </Typography>
          </CardContent>
        
          </Card>

        
           
           
            
           
              <Button  variant="contained" className="AirButton" style={{marginRight:'10px'}} onClick={handleSubmit} >Submit</Button>
           
              <Button variant="contained" className="AirButton" onClick={resetFields} >Reset</Button>
           
          
   
   
    </div>
)

}
export default AirExport;