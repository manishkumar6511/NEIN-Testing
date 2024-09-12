import React, { useState, useEffect } from 'react';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import '../CSS/CWR.css';

const ReportDataGrid = ({ props }) => {
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
        const response = await axios.post(props.apiEndpoint);
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
          console.log("Transformed Row:", transformedRow);

          // Return the transformed row
          return transformedRow;
        });

        // Set the transformed data
        setData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    // Fetch data only if headers are set and not empty
    if (headers.length > 0) {
      fetchData();
    }
  }, [props.apiEndpoint, headers]);

  return (
    <div style={{ height: 400, width: '900px' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataGrid
          rows={data}            // The rows from the API response
          columns={headers}      // The columns from props.headers
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.id}  // Use the id field set to Register_id
          slots={{ toolbar: GridToolbar }} 
        />
      )}
    </div>
  );
};

export default ReportDataGrid;
