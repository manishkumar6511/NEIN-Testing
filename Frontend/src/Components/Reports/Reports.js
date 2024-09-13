import React, { useEffect, useState } from "react";
import { Grid, TextField, FormControl } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from "antd";
 import ExportDefaultToolbar from "./CWR";
import VerticalTabs from "./Tabs";
import AEFRegister from "./AEFReg";
import DailyStatus from "./DailyStatus";
import { moduleOptions,moduleSubDivisions } from "../centralized_components/moduleSubModule";
import MonthComparision from "./monthComparision";


 
function Report() {

const [validationErrors, setValidationErrors] = useState({});
const [selectedComponent, setSelectedComponent] = useState(null);
const[subDivisions,setSubDivision]=useState([]);

//****Centralize State **** */
//********************************************************************************************************************************** */
const [configState, setConfigState] = useState({
  currentConfig: null,
  selectedModule: '',
  selectedSubDivision: '',
  subBranch:'',
  fromDate:'',
  toDate:''
});


//******** optimise code  */
//module cofig for reports header and api
const moduleConfig = {
  ff: {
    AirImport: {
      report1: {
        headers: [
          { field: 'Register_id', headerName: 'SL NO', width: 80 },
          { field: 'JOB_DOCKETNO', headerName: 'DKT No', width: 150 },
          { field: 'NEWINS_REFERENCE_NO', headerName: 'REF NO', width: 150 },
          { field: 'MAWB_NO', headerName: 'MAWB NO', width: 150 },
          { field: 'MAWB_DATE', headerName: 'MAWB DT', width: 150 },
          { field: 'mawb_g_weight', headerName: 'MAWB G.WEIGHT', width: 150 },
          { field: 'MAWB_CHARGEABLE_WEIGHT_KG', headerName: 'MAWB C.WEIGHT', width: 150 },
          { field: 'HAWB_NO', headerName: 'HAWB', width: 150 },
          { field: 'HAWB_DATE', headerName: 'HAWB DT', width: 150 },
          { field: 'mawb_hawb_pices', headerName: 'MAWB/HAWB PICES', width: 150 },
          { field: 'HAWB_GROSS_WEIGHT', headerName: 'HAWB G.WEIGHT', width: 150 },
          { field: 'HAWB_CHARGEABLE_WEIGHT_KG', headerName: 'HAWB C.WEIGHT', width: 150 },
          { field: 'exporter', headerName: 'Exporter', width: 150 },
          { field: 'COMMODITY_CODE', headerName: 'Commodity', width: 150 },
          { field: 'CONSIGNEE', headerName: 'Consignee', width: 150 },
          { field: 'DESTINATION', headerName: 'Dest', width: 100 },
          { field: 'COUNTRY', headerName: 'Dest-Country', width: 150 },
          { field: 'area', headerName: 'Area', width: 100 },
          { field: 'AIR_LINE_NAME', headerName: 'AIRLINE', width: 150 },
          { field: 'inv_no_dt', headerName: 'INV NO DT', width: 150 },
          { field: 'DESCRIPTION_OF_GOODS', headerName: 'DESCRIPTION', width: 150 },
          { field: 'pick_up_date', headerName: 'PICK UP DATE', width: 150 },
          { field: 'CUSTOMS_CLEARANCE_DATE', headerName: 'CUSTOMS CLR DT-', width: 150 },
          { field: 'FLIGHT_NO', headerName: 'Flight Details', width: 150 },
          { field: 'first_flight', headerName: '1ST FLIGHT', width: 150 },
          { field: 'second_flight', headerName: '2ND FLIGHT', width: 150 },
          { field: 'mawb_pp_cc', headerName: 'MAWB pp/cc', width: 150 },
          { field: 'MAWB_TOTAL_FREIGHT_AMOUNT', headerName: 'MAWB Net Ft Amt', width: 150 },
          { field: 'mawb_total_pp_amt', headerName: 'MAWB Total PP AMT', width: 150 },
          { field: 'surcharges', headerName: 'Surcharges', width: 150 },
          { field: 'hawb_pp_cc', headerName: 'HAWB pp/cc', width: 150 },
          { field: 'hawb_currency', headerName: 'HAWB CURRENCY', width: 150 },
          { field: 'hawb_amount', headerName: 'HAWB AMOUNT', width: 150 },
          { field: 'sb_no_date', headerName: 'SB NO & DATE', width: 150 },
          { field: 'fob_amt', headerName: 'FOB Amt', width: 150 },
          { field: 'sb_copy_dispatch_dt', headerName: 'SB COPY DISPATCH DT', width: 150 },
          { field: 'documents_waybill_no', headerName: 'DOCUMENTS COURIER WAYBILL NO', width: 150 },
          { field: 'handling_amt', headerName: 'HANDLING AMOUNT', width: 150 },
          { field: 'nippon_inv_dt', headerName: 'NIPPON INV # / DT', width: 150 },
          { field: 'bills_dispatch_dt', headerName: 'BILLS DISPATCH DT', width: 150 },
          { field: 'bills_courier_waybill_no', headerName: 'BILLS COURIER WAYBILL NO', width: 150 },
          { field: 'ddu_ddp_inv_dt', headerName: 'DDU & DDP INV # & DT', width: 150 },
          { field: 'ddu_ddp_inv_dispatch_dt', headerName: 'DDU / DDP INV DISPATCH DT', width: 150 },
          { field: 'incoterm', headerName: 'INCOTERM', width: 100 },
          { field: 'remark', headerName: 'REMARK', width: 150 },
          { field: 'publish_rates', headerName: 'Publish Rates', width: 150 },
          { field: 'buying_net_net_rates', headerName: 'Buying net net rates', width: 150 },
          { field: 'fsc', headerName: 'FSC', width: 100 },
          { field: 'scc', headerName: 'SCC', width: 100 },
          { field: 'other_surcharges', headerName: 'OTHER SURCHARGES', width: 150 },
          { field: 'service_type', headerName: 'Type of Service ( DG / Temp )', width: 150 },
          { field: 'selling_net_net_rates', headerName: 'Selling net net rates', width: 150 },
          { field: 'difference', headerName: 'Difference', width: 100 },
          { field: 'profit_loss', headerName: 'Profit / Loss', width: 150 },
          { field: 'total_all_freight_carrier', headerName: 'Total All in Freight need to pay to carrier', width: 150 },
          { field: 'total_all_freight_customer', headerName: 'Total All in Freight billing to customer', width: 150 },
          { field: 'prepared_by', headerName: 'Prepared by/reg/name', width: 150 },
          { field: 'executive_name', headerName: 'EXECUTIVE/NAME', width: 150 },
          { field: 'nomination', headerName: 'Nomination', width: 150 },
          { field: 'cha', headerName: 'CHA', width: 100 },
          { field: 'pick_up', headerName: 'Pick up', width: 100 },
          { field: 'negative_margin', headerName: 'Negative Margin', width: 150 },
          { field: 'molex_negative', headerName: 'Molex Negative', width: 150 },
          { field: 'shahi_negative', headerName: 'Shahi Negative', width: 150 },
          { field: 'month', headerName: 'Month', width: 100 },
          { field: 'date_hand_finance', headerName: 'Date of Hand over to Finance', width: 150 },
        ],
        apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
      },
      report2: {
        headers: [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'description', headerName: 'Description', width: 150 },
        ],
        apiEndpoint: '/api/ff/air-import/report2'
      },
      // Add up to 10 reports here
    },
    AirExport: {
      report1: {
        headers: [
          { field: 'Register_id', headerName: 'SL NO', width: 80 },
          { field: 'JOB_DOCKETNO', headerName: 'DKT No', width: 150 },
          { field: 'NEWINS_REFERENCE_NO', headerName: 'REF NO', width: 150 },
          { field: 'MAWB_NO', headerName: 'MAWB NO', width: 150 },
          { field: 'MAWB_DATE', headerName: 'MAWB DT', width: 150 },
          { field: 'mawb_g_weight', headerName: 'MAWB G.WEIGHT', width: 150 },
          { field: 'MAWB_CHARGEABLE_WEIGHT_KG', headerName: 'MAWB C.WEIGHT', width: 150 },
          { field: 'HAWB_NO', headerName: 'HAWB', width: 150 },
          { field: 'HAWB_DATE', headerName: 'HAWB DT', width: 150 },
          { field: 'mawb_hawb_pices', headerName: 'MAWB/HAWB PICES', width: 150 },
          { field: 'HAWB_GROSS_WEIGHT', headerName: 'HAWB G.WEIGHT', width: 150 },
          { field: 'HAWB_CHARGEABLE_WEIGHT_KG', headerName: 'HAWB C.WEIGHT', width: 150 },
          { field: 'exporter', headerName: 'Exporter', width: 150 },
          { field: 'COMMODITY_CODE', headerName: 'Commodity', width: 150 },
          { field: 'CONSIGNEE', headerName: 'Consignee', width: 150 },
          { field: 'DESTINATION', headerName: 'Dest', width: 100 },
          { field: 'COUNTRY', headerName: 'Dest-Country', width: 150 },
          { field: 'area', headerName: 'Area', width: 100 },
          { field: 'AIR_LINE_NAME', headerName: 'AIRLINE', width: 150 },
          { field: 'inv_no_dt', headerName: 'INV NO DT', width: 150 },
          { field: 'DESCRIPTION_OF_GOODS', headerName: 'DESCRIPTION', width: 150 },
          { field: 'pick_up_date', headerName: 'PICK UP DATE', width: 150 },
          { field: 'CUSTOMS_CLEARANCE_DATE', headerName: 'CUSTOMS CLR DT-', width: 150 },
          { field: 'FLIGHT_NO', headerName: 'Flight Details', width: 150 },
          { field: 'first_flight', headerName: '1ST FLIGHT', width: 150 },
          { field: 'second_flight', headerName: '2ND FLIGHT', width: 150 },
          { field: 'mawb_pp_cc', headerName: 'MAWB pp/cc', width: 150 },
          { field: 'MAWB_TOTAL_FREIGHT_AMOUNT', headerName: 'MAWB Net Ft Amt', width: 150 },
          { field: 'mawb_total_pp_amt', headerName: 'MAWB Total PP AMT', width: 150 },
          { field: 'surcharges', headerName: 'Surcharges', width: 150 },
          { field: 'hawb_pp_cc', headerName: 'HAWB pp/cc', width: 150 },
          { field: 'hawb_currency', headerName: 'HAWB CURRENCY', width: 150 },
          { field: 'hawb_amount', headerName: 'HAWB AMOUNT', width: 150 },
          { field: 'sb_no_date', headerName: 'SB NO & DATE', width: 150 },
          { field: 'fob_amt', headerName: 'FOB Amt', width: 150 },
          { field: 'sb_copy_dispatch_dt', headerName: 'SB COPY DISPATCH DT', width: 150 },
          { field: 'documents_waybill_no', headerName: 'DOCUMENTS COURIER WAYBILL NO', width: 150 },
          { field: 'handling_amt', headerName: 'HANDLING AMOUNT', width: 150 },
          { field: 'nippon_inv_dt', headerName: 'NIPPON INV # / DT', width: 150 },
          { field: 'bills_dispatch_dt', headerName: 'BILLS DISPATCH DT', width: 150 },
          { field: 'bills_courier_waybill_no', headerName: 'BILLS COURIER WAYBILL NO', width: 150 },
          { field: 'ddu_ddp_inv_dt', headerName: 'DDU & DDP INV # & DT', width: 150 },
          { field: 'ddu_ddp_inv_dispatch_dt', headerName: 'DDU / DDP INV DISPATCH DT', width: 150 },
          { field: 'incoterm', headerName: 'INCOTERM', width: 100 },
          { field: 'remark', headerName: 'REMARK', width: 150 },
          { field: 'publish_rates', headerName: 'Publish Rates', width: 150 },
          { field: 'buying_net_net_rates', headerName: 'Buying net net rates', width: 150 },
          { field: 'fsc', headerName: 'FSC', width: 100 },
          { field: 'scc', headerName: 'SCC', width: 100 },
          { field: 'other_surcharges', headerName: 'OTHER SURCHARGES', width: 150 },
          { field: 'service_type', headerName: 'Type of Service ( DG / Temp )', width: 150 },
          { field: 'selling_net_net_rates', headerName: 'Selling net net rates', width: 150 },
          { field: 'difference', headerName: 'Difference', width: 100 },
          { field: 'profit_loss', headerName: 'Profit / Loss', width: 150 },
          { field: 'total_all_freight_carrier', headerName: 'Total All in Freight need to pay to carrier', width: 150 },
          { field: 'total_all_freight_customer', headerName: 'Total All in Freight billing to customer', width: 150 },
          { field: 'prepared_by', headerName: 'Prepared by/reg/name', width: 150 },
          { field: 'executive_name', headerName: 'EXECUTIVE/NAME', width: 150 },
          { field: 'nomination', headerName: 'Nomination', width: 150 },
          { field: 'cha', headerName: 'CHA', width: 100 },
          { field: 'pick_up', headerName: 'Pick up', width: 100 },
          { field: 'negative_margin', headerName: 'Negative Margin', width: 150 },
          { field: 'molex_negative', headerName: 'Molex Negative', width: 150 },
          { field: 'shahi_negative', headerName: 'Shahi Negative', width: 150 },
          { field: 'month', headerName: 'Month', width: 100 },
          { field: 'date_hand_finance', headerName: 'Date of Hand over to Finance', width: 150 },
        ],
        apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
      },
      report2: {
        headers: [
          { field: 'CUSTOMS_CLEARANCE_DATE', headerName: 'Custom Clearance Date', width: 80 },
          { field: 'SHIPPER', headerName: 'Exporter', width: 150 },
          { field: 'MAWB_NO', headerName: 'MAWB No', width: 150 },
          { field: 'DESTINATION', headerName: 'DEST', width: 150 },
          { field: 'MAWB_DATE', headerName: 'Nomination', width: 150 },
          { field: 'cha', headerName: 'CHA', width: 150 },
          { field: 'MAWB_CHARGEABLE_WEIGHT_KG', headerName: 'Pick Up', width: 150 },
          { field: 'HAWB_NO', headerName: 'Diff/KG', width: 150 },
          { field: 'HAWB_DATE', headerName: 'Profit/Loss', width: 150 },
          { field: 'mawb_hawb_pices', headerName: 'Negative Margin', width: 150 },
          { field: 'HAWB_GROSS_WEIGHT', headerName: 'Molex Margin', width: 150 },
          { field: 'HAWB_CHARGEABLE_WEIGHT_KG', headerName: 'Shahi Negative', width: 150 },
          { field: 'exporter', headerName: 'Margin %', width: 150 },
         
        ],
       apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
      },
      // Add up to 10 reports here
    },




    OceanExport: {
      report1: {
        headers: [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'shipment', headerName: 'Shipment', width: 150 },
        ],
        apiEndpoint: '/api/ff/ocean-export/report1'
      },
      report2: {
        headers: [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'date', headerName: 'Date', width: 110 },
        ],
        apiEndpoint: '/api/ff/ocean-export/report2'
      },
      // Add up to 10 reports here
    },
  },
  cha: {
    // Define submodules and reports similar to ff
  },
  removals: {
    // Define submodules and reports similar to ff
  },
};

