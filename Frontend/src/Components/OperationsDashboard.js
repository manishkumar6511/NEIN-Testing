import React from "react";
import { Box, Card, CardContent, Grid, Button, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import TmsRouting from "../Tms-Routes/tmsRouting";

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

function OperationsDashboard() {
  const navigate = useNavigate();

  const handleOperationClick = (operation, isAccessible) => {
    if (isAccessible) {
      navigate('/Operation/Pending', { state: { type: operation } });
    }
  };

  let menu = {};
  const storedUser = sessionStorage.getItem('userDetails');
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

  // Utility function to check access
  const checkAccess = (operation) => {
   // console.log("access",menu[operation]);
    return menu&&menu[operation] || false;
  };

  const getAccessStyle = (operation) => ({
    cursor: checkAccess(operation) ? '' : 'not-allowed',
    pointerEvents: checkAccess(operation) ? '' : 'all'
  });

  return (
    <div>
      <Card className="card">
        <CardContent>
          <h4>Freight Forwarding</h4>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Button
                  onClick={() => handleOperationClick('Air Export', checkAccess('Freight Forwarding-Air Export'))}
                  disabled={!checkAccess('Freight Forwarding-Air Export')}
                  style={getAccessStyle('Freight Forwarding-Air Export')}
                >
                  <img src={airExportFF} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Air Export</p>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={() => handleOperationClick('Air Import', checkAccess('Freight Forwarding-Air Import'))}
                  disabled={!checkAccess('Freight Forwarding-Air Import')}
                  style={getAccessStyle('Freight Forwarding-Air Import')}
                >
                  <img src={airImportFF} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Air Import</p>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={() => handleOperationClick('Ocean Export', checkAccess('Freight Forwarding-Ocean Export'))}
                  disabled={!checkAccess('Freight Forwarding-Ocean Export')}
                  style={getAccessStyle('Freight Forwarding-Ocean Export')}
                >
                  <img src={oceanExportFF} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Ocean Export</p>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={() => handleOperationClick('Ocean Import', checkAccess('Freight Forwarding-Ocean Import'))}
                  disabled={!checkAccess('Freight Forwarding-Ocean Import')}
                  style={getAccessStyle('Freight Forwarding-Ocean Import')}
                >
                  <img src={oceanImportFF} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Ocean Import</p>
              </Grid>
            </Grid>
          </Box>

          <Divider />
          <h4>Custom Brokerage</h4>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Button
                  component={Link}
                  to={checkAccess('Custom Brokerage-Air Export') ? "/Operations/CustomBrokerage/AirExport" : "#"}
                  disabled={!checkAccess('Custom Brokerage-Air Export')}
                  style={getAccessStyle('Custom Brokerage-Air Export')}
                >
                  <img src={airExportCB} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Air Export</p>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={Link}
                  to={checkAccess('Custom Brokerage-Air Import') ? "/Operations/CustomBrokerage/AirImport" : "#"}
                  disabled={!checkAccess('Custom Brokerage-Air Import')}
                  style={getAccessStyle('Custom Brokerage-Air Import')}
                >
                  <img src={airImportCB} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Air Import</p>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={Link}
                  to={checkAccess('Custom Brokerage-Ocean Export') ? "/Operations/CustomBrokerage/OceanExport" : "#"}
                  disabled={!checkAccess('Custom Brokerage-Ocean Export')}
                  style={getAccessStyle('Custom Brokerage-Ocean Export')}
                >
                  <img src={oceanExportCB} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Ocean Export</p>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={Link}
                  to={checkAccess('Custom Brokerage-Ocean Import') ? "/Operations/CustomBrokerage/OceanImport" : "#"}
                  disabled={!checkAccess('Custom Brokerage-Ocean Import')}
                  style={getAccessStyle('Custom Brokerage-Ocean Import')}
                >
                  <img src={oceanImportCB} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Ocean Import</p>
              </Grid>
            </Grid>
          </Box>

          <Divider />
          <h4>Removals</h4>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Grid container spacing={2}>
              <Grid item xs={2.4}>
                <Button
                  component={Link}
                  to={checkAccess('Removals-Air Export') ? "/Operations/Removals/AirExport" : "#"}
                  disabled={!checkAccess('Removals-Air Export')}
                  style={getAccessStyle('Removals-Air Export')}
                >
                  <img src={airExportRM} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Air Export</p>
              </Grid>
              <Grid item xs={2.4}>
                <Button
                  component={Link}
                  to={checkAccess('Removals-Air Import') ? "/Operations/Removals/AirImport" : "#"}
                  disabled={!checkAccess('Removals-Air Import')}
                  style={getAccessStyle('Removals-Air Import')}
                >
                  <img src={airImportRM} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Air Import</p>
              </Grid>
              <Grid item xs={2.4}>
                <Button
                  component={Link}
                  to={checkAccess('Removals-Ocean Export') ? "/Operations/Removals/OceanExport" : "#"}
                  disabled={!checkAccess('Removals-Ocean Export')}
                  style={getAccessStyle('Removals-Ocean Export')}
                >
                  <img src={oceanExportRM} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Ocean Export</p>
              </Grid>
              <Grid item xs={2.4}>
                <Button
                  component={Link}
                  to={checkAccess('Removals-Ocean Import') ? "/Operations/Removals/OceanImport" : "#"}
                  disabled={!checkAccess('Removals-Ocean Import')}
                  style={getAccessStyle('Removals-Ocean Import')}
                >
                  <img src={oceanImportRM} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Ocean Import</p>
              </Grid>
              <Grid item xs={2.4}>
                <Button
                  component={Link}
                  to={checkAccess('Removals-Domestic') ? "/Operations/Removals/Domestic" : "#"}
                  disabled={!checkAccess('Removals-Domestic')}
                  style={getAccessStyle('Removals-Domestic')}
                >
                  <img src={domesticRM} alt="Booking Icon" />
                </Button>
                <p className="paragraph">Domestic</p>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default OperationsDashboard;
