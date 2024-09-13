import React,{useState} from "react";
import {TextField,Button,Grid,Modal  } from '@mui/material';
import Box from '@mui/material/Box';
import './../CSS/TestingStyles.css';
import user from './../../Images/team.png';
import template from './../../Images/documents.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import 'antd/dist/antd.css';
import { Tree, Transfer } from 'antd';

import data from './data.js';
import { filterTree, renderTreeNodes } from './utils.js';

import {Link} from 'react-router-dom';

function Masters(){

   

const [leftCheckedKeys, setLeftCheckedKeys] = useState([]);
  const [checkedNodes, setCheckedNodes] = useState([]);
  const [targetNodes, setTargetNodes] = useState([]);
  const [targetCheckedKeys, setTargetCheckedKeys] = useState([]);
  const [open, setOpen] = useState(false);


  const handleTransferChange = (_, direction) => {
    setLeftCheckedKeys([]);
    if (direction === 'right') {
      const newTargetNodes = [...targetNodes, ...checkedNodes].filter(
        (value, index, self) =>
          index === self.findIndex((node) => node.key === value.key)
      );
      console.log("newTargetNodes",newTargetNodes);
      setTargetNodes(newTargetNodes);
    } else {
      // Remove only the checked nodes from targetNodes
      console.log("target Nodes",targetNodes);
      console.log("checked Nodes",checkedNodes);
      const updatedTargetNodes = targetNodes.filter(
        (node) => !checkedNodes.some(checkedNode => checkedNode.key === node.key)
      );
      console.log("updated target Nodes",updatedTargetNodes);
      setTargetNodes(updatedTargetNodes);
    }
  };
  

  const getAllNodes = (node) => {
    const result = [{ key: node.key, name: node.title }]; // Assuming 'title' contains the name
  
    if (node.children) {
      node.children.forEach(child => {
        result.push(...getAllNodes(child)); // Recursively gather child nodes
      });
    }
  
    return result;
  };
  
  // Function to handle button click
  const handleCreateTemplate = () => {
    const details = [];
  
    targetNodes.forEach(node => {
      details.push(...getAllNodes(node)); // Collect all nodes for each target node
    });
  
    console.log(details); // Now you should have both parent and child details
    // Handle the details as needed (e.g., sending to an API)
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 return(
  <div>
  <h3 className="h3">Masters</h3>
  
  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
    
        <Grid container spacing={1}>
          <Grid item xs={2}>
           
          
              <img src={template} alt="Template" onClick={handleOpen} />
             
              <p >Add Template</p>
            
          </Grid>
          <Grid item xs={2}>
            <Link to="/Access" >           
              <img src={user} alt="userMenu"  />
             
              <p >User Role Access</p>
              
              </Link>

            </Grid>
 </Grid>
 </Box>
 <Modal open={open} onClose={handleClose}  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',border:'0' }}>
 
 <div style={{ position: 'relative', backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '80%', maxHeight: '80%', overflow: 'auto', marginTop: '40px' }}>
        <Grid container spacing={2}>

          <Grid item xs={3}>
          <TextField
      
      name="MAWBDate"
      label="Template Name"
      size='small'
      required
      InputLabelProps={{ style: { fontSize: '14px'  } }}
     
      />

          </Grid>
          <Grid item xs={7}>
          <Transfer
        operations={['Move to Target', 'Remove Selected']}
        onChange={handleTransferChange}
        // style={{ width: '100vh' }}
      >
        {({ direction, onItemSelect, selectedKeys }) =>
          direction === 'left' ? (
            <Tree
              
              
              checkable
             
              checkedKeys={leftCheckedKeys}
              onCheck={(selectedKeys, info) => {
                setLeftCheckedKeys(selectedKeys);
                const filteredTree = filterTree(
                  selectedKeys,
                  info.halfCheckedKeys,
                  data
                );
                setCheckedNodes(filteredTree);

                const eventKey = info.node.props.eventKey;
                onItemSelect(eventKey, selectedKeys.includes(eventKey));
              }}
            >
              {renderTreeNodes(data)}
            </Tree>
          ) : (
            <Tree
              autoExpandParent
              
              checkable
              onCheck={(selectedKeys, info) => {
                const filteredTree = filterTree(
                  selectedKeys,
                  info.halfCheckedKeys,
                  data
                );
                setCheckedNodes(filteredTree);
                const eventKey = info.node.props.eventKey;
                onItemSelect(eventKey, selectedKeys.includes(eventKey));
              }}
            >
              {renderTreeNodes(targetNodes)}
            </Tree>
          )
        }
      </Transfer>
          </Grid>
          <Grid item xs={2}>
            <Button color="primary" variant="contained"
             onClick={handleCreateTemplate}
            >
            Create Template</Button>
          </Grid>
        </Grid>
        
     
      </div>

 </Modal>
 </div>
 )

}
export default Masters;
