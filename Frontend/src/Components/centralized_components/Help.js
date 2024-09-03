import React, { useState } from 'react';
import { Fab, Modal, Box, TextField, Button, Typography, List, ListItem, ListItemText ,IconButton} from '@mui/material';
import { AttachFile, HelpOutline } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { MdSupportAgent } from "react-icons/md";
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { MdContactMail } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

const HelpButton = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFiles([]); // Clear files when closing the modal
    setQuery(''); // Clear the query when closing the modal
  };

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('query', query);
    files.forEach(file => formData.append('attachments', file));

    try {
      await axios.post('http://localhost:5000/api/support', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Your query has been submitted!');
      handleClose();
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Failed to submit your query.');
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="help"
        onClick={handleOpen}
        style={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <IoIosChatbubbles />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        BackdropProps={{
          onClick: (event) => {
            event.stopPropagation();
          },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
          }}
        >
 <IconButton
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: 'red',
          }}
        >
          <CloseIcon />
        </IconButton>
          
          <Typography id="modal-title" variant="h6" component="h2">
            Submit a Query
          </Typography>
          <TextField
            label="Your Query"
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            margin="normal"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
             {/* <Stack spacing={3} sx={{ width: 500 }}>
      
      <Autocomplete
        multiple
        id="tags-outlined"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        style={{margin:'4px 0px 11px 0px',width:'68%'}}
       // defaultValue={[top100Films[13]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
    
    </Stack> */}
          <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '10px', cursor: 'pointer', marginBottom: '10px' }}>
            <input {...getInputProps()} />
            <p>Drag & drop some files here, or click to select files</p>
          </div>
          
          {/* Display Selected File Names */}
          {files.length > 0 && (
            <List>
              {files.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
            </List>
          )}
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AttachFile />}
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
]
export default HelpButton;