let tabs={};
function updatetabs(){

 tabs = {
  ff:{
    AirImport:[
    {label: 'Air import 1', component: configState.currentConfig&&<ExportDefaultToolbar props={configState.currentConfig['report1']}/> },
    // {label:'Air import 2',component:<h1>ff Air import2 componnet</h1>} ,
    // {label:'Air import 3',component:<h1>ff Air import 3 componnet</h1>} ,
    // {label:'Air import 4',component:<h1>ff Air import 4 componnet</h1>} ,
    ],
   
    AirExport: [
      {label:'AEF REGISTER', component: configState.currentConfig&&<AEFRegister props={configState.currentConfig['report1']}/>},
      {label:'DAILY STATUS', component: configState.currentConfig&&<DailyStatus props={configState.currentConfig['report2']}/>},
      {label:'2023 v 2024',component:<MonthComparision props={configState.toDate}/>},
      {label:'CHA',component:<h1>CHA</h1>},
      {label:'AWR',component:<h1>AWR</h1>},
      {label:'CWR',component:<ExportDefaultToolbar />},
      {label:'TOP 15',component:<h1>TOP 15</h1>},
      {label:'TOP CARRIER',component:<h1>TOP CARRIER</h1>},
      {label:'PIC',component:<h1>AEF PIC</h1>},
      {label:'CUSTOM REPORT',component:<h1>CUSTOM REPORT</h1>},
    ],
    OceanImport: [
      {label:'Ocean import 1',component:<h1>ff Ocean import 1 componnet</h1>} ,
      {label:'Ocean import 2',component:<h1>Ocean import2 componnet</h1>} ,
      {label:'Ocean import 3',component:<h1>Ocean import 3 componnet</h1>} ,
      {label:'Ocean import 4',component:<h1>Ocean import 4 componnet</h1>} ,
    ],
    OceanExport:[
      {label:'Ocean Export 1',component:<h1>ff Ocean Export 1 componnet</h1>} ,
      {label:'Ocean Export 2',component:<h1>ff Ocean Export componnet</h1>} ,
      {label:'Ocean Export 3',component:<h1>ff Ocean Export 3 componnet</h1>} ,
      {label:'Ocean Export 4',component:<h1>ff Ocean Export 4 componnet</h1>} ,
    ]
  },
  cha:{
    AirImport:[
      {label:'Air import 1',component:<h1>cha Air import 1 componnet</h1>} ,
      {label:'Air import 2',component:<h1>cha Air import2 componnet</h1>} ,
      {label:'Air import 3',component:<h1>cha Air import 3 componnet</h1>} ,
      {label:'Air import 4',component:<h1>cha Air import 4 componnet</h1>} ,
      ],
     
      AirExport: [
        {label:'Air Export 1',component:<h1>cha Air Export 1 componnet</h1>} ,
      {label:'Air Export 2',component:<h1>cha Air Export componnet</h1>} ,
      {label:'Air Export 3',component:<h1>cha Air Export 3 componnet</h1>} ,
      {label:'Air Export 4',component:<h1>cha Air Export 4 componnet</h1>} ,
      ],
      OceanImport: [
        {label:'Ocean import 1',component:<h1>cha Ocean import 1 componnet</h1>} ,
        {label:'Ocean import 2',component:<h1> cha Ocean import2 componnet</h1>} ,
        {label:'Ocean import 3',component:<h1>cha Ocean import 3 componnet</h1>} ,
        {label:'Ocean import 4',component:<h1>cha Ocean import 4 componnet</h1>} ,
      ],
      OceanExport:[
        {label:'Ocean Export 1',component:<h1>cha Ocean Export 1 componnet</h1>} ,
        {label:'Ocean Export 2',component:<h1>cha Ocean Export componnet</h1>} ,
        {label:'Ocean Export 3',component:<h1>cha Ocean Export 3 componnet</h1>} ,
        {label:'Ocean Export 4',component:<h1>cha Ocean Export 4 componnet</h1>} ,
      ]
  },
  removals:{
    AirImport:[
      {label:'Air import 1',component:<h1>rm Air import 1 componnet</h1>} ,
      {label:'Air import 2',component:<h1>rm Air import2 componnet</h1>} ,
      {label:'Air import 3',component:<h1>rm Air import 3 componnet</h1>} ,
      {label:'Air import 4',component:<h1>rm Air import 4 componnet</h1>} ,
      ],
     
      AirExport: [
        {label:'Air Export 1',component:<h1>rm Air Export 1 componnet</h1>} ,
      {label:'Air Export 2',component:<h1>rm Air Export componnet</h1>} ,
      {label:'Air Export 3',component:<h1>rm Air Export 3 componnet</h1>} ,
      {label:'Air Export 4',component:<h1>rm Air Export 4 componnet</h1>} ,
      ],
      OceanImport: [
        {label:'Ocean import 1',component:<h1>rm Ocean import 1 componnet</h1>} ,
        {label:'Ocean import 2',component:<h1> rm Ocean import2 componnet</h1>} ,
        {label:'Ocean import 3',component:<h1>rm Ocean import 3 componnet</h1>} ,
        {label:'Ocean import 4',component:<h1>rm Ocean import 4 componnet</h1>} ,
      ],
      OceanExport:[
        {label:'Ocean Export 1',component:<h1>rm Ocean Export 1 componnet</h1>} ,
        {label:'Ocean Export 2',component:<h1>rm Ocean Export componnet</h1>} ,
        {label:'Ocean Export 3',component:<h1>rm Ocean Export 3 componnet</h1>} ,
        {label:'Ocean Export 4',component:<h1>rm Ocean Export 4 componnet</h1>} ,
      ]

  }
  };

}
 

