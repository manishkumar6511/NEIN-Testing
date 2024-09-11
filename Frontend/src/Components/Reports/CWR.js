// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';

// const ReportDataGrid = ({ props }) => {
//   const [data, setData] = useState([]);
//   const [headers, setHeaders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setHeaders(props.headers); // Set headers when props.headers changes
//   }, [props.headers]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(props.apiEndpoint);
       
//         const transformedData = response.data.map(item => {
          
//           return {
//           //  ...item,
//           sl_no: item.Register_id, // Ensure 'id' is used for unique key
//           dkt_no: item.JobCount, // Map field names to headers
//           ref_no:item.JobCount,
//           mawb_no:item.JobCount,
//           mawb_dt:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,
//           ref_no:item.JobCount,

//           };
//         });
//         setData(transformedData); // Set the transformed data
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [props.apiEndpoint]);

//   const rows= [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is Amazing' },
//   ];
//   // data.map((data)=>{

//   //   console.log(data.Register_id);



//   // })

//   return (
//     <div style={{ height: 400, width: '900px' }}>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <DataGrid
//           rows={data}            // The rows from the API response
//           columns={headers}      // The columns from props.headers
//           pageSize={5}
//           rowsPerPageOptions={[5, 10, 20]}
//           checkboxSelection
//           disableSelectionOnClick
//          getRowId={(row) => row.sl_no}  // Use Register_id as the unique id
//         />
//       )}
//     </div>
//   );
// };

// export default ReportDataGrid;
// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';

// const ReportDataGrid = ({ props }) => {
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Update headers when props.headers changes
//   useEffect(() => {
//     const columns = props.headers.map(header => ({
//       field: header.field,
//       headerName: header.headerName,
//       width: header.width || 150 // Default width if not specified
//     }));
//     setColumns(columns);
//   }, [props.headers]);

//   // Fetch data from API and transform it
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(props.apiEndpoint);

//         // Transform data to match the headers dynamically
//         const transformedData = response.data.map(item => {
//           let transformedItem = {};
//           props.headers.forEach(header => {
//             transformedItem[header.field] = item[header.dataField] || '';
//           });
//           return transformedItem;
//         });

//         // Log transformed data to verify
//         console.log('Transformed Data:', transformedData);

//         // Ensure each row has a unique id
//         const dataWithIds = transformedData.map((item, index) => ({
//           ...item,
//           id: item[props.headers.find(header => header.field === 'id')?.dataField] || index
//         }));

//         console.log('Data with IDs:', dataWithIds);
//         setData(dataWithIds); // Set the transformed data with unique IDs
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [props.apiEndpoint, props.headers]);

//   // Define the function to get the row ID
//   const getRowId = (row) => {
//     return row.id;
//   };

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <DataGrid
//           rows={data}            // The rows from the API response
//           columns={columns}      // The columns from props.headers
//           pageSize={5}
//           rowsPerPageOptions={[5, 10, 20]}
//           checkboxSelection
//           disableSelectionOnClick
//           getRowId={getRowId}    // Function to get unique ID
//         />
//       )}
//     </div>
//   );
// };

// export default ReportDataGrid;

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const ReportDataGrid = ({ props }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update columns when props.headers changes
  useEffect(() => {
    const columns = props.headers.map(header => ({
      field: header.field,
      headerName: header.headerName,
      width: header.width || 150 // Default width if not specified
    }));
    setColumns(columns);
  }, [props.headers]);

  // Fetch data from API and transform it
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(props.apiEndpoint);
        const apiData = response.data;

        // Map API data based on header order
        const transformedData = apiData.map(item => {
          let transformedItem = {};
          
          // Iterate through headers to dynamically map fields
          props.headers.forEach((header, index) => {
            const dataField = Object.values(item)[index]; // Get the value based on position
            transformedItem[header.field] = dataField || ''; // Use default if value is missing
          });

          return transformedItem;
        });

        // Ensure each row has a unique id
        const dataWithIds = transformedData.map((item, index) => ({
          ...item,
          id: item[props.headers.find(header => header.field === 'id')?.field] || index
        }));

        setData(dataWithIds); // Set the transformed data with unique IDs
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [props.apiEndpoint, props.headers]);

  // Define the function to get the row ID
  const getRowId = (row) => {
    return row.id;
  };

  return (
    <div style={{ height: 400, width: '1130px', minWidth:"90%"}}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataGrid
          rows={data}            // The rows from the API response
          columns={columns}      // The columns from props.headers
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={getRowId}    // Function to get unique ID
        />
      )}
    </div>
  );
};

export default ReportDataGrid;