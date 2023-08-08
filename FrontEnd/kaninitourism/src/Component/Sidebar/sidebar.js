import { Box } from '@mui/system';
import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Typography } from '@mui/material';
import logo from './logo.png'
import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <Sidebar>

            <Box sx={{ margin: '5%' }}>
                <img src={logo} style={{ width: '100%' }} />
            </Box>
            <Box sx={{ marginLeft: '10%' }}>
                <Box sx={{}}>
                    <Typography>Tourist Spots</Typography>
                </Box>
                <Menu>
                    <SubMenu label="Tourist Spots">
                        <MenuItem> 
                            <Link to="/tourist" style={{ textDecoration: 'none' }}>Add New Tourist Spot</Link> 
                        </MenuItem>
                        <MenuItem> Tourist Spots/Action </MenuItem>
                    </SubMenu>
                    {/* <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem> */}
                </Menu>
                <Box sx={{}}>
                    <Typography>Hotel</Typography>
                </Box>
                <Menu>
                    <SubMenu label="Hotels">
                        <MenuItem>
                        <Link to="/hotel" style={{ textDecoration: 'none' }}> New Hotel</Link> 
                        </MenuItem>
                        <MenuItem> Hotel/Action</MenuItem>
                    </SubMenu>
                   
                </Menu>
                <Box sx={{}}>
                    <Typography>Restaurant</Typography>
                </Box>
                <Menu>
                    <SubMenu label="Restaurant">
                        <MenuItem> 
                        <Link to="/restaurant" style={{ textDecoration: 'none' }}></Link>Add Restaurants </MenuItem>
                        <MenuItem> Restaurant/Actions </MenuItem>
                    </SubMenu>
                    {/* <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem> */}
                </Menu>
                <Box sx={{}}>
                    <Typography>Gallery</Typography>
                </Box>
                <Menu>
                    <SubMenu label="Gallery">
                        <MenuItem> Add Gallery </MenuItem>
                        <MenuItem> Gallery/Actions </MenuItem>
                    </SubMenu>
                    {/* <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem> */}
                </Menu>
            </Box>
        </Sidebar>
    )
}

export default SideBar