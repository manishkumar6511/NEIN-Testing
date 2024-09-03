import React,{useEffect, useState,useContext} from "react";

import Box from '@mui/material/Box';

import { Card, CardContent, Typography,Grid,Button } from '@mui/material';

import AirImportIcon from './../Images/icons8-airplane-take-off-100.png';
import OceanIcon from './../Images/icons8-water-transportation-100.png';
import Divider from '@mui/material/Divider';
import OceanFreight from './../Images/water-transportation.png';
import airIcon from './../Images/icons8-flight-100.png';
import TmsRouting from "../Tms-Routes/tmsRouting";
import { Link } from 'react-router-dom';
import plane from './../Images/OIP.jpg'
import airExportFF from './../Images/globe.png';
import airImportFF from './../Images/air-freight.png';
import airImportCB from './../Images/air-cargo.png';
import airExportCB from './../Images/cargo.png';
import oceanExportFF from './../Images/oceanExportFF.png';
import oceanExportCB from './../Images/oceanExportCB.png';
import oceanImportCB from './../Images/oceanImportCB.png';
import oceanImportFF from './../Images/oceanImportFF.png';
import airImportRM from './../Images/airImportRM.png';
import airExportRM from './../Images/AirexportRM.png';
import oceanImportRM from './../Images/oceanImportRM.png';
import oceanExportRM from './../Images/oceanExportRM.png';
import domesticRM from './../Images/domestic.png';
import './CSS/OperationDashboard.css';
import { useNavigate } from 'react-router-dom';

function OperationsDashboard(){

  const navigate = useNavigate();

  const handleOperationClick = () => {
    navigate('/Operation/Pending', { state: { type: 'Air Export' } });
  };

return(
<div>
   
<Card className="card">
    <CardContent>
     
       <h4>Freight Forwarding</h4>
      
    
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Grid container spacing={2}>
         
          <Grid item xs={3}>
           
          <Button onClick={handleOperationClick}>        
           <img src={airExportFF} alt="Booking Icon"  />
           </Button>     
              <p className="paragraph">Air Export</p>
              
          
            </Grid>
            <Grid item xs={3}>
           
           <Link
            to={{
               pathname:"/Operations/FreightForwarding/AirImport",
               state: { type: 'Air Import' }
            }}
           >
             <img src={airImportFF} alt="Booking Icon" />
             </Link>
             <p className="paragraph">Air Import</p>
           
         </Grid>
            <Grid item xs={3}>
           
            <Link 
            to={{
             pathname:"/Operations/FreightForwarding/OceanExport",
             state: { type: 'Ocean Export' }
            }}
            
            >
              <img src={oceanExportFF} alt="Booking Icon" />
              </Link>
              <p className="paragraph">Ocean Export</p>
           
          </Grid>
            <Grid item xs={3}>
           
            <Link 
            to={{
             pathname:"/Operations/FreightForwarding/OceanImport",
             state: { type: 'Ocean Import' }
          }}
            >
              <img src={oceanImportFF} alt="Booking Icon" />
              </Link>
              <p className="paragraph">Ocean Import</p>
           
          </Grid>
          
         </Grid>
         </Box>
        
         <Divider/>
         <h4>Custom Brokerage</h4>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Grid container spacing={2}>
         
          <Grid item xs={3}>
            
            <Link to="/Operations/CustomBrokerage/AirExport">
              <img src={airExportCB} alt="Booking Icon"/>
              </Link>
              <p className="paragraph">Air Export</p>
            
            </Grid>
            <Grid item xs={3}>
           
           <Link to="/Operations/CustomBrokerage/AirImport">
             <img src={airImportCB} alt="Booking Icon"  />
             </Link>
             <p className="paragraph">Air Import</p>
          
         </Grid>
           
          <Grid item xs={3}>
           
            <Link to="/Operations/CustomBrokerage/OceanExport">
              <img src={oceanExportCB} alt="Booking Icon"/>
              </Link>
              <p className="paragraph">Ocean Export</p>
           
          </Grid>
          <Grid item xs={3}>
           
           <Link to="/Operations/CustomBrokerage/OceanImport">
             <img src={oceanImportCB} alt="Booking Icon"/>
             </Link>
             <p className="paragraph">Ocean Import</p>
          
         </Grid>
         </Grid>
         </Box>





         <Divider/>
         <h4>Removals</h4>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Grid container spacing={2}>
        
          <Grid item xs={2.4}>
            
            <Link to="/Operations/Removals/AirExport">
              <img src={airExportRM} alt="Booking Icon"/>
              </Link>
              <p className="paragraph">Air Export</p>
            
            </Grid>
            <Grid item xs={2.4}>
           
           <Link to="/Operations/Removals/AirImport">
             <img src={airImportRM} alt="Booking Icon"  />
             </Link>
             <p className="paragraph">Air Import</p>
          
         </Grid>
           
          <Grid item xs={2.4}>
           
            <Link to="/Operations/Removals/OceanExport">
              <img src={oceanExportRM} alt="Booking Icon"/>
              </Link>
              <p className="paragraph">Ocean Export</p>
           
          </Grid>
          <Grid item xs={2.4}>
           
           <Link to="/Operations/Removals/OceanImport">
             <img src={oceanImportRM} alt="Booking Icon"/>
             </Link>
             <p className="paragraph">Ocean Import</p>
          
         </Grid>
          <Grid item xs={2.4}>
           
           <Link to="/Operations/Removals/Domestic">
             <img src={domesticRM} alt="Booking Icon"/>
             </Link>
             <p className="paragraph">Domestic</p>
          
         </Grid>
         </Grid>
         </Box>
    </CardContent>
  </Card>
  <Box component="main" sx={{ flexGrow: 1, p: 3 ,py:8}}>
    <TmsRouting/>
  </Box>

</div>

)


}
export default OperationsDashboard;