import React,{useEffect, useState,useRef} from "react";
import { Card, CardContent, Typography } from '@mui/material';

import { FormControl, Grid } from '@mui/material';
import {TextField } from '@mui/material';
import {Button } from '@mui/material';
import './../CSS/OperationStyles.css';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import {  useToast } from '../centralized_components/Toast';
import axios from 'axios';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
  

function FinanceReport(){
  const componentRef = useRef(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [mawbNo, setMawbNo] = useState(null);
  const [fields, setFields] = useState([]);
  const[financeData,setFinanceData]=useState([]);

  const { showToast } = useToast();



  const[selectedOperation,setSelectedOperation]=useState('');
  const[selectedSearch,setSelectedSearch]=useState('');

  const [HAWBoptions, setHAWBOptions] = useState([]); // State to hold the options for autocomplete
  const [HAWBinputValue, setHAWBInputValue] = useState('');
  const[MAWBoptions,setMAWBOptions]=useState([]);
  const[MAWBInput,setMAWBInput]=useState('');
  const [MAWBHAWBoptions, setMAWBHAWBOptions] = useState([]); // State to hold the options for autocomplete
  
  
  
  const [selectedHawb, setSelectedHawb] = useState('');

 const[selectedInvoice,setSelectedInvoice]=useState('');
 const[InvoiceOptions,setInvoiceOptions]=useState([]);



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
      { label: 'Main Product', name: 'MainProduct' },
      { label: 'Industry', name: 'Industry' },
      { label: 'Shipment Type', name: 'SHIPMENT_TYPE' },
      { label: 'CAN No', name: 'CAN_NO' },
      { label: 'CAN Date', name: 'CAN_DATE' },
      { label: 'CAN Amount', name: 'CAN_AMOUNT' },
      { label: 'FC BRO', name: 'FC_BRO' },
      { label: 'FHD', name: 'FHD' },
      { label: 'DO Handed Over', name: 'DO_HANDED_OVER' },
      { label: 'DO Handover Date', name: 'DO_HANDOVER_DATE' },
      { label: 'Clearance Done By', name: 'clearanceDoneBy' },
      { label: 'CHA Name', name: 'CHA_NAME' },
      { label: 'BRO Bank Name', name: 'BRO_BANK_NAME' },
      { label: 'Break Bulk', name: 'BREAK_BULK' },
      { label: 'Remarks', name: 'REMARKS' },
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
      { label: 'DDU/DDP', name: 'DDU_DDP' },
      { label: 'Description of Goods', name: 'DESCRIPTION_OF_GOODS' },
      { label: 'Main Product', name: 'MainProduct' },
      { label: 'Industry', name: 'industry' },
      { label: 'Buying Rate', name: 'BUYING_RATE' },
      { label: 'Selling Rate', name: 'SELL_RATE' },
      { label: 'Margin (KG)', name: 'MARGIN_KG' },
      { label: 'Total Margin', name: 'TOTAL_MARGIN' },
      { label: 'Freight Amount', name: 'FREIGHT_AMOUNT' },
      { label: 'Due Carrier', name: 'DUE_CARRIER' },
      { label: 'Net Due', name: 'NETDUE' },
      { label: 'Shipper Invoice No', name: 'SHIPPER_INVOICE_NO' },
      { label: 'Shipping Bill No', name: 'SHIPPING_BILL_NO' },
      { label: 'Shipping Bill Date', name: 'SHIPPING_BILL_DATE' },
      { label: 'Clearance Done By', name: 'clearanceDoneBy' },
      { label: 'Customs Clearance Date', name: 'CUSTOMS_CLEARANCE_DATE' },
      { label: 'CHA', name: 'cha' },
      { label: 'Sales PIC', name: 'SalesPic' },
      { label: 'Sales PIC Branch', name: 'salesPicBranch' },
      { label: 'Operation PIC', name: 'OperationPic' },
      { label: 'IATA Agent', name: 'IATA_AGENT' },
      { label: 'Sub Agent', name: 'SUB_AGENT' },
      { label: 'Remarks', name: 'REMARKS' },
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
      { label: 'Main Product', name: 'MainProduct' },
      { label: 'Industry', name: 'Industry' },
      { label: 'FCL', name: 'FCL' },
      { label: 'LCL CBM', name: 'LCL_CBM' },
      { label: 'Commodity', name: 'COMMODITY' },
      { label: 'Currency', name: 'CURRENCY' },
      { label: 'ETA BLR', name: 'ETA_BLR' },
      { label: 'ETA MAA', name: 'ETA_MAA' },
      { label: 'Buying Rate Ocean Freight Local (USD)', name: 'BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD' },
      { label: 'Selling Freight Rate (USD)', name: 'SELLING_FREIGHT_RATE_USD' },
      { label: 'Total Freight in INR', name: 'TOTAL_FREIGHT_IN_INR' },
      { label: 'Margin', name: 'MARGIN' },
      { label: 'Agent', name: 'AGENT' },
      { label: 'Liner Payment', name: 'LINER_PAYMENT' },
      { label: 'FCL_DES', name: 'FCL_DES' },
      { label: 'Profit Share (USD)', name: 'PROFIT_SHARE_USD' },
      { label: 'Clearance Done By', name: 'clearanceDoneBy' },
      { label: 'Cleared On', name: 'ClearedOn' },
      { label: 'CTN', name: 'CTN' },
      { label: 'Remarks', name: 'REMARKS' },
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
      { label: 'Main Product', name: 'MainProduct' },
      { label: 'Industry', name: 'Industry' },
      { label: 'Seal No', name: 'SEAL_NO' },
      { label: 'Buying Rate Ocean Freight Local USD', name: 'BUYING_RATE_OCEAN_FREIGHT_LOCAL_USD' },
      { label: 'Selling Freight Rate USD', name: 'SELLING_FREIGHT_RATE_USD' },
      { label: 'GST', name: 'GST' },
      { label: 'Total Freight in INR', name: 'TOTAL_FREIGHT_IN_INR' },
      { label: 'Margin', name: 'MARGIN' },
      { label: 'Shipping Bill No', name: 'SHIPPING_BILL_NO' },
      { label: 'Shipping Bill Date', name: 'SHIPPING_BILL_DATE' },
      { label: 'Sector', name: 'SECTOR' },
      { label: 'Cleared On', name: 'CLEARED_ON' },
      { label: 'Clearance Done By', name: 'clearanceDoneBy' },
      { label: 'Exporter Inv No', name: 'EXPORTER_INV_NO' },
      { label: 'VSL Voyage', name: 'VSL_VOYAGE' },
      { label: 'CHA Name', name: 'CHA_NAME' },
      { label: 'Cargo Received', name: 'CARGO_RECEIVED' },
      { label: 'Closed/Open', name: 'CLOSED_OPEN' },
      { label: 'FC Bro OK', name: 'FC_BRO_OK' },
      { label: 'ETA ICD CFS', name: 'ETA_ICD_CFS' },
      { label: 'ETA Mother Port', name: 'ETA_MOTHER_PORT' },
      { label: 'CTN', name: 'CTN' },
      { label: 'CSPIC SaleSpic', name: 'CSPIC_SALESPIC' },
      { label: 'Remarks', name: 'REMARKS' },
    ]
  };


  

