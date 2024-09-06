import React, { useEffect, useState,useCallback } from 'react';
import { Transfer } from 'antd';
import {Select, FormControl, InputLabel, Grid } from '@mui/material';
import {TextField,Button,Divider } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
 import './../CSS/Reports.css';
import * as XLSX from 'xlsx';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';

const type = 'TransferItem';
function Reports(){
 
    const [mockData, setMockData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const[fromDate,setFromDate]=useState('');
    const[toDate,setToDate]=useState('');
    const types=[
      {value:'Freight Forwading',label:'Freight Forwading'},
      {value:'Custom Brokerage',label:'Custom Brokerage'},
    ]

    const serviceType=[
      {value:'Air Import',label:'Air Import'},
      {value:'Air Export',label:'Air Export'},
      {value:'Ocean Import',label:'Ocean Import'},
      {value:'Ocean Export',label:'Ocean Export'},
    ]

const titles=[
  "Initiator",
  "Branch",
  "sub Branch",
  "Operation Type",
  "Docket Number",
  "Job Count",
  "Industry",
  "shipment Type",
  "Newin's Reference No",
  "MAWB No",
  "MAWB Date",
  "MAWB No Of Packages",
  "MAWB Chargeble Weight",
  "MAWB Total Freight",
  "HAWB No",
  "HAWB Total Amount",
  "HAWB Gross Weight",
  "HAWB No Of Packages",
  "HAWB Chargeble Weight",
  "Shipper",
  "Consignee",
  "Origin",
  "Destination"


]

const ReportsWrapper = styled.div`
  .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
    height: 0.4375em !important;
  }
  .css-5rcoci-MuiStack-root > .MuiTextField-root,
  .css-5rcoci-MuiStack-root > .MuiPickersTextField-root {
    min-width: 240px !important;
  }
  .css-5rcoci-MuiStack-root > :not(style):not(style) {
    margin: 13px !important;
  }
`;

    const getMock = () => {
      
      const tempMockData = [];
      for (let i = 0; i < titles.length; i++) {
        const data = {
          key: i.toString(),
          title: titles[i],
          description: `description of content${i + 1}`,
         
        };
      
        tempMockData.push(data);
      }
      setMockData(tempMockData);
     
    };
    useEffect(() => {
      getMock();
    }, []);
    const filterOption = (inputValue, option) => 
      option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
      option.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

    const handleChange = (newTargetKeys) => {
      setTargetKeys(newTargetKeys);
    };

    const handleSearch = (dir, value) => {
      console.log('search:', dir, value);
    };


    const handleFromDate=(newDate)=>{
      setFromDate(newDate.format('DD/MM/YYYY'));
    
    }

    const handleToDate=(newDate)=>{
      setToDate(newDate.format('DD/MM/YYYY'));
    
    }

  

  const handleDownload = () => {
    const selectedFields = mockData.filter(item => targetKeys.includes(item.key)).map(item => item.title);
    const worksheet = XLSX.utils.aoa_to_sheet([selectedFields]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Fields");
    XLSX.writeFile(workbook, "Report.xlsx");
};

    return (
      <ReportsWrapper>
      <div>
      <div style={{ display: 'flex', justifyContent: 'space-between',marginTop:'10px',marginBottom:'-25px' }}>
        <p><b>Reports</b></p>
        
        </div>
       
          
<Grid container spacing={2}>

  <Grid item xs={3}>
   
        <FormControl fullWidth>
        
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={types}
       //onChange={handleBranchChange}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Type"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
         style={{marginTop:'20px'}}
        />)}/> 
          </FormControl>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
        
        <Autocomplete size='small'  freeSolo id="free-solo-2-demo" disableClearable 
       options={serviceType}
       //onChange={handleBranchChange}
       renderInput={(params) => (
       <TextField 
        {...params}
        label="Operation Type"
        InputProps={{
        ...params.InputProps,
        type: 'search',
        }}
        InputLabelProps={{ style: { fontSize: '14px'} }}
       
         style={{marginTop:'20px'}}
        />)}/> 
          </FormControl>
        </Grid>
        <Grid item xs={3}   >                           
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
         
          'MobileDatePicker',
          
        ]}
      >
         <DemoItem >
          <MobileDatePicker
          name="fromDate"
          value={fromDate ? dayjs(fromDate, 'DD/MM/YYYY') : null}
          onChange={handleFromDate}
         size='small'
         style={{marginTop:'20px'}}
          inputFormat="DD/MM/YYYY"
          label='From Date' />
        </DemoItem>
        </DemoContainer>
        </LocalizationProvider>

  </Grid>

  <Grid item xs={3}   >                           
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
         
          'MobileDatePicker',
          
        ]}
      >
         <DemoItem >
          <MobileDatePicker
          name="toDate"
          value={toDate ? dayjs(toDate, 'DD/MM/YYYY') : null}
          onChange={handleToDate}
         size='small'
         style={{marginTop:'20px'}}
          inputFormat="DD/MM/YYYY"
          label='To Date' />
        </DemoItem>
        </DemoContainer>
        </LocalizationProvider>

  </Grid>

