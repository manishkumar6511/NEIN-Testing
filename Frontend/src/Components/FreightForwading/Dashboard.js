import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip

export default function StackBars() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(()  => {
    const fetchData=async()=>{
    const response = await axios.post(`${API_BASE_URL}/Dashboard/AirImporttFF`);
    console.log(response.data);
        setData(response.data);

    }

   
  
    
    fetchData();

  }, []);

  // Handle bar click
  const handleBarClick = (branch, category) => {

    console.log('Branch:', branch, 'Category:', category);
    setSelectedBranch(branch);
    setSelectedCategory(category);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleModalRedirect = () => {
    // Navigate to a specific route with branch and category data
    navigate(`/details/${selectedBranch}/${selectedCategory}`);
    handleClose(); // Close modal after navigation
  };

  return (
    <>
      <BarChart
        dataset={data}
        series={[
          { dataKey: 'completed_count', stack: 'tasks',color: '#8EC300',label:'Completed' , 
            onClick: (e) => {
              console.log('Event:', e); // Check the entire event object
  console.log('Row Data:', e.row); // Check the row data
              handleBarClick(e.row.branch_code, 'completed_count');
            },
          },
          { dataKey: 'incomplete_count', stack: 'tasks',color: 'red',label:'Incomplete',
            onClick: (e) => {
              console.log('Incomplete Bar Clicked:', e); // Log event data
              handleBarClick(e.row.branch_code, 'incomplete_count');
            },

          },
          { dataKey: 'fiancecapture_complete_count', stack: 'finance', color: '#2196f3',label:'Finance Complete', onClick: (e) => handleBarClick(e.row.branch, 'fiancecapture_complete_count') },
          { dataKey: 'fianceincomplete', stack: 'finance',  color: '#ff9800', label:'Finance Incomplete',onClick: (e) => handleBarClick(e.row.branch, 'fianceincomplete') },
        ]}
        xAxis={[{ scaleType: 'band', dataKey: 'branch_code' }]}
        slotProps={{
          legend: { hidden: true }, // Hides legend if needed
          tooltip: { // Customizing the tooltip
            renderTooltip: (params) => {
              return (
                <div>
                  <strong>{params.row.branch_code}</strong>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {params.series.map((seriesItem, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: seriesItem.color,
                            display: 'inline-block',
                            marginRight: 5,
                          }}
                        />
                        <span>{seriesItem.label}: {params.row[seriesItem.dataKey]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
          }
        }}
        width={1100}
        height={500}
      />
       

      <Modal open={open} onClose={handleClose}>
        <div style={{ padding: 20 }}>
          <h2>{`Details for ${selectedBranch} - ${selectedCategory}`}</h2>
          <p>Show the respective data here</p>
          <button onClick={handleModalRedirect}>Go to Full Details</button>
        </div>
      </Modal>
    </>
  );
}