const searchBy=[
  // {label:'Select',value:''},
  {label:'Invoice No',value:'Invoice'},
  {label:'AWB No',value:'HAWB'},
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
  setSelectedSearch('');
  
}

const handleSearch = (event, newValue) => {
  setSelectedSearch(newValue.value);
  console.log("search value", newValue.value);
  setFields(DynamicFields[selectedOperation] || []);
setFinanceData([]);
  
};

const handleFieldChange = (index, event) => {
  const newFields = [...fields];
  newFields[index].value = event.target.value;
  setFields(newFields);
};

const handleDownloadPDF = async () => {
  const mawbNoField = fields.find(field => field.name === 'MAWB_NO');

// Extract the value from the found object
const mawbNoValue = mawbNoField ? mawbNoField.value : '';
  console.log("mawb no",mawbNoValue);
  const element = componentRef.current; // Make sure this is a valid DOM element
  if (!element) {
    console.error('Element not found');
    return;
  }
  
  try {
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    const fileName = `${mawbNoValue}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF', error);
  }
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
    }else if(selectedSearch==='Invoice'){
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
        if(MAWBInput){
          console.log("selected MAWB",MAWBInput);
          const response = await axios.post(`${API_BASE_URL}/ff/ae_AllMasterFF`, {
            MAWB_NO:MAWBInput, 
          
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
  }, [HAWBinputValue,selectedInvoice,MAWBInput]);



  

  const handleOptionChange = async (event, newValue) => {
    console.log("option change",newValue);
    if (newValue) {
      try {
        let responseData = null;
       let finance=null;
        if(selectedSearch==="HAWB"){
          console.log("if");
        const  response = await axios.post(`${API_BASE_URL}/finance/getHAWB_NOData`, {
            HAWB_NO: newValue
          });
         
         
          responseData = response.data[0];
          if(responseData.InvoiceNo!==null){
            finance=response.data;
          }
          console.log("finance Data",financeData);
          console.log('Response data HAWB Data:', responseData);
          console.log("fields before",fields);
        }else if(selectedSearch==="Invoice"){
          console.log("else");
         const response1 = await axios.post(`${API_BASE_URL}/finance/getHAWB_NODataFromInvoice`, {
            Invoice_No: newValue
          });

          responseData = response1.data[0];
          console.log('Response data Invoice Data:', response1.data);
          if(responseData&&responseData.InvoiceNo!==null){
            finance=response1.data;
          }
        }else{
          const response2 = await axios.post(`${API_BASE_URL}/finance/getHAWB_NOData`, {
            HAWB_NO: newValue
          });
          console.log('Response data MAWB Data:', response2.data);
          
const len=response2.data;
if(len.length<=1){
  console.log("length is greater than 1");
          responseData = response2.data[0];
}else{
  setMAWBHAWBOptions(response2.data);
}
          
          if(responseData&&responseData.InvoiceNo!==null){
            finance=response2.data;
          }

        }
        const updatedFields = fields.map(field => ({
          ...field,
          value: (responseData&&responseData[field.name]) || ''
          
        }));
       
        setFields(updatedFields);
       
        setFinanceData(finance);
       
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
            value: (selectedHAWBDetails&&selectedHAWBDetails[field.name]) || ''
            
          }));
          let mawb="";
          const APIData = MAWBHAWBoptions.map(item => {

           
            mawb=item.MAWB_NO;
                
          })
          setFields(updatedFields);

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


  














return(
  <div>
    <div ref={componentRef} style={{ padding: '20px', backgroundColor: '#fff' }}>


      
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
        label="AWB No"
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
        setMAWBInput(newInputValue); // Update input value
       
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

{MAWBHAWBoptions.length>=1 && (
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

    {selectedOperation&&(
<Card className="card-remaining">
<p className='finance-card-remaining'>Finance Data </p>
<Divider className="divider"/>
<CardContent>
<Typography variant="h5" component="div">
{financeData&&financeData!==null&&financeData.map((data, index) => {
     

        return (
          <Grid container spacing={2} key={index} style={{marginTop:'0px'}}>
            <Grid item xs={1.9}>
              <TextField
                value={data.InvoiceNo ||0}
                className="disabled-textfield"
                name="invoiceNumber"
                label="Invoice Number"
                
                InputProps={{
                  readOnly: true,
                }}
                size="small"
                InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              />
            </Grid>
            <Grid item xs={1.9}>
             <TextField
                value={data.IssueDate || 0}
                className="disabled-textfield"
                name="customClearanceDate"
                label="Invoice Date"
                
                InputProps={{
                  readOnly: true,
                }}
                size="small"
                InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              />
            </Grid>
            <Grid item xs={1.9}>
              <TextField
                value={data.Amount || 0}
                className="disabled-textfield"
                name="invoiceTotal"
                label="Invoice Total"
               
                InputProps={{
                  readOnly: true,
                }}
                size="small"
                InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              />
            </Grid>
            <Grid item xs={1.9}>
              <TextField
                value={data.Revenue || 0}
                className="disabled-textfield"
                name="revenue"
                label="Revenue"
              
                InputProps={{
                  readOnly: true,
                }}
                size="small"
                InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              />
            </Grid>
            <Grid item xs={1.9}>
              <TextField
                value={data.Reimbursement || 0}
                className="disabled-textfield"
                name="reimbursement"
                label="Reimbursement"
               
                InputProps={{
                  readOnly: true,
                }}
                size="small"
                InputLabelProps={{ style: { fontSize: '14px', shrink: 'true' } }}
              />
            </Grid>
            <Grid item xs={1.9}>
              <TextField
                value={data.GST || 0}
                className="disabled-textfield"
                name="gst"
                label="GST"
               
                InputProps={{
                  readOnly: true,
                }}
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
    {selectedOperation &&(
    <Card className="finance-card">

  <p className='finance-card-name'>Operational Fields </p>
 


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
         InputProps={{
           readOnly: true,
         }}
         size='small'
         style={{ marginBottom: '3px' }}
         onChange={(e) => handleFieldChange(index, e)}
         className='disabled-textfield'
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





           

            
           
     </div>         
   {selectedOperation &&(      
<Button  variant="contained" color="primary" onClick={handleDownloadPDF} >Download</Button>  
   )} 
    </div>
    
)

}
export default FinanceReport;