<Grid item xs={12}>

      <Transfer
       titles={['All Fields', 'Selected Fields']}
        dataSource={mockData}
        showSearch
        
        filterOption={filterOption}
        targetKeys={targetKeys}
        onChange={handleChange}
        onSearch={handleSearch}
        render={item => (
          <DraggableItem
            item={item}
            mockData={mockData}
            setMockData={setMockData}
            targetKeys={targetKeys}
            setTargetKeys={setTargetKeys}
          />
        )}
        listStyle={{
          width: 350,
          height: 300,
        }}
      />
      
      </Grid>
      </Grid>

      <Button type="primary" variant='contained' className='button' onClick={handleDownload} style={{ marginTop: 16 }}>
                Download
            </Button>
      </div>
      </ReportsWrapper>
    );

    
  };
  const DraggableItem = ({ item, mockData, setMockData, targetKeys, setTargetKeys }) => {
    const findItem = useCallback(
      (key) => {
        const item = mockData.find(i => i.key === key);
        return {
          item,
          index: mockData.indexOf(item),
        };
      },
      [mockData],
    );
  
    const moveItem = useCallback(
      (dragIndex, hoverIndex, target) => {
        const updatedItems = [...mockData];
        const draggedItem = updatedItems.splice(dragIndex, 1)[0];
    
        if (target === 'source') {
          console.log("Source");
          updatedItems.splice(hoverIndex, 0, draggedItem);
          setMockData(updatedItems);
        } else if (target === 'target') {
          console.log("Target");
          const updatedTargetKeys = [...targetKeys];
          console.log("Before update", updatedTargetKeys);
    
          const currentIndex = updatedTargetKeys.indexOf(draggedItem.key);
          console.log("Current Index", currentIndex);
    
          if (currentIndex !== -1) {
            // Remove the item
            updatedTargetKeys.splice(currentIndex, 1);
            console.log("After removing dragged item", updatedTargetKeys);
          }
    
          // Ensure hoverIndex is within bounds
          hoverIndex = Math.max(0, Math.min(hoverIndex, updatedTargetKeys.length));
    
          // Add the item at the new index
          updatedTargetKeys.splice(hoverIndex, 0, draggedItem.key);
          console.log("After adding dragged item", updatedTargetKeys);
          setTargetKeys(updatedTargetKeys);
        }
      },
      [mockData, setMockData, targetKeys, setTargetKeys]
    );
    
  
    const originalIndex = findItem(item.key).index;
  
    const [{ isDragging }, ref] = useDrag({
      type,
      item: { key: item.key, originalIndex },
      end: (draggedItem, monitor) => {
        const { key: droppedKey, originalIndex } = draggedItem;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveItem(findItem(droppedKey).index, originalIndex, 'source');
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
      accept: type,
      hover: ({ key: draggedKey }) => {
        const { index: overIndex } = findItem(item.key);
        const { index: dragIndex } = findItem(draggedKey);
        if (dragIndex !== overIndex) {
          const target = targetKeys.includes(item.key) ? 'target' : 'source';
          moveItem(dragIndex, overIndex, target);
        }
      },
    });
  
    const opacity = isDragging ? 0.5 : 1;
  
    return (
      <div ref={node => ref(drop(node))} style={{ opacity }}>
        {item.title}
      </div>
    );
  };
  export default Reports;