import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PreviewIcon from '@mui/icons-material/Preview';
import HelpIcon from '@mui/icons-material/Help';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';

import Collapse from '@mui/material/Collapse'; // Add this import
import ListAltIcon from '@mui/icons-material/ListAlt';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

import './../Components/CSS/muiSlider.css';
import TmsRouting from '../Tms-Routes/tmsRouting';

import {Link} from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchemaIcon from '@mui/icons-material/Schema';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openOperationSubMenu, setOpenOperationSubMenu] = useState(false);
    const [openBillingSubMenu, setOpenBillingSubMenu] = useState(false);
    const [openMasterSubMenu, setOpenMasterSubMenu] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('');
    const [iconcolor, seticoncolor] = useState('');
    const [chnageicon, updateicon] = useState(false);
    const [chnageiconmodule, updatechnageiconmodule] = useState('');
    const [openUserSubMenu, setOpenUserSubMenu] = useState(false);
    const [openSubmenu, setSubmenu] = useState(false);

    // Function to toggle the state of the submenu for "User" ListItem
    const handleUserSubMenuToggle = (text) => {
        setOpenUserSubMenu(!openUserSubMenu);
        setSubmenu(text);
    };

    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    const handleIconColur = (text) => {
        seticoncolor(text);
    };
    const handleIcon = (text) => {
        updateicon(!chnageicon);
        updatechnageiconmodule(text);
    };

    const handleMenuItemClick = (text) => {

        setActiveMenuItem(text);

    };

    const handleDrawerClose = () => {
        setOpen(!open);
        setOpenOperationSubMenu(false);
        setOpenBillingSubMenu(false);
        setOpenMasterSubMenu(false);
    };

    // const handleOperationSubMenuToggle = () => {
    //     setOpenOperationSubMenu(!openOperationSubMenu);
    //     setOpenBillingSubMenu(false);
    //     setOpenMasterSubMenu(false);

    // };

    const handleBillingSubMenuToggle = () => {
        setOpenBillingSubMenu(!openBillingSubMenu);
        setOpenOperationSubMenu(false);
        setOpenMasterSubMenu(false);
    };
    // const handleMasterSubMenuToggle = () => {
    //     setOpenMasterSubMenu(!openMasterSubMenu);
    //     setOpenOperationSubMenu(false);
    //     setOpenBillingSubMenu(false);

    // };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
              

                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                     
                    </DrawerHeader>
                    <Divider />
                    <List>
                       
                        <ListItem

                            disablePadding sx={{ display: 'block', backgroundColor: activeMenuItem === 'Operation' ? '' : 'transparent' }} onClick={() => {
                                handleDrawerClose();
                                handleMenuItemClick('Operation');
                                handleIconColur('Menu');
                            }}>
                            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                <ListItemIcon color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }} >
                                    <MenuIcon style={{ color: iconcolor === 'Menu' ? '#8DC300' : '#1A005D' }} />
                                </ListItemIcon>
                                <ListItemText style={{ color: iconcolor === 'Menu' ? '#8DC300' : '#1A005D' }} primary="Menu" sx={{ opacity: open ? 1 : 0 }} />


                                {open ? <ChevronLeftIcon /> : ""}

                            </ListItemButton>
                        </ListItem>

                        {/* Dashboard */}
                        <Link to="/Dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding
                                onClick={() => {
                                    handleMenuItemClick('Dashboard');
                                    handleIconColur('Dashboard');

                                }}
                                sx={{ display: 'block', backgroundColor: activeMenuItem === 'Dashboard' ? '#1A005D' : 'transparent' }}
                                >
                                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }} >
                                        <DashboardIcon style={{ color: iconcolor === 'Dashboard' ? '#8DC300' : '#1A005D' }} />
                                    </ListItemIcon >

                                    <ListItemText style={{ color: iconcolor === 'Dashboard' ? '#8DC300' : '#1A005D',fontWeight:activeMenuItem==='Dashboard'? 600 : 600 }} primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>

                        {/* Operataions Start*/}
                        <List component="div" disablePadding>
                        <Link to="/Operations" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding
                                onClick={() => {
                                    handleMenuItemClick('Operations');
                                    handleIconColur('Operations');

                                }}
                                sx={{ display: 'block', backgroundColor: activeMenuItem === 'Operations' ? '#1A005D' : 'transparent' }}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }} >
                                        <ListAltIcon style={{ color: iconcolor === 'Operations' ? '#8DC300' : '#1A005D' }} />
                                    </ListItemIcon >

                                    <ListItemText style={{ color: iconcolor === 'Operations' ? '#8DC300' : '#1A005D' }} primary="Operations" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        </List>

                 {/* Operataions  end*/}

    {/* Finance Start*/}
    <List component="div" disablePadding>
                        <Link to="/FinanceReport" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding
                                onClick={() => {
                                    handleMenuItemClick('Finance');
                                    handleIconColur('Finance');

                                }}
                                sx={{ display: 'block', backgroundColor: activeMenuItem === 'Finance' ? '#1A005D' : 'transparent' }}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }} >
                                        <CardTravelIcon style={{ color: iconcolor === 'Finance' ? '#8DC300' : '#1A005D' }} />
                                    </ListItemIcon >

                                    <ListItemText style={{ color: iconcolor === 'Finance' ? '#8DC300' : '#1A005D' }} primary="Finance" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        </List>

                 {/* Finance  end*/}
                  {/* view and edit Start*/}
    <List component="div" disablePadding>
                        <Link to="/ViewEdit" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding
                                onClick={() => {
                                    handleMenuItemClick('ViewEdit');
                                    handleIconColur('ViewEdit');

                                }}
                                sx={{ display: 'block', backgroundColor: activeMenuItem === 'ViewEdit' ? '#1A005D' : 'transparent' }}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }} >
                                        <PreviewIcon style={{ color: iconcolor === 'ViewEdit' ? '#8DC300' : '#1A005D' }} />
                                    </ListItemIcon >

                                    <ListItemText style={{ color: iconcolor === 'ViewEdit' ? '#8DC300' : '#1A005D' }} primary="View/Edit" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        </List>

                 {/* view and edit  end*/}

                          {/* Masters Start */}

                          <Link to="/Masters" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding
                                onClick={() => {
                                    handleMenuItemClick('Masters');
                                    handleIconColur('Masters');

                                }}
                                sx={{ display: 'block', backgroundColor: activeMenuItem === 'Masters' ? '#1A005D' : 'transparent' }}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }} >
                                        <AddBusinessIcon style={{ color: iconcolor === 'Masters' ? '#8DC300' : '#1A005D' }} />
                                    </ListItemIcon >

                                    <ListItemText style={{ color: iconcolor === 'Masters' ? '#8DC300' : '#1A005D' }} primary="Masters" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                      
            {/* Masters end */}

               {/* Reports Start */}

               <Link to="/Reports" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding
                                onClick={() => {
                                    handleMenuItemClick('Reports');
                                    handleIconColur('Reports');

                                }}
                                sx={{ display: 'block', backgroundColor: activeMenuItem === 'Reports' ? '#1A005D' : 'transparent' }}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }} >
                                        <BarChartIcon style={{ color: iconcolor === 'Reports' ? '#8DC300' : '#1A005D' }} />
                                    </ListItemIcon >

                                    <ListItemText style={{ color: iconcolor === 'Reports' ? '#8DC300' : '#1A005D' }} primary="Reports" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                      
            {/* Reports end */}

           {/*Help Start */}
                        

               <Link to="/Testing" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding
                                onClick={() => {
                                    handleMenuItemClick('Help');
                                    handleIconColur('Help');

                                }}
                                sx={{ display: 'block', backgroundColor: activeMenuItem === 'Help' ? '#1A005D' : 'transparent' }}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }} >
                                        <HelpIcon style={{ color: iconcolor === 'Help' ? '#8DC300' : '#1A005D' }} />
                                    </ListItemIcon >

                                    <ListItemText style={{ color: iconcolor === 'Help' ? '#8DC300' : '#1A005D' }} primary="Help" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                      
                        {/*Help End */}


                    </List>
                    <Divider />
                    {/* Remaining List Items */}
                  
                </Drawer>

                <Box component="main" sx={{ flexGrow: 1, p: 3 ,py:8}}>


                <TmsRouting/>
                    



                </Box>
            </Box>

        </>
    );
}