const subBranchOptions = [
  { label: 'Bangalore', value: '10' },
  { label: 'Chennai', value: '40' },
  { label: 'Mumbai', value: '30' }
];

// const moduleOptions = [
//   { label: 'Freight Forwarding', value: 'ff' },
//   { label: 'Custom Brokerage', value: 'cha' },
//   { label: 'Removals', value: 'removals' }
// ];

// Define submodules for each module
// const subDivisions = [

//   { label: 'Air Export', value: 'AirExport' },
//   { label: 'Air Import', value: 'AirImport' },
//   { label: 'Ocean Export', value: 'OceanExport' },
//   { label: 'Ocean Import', value: 'OceanImport' }
// ];

//** centrlize Sate update  *********************************************************************************************************/
const handleConfigChange = (field, value) => {
  if(field==='selectedModule'){
    setSubDivision(moduleSubDivisions[value.value] || []);
  }
  setConfigState((prevState) => ({
    ...prevState,
    [field]: value?.value || '',  // Update the appropriate field dynamically
  }));
};


const handleFromDate=(newDate)=>{
  setConfigState((prevState) => ({
    ...prevState,
    fromDate: newDate.format('YYYY-MM-DD') || '',  // Update the appropriate field dynamically
  }));
 setValidationErrors((prevErrors) => ({
  ...prevErrors,
  fromDate: newDate && dayjs(newDate).isValid() ? false : true,
}));
}

