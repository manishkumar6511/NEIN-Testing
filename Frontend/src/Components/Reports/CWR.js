import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
 
export default function ExportDefaultToolbar(prop ,gowthmi) {
    console.log("prop recinging " ,prop);
    console.log("prop gowthmi " ,gowthmi);
  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 4,
    maxColumns: 6,
  });
 
  return (
<div style={{ height: 300, width: '100%' }}>
<DataGrid {...data} loading={loading} slots={{ toolbar: GridToolbar }} />
</div>
  );
}