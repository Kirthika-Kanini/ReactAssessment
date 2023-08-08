import { Box, color } from '@mui/system';
import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from './logonew.png'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './SideBarGreen.css';
import { AddCircle, Hotel, Restaurant, Settings } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocalAirportOutlinedIcon from '@mui/icons-material/LocalAirportOutlined';
import ModeOfTravelOutlinedIcon from '@mui/icons-material/ModeOfTravelOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MessageIcon from '@mui/icons-material/Message';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import LogoutIcon from '@mui/icons-material/Logout';
function SideBarGreen() {

    return (
        <Sidebar className="sidebargreen" style={{ width: '280px' }}>
            <Box sx={{ margin: '5%' }}>
                <img src={logo} style={{ width: '100%' }} />
            </Box>
            <Box sx={{ marginLeft: '5%', maxHeight: '80vh', overflowY: 'auto' }}>
                <Box sx={{}}>
                    <Typography sx={{ color: '#9da5b1' }}>GENERAL</Typography>
                </Box>
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            if (level === 0) {
                                return {
                                    color: disabled ? "#00A76f" : "grey",
                                    backgroundColor: active ? "green" : "white",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 167, 111, 0.16) !important",
                                        color: "#00A76f !important",
                                        borderRadius: "8px !important",
                                        fontWeight: '600'
                                    },
                                };
                            } else if (level === 1 || level === 2) {
                                return {
                                    color: disabled ? "#00A76f" : "grey",
                                    backgroundColor: active ? "green" : "white",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 167, 111, 0.16) !important",
                                        color: "#00A76f !important",
                                        borderRadius: "8px !important",
                                        fontWeight: '600'
                                    },
                                };
                            }
                        },
                    }}
                >
                    <SubMenu label="Manage Tourism" icon={<LocalAirportOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />}>
                        <MenuItem>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AddCircle fontSize="small" style={{ marginRight: '8px' }} />
                                <Link to="/tourist" className="menu-link">
                                    Add New Tourism
                                </Link>
                            </Box>
                        </MenuItem>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <MenuItem>
                                <EditOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                                <Link to="/action-tourism" className="menu-link">
                                    Tourism/Action
                                </Link>
                            </MenuItem>
                        </Box>
                    </SubMenu>
                    <SubMenu label="Manage Hotels" icon={<ModeOfTravelOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />}>
                        <MenuItem>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Hotel fontSize="small" style={{ marginRight: '8px' }} />
                                <Link to="/hotel" className="menu-link">
                                    Add New Hotels
                                </Link>
                            </Box>
                        </MenuItem>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <MenuItem>
                                <EditOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                                <Link to="/action-hotel" className="menu-link">
                                    Hotels/Action
                                </Link>
                            </MenuItem>
                        </Box>
                    </SubMenu>
                    <SubMenu label="Manage Restaurants" icon={<FastfoodOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />}>
                        <MenuItem>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Restaurant fontSize="small" style={{ marginRight: '8px' }} />
                                <Link to="/restaurant" className="menu-link">
                                    Add New Restaurant
                                </Link>
                            </Box>
                        </MenuItem>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <MenuItem>
                                <EditOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                                <Link to="/action-restaurant" className="menu-link">
                                    Restaurants/Action
                                </Link>
                            </MenuItem>
                        </Box>
                    </SubMenu>
                </Menu>
                <Box sx={{ marginTop: '12%' }}>
                    <Typography sx={{ color: '#9da5b1' }}>ADMIN</Typography>
                </Box>
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            if (level === 0) {
                                return {
                                    color: disabled ? "#00A76f" : "grey",
                                    backgroundColor: active ? "green" : "white",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 167, 111, 0.16) !important",
                                        color: "#00A76f !important",
                                        borderRadius: "8px !important",
                                        fontWeight: '600'
                                    },
                                };
                            } else if (level === 1 || level === 2) {
                                return {
                                    color: disabled ? "#00A76f" : "grey",
                                    backgroundColor: active ? "green" : "white",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 167, 111, 0.16) !important",
                                        color: "#00A76f !important",
                                        borderRadius: "8px !important",
                                        fontWeight: '600'
                                    },
                                };
                            }
                        },
                    }}
                >
                    <MenuItem>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PublishedWithChangesIcon fontSize="small" style={{ marginRight: '8px' }} />
                        <Link to='/approval'  className="menu-link">
                         
                           Approval</Link> 
                        </Box>
                    </MenuItem>
                    <MenuItem>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MessageIcon fontSize="small" style={{ marginRight: '8px' }} />
                        <Link to='/feedback'  className="menu-link">
                         
                           Feedback</Link> 
                        </Box>
                    </MenuItem>
                    <MenuItem>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PhotoLibraryIcon fontSize="small" style={{ marginRight: '8px' }} />
                            <Link to="/gallery" className="menu-link">
                            Gallery</Link>
                        </Box>
                    </MenuItem>
                    <MenuItem>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AddPhotoAlternateIcon fontSize="small" style={{ marginRight: '8px' }} />
                            <Link to="/galleryAdd" className="menu-link">
                            GalleryAdd</Link>
                        </Box>
                    </MenuItem>
                    <MenuItem>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LogoutIcon fontSize="small" style={{ marginRight: '8px' }} />
                            <Link to="/logout" className="menu-link">
                            Logout</Link>
                        </Box>
                    </MenuItem>
                  
                </Menu>
                {/* <Box sx={{ marginTop: '12%' }}>
                    <Typography sx={{ color: '#9da5b1' }}>PROFILE ACTIONS</Typography>
                </Box> */}
                
            </Box>
        </Sidebar>
    )
}

export default SideBarGreen