const handleToDate=(newDate)=>{
  setConfigState((prevState) => ({
    ...prevState,
    toDate: newDate.format('YYYY-MM-DD') || '',  // Update the appropriate field dynamically
  }));
  setValidationErrors((prevErrors) => ({
    ...prevErrors,
    toDate: newDate && dayjs(newDate).isValid() ? false : true,
  }));
}


const handleSubmit=()=>{

  const fromDates = new Date(configState.fromDate);
  const toDates = new Date(configState.toDate);
  const errors = {}; // Object to store validation errors

  // Validate `subBranch` field
  if (!configState.subBranch || (configState.subBranch).trim() === "") {
    errors.subBranch = true; // Mark as an error if empty
  }
  if (!configState.selectedModule || (configState.selectedModule).trim() === "") {
    errors.selectedModule = true; // Mark as an error if empty
  }

  if (!configState.selectedSubDivision || (configState.selectedSubDivision).trim() === "") {
    errors.selectedSubDivision = true; // Mark as an error if empty
  }
 console.log("from date",configState.fromDate);
  // Validate `fromDate` field
  if (configState.fromDate===null || dayjs(configState.fromDate, 'YYYY-MM-DD').isValid() === false) {
    console.log("false");
    errors.fromDate = true; // Mark as an error if invalid or empty
  }

  // Validate `toDate` field
  if (!configState.toDate || dayjs(configState.toDate, 'YYYY-MM-DD').isValid() === false) {
    errors.toDate = true; // Mark as an error if invalid or empty
  }

  // If there are any errors, do not proceed with form submission
  if (Object.keys(errors).length > 0) {
    setValidationErrors(errors); // Set validation errors state
   // showToast("Please fill in all required fields", "error");
    return;
  }

  // If all fields are validated successfully
  



  if (configState.selectedModule && configState.selectedSubDivision) {
    const config = moduleConfig[configState.selectedModule][configState.selectedSubDivision];
    setConfigState((prevState) => ({
      ...prevState,
      currentConfig: config
    }));
  }

}

