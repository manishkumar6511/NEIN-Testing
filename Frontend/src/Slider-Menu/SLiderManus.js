import React from "react";
import { Typography,Button,Stack } from "@mui/material";


function slidermenus(){

    return(
        <>
            <Stack spacing={2} direction={"row"}>
                <Typography variant="h4" gutterBottom>Typography button stack exmaple </Typography>
                <Button >this is button </Button>
               
                <Button variant="outlined">this is button </Button>
                <Button variant="contained" >this is button </Button>

            </Stack>
            <Stack spacing={2} >
                <Typography variant="h4" gutterBottom>h1 heading </Typography>
                <Button >this is button </Button>
               
                <Button variant="outlined">this is button </Button>
                <Button variant="contained" color="primary">this is button </Button>
                <Button variant="contained" color="secondary">this is button </Button>
                <Button variant="contained" color="success" size="small">this is button </Button>

            </Stack>


            </>
    ) 

}

export default slidermenus;
