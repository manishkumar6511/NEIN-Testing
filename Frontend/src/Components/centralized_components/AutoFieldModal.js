// DisplayModal.js
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const DisplayModal = ({ open, handleClose, fields }) => {
  const isHorizontal = fields.length > 6;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: isHorizontal ? 'auto' : 400, 
          bgcolor: 'background.paper', 
          
          p: 4 
        }}>
        <Typography id="modal-title" variant="h6" component="h2">
          Auto Fields Data
        </Typography>
        <Box 
          id="modal-description" 
          sx={{ 
            mt: 2, 
            display: isHorizontal ? 'flex' : 'block', 
            flexWrap: isHorizontal ? 'wrap' : 'nowrap' 
          }}>
          {fields.map((field, index) => (
            <Box 
              key={index} 
              sx={{ 
                mb: 2, 
                mr: isHorizontal ? 2 : 0, 
                width: isHorizontal ? '45%' : '100%' 
              }}>
              <Typography variant="body1">
                {field.label}:
              </Typography>
            </Box>
          ))}
        </Box>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default DisplayModal;