// useEffect(() => {
//   if (configState.selectedModule && configState.selectedSubDivision) {
//     const config = moduleConfig[configState.selectedModule][configState.selectedSubDivision];
//     setConfigState((prevState) => ({
//       ...prevState,
//       currentConfig: config
//     }));
//   }
// }, [configState.selectedModule, configState.selectedSubDivision]);

useEffect(()=>{
  updatetabs()
  setSelectedComponent(configState.selectedSubDivision ? tabs[configState.selectedModule][configState.selectedSubDivision] : null); 
  console.log(configState.currentConfig);
},[configState.currentConfig])



//************************* *****************************************************************************************************/

  return (
    <>
      <div>
       
        <Grid container spacing={2} style={{ marginTop: '10px' }}  >
          <Grid item xs={2}>
            <FormControl fullWidth>
              <Autocomplete
                size="small"
                freeSolo
                disableClearable
                options={subBranchOptions}
             //   onChange={handleSubBranch}
             onChange={(event, newValue) => handleConfigChange('subBranch', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Branch"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    required
                    // error={!!validationErrors?.configState.subBranch && (configState.subBranch === '')}
                    error={!!validationErrors?.subBranch && (configState.subBranch==='')}

                  />
                )}
              />
            </FormControl>
          </Grid>
 
          <Grid item xs={2}>
            <FormControl fullWidth>
              <Autocomplete
                size="small"
                freeSolo
                disableClearable
                options={moduleOptions}
                onChange={(event, newValue) => handleConfigChange('selectedModule', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Division"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    required
                    error={!!validationErrors?.selectedModule && (configState.selectedModule==='')}
                  />
                )}
              />
            </FormControl>
          </Grid>


          <Grid item xs={2}>
            <FormControl fullWidth>
              <Autocomplete
                size="small"
                freeSolo
                disableClearable
                options={subDivisions}
                // onChange={handleSubmoduleClick}
                onChange={(event, newValue) => handleConfigChange('selectedSubDivision', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sub-Division"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    required
                    error={!!validationErrors?.selectedSubDivision && (configState.selectedSubDivision==='')}
                  />
                )}
              />
            </FormControl>
          </Grid>
 
          <Grid item xs={2}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  name="fromDate"
                  value={configState.fromDate ? dayjs(configState.fromDate, 'DD/MM/YYYY') : null}
                   onChange={handleFromDate}
                 // onChange={(event, newValue) => handleFromDate('fromDate', newValue)}
                  inputFormat="DD/MM/YYYY"
                  label='From Date *'
                  slotProps={{
                    textField: {
                      error: !!validationErrors?.fromDate,
                    },
                  }}
                  error={validationErrors.fromDate && (configState.fromDate === null)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
 
          <Grid item xs={2}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  name="toDate"
                  value={configState.toDate ? dayjs(configState.toDate, 'DD/MM/YYYY') : null}
                  onChange={handleToDate}
                 // onChange={(event, newValue) => handleFromDate('toDate', newValue)}
                  inputFormat="DD/MM/YYYY"
                  label='To Date *'
                  slotProps={{
                    textField: {
                      error: !!validationErrors?.toDate,
                    },
                  }}
                  error={validationErrors.toDate && (configState.toDate === null)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
 
          <Grid item xs={1}>
            <Button variant="contained" style={{ backgroundColor: '#1a005d', color: 'white', height: '40px' }} onClick={handleSubmit}>Submit</Button>
          </Grid>

        
 </Grid>
        {/* Render the selected component */}
        <div style={{ marginTop: '20px' }}>
              {selectedComponent && (<VerticalTabs tabs={selectedComponent}/>)}
        </div> 
      </div>
    </>
  );
}
 
export default Report;