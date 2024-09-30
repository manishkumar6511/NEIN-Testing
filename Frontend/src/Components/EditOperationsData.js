import React,{useEffect, useState,useContext} from "react";
import { Card, CardContent, Typography } from '@mui/material';

import { FormControl, Grid } from '@mui/material';
import {TextField } from '@mui/material';
import {Button } from '@mui/material';
import './CSS/OperationStyles.css';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'

import axios from 'axios';
import { useToast } from './centralized_components/Toast';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import UserContext from "../Context/UserContext";
  

function EditOperations(){

  const { userDetails, login, logout } = useContext(UserContext);
 
    const [editMode, setEditMode] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [mawbNo, setMawbNo] = useState(null);
  const [fields, setFields] = useState([]);

  const[disable,setDisable]=useState(true);
  const[financeData,setFinanceData]=useState([]);
const[manualData,setManualData]=useState({});
const[optionalData,setoptionalData]=useState({});
const[validated,setValidated]=useState(false);
const [validationErrors, setValidationErrors] = useState({});
const[MAWBAPI,setMAWBAPI]=useState('');
const[HAWBAPI,setHAWBAPI]=useState('');


  const handleEditClick = async() => {
   if(disable){
    showToast('You Are Not Authorized  To Edit', "error");


   }else{
//updating the Data
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
  
  
    const TotaData = { ...manualData, ...optionalData,MAWB_NO:MAWBAPI,HAWB_NO:HAWBAPI};
    console.log("Total Data", TotaData);

    try {
      const response = await axios.post(`${API_BASE_URL}/ff/ae_UpdateDataFF`, TotaData);
      showToast("Updated Successfully", "success");
      setTimeout(() => {
        resetFields();
      }, 3000);
    } catch (error) {
      showToast("Error Updating data", "error");
    }
  


   }
  };
  const handleOperationData = (e) => {
    const { name, value } = e.target;
    const updatedFields = fields.map((field) => {
      if (field.name === name) {
        return { ...field, value: value }; // Update the specific field's value
      }
      return field; // Return unchanged fields
    });
    setFields(updatedFields); // Update the state with the modified array
  };
  const handleFinanceData = (e) => {
    setFields({ ...financeData, [e.target.name]: e.target.value });
  };

  const [isOpen, setIsOpen] = useState(true);
  const { showToast } = useToast();
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const[selectedOperation,setSelectedOperation]=useState('');
  const[selectedSearch,setSelectedSearch]=useState('');
  const[shippingBillDate,setShippingBillDate]=useState(null);

  const [MAWBoptions, setMAWBOptions] = useState([]); // State to hold the options for autocomplete
  const [MAWBinputValue, setMAWBInputValue] = useState('');
  const [HAWBoptions, setHAWBOptions] = useState([]); // State to hold the options for autocomplete
  const [HAWBinputValue, setHAWBInputValue] = useState('');
  const[MAWBHAWBoptions,setMAWBHAWBOptions]=useState([]);
 
  const[HAWBData,setHAWBData]=useState('');
  const [selectedHawb, setSelectedHawb] = useState('');
  const[industryOptions,setIndustryOptions]=useState('');
  const[industryData,setIndustryData]=useState('');
  const[userData,setUserData]=useState('');
 const[selectedInvoice,setSelectedInvoice]=useState('');
 const[InvoiceOptions,setInvoiceOptions]=useState([]);
  const [customClearanceDate, setCustomClearanceDate] = useState(null);
  const[selectedEmpid,setSelectedEmpId]=useState('');
 
  const namesToEdit = [
    'BUYING_RATE',
    'SELL_RATE',
    'MARGIN_KG',
    'TOTAL_MARGIN',
    'FREIGHT_AMOUNT',
    'DUE_CARRIER',
    'NETDUE',
    'SHIPPER_INVOICE_NO',
    'SHIPPING_BILL_NO',
  ];

  const clearanceDoneBy=[
    {label:'Nippon',value:'Nippon Express (India) Private Limited.'},
    {label:'Others',value:''}
  ]

  const handleOptional=(e)=>{
    const { name, value } = e.target;
    setoptionalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

const handleShippingDate=(newDate)=>{
  console.log("shipping bill",newDate.format('YYYY-MM-DD'));
  setShippingBillDate(newDate.format('YYYY-MM-DD'));
  setManualData(prevFields => ({
    ...prevFields,
    
    SHIPPING_BILL_DATE:newDate.format('YYYY-MM-DD'),
}));

}

let menu = {};
const storedUser = localStorage.getItem('userDetails');
if (storedUser) {
  const userDetails = JSON.parse(storedUser);
 const menus = userDetails.menus;
 if(menus){
   menu = typeof menus === 'string' ? JSON.parse(menus) : menus;
 }
  // console.log("Menu object:", menu); 
  // console.log("Type od Menu object:", typeof menu); 
} else {
  console.log("No menu details found in localStorage.");
}

useEffect(()=>{
console.log("menus for edit or not",menu['Other Modules-Authority To Edit']);
  if(menu&&menu['Other Modules-Authority To Edit']){
    setDisable(false);
  }else{
    setDisable(true);
    showToast(`Only HOD's having access to edit...`, "error");
  }
  
  },[])



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

const handleManualDataChange = (e) => {
  const { name, value } = e.target;
  setManualData((prevData) => {
    const newData = { ...prevData, [name]: value };
    
    if (name === 'BUYING_RATE' || name === 'SELL_RATE') {
      const MARGIN_KG = (parseFloat(newData.SELL_RATE) - parseFloat(newData.BUYING_RATE)) || '';
      newData.MARGIN_KG = MARGIN_KG;
      console.log("hawb",HAWBData[0].MAWB_CHARGEABLE_WEIGHT_KG);
      if (HAWBData && HAWBData[0].MAWB_CHARGEABLE_WEIGHT_KG) {
        newData.TOTAL_MARGIN = (MARGIN_KG * parseFloat(HAWBData[0].MAWB_CHARGEABLE_WEIGHT_KG)).toFixed(2);
      }
     
    }
    // if (name === 'FREIGHT_AMOUNT' || name === 'DUE_CARRIER') {
    //   const FREIGHT_AMOUNT = parseFloat(newData.FREIGHT_AMOUNT) || 0;
    //   const DUE_CARRIERAmount = parseFloat(newData.DUE_CARRIER) || 0;
    //   newData.NETDUE = (FREIGHT_AMOUNT + DUE_CARRIERAmount);
    // }

    return newData;
  });
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
        setoptionalData({...optionalData,IATA_AGENT:selectedType.value});
    }

  }
}



  const DynamicFields = {
    AirImport: [
      { label: 'MAWB No', name: 'MAWB_NO' },
      { label: 'MAWB Date', name: 'MAWB_DATE' },
      { label: 'Number of Packages', name: 'NOOF_PACKAGES' },
      { label: 'Chargeable Weight', name: 'CHARGEABLE_WEIGHT' },
      { label: 'HAWB No', name: 'HAWB_NO' },
      { label: 'HAWB Date', name: 'HAWB_DATE' },
      { label: 'Gross Weight', name: 'GROSS_WEIGHT' },
      { label: 'Shipper', name: 'SHIPPER' },
      { label: 'Consignee', name: 'CONSIGNEE' },
      { label: 'Origin', name: 'ORIGIN' },
      { label: 'Destination City', name: 'DEST_CITY' },
      { label: 'Country', name: 'COUNTRY' },
      { label: 'Country Code', name: 'COUNTRY_CODE' },
      { label: 'Region Code', name: 'REGION_CODE' },
      { label: 'Airlines', name: 'AIR_LINES' },
      { label: 'Flight No', name: 'FLIGHT_NO' },
      { label: 'Flight Date', name: 'FLIGHT_DATE' },
      { label: 'Currency', name: 'CURRENCY' },
      { label: 'City Name', name: 'CITY_NAME' },
     
    ],
    AirExport: [
      { label: 'MAWB No', name: 'MAWB_NO' },
      { label: 'MAWB Date', name: 'MAWB_DATE' },
      { label: 'MAWB Number of Packages', name: 'MAWB_NOOF_PKGS' },
      { label: 'MAWB Chargeable Weight (KG)', name: 'MAWB_CHARGEABLE_WEIGHT_KG' },
      { label: 'MAWB Total Freight Amount', name: 'MAWB_TOTAL_FREIGHT_AMOUNT' },
      { label: 'Shipment Type', name: 'SHIPMENT_TYPE' },
      { label: 'HAWB No', name: 'HAWB_NO' },
      { label: 'HAWB Date', name: 'HAWB_DATE' },
      { label: 'HAWB Total Amount', name: 'HAWB_TOTAL_AMOUNT' },
      { label: 'HAWB Gross Weight', name: 'HAWB_GROSS_WEIGHT' },
      { label: 'HAWB Chargeable Weight (KG)', name: 'HAWB_CHARGEABLE_WEIGHT_KG' },
      { label: 'HAWB Number of Packages', name: 'HAWB_NOOF_PKGS' },
      { label: 'NEWINS Reference No', name: 'NEWINS_REFERENCE_NO' },
      { label: 'Shipper', name: 'SHIPPER' },
      { label: 'Consignee', name: 'CONSIGNEE' },
      { label: 'Origin', name: 'ORIGIN' },
      { label: 'Destination', name: 'DESTINATION' },
      { label: 'Country', name: 'COUNTRY' },
      { label: 'Country Code', name: 'COUNTRY_CODE' },
      { label: 'Region Code', name: 'REGION_CODE' },
      { label: 'Airline Name', name: 'AIR_LINE_NAME' },
      { label: 'Flight No', name: 'FLIGHT_NO' },
      { label: 'Tariff Rate', name: 'TARIFF_RATE' },
      { label: 'INCO Terms', name: 'DDU_DDP' },
      { label: 'Description of Goods', name: 'DESCRIPTION_OF_GOODS' },
      {label:'Freight Amount',name:'FREIGHT_AMOUNT'},
      {label:'Due Carrier',name:'DUE_CARRIER'},
      {label:'Net Due',name:'NETDUE'},
    
    ],
    OceanImport: [
      { label: 'MBL No', name: 'MBL_NO' },
      { label: 'MBL Date', name: 'MBL_DATE' },
      { label: 'HBL No', name: 'HBL_NO' },
      { label: 'HBL Date', name: 'HBL_DATE' },
      { label: 'Shipment Type', name: 'SHIPMENT_TYPE' },
      { label: 'Importer', name: 'IMPORTER' },
      { label: 'Shipper', name: 'SHIPPER' },
      { label: 'Manifest', name: 'MANIFEST' },
      { label: 'Currency', name: 'CURRENCY' },
      { label: 'Port of Loading', name: 'PORT_OF_LOADING' },
      { label: 'Port of Discharge', name: 'PORT_OF_DISCHARE' },
      { label: 'Place of Delivery', name: 'PLACE_OF_DELIVERY' },
      { label: 'Port Code', name: 'PORT_CODE' },
      { label: 'Number of Containers', name: 'NO_OF_CONTAINERS' },
      { label: 'Number of Packages', name: 'NOOF_PACKAGES' },
      { label: 'TEUS', name: 'TEUS' },
      { label: 'ETD', name: 'ETD' },
      { label: 'Region Code', name: 'REGION_CODE' },
      { label: 'Region Name', name: 'REGION_NAME' },
      { label: 'Country of Loading', name: 'COUNTRY_OF_LOADING' },
      { label: 'INCO Terms', name: 'INCO_TERMS' },
      { label: 'Container Type', name: 'CONTAINER_TYPE' },
      { label: 'Container No', name: 'CONTAINER_NO' },
      { label: 'Vessel No', name: 'VESSEL_NO' },
    
    ],
    OceanExport: [
      { label: 'MBL No', name: 'MBL_NO' },
      { label: 'MBL Date', name: 'MBL_DATE' },
      { label: 'HBL No', name: 'HBL_NO' },
      { label: 'HBL Date', name: 'HBL_DATE' },
      { label: 'Shipment Type', name: 'SHIPMENT_TYPE' },
      { label: 'Shipper', name: 'SHIPPER' },
      { label: 'Consignee', name: 'CONSIGNEE' },
      { label: 'Port of Loading', name: 'PORT_OF_LOADING' },
      { label: 'Port of Departure', name: 'PORT_OF_DEPARTURE' },
      { label: 'Place of Delivery', name: 'PLACE_OF_DELIVERY' },
      { label: 'Shipping Coloader Name', name: 'SHIPPING_COLOADER_NAME' },
      { label: 'Vessel Voyage', name: 'VESSEL_VOYAGE' },
      { label: 'ETD SOB Date', name: 'ETD_SOB_DATE' },
      { label: 'No of Container', name: 'NO_OF_CONTAINER' },
      { label: 'Volume CBM', name: 'VOLUME_CBM' },
      { label: 'Container No', name: 'CONTAINER_NO' },
      { label: 'Origin', name: 'ORIGIN' },
      { label: 'FCL', name: 'FCL' },
      { label: 'LCL CBM', name: 'LCL_CBM' },
      { label: 'Commodity', name: 'COMMODITY' },
      { label: 'No of Packages', name: 'NOOF_PACKAGES' },
      { label: 'TEUS', name: 'TEUS' },
      { label: 'Gross Weight', name: 'GROSS_WEIGHT' },
      { label: 'Currency', name: 'CURRENCY' },
      { label: 'FCL TUES', name: 'FCL_TUES' },
      { label: 'Sailing Date', name: 'SAILING_DATE' },
      { label: 'Region Code', name: 'REGION_CODE' },
      { label: 'Region Name', name: 'REGION_NAME' },
      { label: 'ETD', name: 'ETD' },
      { label: 'ETA', name: 'ETA' },
    
    ]
  };



  const ManualFields = {
    AirImport: 
     
      { 
        MainProduct:'',
        Industry:'',
        CAN_NO:'',
        CAN_DATE:'',
        CAN_AMOUNT:'',
        FC_BRO:'',
        FHD:'',
        DO_HANDED_OVER:'',
        DO_HANDOVER_DATE:'',
        clearanceDoneBy:'',
        CHA_NAME:'',
        BRO_BANK_NAME:'',
        BREAK_BULK:'',
        REMARKS:'',
      },
     
  
    AirExport: 
      {
        MainProduct:'',
        Industry:'',
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
        IATA_AGENT:'',
        SUB_AGENT:'',
        REMARKS:'',

       },
    
    
    OceanImport: 
      
      {
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
      CTN:'',
      REMARKS:'',
      },
    
    OceanExport: 
    {
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
      }
    
  };


  const OptionalFields = {
    AirImport: 
     {
     BRO_BANK_NAME:'',
     BREAK_BULK:'',
     REMARKS:'',
     },
    
    AirExport:
    {
    IATA_AGENT:'',
    SUB_AGENT:'',
    REMARKS:'',
    Initiator_Name:'',
    },
    OceanImport: {
      
     
      CTN:'',
      REMARKS:'',
    },
    OceanExport: 
    {
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
    }
   
  };



  

