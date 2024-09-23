import React, { useEffect, useState } from "react";
import { Grid, TextField, FormControl } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from "antd";

import VerticalTabs from "./Tabs";
import AEFRegister from "./AEFReg";
import DailyStatus from "./DailyStatus";
import { moduleOptions,moduleSubDivisions } from "../centralized_components/moduleSubModule";
import MonthComparision from "./monthComparision";
import CHAReport from "./cha";
import AWR from "./AWR";
import CWRData from "./CWR";
import Top15 from "./Top15";
import TopCarrier from "./TopCarrier";
import Pic from "./Pic";
import CommonReport from "./CommonReport";
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
          { field: 'Nomination', headerName: 'Nomination', width: 150 },
          { field: 'cha', headerName: 'CHA', width: 150 },
          { field: 'PickUp', headerName: 'Pick Up', width: 150 },
          { field: 'MAWB_CHARGEABLE_WEIGHT_KG', headerName: 'MAWB C.Weight', width: 150 },
          { field: 'BUYING_RATE', headerName: 'Buy Rates', width: 150 },
          { field: 'SELL_RATE', headerName: 'Sell Rates', width: 150 },
          { field: 'MARGIN_KG', headerName: 'Diff/KG', width: 150 },
          { field: 'TOTAL_MARGIN', headerName: 'Profit/Loss', width: 150 },
          { field: 'NegativeMargin', headerName: 'Negative Margin', width: 150 },
          { field: 'MolexMargin', headerName: 'Molex Margin', width: 150 },
          { field: 'ShahiNegative', headerName: 'Shahi Negative', width: 150 },
          { field: 'Margin', headerName: 'Margin %', width: 150 },
         
        ],
       apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
      },
      report3: {
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
         
        ],
       apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
      },
      report3: {
        apiEndpoint: 'http://localhost:5000/Reports/Comparison'
      },
    },




    OceanExport: {
      report1: {
        headers: [
          { field: 'id', headerName: 'S.N', width: 90 },
          { field: 'shipment', headerName: 'BRANCH NAME', width: 150 },
          { field: 'shipment', headerName: 'MODULE TYPE', width: 150 },
          { field: 'shipment', headerName: 'OPERATION TYPE', width: 150 },
          { field: 'shipment', headerName: 'Entry Type', width: 150 },
          { field: 'shipment', headerName: 'JOB / DOCKET NO', width: 150 },
          { field: 'shipment', headerName: 'SHIPMENT TYPE', width: 150 },
          { field: 'shipment', headerName: 'SHIPPER', width: 150 },
          { field: 'shipment', headerName: 'CONSIGNEE', width: 150 },
          { field: 'shipment', headerName: 'PORT OF LOADING', width: 150 },
          { field: 'shipment', headerName: 'PORT OF DEPARTURE', width: 150 },
          { field: 'shipment', headerName: 'PLACE OF DELIVERY', width: 150 },
          { field: 'shipment', headerName: 'SHIPPING / COLOADER NAME', width: 150 },
          { field: 'shipment', headerName: 'VESSEL VOYAGE', width: 150 },
          { field: 'shipment', headerName: 'ETD/SOB DATE', width: 150 },
          { field: 'shipment', headerName: 'NO.OF CONTAINERS', width: 150 },
          { field: 'shipment', headerName: 'VOLUME(CBM)', width: 150 },
          { field: 'shipment', headerName: 'CONTAINER NO', width: 150 },
          { field: 'shipment', headerName: 'SEAL.NO.', width: 150 },
          { field: 'shipment', headerName: 'MBL NO', width: 150 },
          { field: 'shipment', headerName: 'MBL DATE', width: 150 },
          { field: 'shipment', headerName: 'HBL NO', width: 150 },
          { field: 'shipment', headerName: 'HBL DATE', width: 150 },
          { field: 'shipment', headerName: 'ORIGIN', width: 150 },
          { field: 'shipment', headerName: 'FCL', width: 150 },
          { field: 'shipment', headerName: 'LCL CBM', width: 150 },
          { field: 'shipment', headerName: 'COMMODITY', width: 150 },
          { field: 'shipment', headerName: 'NO OF PACKAGES', width: 150 },
          { field: 'shipment', headerName: 'TEUS', width: 150 },
          { field: 'shipment', headerName: 'GROSS_WEIGHT', width: 150 },
          { field: 'shipment', headerName: 'CURRENCY', width: 150 },
          { field: 'shipment', headerName: 'INVOICE NO', width: 150 },
          { field: 'shipment', headerName: 'INVOICE DATE', width: 150 },
          { field: 'shipment', headerName: 'INVOICE AMOUNT', width: 150 },
          { field: 'shipment', headerName: 'PAYABLE TO OVERSEAS USD', width: 150 },
          { field: 'shipment', headerName: 'BUYING RATE OCEAN_FREIGHT LOCAL_USD', width: 150 },
          { field: 'shipment', headerName: 'SELLING FREIGHT RATE_USD', width: 150 },  
          { field: 'shipment', headerName: 'SHIPPING LINE/LINER DEBIT NOTE GST', width: 150 },
          { field: 'shipment', headerName: 'TOTAL FREIGHT IN_INR', width: 150 },
          { field: 'shipment', headerName: 'MARGIN', width: 150 },
          { field: 'shipment', headerName: 'FCL_TUES', width: 150 },
          { field: 'shipment', headerName: 'SHIPPING BILL NO', width: 150 },
          { field: 'shipment', headerName: 'SHIPPING BILL DATE', width: 150 },
          { field: 'shipment', headerName: 'SECTOR', width: 150 },
          { field: 'shipment', headerName: 'SAILING DATE', width: 150 },
          { field: 'shipment', headerName: 'REGION CODE', width: 150 },
          { field: 'shipment', headerName: 'REGION NAME', width: 150 },
          { field: 'shipment', headerName: 'CLEARED ON', width: 150 },
          { field: 'shipment', headerName: 'EXPORTER INV NO', width: 150 },
          { field: 'shipment', headerName: 'VSL VOYAGE', width: 150 },
          { field: 'shipment', headerName: 'CHA NAME', width: 150 },
          { field: 'shipment', headerName: 'CARGO RECEIVED', width: 150 },
          { field: 'shipment', headerName: 'ETD', width: 150 },
          { field: 'shipment', headerName: 'ETA', width: 150 },
          { field: 'shipment', headerName: 'CLOSED/ OPEN', width: 150 },
          { field: 'shipment', headerName: 'FC BRO OK', width: 150 },
          { field: 'shipment', headerName: 'ETA ICD/CFS', width: 150 },
          { field: 'shipment', headerName: 'ETA MOTHER PORT', width: 150 },
          { field: 'shipment', headerName: 'CTN', width: 150 },
          { field: 'shipment', headerName: 'CS PIC/SALES PIC', width: 150 },
          { field: 'shipment', headerName: 'REMARKS', width: 150 },
          { field: 'shipment', headerName: 'HANDOVER REMARKS', width: 150 },
          { field: 'shipment', headerName: 'CLARIFICATION REMARKS', width: 150 },
          { field: 'shipment', headerName: 'CLARIFICATION SENT DATE', width: 150 },
          { field: 'shipment', headerName: 'CLARIFICATION REPLIED REMARKS', width: 150 },
          { field: 'shipment', headerName: 'CLARIFICATION REPLIED DATE', width: 150 },
          { field: 'shipment', headerName: 'RECORD CREATED DATE', width: 150 },
         
          


        ],
        apiEndpoint: '/api/ff/ocean-export/report1'
      },
      
    },
    OceanImport: {
      report1: {
        headers: [
          { field: 'id', headerName: 'S.N', width: 90 },
          { field: 'shipment', headerName: 'BRANCH NAME', width: 150 },
          { field: 'shipment', headerName: 'MODULE TYPE', width: 150 },
          { field: 'shipment', headerName: 'OPERATION TYPE', width: 150 },
          { field: 'shipment', headerName: 'Entry Type', width: 150 },
          { field: 'shipment', headerName: 'JOB / DOCKET NO', width: 150 },
          { field: 'shipment', headerName: 'SHIPMENT TYPE', width: 150 },
          { field: 'shipment', headerName: 'INCO TERMS', width: 150 },
          { field: 'shipment', headerName: 'IMPORTER', width: 150 },
          { field: 'shipment', headerName: 'SHIPPER', width: 150 },
          { field: 'shipment', headerName: 'CAN NO', width: 150 },
          { field: 'shipment', headerName: 'CAN DATE', width: 150 },
          { field: 'shipment', headerName: 'CAN AMOUNT', width: 150 },
          { field: 'shipment', headerName: 'MBL NO', width: 150 },
          { field: 'shipment', headerName: 'MBL DATE', width: 150 },
          { field: 'shipment', headerName: 'HBL NO', width: 150 },
          { field: 'shipment', headerName: 'HBL DATE', width: 150 },
          { field: 'shipment', headerName: 'MANIFEST', width: 150 },
          { field: 'shipment', headerName: 'ORIGIN', width: 150 },
          { field: 'shipment', headerName: 'PORT OF LOADING', width: 150 },
          { field: 'shipment', headerName: 'PORT OF DISCHARGE', width: 150 },
          { field: 'shipment', headerName: 'PLACE OF DELIVERY', width: 150 },
          { field: 'shipment', headerName: 'PORT CODE', width: 150 },
          { field: 'shipment', headerName: 'FCL', width: 150 },
          { field: 'shipment', headerName: 'NO.OF CONTAINERS', width: 150 },
          { field: 'shipment', headerName: 'CONTAINER TYPE', width: 150 },
          { field: 'shipment', headerName: 'CONTAINER NO', width: 150 },
          { field: 'shipment', headerName: 'CONTAINER TYPE', width: 150 },
          { field: 'shipment', headerName: 'LCL CBM', width: 150 },
          { field: 'shipment', headerName: 'COMMODITY', width: 150 },
          { field: 'shipment', headerName: 'NO OF PACKAGES', width: 150 },
          { field: 'shipment', headerName: 'TEUS', width: 150 },
          { field: 'shipment', headerName: 'GROSS_WEIGHT', width: 150 },
          { field: 'shipment', headerName: 'CURRENCY', width: 150 },
          { field: 'shipment', headerName: 'GROSS_WEIGHT', width: 150 },
          { field: 'shipment', headerName: 'BRO', width: 150 },
          { field: 'shipment', headerName: 'ETD', width: 150 },
          { field: 'shipment', headerName: 'ETA BLR', width: 150 },
          { field: 'shipment', headerName: 'ETA MAA', width: 150 },
          { field: 'shipment', headerName: 'BASIC FREIGHT', width: 150 },  
          { field: 'shipment', headerName: 'DO & OTHER CHARGES', width: 150 },
          { field: 'shipment', headerName: 'CC FEE', width: 150 },
          { field: 'shipment', headerName: 'CAF', width: 150 },
          { field: 'shipment', headerName: 'MIS.CHARGES', width: 150 },
          { field: 'shipment', headerName: 'PAYABLE TO OVERSEAS USD', width: 150 },
          { field: 'shipment', headerName: 'BUYING RATE OCEAN_FREIGHT LOCAL_USD', width: 150 },
          { field: 'shipment', headerName: 'SELLING FREIGHT RATE_USD', width: 150 },
          { field: 'shipment', headerName: 'TOTAL FREIGHT IN_INR', width: 150 },
          { field: 'shipment', headerName: 'MARGIN', width: 150 },
          { field: 'shipment', headerName: 'AGENT', width: 150 },
          { field: 'shipment', headerName: 'VESSEL.NO.', width: 150 },
          { field: 'shipment', headerName: 'LINER PAYMENT', width: 150 },
          { field: 'shipment', headerName: 'FCL DES', width: 150 },
          { field: 'shipment', headerName: 'PROFIT SHARE USD', width: 150 },
          { field: 'shipment', headerName: 'REGION CODE', width: 150 },
          { field: 'shipment', headerName: 'REGION NAME', width: 150 },
          { field: 'shipment', headerName: 'COUNTRY OF LOADING', width: 150 },
          { field: 'shipment', headerName: 'CTN', width: 150 },
          { field: 'shipment', headerName: 'REMARKS', width: 150 },
          { field: 'shipment', headerName: 'HANDOVER REMARKS', width: 150 },
          { field: 'shipment', headerName: 'HANDOVER DATE', width: 150 },
          { field: 'shipment', headerName: 'CLARIFICATION REMARKS', width: 150 },
          { field: 'shipment', headerName: 'CLARIFICATION SENT DATE', width: 150 },
          { field: 'shipment', headerName: 'CLARIFICATION REPLIED REMARKS', width: 150 },
          { field: 'shipment', headerName: 'CLARIFICATION REPLIED DATE', width: 150 },
          { field: 'shipment', headerName: 'RECORD CREATED DATE', width: 150 },
          


        ],
        apiEndpoint: '/api/ff/ocean-export/report1'
      },
      
    },

    
  },
  cha: {
    AirImport: {
      report1: {
        headers: [
          { field: 'Register_id', headerName: 'S.N', width: 80 },
          { field: 'JOB_DOCKETNO', headerName: 'BRANCH NAME', width: 150 },
          { field: 'NEWINS_REFERENCE_NO', headerName: 'MODULE TYPE', width: 150 },
          { field: 'MAWB_NO', headerName: 'OPERATION TYPE', width: 150 },
          { field: 'MAWB_DATE', headerName: 'OR REG NO', width: 150 },
          { field: 'mawb_g_weight', headerName: 'INDUSTRY', width: 150 },
          { field: 'MAWB_CHARGEABLE_WEIGHT_KG', headerName: 'JOB / DOCKET NO', width: 150 },
          { field: 'HAWB_NO', headerName: 'JOB CANCELLED STATUS', width: 150 },
          { field: 'HAWB_DATE', headerName: 'SHPT CLEARED DATE', width: 150 },
          { field: 'mawb_hawb_pices', headerName: 'CONSIGNEE', width: 150 },
          { field: 'HAWB_GROSS_WEIGHT', headerName: ' G.WEIGHT', width: 150 },
          { field: 'HAWB_CHARGEABLE_WEIGHT_KG', headerName: 'IE_CODE', width: 150 },
          { field: 'exporter', headerName: 'BOE NO', width: 150 },
          { field: 'COMMODITY_CODE', headerName: 'BOE DATE', width: 150 },
          { field: 'CONSIGNEE', headerName: 'TYPE OF BOE', width: 150 },
          { field: 'DESTINATION', headerName: 'CONSIGNOR', width: 100 },
          { field: 'COUNTRY', headerName: 'ORIGIN', width: 150 },
          { field: 'area', headerName: 'HAWB/MAWB NO', width: 100 },
          { field: 'AIR_LINE_NAME', headerName: 'HAWB/MAWB DATE', width: 150 },
          { field: 'inv_no_dt', headerName: 'FHD (YES/NO)', width: 150 },
          { field: 'DESCRIPTION_OF_GOODS', headerName: 'SHIPT ARRIVAL DATE', width: 150 },
          { field: 'pick_up_date', headerName: 'NO OF PACKAGES', width: 150 },
          { field: 'CUSTOMS_CLEARANCE_DATE', headerName: 'GROSS WEIGHT', width: 150 },
          { field: 'FLIGHT_NO', headerName: 'ASSESSABLE VALUE', width: 150 },
          { field: 'first_flight', headerName: 'CUSTOMS DUTY', width: 150 },
          { field: 'second_flight', headerName: 'CHALLAN NO', width: 150 },
          { field: 'mawb_pp_cc', headerName: 'IGM.NO', width: 150 },
          { field: 'MAWB_TOTAL_FREIGHT_AMOUNT', headerName: 'IGM.DATE', width: 150 },
          { field: 'mawb_total_pp_amt', headerName: 'TAT - CLEARED DATE & SHIPT ARRIVAL DATE', width: 150 },
          { field: 'surcharges', headerName: 'TAT - BE DATE & CLEARED DATE', width: 150 },
          { field: 'hawb_pp_cc', headerName: 'SUPPLIER INVOICE NO', width: 150 },
          { field: 'hawb_currency', headerName: 'INVOICE DATE', width: 150 },
          { field: 'hawb_amount', headerName: 'INVOICE VALUE IN INR', width: 150 },
          { field: 'sb_no_date', headerName: 'DESCRIPTION', width: 150 },
          { field: 'fob_amt', headerName: 'DOC SEND FOR BILLING', width: 150 },
          { field: 'sb_copy_dispatch_dt', headerName: 'BOND NO', width: 150 },
          { field: 'documents_waybill_no', headerName: 'C T H NO', width: 150 },
          { field: 'handling_amt', headerName: 'CARTING DATE', width: 150 },
          { field: 'nippon_inv_dt', headerName: 'CHA', width: 150 },
          { field: 'bills_dispatch_dt', headerName: 'CLEARED LOCATION', width: 150 },
          { field: 'bills_courier_waybill_no', headerName: 'CLOSED OPEN', width: 150 },
          { field: 'ddu_ddp_inv_dt', headerName: 'COST SHEET PREPARATION DATE', width: 150 },
          { field: 'ddu_ddp_inv_dispatch_dt', headerName: 'COST SHEET SEND DATE', width: 150 },
          { field: 'incoterm', headerName: 'DC NO', width: 100 },
          { field: 'remark', headerName: 'DC DATE', width: 150 },
          { field: 'publish_rates', headerName: 'DELIVERY DATE', width: 150 },
          { field: 'buying_net_net_rates', headerName: 'TRANSPORTER DETAILS', width: 150 },
          { field: 'fsc', headerName: 'VEHICLE NO', width: 100 },
          { field: 'scc', headerName: 'VEHICLE MODE', width: 100 },
          { field: 'other_surcharges', headerName: 'WAYBILL NO', width: 150 },
          { field: 'service_type', headerName: 'INTEREST AMOUNT', width: 150 },
          { field: 'selling_net_net_rates', headerName: 'LATE FILING PENALTY', width: 150 },
          { field: 'difference', headerName: 'REMARKS', width: 100 },
          { field: 'profit_loss', headerName: 'HANDOVER REMARKS', width: 150 },
          { field: 'total_all_freight_carrier', headerName: 'HANDOVER DATE', width: 150 },
          { field: 'total_all_freight_customer', headerName: 'CLARIFICATION REMARKS', width: 150 },
          { field: 'prepared_by', headerName: 'CLARIFICATION SENT DATE', width: 150 },
          { field: 'executive_name', headerName: 'CLARIFICATION REPLIED REMARKS', width: 150 },
          { field: 'nomination', headerName: 'CLARIFICATION REPLIED DATE', width: 150 },
          { field: 'cha', headerName: 'RECORD CREATED DATE', width: 100 },
          { field: 'pick_up', headerName: 'Pick up', width: 100 },
       
        ],
        apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
      },
  },
  AirExport: {
    report1: {
      headers: [
        { field: 'Register_id', headerName: 'S.N', width: 80 },
        { field: 'JOB_DOCKETNO', headerName: 'BRANCH NAME', width: 150 },
        { field: 'NEWINS_REFERENCE_NO', headerName: 'MODULE TYPE', width: 150 },
        { field: 'MAWB_NO', headerName: 'OPERATION TYPE', width: 150 },
        { field: 'MAWB_DATE', headerName: 'OR REG NO', width: 150 },
        { field: 'mawb_g_weight', headerName: 'INDUSTRY', width: 150 },
        { field: 'MAWB_CHARGEABLE_WEIGHT_KG', headerName: 'JOB / DOCKET NO', width: 150 },
        { field: 'HAWB_NO', headerName: 'JOB CANCELLED STATUS', width: 150 },
        { field: 'HAWB_DATE', headerName: 'IE_CODE', width: 150 },
        { field: 'mawb_hawb_pices', headerName: 'SHIPMENT TYPE', width: 150 },
        { field: 'HAWB_GROSS_WEIGHT', headerName: 'NEWINS REFERENCE NO', width: 150 },
        { field: 'HAWB_CHARGEABLE_WEIGHT_KG', headerName: 'MAWB NO', width: 150 },
        { field: 'exporter', headerName: 'MAWB DATE', width: 150 },
        { field: 'COMMODITY_CODE', headerName: 'MAWB NO.OF PKGS', width: 150 },
        { field: 'CONSIGNEE', headerName: 'MAWB CHARGEABLE WEIGHT(KG)', width: 150 },
        { field: 'DESTINATION', headerName: 'MAWB TOTAL FREIGHT AMOUNT', width: 100 },
        { field: 'COUNTRY', headerName: 'HAWB NO', width: 150 },
        { field: 'area', headerName: 'HAWB DATE', width: 100 },
        { field: 'AIR_LINE_NAME', headerName: 'HAWB TOTAL AMOUNT', width: 150 },
        { field: 'inv_no_dt', headerName: 'HAWB GROSS WEIGHT', width: 150 },
        { field: 'DESCRIPTION_OF_GOODS', headerName: 'HAWB CHARGEABLE WEIGHT (KG)', width: 150 },
        { field: 'pick_up_date', headerName: ' HAWB NO. OF PKGS', width: 150 },
        { field: 'CUSTOMS_CLEARANCE_DATE', headerName: 'SHIPPER', width: 150 },
        { field: 'FLIGHT_NO', headerName: 'CONSIGNEE', width: 150 },
        { field: 'first_flight', headerName: 'DESCRIPTION OF GOODS', width: 150 },
        { field: 'second_flight', headerName: 'ORIGIN', width: 150 },
        { field: 'mawb_pp_cc', headerName: 'DESTINATION', width: 150 },
        { field: 'MAWB_TOTAL_FREIGHT_AMOUNT', headerName: 'COUNTRY', width: 150 },
        { field: 'mawb_total_pp_amt', headerName: 'COUNTRY CODE', width: 150 },
        { field: 'surcharges', headerName: 'REGION CODE', width: 150 },
        { field: 'hawb_pp_cc', headerName: 'AIRLINE NAME', width: 150 },
        { field: 'hawb_currency', headerName: 'FLIGHT NO.', width: 150 },
        { field: 'hawb_amount', headerName: 'SHIPPER INVOICE NO', width: 150 },
        { field: 'sb_no_date', headerName: 'FOB VALUE INR', width: 150 },
        { field: 'fob_amt', headerName: 'CUSTOMS CLEARANCE DATE', width: 150 },
        { field: 'sb_copy_dispatch_dt', headerName: 'COMMODITY CODE', width: 150 },
        { field: 'documents_waybill_no', headerName: 'SHIPPING BILL NO', width: 150 },
        { field: 'handling_amt', headerName: 'SHIPPING BILL DATE', width: 150 },
        { field: 'nippon_inv_dt', headerName: 'NAME OF AGENT', width: 150 },
        { field: 'bills_dispatch_dt', headerName: 'IATA AGENT', width: 150 },
        { field: 'bills_courier_waybill_no', headerName: 'SUB AGENT', width: 150 },
        { field: 'ddu_ddp_inv_dt', headerName: 'DDU / DDP', width: 150 },
        { field: 'ddu_ddp_inv_dispatch_dt', headerName: 'REMARKS', width: 150 },
        { field: 'incoterm', headerName: 'EC COPY DISPATCH DT', width: 100 },
        { field: 'remark', headerName: 'DOCUMENT COURIER WAY BILLNO', width: 150 },
        { field: 'publish_rates', headerName: 'EP COPY DISPATCH DT', width: 150 },
        { field: 'buying_net_net_rates', headerName: 'BILLS DISPATCH DT', width: 150 },
        { field: 'fsc', headerName: 'BILLS COURIED WAY BILL NO', width: 100 },
        { field: 'scc', headerName: 'HANDOVER REMARKS', width: 100 },
        { field: 'other_surcharges', headerName: 'HANDOVER DATE', width: 150 },
        { field: 'service_type', headerName: 'CLARIFICATION REMARKS', width: 150 },
        { field: 'selling_net_net_rates', headerName: 'CLARIFICATION SENT DATE', width: 150 },
        { field: 'difference', headerName: 'CLARIFICATION REPLIED REMARKS', width: 100 },
        { field: 'profit_loss', headerName: 'CLARIFICATION REPLIED DATE', width: 150 },
        { field: 'total_all_freight_carrier', headerName: 'RECORD CREATED DATE', width: 150 },
       
     
      ],
      apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
    },
},
OceanImport: {
  report1: {
    headers: [
      
        { field: 'Register_id', headerName: 'S.N', width: 80 },
        { field: 'Branch_Name', headerName: 'BRANCH NAME', width: 150 },
        { field: 'Module_Type', headerName: 'MODULE TYPE', width: 150 },
        { field: 'Operation_Type', headerName: 'OPERATION TYPE', width: 150 },
        { field: 'OR_Reg_No', headerName: 'OR REG NO', width: 150 },
        { field: 'Industry', headerName: 'INDUSTRY', width: 150 },
        { field: 'Job_Docket_No', headerName: 'JOB / DOCKET NO', width: 150 },
        { field: 'Job_Cancelled_Status', headerName: 'JOB CANCELLED STATUS', width: 150 },
        { field: 'Shpt_Cleared_Date', headerName: 'SHPT CLEARED DATE', width: 150 },
        { field: 'Consignee', headerName: 'CONSIGNEE', width: 150 },
        { field: 'IE_Code', headerName: 'IE_CODE', width: 150 },
        { field: 'BOE_No', headerName: 'BOE NO', width: 150 },
        { field: 'BOE_Date', headerName: 'BOE DATE', width: 150 },
        { field: 'Type_Of_BOE', headerName: 'TYPE OF BOE', width: 150 },
        { field: 'Consignor', headerName: 'CONSIGNOR', width: 150 },
        { field: 'Origin', headerName: 'ORIGIN', width: 150 },
        { field: 'HBL_MBL_No', headerName: 'HBL/MBL.NO', width: 150 },
        { field: 'HBL_MBL_Date', headerName: 'HBL/MBL.DATE', width: 150 },
        { field: 'FHD', headerName: 'FHD (YES/NO)', width: 100 },
        { field: 'Shipt_Arrival_Date', headerName: 'SHIPT ARRIVAL DATE', width: 150 },
        { field: 'No_Of_Packages', headerName: 'NO OF PACKAGES', width: 150 },
        { field: 'Chargeable_Weight', headerName: 'CHARGEABLE WEIGHT', width: 150 },
        { field: 'Assessable_Value', headerName: 'ASSESSABLE VALUE', width: 150 },
        { field: 'Customs_Duty', headerName: 'CUSTOMS DUTY', width: 150 },
        { field: 'Challan_No', headerName: 'CHALLAN NO', width: 150 },
        { field: 'IGM_No', headerName: 'IGM.NO', width: 150 },
        { field: 'IGM_Date', headerName: 'IGM.DATE', width: 150 },
        { field: 'TAT_Cleared_Date_Shipt_Arrival_Date', headerName: 'TAT - CLEARED DATE & SHIPT ARRIVAL DATE', width: 250 },
        { field: 'TAT_BE_Date_Cleared_Date', headerName: 'TAT - BE DATE & CLEARED DATE', width: 250 },
        { field: 'Supplier_Invoice_No', headerName: 'SUPPLIER INVOICE NO', width: 150 },
        { field: 'Invoice_Date', headerName: 'INVOICE DATE', width: 150 },
        { field: 'Invoice_Value_INR', headerName: 'INVOICE VALUE IN INR', width: 150 },
        { field: 'Description', headerName: 'DESCRIPTION', width: 200 },
        { field: 'Receipt_No', headerName: 'RECEIPT NO', width: 150 },
        { field: 'Container_No', headerName: 'CONTAINER NO', width: 150 },
        { field: 'Total_Containers', headerName: 'TOTAL CONTAINERS', width: 150 },
        { field: 'LCL', headerName: 'LCL', width: 100 },
        { field: 'FCL', headerName: 'FCL', width: 100 },
        { field: 'Container_Type', headerName: 'CONTAINER TYPE', width: 150 },
        { field: 'Doc_Send_For_Billing', headerName: 'DOC SEND FOR BILLING', width: 150 },
        { field: 'Bond_No', headerName: 'BOND NO', width: 150 },
        { field: 'CTH_No', headerName: 'C T H NO', width: 150 },
        { field: 'Carting_Date', headerName: 'CARTING DATE', width: 150 },
        { field: 'CBM', headerName: 'CBM', width: 100 },
        { field: 'CFS', headerName: 'CFS', width: 100 },
        { field: 'CHA', headerName: 'CHA', width: 100 },
        { field: 'Cleared_Location', headerName: 'CLEARED LOCATION', width: 150 },
        { field: 'Closed_Open', headerName: 'CLOSED OPEN', width: 100 },
        { field: 'Container_Seal_No', headerName: 'CONTAINER SEAL NO', width: 150 },
        { field: 'Cost_Sheet_Preparation_Date', headerName: 'COST SHEET PREPARATION DATE', width: 200 },
        { field: 'Cost_Sheet_Send_Date', headerName: 'COST SHEET SEND DATE', width: 200 },
        { field: 'DC_No', headerName: 'DC NO', width: 150 },
        { field: 'DC_Date', headerName: 'DC DATE', width: 150 },
        { field: 'Delivery_Date', headerName: 'DELIVERY DATE', width: 150 },
        { field: 'Transporter_Details', headerName: 'TRANSPORTER DETAILS', width: 200 },
        { field: 'Vehicle_No', headerName: 'VEHICLE.NO', width: 150 },
        { field: 'Vehicle_Mode', headerName: 'VEHICLE MODE', width: 150 },
        { field: 'Way_Bill_No', headerName: 'WAY BILL.NO.', width: 150 },
        { field: 'Interest_Amount', headerName: 'INTEREST AMOUNT', width: 150 },
        { field: 'Late_Filing_Penalty', headerName: 'LATE FILING PENALTY', width: 150 },
        { field: 'OBL_Final_Docs_Rec_Dates', headerName: 'OBL FINAL DOCS RECD DATE', width: 150 },
        { field: 'Port_Of_Clearing', headerName: 'PORT OF CLEARING', width: 150 },
        { field: 'Post_Clearance_Handover', headerName: 'POST CLEARANCE HANDOVER', width: 150 },
        { field: 'Post_Clearance_Rec_Form_CHA', headerName: 'POST CLEARANCE RECD FORM CHA', width: 150 },
        { field: 'Vessel_Date', headerName: 'VESSEL DATE', width: 150 },
        { field: 'Vessel_IGM_Date', headerName: 'VESSEL IGM DATE', width: 150 },
        { field: 'Vessel_Name', headerName: 'VESSEL NAME', width: 150 },
        { field: 'Volume_In_CBM', headerName: 'VOLUME IN CBM', width: 150 },
        { field: 'Remarks', headerName: 'REMARKS', width: 200 },
        { field: 'Handover_Remarks', headerName: 'HANDOVER REMARKS', width: 200 },
        { field: 'Handover_Date', headerName: 'HANDOVER DATE', width: 150 },
        { field: 'Clarification_Remarks', headerName: 'CLARIFICATION REMARKS', width: 200 },
        { field: 'Clarification_Sent_Date', headerName: 'CLARIFICATION SENT DATE', width: 150 },
        { field: 'Clarification_Replied_Remarks', headerName: 'CLARIFICATION REPLIED REMARKS', width: 200 },
        { field: 'Clarification_Replied_Date', headerName: 'CLARIFICATION REPLIED DATE', width: 150 },
        { field: 'Record_Created_Date', headerName: 'RECORD CREATED DATE', width: 150 },
   
    
    ],
    apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
  }
},
OceanExport: {
  report1: {
    headers: [
      
        { field: 'Register_id', headerName: 'S.N', width: 80 },
        { field: 'Branch_Name', headerName: 'BRANCH NAME', width: 150 },
        { field: 'Module_Type', headerName: 'MODULE TYPE', width: 150 },
        { field: 'Operation_Type', headerName: 'OPERATION TYPE', width: 150 },
        { field: 'OR_Reg_No', headerName: 'OR REG NO', width: 150 },
        { field: 'Industry', headerName: 'INDUSTRY', width: 150 },
        { field: 'Job_Docket_No', headerName: 'JOB / DOCKET NO', width: 150 },
        { field: 'Job_Cancelled_Status', headerName: 'JOB CANCELLED STATUS', width: 150 },
        { field: 'IE_Code', headerName: 'IE_CODE', width: 150 },
        { field: 'Shipment_Type', headerName: 'SHIPMENT TYPE', width: 150 },
        { field: 'Shipper', headerName: 'SHIPPER', width: 150 },
        { field: 'Consignee', headerName: 'CONSIGNEE', width: 150 },
        { field: 'Invoice_No', headerName: 'INVOICE NO', width: 150 },
        { field: 'Invoice_Date', headerName: 'INVOICE DATE', width: 150 },
        { field: 'Invoice_Amount', headerName: 'INVOICE AMOUNT', width: 150 },
        { field: 'Payable_To_Overseas_USD', headerName: 'PAYABLE TO OVERSEAS USD', width: 150 },
        { field: 'Buying_Rate_Ocean_Freight_Local_USD', headerName: 'BUYING RATE OCEAN_FREIGHT LOCAL_USD', width: 250 },
        { field: 'Selling_Freight_Rate_USD', headerName: 'SELLING FREIGHT RATE_USD', width: 200 },
        { field: 'Total_Freight_INR', headerName: 'TOTAL FREIGHT IN_INR', width: 150 },
        { field: 'Margin', headerName: 'MARGIN', width: 150 },
        { field: 'MBL_No', headerName: 'MBL NO', width: 150 },
        { field: 'MBL_Date', headerName: 'MBL DATE', width: 150 },
        { field: 'HBL_No', headerName: 'HBL NO', width: 150 },
        { field: 'HBL_Date', headerName: 'HBL DATE', width: 150 },
        { field: 'Origin', headerName: 'ORIGIN', width: 150 },
        { field: 'FCL', headerName: 'FCL', width: 100 },
        { field: 'LCL_CBM', headerName: 'LCL CBM', width: 100 },
        { field: 'Commodity', headerName: 'COMMODITY', width: 150 },
        { field: 'No_Of_Packages', headerName: 'NO OF PACKAGES', width: 150 },
        { field: 'TEUs', headerName: 'TEUS', width: 100 },
        { field: 'Gross_Weight', headerName: 'GROSS WEIGHT', width: 150 },
        { field: 'Chargeable_Weight', headerName: 'CHARGEABLE WEIGHT', width: 150 },
        { field: 'Currency', headerName: 'CURRENCY', width: 100 },
        { field: 'FCL_TUES', headerName: 'FCL_TUES', width: 100 },
        { field: 'Container_No', headerName: 'CONTAINER NO', width: 150 },
        { field: 'Shipping_Line', headerName: 'SHIPPING LINE', width: 150 },
        { field: 'Shipping_Bill_No', headerName: 'SHIPPING BILL NO', width: 150 },
        { field: 'Shipping_Bill_Date', headerName: 'SHIPPING BILL DATE', width: 150 },
        { field: 'Liner', headerName: 'LINER', width: 150 },
        { field: 'Assessable_Value', headerName: 'ASSESSABLE VALUE', width: 150 },
        { field: 'Sector', headerName: 'SECTOR', width: 150 },
        { field: 'Sailing_Date', headerName: 'SAILING DATE', width: 150 },
        { field: 'Cleared_On', headerName: 'CLEARED ON', width: 150 },
        { field: 'SB_CC_GR_No', headerName: 'SB,CC,GR,NO', width: 150 },
        { field: 'Exporter_Invoice_No', headerName: 'EXPORTER INV NO', width: 150 },
        { field: 'Vessel_Voyage', headerName: 'VSL VOYAGE', width: 150 },
        { field: 'CHA_Name', headerName: 'CHA NAME', width: 150 },
        { field: 'Cargo_Received', headerName: 'CARGO RECEIVED', width: 150 },
        { field: 'ETD', headerName: 'ETD', width: 150 },
        { field: 'ETA', headerName: 'ETA', width: 150 },
        { field: 'Closed_Open', headerName: 'CLOSED/ OPEN', width: 100 },
        { field: 'FC_BRO_OK', headerName: 'FC BRO OK', width: 100 },
        { field: 'ETA_ICD_CFS', headerName: 'ETA ICD/CFS', width: 150 },
        { field: 'ETA_Mother_Port', headerName: 'ETA MOTHER PORT', width: 150 },
        { field: 'CTN', headerName: 'CTN', width: 100 },
        { field: 'EC_Copy_Dispatch_DT', headerName: 'EC COPY DISPATCH DT', width: 150 },
        { field: 'Document_Courier_Way_Bill_No', headerName: 'Document Courier WAY BILLNO', width: 200 },
        { field: 'EP_Copy_Dispatch_DT', headerName: 'EP COPY DISPATCH DT', width: 150 },
        { field: 'Bills_Dispatch_DT', headerName: 'BILLS DISPATCH DT', width: 150 },
        { field: 'Bills_Couriered_Way_Bill_No', headerName: 'BILLS COURIED WAY BILL NO', width: 200 },
        { field: 'Handover_Remarks', headerName: 'HANDOVER REMARKS', width: 200 },
        { field: 'Handover_Date', headerName: 'HANDOVER DATE', width: 150 },
        { field: 'Clarification_Remarks', headerName: 'CLARIFICATION REMARKS', width: 200 },
        { field: 'Clarification_Sent_Date', headerName: 'CLARIFICATION SENT DATE', width: 150 },
        { field: 'Clarification_Replied_Remarks', headerName: 'CLARIFICATION REPLIED REMARKS', width: 200 },
        { field: 'Clarification_Replied_Date', headerName: 'CLARIFICATION REPLIED DATE', width: 150 },
        { field: 'Record_Created_Date', headerName: 'RECORD CREATED DATE', width: 150 },
   
    
    ],
    apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
  }
}
},
  removals: {
    AirImport: {
      report1: {
        headers: [
          { field: 'Register_id', headerName: 'S.N', width: 80 },
{ field: 'Branch_Name', headerName: 'BRANCH NAME', width: 150 },
{ field: 'Module_Type', headerName: 'MODULE TYPE', width: 150 },
{ field: 'Operation_Type', headerName: 'OPERATION TYPE', width: 150 },
{ field: 'Registration_No', headerName: '* OR REG NO', width: 150 },
{ field: 'Industry', headerName: '* INDUSTRY', width: 150 },
{ field: 'Job_Docket_No', headerName: '* JOB / DOCKET NO', width: 150 },
{ field: 'Local_Account', headerName: '* LOCAL_ACCOUNT', width: 150 },
{ field: 'Shipper', headerName: '* SHIPPER', width: 150 },
{ field: 'Mode', headerName: '* MODE', width: 150 },
{ field: 'Commodity', headerName: '* COMMODITY', width: 150 },
{ field: 'Origin', headerName: '* ORIGIN', width: 150 },
{ field: 'Destination', headerName: '* DESTINATION', width: 150 },
{ field: 'Payment_Terms', headerName: '* PAYMENT_TERMS', width: 150 },
{ field: 'HAWB_No', headerName: '* HAWB_NO', width: 150 },
{ field: 'HAWB_Date', headerName: '* HAWB_DATE', width: 150 },
{ field: 'Flight_Details', headerName: '* FLIGHT_DETAILS', width: 150 },
{ field: 'No_of_Packages', headerName: '* NO OF PACKAGES', width: 150 },
{ field: 'Gross_Weight', headerName: '* GROSS WEIGHT', width: 150 },
{ field: 'Chargeable_Weight', headerName: '* CHARGEABLLE WEIGHT', width: 150 },
{ field: 'Arrival_Date', headerName: '* ARRIVAL_DATE', width: 150 },
{ field: 'DO_Received_On', headerName: '* DO_RECVD_ON', width: 150 },
{ field: 'PIC_Name', headerName: '* PIC_NAME', width: 150 },
{ field: 'Shipment_Cleared_On', headerName: '* SHPT_CLEARED_ON', width: 150 },
{ field: 'Delivery_Date', headerName: 'DELIVERY_DATE', width: 150 },
{ field: 'Gross_Margin', headerName: 'GROSS_MARGIN', width: 150 },
{ field: 'Transportation_Estimate', headerName: 'TRANSPORTATION_ESTIMATE', width: 150 },
{ field: 'Transportation_Cost', headerName: 'TRANSPORTATION_COST', width: 150 },
{ field: 'Transportation_Margin', headerName: 'TRANSPORTATION_MARGIN', width: 150 },
{ field: 'AAI_Charges', headerName: 'AAI_CHARGES', width: 150 },
{ field: 'Receipt_No', headerName: 'RECEIPT_NO', width: 150 },
{ field: 'Custom_Duty', headerName: 'CUSTOM_DUTY', width: 150 },
{ field: 'Custom_Duty_Check_No', headerName: 'CUSTOM_DUTY_CHQ_NO', width: 150 },
{ field: 'Remarks', headerName: 'REMARKS', width: 150 },
{ field: 'Handover_Remarks', headerName: 'HANDOVER REMARKS', width: 150 },
{ field: 'Handover_Date', headerName: 'HANDOVER DATE', width: 150 },
{ field: 'Clarification_Remarks', headerName: 'CLARIFICATION REMARKS', width: 150 },
{ field: 'Clarification_Sent_Date', headerName: 'CLARIFICATION SENT DATE', width: 150 },
{ field: 'Clarification_Replied_Remarks', headerName: 'CLARIFICATION REPLIED REMARKS', width: 150 },
{ field: 'Clarification_Replied_Date', headerName: 'CLARIFICATION REPLIED DATE', width: 150 },
{ field: 'Record_Created_Date', headerName: 'RECORD CREATED DATE', width: 150 },
        ],
        apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
      }
    },
    AirExport: {
      report1: {
        headers: [
          { field: 'Register_id', headerName: 'S.N', width: 80 },
{ field: 'Branch_Name', headerName: 'BRANCH NAME', width: 150 },
{ field: 'Module_Type', headerName: 'MODULE TYPE', width: 150 },
{ field: 'Operation_Type', headerName: 'OPERATION TYPE', width: 150 },
{ field: 'Registration_No', headerName: 'OR REG NO', width: 150 },
{ field: 'Industry', headerName: '* INDUSTRY', width: 150 },
{ field: 'Job_Docket_No', headerName: '* JOB / DOCKET NO', width: 150 },
{ field: 'Local_Account', headerName: '* LOCAL_ACCOUNT', width: 150 },
{ field: 'Shipper', headerName: '* SHIPPER', width: 150 },
{ field: 'Mode', headerName: '* MODE', width: 150 },
{ field: 'Commodity', headerName: '* COMMODITY', width: 150 },
{ field: 'Origin', headerName: '* ORIGIN', width: 150 },
{ field: 'Destination', headerName: '* DESTINATION', width: 150 },
{ field: 'Payment_Terms', headerName: '* PAYMENT TERMS', width: 150 },
{ field: 'MAWB_No', headerName: '* MAWB NO', width: 150 },
{ field: 'HAWB_No', headerName: '* HAWB NO', width: 150 },
{ field: 'Flight_Details', headerName: '* FLIGHT DETAILS', width: 150 },
{ field: 'ETD', headerName: '* ETD', width: 150 },
{ field: 'Air_Freight', headerName: '* AIR FREIGHT', width: 150 },
{ field: 'No_of_Packages', headerName: '* NO OF PACKAGES', width: 150 },
{ field: 'Gross_Weight', headerName: '* GROSS WEIGHT', width: 150 },
{ field: 'Chargeable_Weight', headerName: '* CHARGEABLE WEIGHT', width: 150 },
{ field: 'Arrival_Date', headerName: '* ARRIVAL DATE', width: 150 },
{ field: 'DO_Received_On', headerName: '* DO RECVD ON', width: 150 },
{ field: 'PIC_Name', headerName: '* PIC NAME', width: 150 },
{ field: 'Shipment_Cleared_On', headerName: '* SHPT CLEARED ON', width: 150 },
{ field: 'Delivery_Date', headerName: 'DELIVERY DATE', width: 150 },
{ field: 'Gross_Margin', headerName: 'GROSS MARGIN', width: 150 },
{ field: 'Transportation_Estimate', headerName: 'TRANSPORTATION ESTIMATE', width: 150 },
{ field: 'Transportation_Cost', headerName: 'TRANSPORTATION COST', width: 150 },
{ field: 'Transportation_Margin', headerName: 'TRANSPORTATION MARGIN', width: 150 },
{ field: 'AAI_Charges', headerName: 'AAI CHARGES', width: 150 },
{ field: 'Receipt_No', headerName: 'RECEIPT NO', width: 150 },
{ field: 'Custom_Duty', headerName: 'CUSTOM DUTY', width: 150 },
{ field: 'Custom_Duty_Check_No', headerName: 'CUSTOM DUTY CHQ NO', width: 150 },
{ field: 'Remarks', headerName: 'REMARKS', width: 150 },
{ field: 'Handover_Remarks', headerName: 'HANDOVER REMARKS', width: 150 },
{ field: 'Handover_Date', headerName: 'HANDOVER DATE', width: 150 },
{ field: 'Clarification_Remarks', headerName: 'CLARIFICATION REMARKS', width: 150 },
{ field: 'Clarification_Sent_Date', headerName: 'CLARIFICATION SENT DATE', width: 150 },
{ field: 'Clarification_Replied_Remarks', headerName: 'CLARIFICATION REPLIED REMARKS', width: 150 },
{ field: 'Clarification_Replied_Date', headerName: 'CLARIFICATION REPLIED DATE', width: 150 },
{ field: 'Record_Created_Date', headerName: 'RECORD CREATED DATE', width: 150 },
        ],
        apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
      }
    },
    OceanImport: {
      report1: {
        headers: [
          { field: 'Register_id', headerName: 'S.N', width: 80 },
{ field: 'Branch_Name', headerName: 'BRANCH NAME', width: 150 },
{ field: 'Module_Type', headerName: 'MODULE TYPE', width: 150 },
{ field: 'Operation_Type', headerName: 'OPERATION TYPE', width: 150 },
{ field: 'Registration_No', headerName: 'OR REG NO', width: 150 },
{ field: 'Industry', headerName: '* INDUSTRY', width: 150 },
{ field: 'Job_No', headerName: '* JOB NO', width: 150 },
{ field: 'Account', headerName: '* ACCOUNT', width: 150 },
{ field: 'Shipper', headerName: '* SHIPPER', width: 150 },
{ field: 'Mode', headerName: '* MODE', width: 150 },
{ field: 'Origin', headerName: '* ORIGIN', width: 150 },
{ field: 'Destination', headerName: '* DEST', width: 150 },
{ field: 'Payment_Terms', headerName: '* PAYMENT TERMS', width: 150 },
{ field: 'HBL', headerName: '* HBL', width: 150 },
{ field: 'MBL', headerName: '* MBL', width: 150 },
{ field: 'Container_No', headerName: 'CONTAINER NO', width: 150 },
{ field: 'No_of_Packages', headerName: '* NO OF PACKAGES', width: 150 },
{ field: 'Gross_Weight', headerName: '* GROSS WEIGHT', width: 150 },
{ field: 'Chargeable_Weight', headerName: '* CHARGEABLE WEIGHT', width: 150 },
{ field: 'ETD', headerName: '* ETD', width: 150 },
{ field: 'ETA', headerName: '* ETA', width: 150 },
{ field: 'Railed_Out_Date', headerName: 'RAILED OUT DATE', width: 150 },
{ field: 'ETA_New_Delhi', headerName: 'ETA NEW DELHI', width: 150 },
{ field: 'Can_Received_On', headerName: '* CAN RECVD ON', width: 150 },
{ field: 'PIC_Name', headerName: '* PIC NAME', width: 150 },
{ field: 'Handover_At_ICD_CFS', headerName: 'HANDOVER AT ICD CFS', width: 150 },
{ field: 'Shipment_Cleared_On', headerName: '* SHPT CLEARED ON', width: 150 },
{ field: 'Delivery_Date', headerName: '* DELIVERY DATE', width: 150 },
{ field: 'Arrival_Clearance_Port', headerName: 'ARRIVAL CLEARNCE PORT', width: 150 },
{ field: 'Arrival_Sea_Port', headerName: 'ARRIVAL SEA PORT', width: 150 },
{ field: 'Gross_Margin', headerName: 'GROSS MARGIN', width: 150 },
{ field: 'Transportation_Estimate', headerName: 'TRANSPORTATION ESTIMATE', width: 150 },
{ field: 'Transportation_Cost', headerName: 'TRANSPORTATION COST', width: 150 },
{ field: 'Transportation_Margin', headerName: 'TRANSPORTATION MARGIN', width: 150 },
{ field: 'CWC_Charges', headerName: 'CWC CHARGES', width: 150 },
{ field: 'Receipt_No', headerName: 'RECEIPT NO', width: 150 },
{ field: 'Custom_Duty', headerName: 'CUSTOM DUTY', width: 150 },
{ field: 'Custom_Duty_Check_No', headerName: 'CUSTOM DUTY CHQ NO', width: 150 },
{ field: 'Remarks', headerName: 'REMARKS', width: 150 },
{ field: 'Handover_Remarks', headerName: 'HANDOVER REMARKS', width: 150 },
{ field: 'Handover_Date', headerName: 'HANDOVER DATE', width: 150 },
{ field: 'Clarification_Remarks', headerName: 'CLARIFICATION REMARKS', width: 150 },
{ field: 'Clarification_Sent_Date', headerName: 'CLARIFICATION SENT DATE', width: 150 },
{ field: 'Clarification_Replied_Remarks', headerName: 'CLARIFICATION REPLIED REMARKS', width: 150 },
{ field: 'Clarification_Replied_Date', headerName: 'CLARIFICATION REPLIED DATE', width: 150 },
{ field: 'Record_Created_Date', headerName: 'RECORD CREATED DATE', width: 150 },
        ],
        apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
      }
    },
    OceanExport: {
      report1: {
        headers: [
          { field: 'Register_id', headerName: 'S.N', width: 80 },
{ field: 'Branch_Name', headerName: 'BRANCH NAME', width: 150 },
{ field: 'Module_Type', headerName: 'MODULE TYPE', width: 150 },
{ field: 'Operation_Type', headerName: 'OPERATION TYPE', width: 150 },
{ field: 'Or_Reg_No', headerName: 'OR REG NO', width: 150 },
{ field: 'Industry', headerName: 'INDUSTRY', width: 150 },
{ field: 'Job_Docket_No', headerName: 'JOB / DOCKET NO', width: 150 },
{ field: 'Account', headerName: 'ACCOUNT', width: 150 },
{ field: 'Shipper', headerName: 'SHIPPER', width: 150 },
{ field: 'Mode', headerName: 'MODE', width: 100 },
{ field: 'Origin', headerName: 'ORIGIN', width: 150 },
{ field: 'Destination', headerName: 'DESTINATION', width: 150 },
{ field: 'HBL', headerName: 'HBL', width: 100 },
{ field: 'MBL', headerName: 'MBL', width: 100 },
{ field: 'Container_No', headerName: 'CONTAINER NO', width: 150 },
{ field: 'ETD', headerName: 'ETD', width: 100 },
{ field: 'No_Of_Packages', headerName: 'NO OF PACKAGES', width: 150 },
{ field: 'Gross_Weight', headerName: 'GROSS WEIGHT', width: 150 },
{ field: 'Chargeable_Weight', headerName: 'CHARGEABLE WEIGHT', width: 150 },
{ field: 'Payment_Terms', headerName: 'PAYMENT TERMS', width: 150 },
{ field: 'Ocean_Freight', headerName: 'OCEAN FREIGHT', width: 150 },
{ field: 'Shpt_Cleared_On', headerName: 'SHPT CLEARED ON', width: 150 },
{ field: 'IHC_BL_Others_Charges', headerName: 'IHC, BL OTHERS CHARGES', width: 200 },
{ field: 'Gross_Margin', headerName: 'GROSS MARGIN', width: 150 },
{ field: 'Transportation_Estimate', headerName: 'TRANSPORTATION ESTIMATE', width: 150 },
{ field: 'Transportation_Cost', headerName: 'TRANSPORTATION COST', width: 150 },
{ field: 'Transportation_Margin', headerName: 'TRANSPORTATION MARGIN', width: 150 },
{ field: 'Packing_List_Currency', headerName: 'PACKING LIST (CURRENCY)', width: 150 },
{ field: 'Packing_List_Total_Amount', headerName: 'PACKING LIST (TOTAL AMOUNT)', width: 150 },
{ field: 'Premium_Percent', headerName: 'PREMIUM (%)', width: 100 },
{ field: 'Insurance_Amount_JPY_Currency', headerName: 'INSURANCE AMOUNT (JPY/CUR)', width: 200 },
{ field: 'Insurance_Amount', headerName: 'INSURANCE AMOUNT', width: 150 },
{ field: 'Exchange_Rates_Billing_Date', headerName: 'EXCHANGE RATES (BILLING DATE)', width: 200 },
{ field: 'Insurance_Amount_INR', headerName: 'INSURANCE AMOUNT (INR)', width: 150 },
{ field: 'Premium_Amount_USD', headerName: 'PREMIUM AMOUNT (USD)', width: 150 },
{ field: 'Vessel', headerName: 'VESSEL', width: 100 },
{ field: 'Receipt_No', headerName: 'RECEIPT NO', width: 150 },
{ field: 'Pic_Name', headerName: 'PIC NAME', width: 150 },
{ field: 'Handover_Remarks', headerName: 'HANDOVER REMARKS', width: 200 },
{ field: 'Handover_Date', headerName: 'HANDOVER DATE', width: 150 },
{ field: 'Clarification_Remarks', headerName: 'CLARIFICATION REMARKS', width: 200 },
{ field: 'Clarification_Sent_Date', headerName: 'CLARIFICATION SENT DATE', width: 150 },
{ field: 'Clarification_Replied_Remarks', headerName: 'CLARIFICATION REPLIED REMARKS', width: 200 },
{ field: 'Clarification_Replied_Date', headerName: 'CLARIFICATION REPLIED DATE', width: 150 },
{ field: 'Record_Created_Date', headerName: 'RECORD CREATED DATE', width: 150 },
        ],
        apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
      }
    },
    Domestic: {
      report1: {
        headers: [
          { field: 'Register_id', headerName: 'S.N', width: 80 },
{ field: 'Branch_Name', headerName: 'BRANCH NAME', width: 150 },
{ field: 'Module_Type', headerName: 'MODULE TYPE', width: 150 },
{ field: 'Operation_Type', headerName: 'OPERATION TYPE', width: 150 },
{ field: 'Or_Reg_No', headerName: 'OR REG NO', width: 150 },
{ field: 'Industry', headerName: 'INDUSTRY', width: 150 },
{ field: 'Job_Docket_No', headerName: 'JOB / DOCKET NO', width: 150 },
{ field: 'Account', headerName: 'ACCOUNT', width: 150 },
{ field: 'Shipper', headerName: 'SHIPPER', width: 150 },
{ field: 'Type', headerName: 'TYPE', width: 100 },
{ field: 'Mode', headerName: 'MODE', width: 100 },
{ field: 'Origin', headerName: 'ORIGIN', width: 150 },
{ field: 'Destination', headerName: 'DESTINATION', width: 150 },
{ field: 'Volume_KG_CBM', headerName: 'VOLUME- KG/CBM', width: 150 },
{ field: 'Pkts', headerName: 'PKTS', width: 100 },
{ field: 'Payment_Terms', headerName: 'PAYMENT TERMS', width: 150 },
{ field: 'Delivery_Date', headerName: 'DELIVERY DATE', width: 150 },
{ field: 'Gross_Margin', headerName: 'GROSS MARGIN', width: 150 },
{ field: 'Transportation_Estimate', headerName: 'TRANSPORTATION ESTIMATE', width: 150 },
{ field: 'Transportation_Cost', headerName: 'TRASPORTATION COST', width: 150 },
{ field: 'Transportation_Margin', headerName: 'TRANSPORTATION MARGIN', width: 150 },
{ field: 'Remarks', headerName: 'REMARKS', width: 200 },
{ field: 'Handover_Remarks', headerName: 'HANDOVER REMARKS', width: 200 },
{ field: 'Handover_Date', headerName: 'HANDOVER DATE', width: 150 },
{ field: 'Clarification_Remarks', headerName: 'CLARIFICATION REMARKS', width: 200 },
{ field: 'Clarification_Sent_Date', headerName: 'CLARIFICATION SENT DATE', width: 150 },
{ field: 'Clarification_Replied_Remarks', headerName: 'CLARIFICATION REPLIED REMARKS', width: 200 },
{ field: 'Clarification_Replied_Date', headerName: 'CLARIFICATION REPLIED DATE', width: 150 },
{ field: 'Record_Created_Date', headerName: 'RECORD CREATED DATE', width: 150 },
        ],
        apiEndpoint: 'http://localhost:5000/Reports/aefRegister'
      }
    }
  },
};

