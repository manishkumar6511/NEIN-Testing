import React from "react";
import { Route, Routes } from "react-router-dom";
import OperationsDashboard from "../Components/OperationsDashboard";
import AirExport from "../Components/FreightForwading/AirExport";
import DashboardOR from "../Dashboard/Dashboard";
import Reports from "../Components/Reports/Reports";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Testing from "../Testing";
import AirImport from "../Components/FreightForwading/AirImport";
import OceanExport from "../Components/FreightForwading/OceanExport";
import OceanImport from "../Components/FreightForwading/OceanImport";
import AirImportCB from "../Components/CustomBrokerage/AirImportCB";
import AirExportCB from "../Components/CustomBrokerage/AirExportCB";
import OceanImportCB from "../Components/CustomBrokerage/OceanImportCB";
import OceanExportCB from "../Components/CustomBrokerage/OceanExportCB";
import Masters from "../Components/Masters/Master";
import AirImportRM from "../Components/Removals/AirImportRM";
import AirExportRM from "../Components/Removals/AirExportRM";
import OceanImportRM from "../Components/Removals/OceanImport";
import OceanExportRM from "../Components/Removals/OceanExportRM";
import DomesticRM from "../Components/Removals/DomesticRM";
import FinanceReport from "../Components/Finance/FinanceReport";
import EditOperations from "../Components/EditOperationsData";
import PendingFTP from "../Components/PendingFTPData";
import BranchChart from "../Components/FreightForwading/Dashboard";
// import HelpButton from "../Components/centralized_components/Help";
function tmsRouting(){

  return(
<>

<DndProvider backend={HTML5Backend}>
         <Routes>
        <Route path="/Operations" element={<OperationsDashboard />} /> 
        <Route path="/Operations/FreightForwarding/AirExport" element={<AirExport />} /> 
        <Route path="/Operations/FreightForwarding/AirImport" element={<AirImport />} />
        <Route path="/Operations/FreightForwarding/OceanExport" element={<OceanExport />} />
        <Route path="/Operations/FreightForwarding/OceanImport" element={<OceanImport />} />
        <Route path="/Operations/CustomBrokerage/AirImport" element={<AirImportCB />} />
        <Route path="/Operations/CustomBrokerage/AirExport" element={<AirExportCB />} />
        <Route path="/Operations/CustomBrokerage/OceanImport" element={<OceanImportCB />} />
        <Route path="/Operations/CustomBrokerage/OceanExport" element={<OceanExportCB />} />
        <Route path="/Operations/Removals/AirImport" element={<AirImportRM />} />
        <Route path="/Operations/Removals/AirExport" element={<AirExportRM />} />
        <Route path="/Operations/Removals/OceanImport" element={<OceanImportRM />} />
        <Route path="/Operations/Removals/OceanExport" element={<OceanExportRM />} />
        <Route path="/Operations/Removals/Domestic" element={<DomesticRM />} />
        <Route path="/Dashboard" element={<BranchChart />} /> 
       <Route path="/Reports" element={<Reports/>}/>
       <Route path="/Testing" element={<Testing/>}/>
       <Route path="/Masters" element={<Masters/>}/>
       <Route path="/FinanceReport" element={<FinanceReport />} />
       <Route path="/ViewEdit" element={<EditOperations />} />
       <Route path="Operation/Pending" element={<PendingFTP />} />
       
      </Routes> 
      </DndProvider>

</>
  );
}

export default tmsRouting;
