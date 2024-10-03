import React, { useState, useEffect } from 'react';
import { DataGrid,GridToolbar,GridToolbarExport,GridToolbarContainer } from '@mui/x-data-grid';
import axios from 'axios';
import TruckLoder from '../centralized_components/truckLoder';
import * as XLSX from 'xlsx';  // Import xlsx for Excel export
import { saveAs } from 'file-saver';  // For saving the file
import { Button } from '@mui/material';

// import './ScrollableTable.css';
const CHAReport = ({ props }) => {

    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // Set headers when props.headers changes
    useEffect(() => {
      if (props.headers) {
        setHeaders(props.headers);
      }
    }, [props.headers]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(props.apiEndpoint,{
            subBranch:props.config.configState.subBranch,
            fromDate:props.config.configState.fromDate,
            toDate:props.config.configState.toDate,
          });
          console.log("Headers:", headers);
          console.log("API Response Data:", response.data);
  
          // Transform data according to headers
          const transformedData = response.data.map((item) => {
            // Initialize an empty object for the transformed row
            const transformedRow = {};
  
            // Iterate through headers to map API response fields
            headers.forEach((header) => {
              const field = header.field; // Get field name from header
              transformedRow[field] = item[field] !== undefined ? item[field] : ''; // Default to empty string if field is missing
            });
  
            // Ensure Register_id is set correctly as unique id
            transformedRow.id = item.Register_id;
  
            // Log the transformed row for debugging
           // console.log("Transformed Row:", transformedRow);
  
            // Return the transformed row
            return transformedRow;
          });
  
          // Set the transformed data
          setData(transformedData);
          
        } catch (error) {
          console.error('Error fetching data:', error);
         
        }finally{
          setLoading(false);
        }
      };
  
      // Fetch data only if headers are set and not empty
      if (headers.length > 0) {
        fetchData();
      }
    }, [props.apiEndpoint, headers]);
  
    const exportToExcel = () => {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
  
      // Map the headers to create a worksheet header
      const wsHeaders = headers.map((col) => col.headerName);
  
      // Map the rows to match the header structure
      const wsData = data.map((row) =>
        headers.map((col) => row[col.field])  // Map each field in the headers to the row data
      );
  
      // Add headers at the top of the data
      const ws = XLSX.utils.aoa_to_sheet([wsHeaders, ...wsData]);
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, 'CHA');
  
      // Create a Blob and save the file
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      const buf = new ArrayBuffer(wbout.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < wbout.length; i++) {
        view[i] = wbout.charCodeAt(i) & 0xFF;
      }
      saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'CHA.xlsx');
    };
  
    const CustomToolbar = () => {
      return (
        <GridToolbarContainer>
         
          <GridToolbar
           sx={{ 
            '& .MuiButtonBase-root': { // Target buttons inside the toolbar
              color: '#1A005D', // Custom text color
              
              
            },
          }} 
          /> 
          <Button onClick={exportToExcel} sx={{ color: '#1A005D' }}>Download as Excel</Button> {/* Download button inside the toolbar */}
        </GridToolbarContainer>
      );
    };


    return (
      <div style={{ height: 400, width: '900px' }} className='custom-scroll'>
        {loading ? (
          <TruckLoder/>
        ) : (
          <DataGrid
            rows={data}            // The rows from the API response
            columns={headers}      // The columns from props.headers
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.id}  // Use the id field set to Register_id
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#1A005D', // Custom header background color
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                color: '#FFFFFF', // Custom header text color
                fontWeight: 'bold', // Optionally make the text bold
              },
              '& .MuiDataGrid-container--top [role=row]': {
                backgroundColor: '#1A005D', // Specific background targeting role="row"
              },
            }}
            slots={{ toolbar: CustomToolbar }} 
          />
        )}
      </div>
    );
  };

export default CHAReport;