let tabs={};
function updatetabs(){

 tabs = {
  ff:{
    AirImport:[
    {label: 'Air import', component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },
    // {label:'Air import 2',component:<h1>ff Air import2 componnet</h1>} ,
    // {label:'Air import 3',component:<h1>ff Air import 3 componnet</h1>} ,
    // {label:'Air import 4',component:<h1>ff Air import 4 componnet</h1>} ,
    ],
   
    AirExport: [
      {label:'AEF REGISTER', component: configState.currentConfig&&<AEFRegister props={configState.currentConfig['report1']}/>},
      {label:'DAILY STATUS', component: configState.currentConfig&&<DailyStatus props={configState.currentConfig['report2']}/>},
      {label:'2023 v 2024',component:<MonthComparision props={configState}/>},
      {label:'CHA',component: configState.currentConfig&&<CHAReport props={configState.currentConfig['report1']}/>},
      {label:'AWR',component:<AWR props={configState.toDate}/>},
      {label:'CWR',component:<CWRData props={configState}/>},
      {label:'TOP 15',component:<Top15 props={configState.toDate}/>},
      {label:'TOP CARRIER',component:<TopCarrier props={configState.toDate}/>},
      {label:'PIC',component:<Pic props={configState.toDate}/>},
      // {label:'CUSTOM REPORT',component:<h1>CUSTOM REPORT</h1>},
    ],
    OceanImport: [
      {label:'Ocean import',component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },
     
    ],
    OceanExport:[
      {label:'Ocean Export ',component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },
     
    ]
  },
  cha:{
    AirImport:[
      {label:'Air import',component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },
   
      ],
     
      AirExport: [
        {label:'Air Export',component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },

      ],
      OceanImport: [
        {label:'Ocean import',component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },

      ],
      OceanExport:[
        {label:'Ocean Export',component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },
      
      ]
  },
  removals:{
    AirImport:[
      {label:'Air import',component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },

      ],
     
      AirExport: [
        {label:'Air Export',component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },

      ],
      OceanImport: [
        {label:'Ocean import',component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },

      ],
      OceanExport:[
        {label:'Ocean Export',component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },

      ],
      Domestic:[
        {label:'Domestic',component: configState.currentConfig&&<CommonReport props={configState.currentConfig['report1']}/> },

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
                      sx: {
                        '& .MuiInputBase-input': {
                          padding: '8.5px',
                        },
                        '& .MuiInputLabel-root': {
                          top: '-5px', // Adjust this value as needed
                        },
                      },
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
                      sx: {
                        '& .MuiInputBase-input': {
                          padding: '8.5px',
                        },
                        '& .MuiInputLabel-root': {
                          top: '-5px', // Adjust this value as needed
                        },
                      },
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