const searchBy=[
  // {label:'Select',value:''},
  {label:'Invoice No',value:'Invoice'},
  {label:'HAWB No',value:'HAWB'},
  {label:'MAWB No',value:'MAWB'},
]

const operations=[
  {label:'Air Export',value:'AirExport'},
  {label:'Air Import',value:'AirImport'},
  {label:'Ocean Export',value:'OceanExport'},
  {label:'Ocean Import',value:'OceanImport'},
 
]


const handleOperations=async(event, newValue)=>{
  setSelectedOperation(newValue.value);
  const selected=newValue.value;
  setFields(DynamicFields[selected] || []);
  setManualData(ManualFields[selected] || {});
  setoptionalData(OptionalFields[selected] || {});
  setSelectedSearch('');
  
}

const handleSearch = (event, newValue) => {
  console.log("search value",newValue.value);
  if(newValue.value!=='MAWB'){
    setMAWBHAWBOptions([]);
  }
  setSelectedSearch(newValue.value);
  console.log("search value", newValue.value);
  setFields(DynamicFields[selectedOperation] || []);
setFinanceData([]);
  
};





  useEffect(() => {
    const fetchSuggestions = async () => {
      if(selectedSearch==='HAWB'){
      if (HAWBinputValue) {
        try {
          console.log("suggestions",HAWBinputValue);
          const response = await axios.post(`${API_BASE_URL}/finance/getHAWB_NO`, {
            HAWB_NO:HAWBinputValue
          });
          setHAWBOptions(response.data); // Set the fetched options
          console.log("MAWB Options",response.data);
          if(response.data.length<=0){
            console.log("MAWB No already Exists");
          }
        } catch (error) {
          console.error('Error fetching MAWB suggestions:', error);
        }
      } else {
        setHAWBOptions([]); // Clear options if input is empty
      }







    }else if(selectedSearch==="Invoice"){
      try {
      if(selectedInvoice){
        console.log("selectedInvoice",selectedInvoice);
        const response = await axios.post(`${API_BASE_URL}/finance/getInvoice`, {
          Invoice_No:selectedInvoice, 
          Division:"1"
        });
        setInvoiceOptions(response.data); // Set the fetched options
        console.log("Invoice Options",response.data);
        if(response.data.length<=0){
          console.log("MAWB No already Exists");
        }
      }
      } catch (error) {
        console.error('Error fetching MAWB suggestions:', error);
      }





    }else if(selectedSearch==='MAWB'){
      try {
        if(MAWBinputValue){
          console.log("selected MAWB",MAWBinputValue);
          const response = await axios.post(`${API_BASE_URL}/ff/ae_AllMasterFF`, {
            MAWB_NO:MAWBinputValue, 
          
          });
          setMAWBOptions(response.data); // Set the fetched options
          console.log("MAWB Options",response.data);
          if(response.data.length<=0){
            console.log("MAWB No already Exists");
          }
        }
        } catch (error) {
          console.error('Error fetching MAWB suggestions:', error);
        }
  

    }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300); // Debounce to limit API calls

    return () => clearTimeout(debounceFetch); // Cleanup the timeout on component unmount
  }, [HAWBinputValue,selectedInvoice,MAWBinputValue]);



  

  const handleOptionChange = async (event, newValue) => {
    console.log("option change",newValue);
    if (newValue) {
      try {
        let TotalResponse=null;
        let responseData = null;
       let finance=null;
        if(selectedSearch==="HAWB"){
          console.log("HAWB with");
        const  response = await axios.post(`${API_BASE_URL}/finance/getHAWB_NOData`, {
            HAWB_NO: newValue
          });
         
          TotalResponse=response.data;
          responseData = response.data[0];
          if (Array.isArray(TotalResponse)) {
            finance = TotalResponse.map(item => {
                // Ensure the item has an InvoiceNo before extracting fields
                setMAWBAPI(item.MAWB_NO);
                setHAWBAPI(item.HAWB_NO);
                console.log("mawb from response",item.MAWB_NO);
                    return {
                        InvoiceNo: item.InvoiceNo,
                        IssueDate: item.IssueDate,
                        Amount: item.Amount,
                        Revenue: item.Revenue,
                        Reimbursement: item.Reimbursement,
                        GST: item.GST,
                        Status: item.Status
                    };
                
                return null; // Or you could filter out items with no InvoiceNo
            }).filter(item => item !== null); // Filter out any null entries

          }
          console.log("finance Data",finance);
          console.log('Response data HAWB Data:', responseData);
         



        }else if(selectedSearch==="Invoice"){
          console.log("Invoice data");
         const response1 = await axios.post(`${API_BASE_URL}/finance/getHAWB_NODataFromInvoice`, {
            Invoice_No: newValue
          });
          TotalResponse=response1.data;
          responseData = response1.data[0];
          console.log('Response data Invoice Data:', response1.data);
          if(responseData&&responseData.InvoiceNo!==null){
            if (Array.isArray(TotalResponse)) {
                finance = TotalResponse.map(item => {
                    // Ensure the item has an InvoiceNo before extracting fields
                    setMAWBAPI(item.MAWB_NO);
                setHAWBAPI(item.HAWB_NO);
                        return {
                            InvoiceNo: item.InvoiceNo,
                            IssueDate: item.IssueDate,
                            Amount: item.Amount,
                            Revenue: item.Revenue,
                            Reimbursement: item.Reimbursement,
                            GST: item.GST,
                            Status: item.Status
                        };
                    
                    return null; // Or you could filter out items with no InvoiceNo
                }).filter(item => item !== null); // Filter out any null entries
            }
          }


        }else{
          console.log("MAWB data...........");
          const response2 = await axios.post(`${API_BASE_URL}/finance/getHAWB_NOData`, {
            HAWB_NO: newValue
          });
          console.log('Response data MAWB Data:', response2.data);
          TotalResponse=response2.data;
          // responseData = response2.data[0];
const len=response2.data;

const validHAWBData = response2.data.filter(item => item.HAWB_NO);
if(len.length<=1){
  console.log("length is greater than 1");
          responseData = response2.data[0];
}else if(validHAWBData.length > 0){
  setMAWBHAWBOptions(response2.data);
}
          
if("response data mawb",responseData.MAWB_NO);

          if(responseData&&responseData.InvoiceNo!==null){
            if (Array.isArray(TotalResponse)) {
              finance = TotalResponse.map(item => {
                  // Ensure the item has an InvoiceNo before extracting fields
                  setMAWBAPI(item.MAWB_NO);
                  setHAWBAPI(item.HAWB_NO);
                  console.log("mawb from response",item.MAWB_NO);
                      return {
                          InvoiceNo: item.InvoiceNo,
                          IssueDate: item.IssueDate,
                          Amount: item.Amount,
                          Revenue: item.Revenue,
                          Reimbursement: item.Reimbursement,
                          GST: item.GST,
                          Status: item.Status
                      };
                  
                  return null; // Or you could filter out items with no InvoiceNo
              }).filter(item => item !== null);
          }
        }else{
          setMAWBAPI(newValue);
         

        }

      }
      
        
        setHAWBData(TotalResponse);
        console.log("hawb data",TotalResponse);
        const updatedFields = fields.map(field => ({
          ...field,
          value: responseData&&responseData[field.name] || ''
          
        }));
        console.log("fields After",updatedFields);
        setFields(updatedFields);
        const updatedData = Object.keys(manualData).reduce((acc, key) => {
          // Check if the key exists in the API response data
          if (responseData&&responseData.hasOwnProperty(key)) {
            acc[key] = responseData[key]; // Update with API value
          } else {
            acc[key] = manualData[key]; // Keep the existing value (empty string in this case)
          }
          return acc;
        }, {});
        console.log("updated data for manual data",updatedData);
    
        setManualData(updatedData);
        const updatedOptionalData = Object.keys(optionalData).reduce((acc, key) => {
          // Check if the key exists in the API response data
          if (responseData&&responseData.hasOwnProperty(key)) {
            acc[key] = responseData[key]; // Update with API value
          } else {
            acc[key] = optionalData[key]; // Keep the existing value (empty string in this case)
          }
          return acc;
        }, {});
        console.log("optional fields data",updatedOptionalData);
        setoptionalData(updatedOptionalData);
        const isFinanceValid = (finance) => {
          // Check if there is at least one item with a non-null InvoiceNo
          return Array.isArray(finance) && finance.some(item => item.InvoiceNo !== null && item.InvoiceNo !== '');
        };
        
        // Conditionally set the finance data
        if (isFinanceValid(finance)) {
          setFinanceData(finance); // Update the state only if validation passes
        } else {
          console.log("Finance data not set due to missing or null InvoiceNo");
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
              //showToast('An unexpected error occurred', "error");
          }
        }
      
    }else{
      setHAWBOptions([]);
    }
  };


  const handleHAWBChange = async(event, newValue) => {
    setSelectedHawb(newValue);
    
    if (newValue) {
      if (MAWBHAWBoptions) {
        const selectedHAWBDetails = MAWBHAWBoptions.find(item => item.HAWB_NO === newValue);
        if (selectedHAWBDetails) {
          console.log('Selected HAWB Details:', selectedHAWBDetails);
          const updatedFields = fields.map(field => ({
            ...field,
            value: selectedHAWBDetails&&selectedHAWBDetails[field.name] || ''
            
          }));
console.log("options",MAWBHAWBoptions);
let mawb="";
          const APIData = MAWBHAWBoptions.map(item => {

            setMAWBAPI(item.MAWB_NO);
            mawb=item.MAWB_NO;
                
          })
          setHAWBAPI(newValue);
         
          setFields(updatedFields);
          setHAWBData(updatedFields);

          const updatedData = Object.keys(manualData).reduce((acc, key) => {
            // Check if the key exists in the API response data
            if (selectedHAWBDetails&&selectedHAWBDetails.hasOwnProperty(key)) {
              acc[key] = selectedHAWBDetails[key]; // Update with API value
            } else {
              acc[key] = manualData[key]; // Keep the existing value (empty string in this case)
            }
            return acc;
          }, {});
          console.log("updated data for manual data",updatedData);
      
          setManualData(updatedData);
          const updatedOptionalData = Object.keys(optionalData).reduce((acc, key) => {
            // Check if the key exists in the API response data
            if (selectedHAWBDetails&&selectedHAWBDetails.hasOwnProperty(key)) {
              acc[key] = selectedHAWBDetails[key]; // Update with API value
            } else {
              acc[key] = optionalData[key]; // Keep the existing value (empty string in this case)
            }
            return acc;
          }, {});
          console.log("optional fields data",updatedOptionalData);
          setoptionalData(updatedOptionalData);
         
//getting finance data
console.log("MWAB API in HAWB Change",mawb);
const  response = await axios.post(`${API_BASE_URL}/finance/getMAWB_NODataForFinance`, {
  MAWB_NO:mawb,
  HAWB_NO: newValue
});

const TotalResponse=response.data;
let finance=null;
if (Array.isArray(TotalResponse)) {
  finance = TotalResponse.map(item => {
      // Ensure the item has an InvoiceNo before extracting fields
      
          return {
              InvoiceNo: item.InvoiceNo,
              IssueDate: item.IssueDate,
              Amount: item.Amount,
              Revenue: item.Revenue,
              Reimbursement: item.Reimbursement,
              GST: item.GST,
              Status: item.Status
          };
      
      return null; // Or you could filter out items with no InvoiceNo
  }).filter(item => item !== null); // Filter out any null entries

}
setFinanceData(finance);
console.log("finance Data",finance);







         
        } else {
          console.error('Selected HAWB not found in selectedOption:', newValue);
        }
      } else {
        console.error('selectedOption is not defined');
      }
    }
  };



 
  

  const handleCustomDate=(newDate)=>{
    setCustomClearanceDate(newDate.format('DD/MM/YYYY'));
  
  }

  const resetFields = () => {
   setSelectedOperation('');
   setSelectedSearch('');
  }













return(
    <div>


      
        <Card className="main-card" >

<p className='card-title'>Freight Forwarding </p>

<CardContent>
  <Typography variant="h5" component="div">
    </Typography>
    <Grid container spacing={2}>
<Grid item xs={3}>
<Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
      options={operations}
      onChange={handleOperations}
    style={{padding:'0px'}}
      value={operations.label || ''} 
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Operation Type"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        className="custom-textfield"
        InputLabelProps={{ style: { fontSize: '14px'} }}
        required
         
        />)}/> 
      
</Grid>
<Grid item xs={3}>
<Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
      options={searchBy}
      onChange={handleSearch}
      style={{padding:'0px'}}
      value={searchBy.label  || ''} 
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Search By"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        className="custom-textfield"
        InputLabelProps={{ style: { fontSize: '14px'} }}
        required
         
        />)}/> 
      
</Grid>


{selectedSearch==='HAWB' && (
    <Grid item xs={3}>
        <FormControl fullWidth>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={HAWBoptions.map(option => option.HAWB_NO)}
       onInputChange={(event, newInputValue) => {
        setHAWBInputValue(newInputValue); // Update input value
       
      }} 
      style={{padding:'0px'}}
      value={mawbNo || ''}
      onChange={handleOptionChange}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
            // Get the current input value
            const currentValue = HAWBinputValue;

            // Call the onChange function manually
            handleOptionChange(event, currentValue); // Call onChange with the current input value
            
            // Optional: You can also prevent the default behavior if needed
            // event.preventDefault();
        }
      }}
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
        {selectedSearch==='Invoice' && (
        <Grid item xs={3}>
        <FormControl fullWidth>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
      options={InvoiceOptions.map(option => option.InvoiceNo)}
      onChange={handleOptionChange}
    
      onInputChange={(event, newInputValue) => {
        setSelectedInvoice(newInputValue); // Update input value
       
      }} 
      style={{padding:'0px'}}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Invoice No"
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

{selectedSearch==='MAWB' && (
        <Grid item xs={3}>
        <FormControl fullWidth>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
      options={MAWBoptions.map(option => option.MAWB_NO)}
      onChange={handleOptionChange}
    
      onInputChange={(event, newInputValue) => {
        setMAWBInputValue(newInputValue); // Update input value
       
      }} 
      style={{padding:'0px'}}
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
        )}

{MAWBHAWBoptions.length>0 && (
        <Grid item xs={3}>
        <FormControl fullWidth>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
      options={MAWBHAWBoptions.map(option => option.HAWB_NO)}
      onChange={handleHAWBChange}
    
     
      style={{padding:'0px'}}
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






 
    {selectedOperation &&(
    <Card className="finance-card">

  <p className='finance-card-name'>Auto Fields </p>
 


<Divider className="divider"/>

     
<CardContent>
<Typography variant="h5" component="div">
   <Grid container spacing={2} style={{marginTop:'8px'}}>
   {fields.map((field, index) => (
         
          
         <Grid item xs={2}>
         <FormControl fullWidth>
       <TextField
         key={index}
         label={field.label}
         name={field.name}
         value={field.value || ''}
         variant="outlined"
         disabled={!namesToEdit.includes(field.name) || !editMode[field.name]}
         size='small'
         style={{ marginBottom: '3px' }}
         onChange={ handleOperationData}
         className='custom-textfield'
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
        
       />
       </FormControl>
       </Grid>
      
      
     ))}
    </Grid>
    </Typography>
    </CardContent>
      
    </Card>
      
    )}

{selectedOperation && selectedOperation==='AirExport' &&(
<Card className="finance-card">
<Grid container spacing={2}>
  <Grid item xs={11}>
  <p className='finance-card-name'>Manual Fields. </p>

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
      //onBlur={handleBlur}
      className="custom-textfield"
      name="Orignal_Docket_No"
      autoComplete="off"
      label="Docket No"
      required
      size="small"
    
      InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
     // error={validationErrors.Orignal_Docket_No && (manualData.Orignal_Docket_No === ''||manualData.Orignal_Docket_No!=='')}
    />
          </Grid>
       <Grid item xs={2}>
  <FormControl fullWidth>
  <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={industryOptions}
        value={manualData.MainProduct}
       onChange={handleIndustryChange}
       disabled={disable}
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
        //  error={validationErrors.MainProduct && (manualData.MainProduct === '')}
        />)}/> 
  
</FormControl>
</Grid>
<Grid item xs={2}>
<TextField
      value={manualData.Industry}
     className="disabled-textfield-default" 
       name="industry"
       label="Industry"
       required
       disabled={disable}
       
       
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
     // //  error={validationErrors.industry && (manualData.industry === '')}
       />

      </Grid>
      <Grid item xs={2}>
       <TextField
       value={manualData.BUYING_RATE}
       onChange={handleManualDataChange}
       className="custom-textfield"
        name="BUYING_RATE"
        autoComplete="off"
        label="Buying Rate"
        required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled={disable}
       
       // //  error={validationErrors.BUYING_RATE && (manualData.BUYING_RATE==='')}
        />
        </Grid>
        <Grid item xs={2}>
         <TextField
          value={manualData.SELL_RATE}
          onChange={handleManualDataChange}
         className="custom-textfield"
          name="SELL_RATE"
          autoComplete="off"
          label="Sell Rate"
          required
          size='small'
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
         disabled={disable}
        
        // //  error={validationErrors.SELL_RATE &&(manualData.SELL_RATE==='')}
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
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      disabled={disable}
       
     // //  error={validationErrors.MARGIN_KG && (manualData.MARGIN_KG === '')}
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
        disabled={disable}
       
       // //  error={validationErrors.TOTAL_MARGIN && (manualData.TOTAL_MARGIN === '')}
        />
        </Grid>

        {/* <Grid item xs={2}>
  <FormControl fullWidth>
  <TextField
   value={manualData.FREIGHT_AMOUNT}
   onChange={handleManualDataChange}
  className="custom-textfield"
    name="FREIGHT_AMOUNT"
    autoComplete="off"
    label="Freight Amount"
    required
    size='small'
   InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
   disabled={disable}
   
  // //  error={validationErrors.FREIGHT_AMOUNT && (manualData.FREIGHT_AMOUNT === '')}
    />
</FormControl>
</Grid>
<Grid item xs={2}>
      <TextField
       value={manualData.DUE_CARRIER}
       onChange={handleManualDataChange}
      className="custom-textfield"
       name="DUE_CARRIER"
       label="Due_Carrier"
       autoComplete="off"
       required
       size='small'
      InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
      disabled={disable}
    
     // //  error={validationErrors.DUE_CARRIER && (manualData.DUE_CARRIER === '')}
       />
      </Grid>
      <Grid item xs={2}>
       <TextField
        value={manualData.NETDUE}
        onChange={handleManualDataChange}
       className="disabled-textfield-default"
        name="NETDUE"
        label="Net Due"
        autoComplete="off"
        required
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled={disable}
       
       // //  error={validationErrors.NETDUE && (manualData.NETDUE === '')}
        />
        </Grid> */}
        <Grid item xs={2}>
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
        options={userData&&userData.map(user => `${user.user_name} (${user.emp_id})`)} // Format options
        onChange={handleUserChange} // Handle selection change
       value={manualData.SalesPic}
       disabled={disable}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Sales Pic"
        InputProps={{
        ...params.InputProps,
        type: 'search',
       
        }}
       
       
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
        required
       // //  error={validationErrors.SalesPic && (manualData.SalesPic === '')}
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
        disabled={disable}
       
        size='small'
        InputLabelProps={{ style: { fontSize: '14px'} }}
       // //  error={validationErrors.salesPicBranch && (manualData.salesPicBranch === '')}
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
       disabled={disable}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Operation Pic"
        InputProps={{
        ...params.InputProps,
       
        type: 'search',
        }}
      
       
        InputLabelProps={{ style: { fontSize: '14px'} }}
       // //  error={validationErrors.OperationPic && (manualData.OperationPic === '')}
       
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
        disabled={disable}
       
       // //  error={validationErrors.SHIPPER_INVOICE_NO && (manualData.SHIPPER_INVOICE_NO === '')}
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
        disabled={disable}
       
       // //  error={validationErrors.SHIPPING_BILL_NO && (manualData.SHIPPING_BILL_NO === '')}
        />
        </Grid>
        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <MobileDatePicker
          name="SHIPPING_BILL_DATE"
          value={manualData.SHIPPING_BILL_DATE ? dayjs(manualData.SHIPPING_BILL_DATE, 'YYYY-MM-DD') : null}
          onChange={handleShippingDate}
         
          disabled={disable}
       
          className="custom-Datepicker"
          inputFormat="YYYY-MM-DD"
          label='Shipping Bill Date *'
          slotProps={{
            textField: {
              sx: {
                '& .MuiInputBase-input': {
                  padding: '8.5px',
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
      disabled={disable}
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
        // //  error={validationErrors.clearanceDoneBy && (manualData.clearanceDoneBy === '')}
        />)}/>
        </Grid>
        <Grid item xs={2}>
       <TextField
       value={manualData.cha || ''}
       className={manualData.cha==='' ? 'custom-textfield' : 'disabled-textfield-default'}
      
        name="cha"
        label="CHA Name"
        required
        InputProps={{
          readOnly: !!manualData.cha,
        }}
     autoComplete="off"
        size='small'
        InputLabelProps={{ style: { fontSize: '14px',shrink:'true'} }}
       // //  error={validationErrors.cha && (manualData.cha === '')}
        />
        </Grid>
        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      
          <MobileDatePicker
          name="CUSTOMS_CLEARANCE_DATE"
          value={manualData.CUSTOMS_CLEARANCE_DATE ? dayjs(manualData.CUSTOMS_CLEARANCE_DATE, 'YYYY-MM-DD') : null}
          onChange={handleCustomDate}
          
          disabled={disable}
         
          
          inputFormat="YYYY-MM-DD"
          label='Custom Clearance Date *'
          slotProps={{
            textField: {
              sx: {
                '& .MuiInputBase-input': {
                  padding: '8.5px',
                },
              },
            },
          }}
         // //  error={validationErrors.CUSTOMS_CLEARANCE_DATE && (customClearanceDate === null)}
          />
       
        </LocalizationProvider>
        </Grid>
        </Grid>
        </Typography>
        </CardContent>
       
        </Card>

)}
      {/* Optional Fields */}
      {selectedOperation && selectedOperation==='AirExport' &&(

<Card className="finance-card">
<p className='finance-card-name'>Optional Fields. </p>
<Divider className="divider"/>
<CardContent>
<Typography variant="h5" component="div">
   <Grid container spacing={2}>
       <Grid item xs={3}>
  <FormControl fullWidth>
  <TextField
     className={optionalData.IATA_AGENT==='' ? 'custom-textfield' : 'disabled-textfield-default'}
  value={optionalData.IATA_AGENT}
  style={{fontSize:'smaller'}}
  onChange={handleOptional}
    name="IATA_AGENT"
    label="IATA Agent"
    size='small'
    autoComplete="off"
    InputProps={{
      readOnly: !!optionalData.IATA_AGENT,
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
       value={optionalData.SUB_AGENT}
       label="Sub Agent"
       size='small'
       autoComplete="off"
       disabled={disable}
       
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
        value={optionalData.REMARKS}
        label="Remarks"
        size='small'
          autoComplete="off"
        InputLabelProps={{ style: { fontSize: '14px'} }}
        disabled={disable}
       
        />
        </FormControl>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
         <TextField
         value={optionalData.Initiator_Name}
         className="custom-textfield"
          name="initiator"
          label="Initiator"
          size='small'
        
          required
          disabled={disable}
         
         InputLabelProps={{ style: { fontSize: '14px' ,shrink:'true' } }}
           />
           </FormControl>
          </Grid>
          </Grid>
          </Typography>
          </CardContent>
        
          </Card>

        )} 

{selectedOperation&& financeData!==null &&(
<Card className="card-remaining">
<p className='finance-card-remaining'>Finance Data </p>
<Divider className="divider"/>
<CardContent>
<Typography variant="h5" component="div">
{(Array.isArray(financeData))&&financeData.map((data, index) => {
     

        return (
          <Grid container spacing={2} key={index} style={{marginTop:'0px'}}>
            <Grid item xs={1.9}>
              <TextField
                value={data.InvoiceNo ||0}
                className="custom-textfield"
                name="InvoiceNo"
                label="Invoice Number"
                onChange={handleFinanceData}
                disabled={!editMode}
                size="small"
                InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              />
            </Grid>
            <Grid item xs={1.9}>
             <TextField
                value={data.IssueDate || 0}
                className="custom-textfield"
                name="IssueDate"
                label="Invoice Date"
                
                disabled={!editMode}
                size="small"
                InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              />
            </Grid>
            <Grid item xs={1.9}>
              <TextField
                value={data.Amount || 0}
                className="custom-textfield"
                name="Amount"
                label="Invoice Total"
               
                disabled={!editMode}
                size="small"
                InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              />
            </Grid>
            <Grid item xs={1.9}>
              <TextField
                value={data.Revenue || 0}
                className="custom-textfield"
                name="Revenue"
                label="Revenue"
              
                disabled={!editMode}
                size="small"
                InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              />
            </Grid>
            <Grid item xs={1.9}>
              <TextField
                value={data.Reimbursement || 0}
                className="custom-textfield"
                name="Reimbursement"
                label="Reimbursement"
               
                disabled={!editMode}
                size="small"
                InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              />
            </Grid>
            <Grid item xs={1.9}>
              <TextField
                value={data.GST || 0}
                className="custom-textfield"
                name="GST"
                label="GST"
               
                disabled={!editMode}
                size="small"
                InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              />
            </Grid>
            <Grid item xs={0.6}>
              {data.Status ? (
                <CheckIcon style={{ color: 'green' }} />
              ) : (
                <CloseIcon style={{ color: 'red' }} />
              )}
            </Grid>
          </Grid>
        );
      })}



</Typography>
</CardContent>
</Card>
)}
{!disable&&selectedOperation &&(
<Button variant="contained" color="primary" onClick={handleEditClick}>Update</Button>
)}

        
           
           
            
           
              {/* <Button  variant="contained" className="AirButton" style={{marginRight:'10px'}} onClick={handleSubmit} >Submit</Button>
           
              <Button variant="contained" className="AirButton" >Reset</Button> */}
           
          
   
   
    </div>
)

}
export default EditOperations;