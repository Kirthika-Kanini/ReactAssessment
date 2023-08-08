import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SideBar from './Component/Sidebar/sidebar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddTourism from './Component/Tourism/addTourism';
import AddTourismActions from './Component/Tourism/addTourismActions';
import AddHotelActions from './Component/Hotel/addHotelActions';
import AddRestaurantActions from './Component/Restaurant/addRestaurantActions';
import AddHotel from './Component/Hotel/addHotel';
import AddRestaurant from './Component/Restaurant/addRestaurant';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBarGreen from './Component/sideBarGreen/SideBarGreen';
import Gallery from './Component/Gallery/Gallery';
import Approval from './Component/Approval/Approval';
import Feedback from './Component/Feedback/Feedback';
import AgentRegisterModule from './Component/loginModule/AgentRegisterModule';
import AgentLoginModule from './Component/loginModule/AgentLoginModule';
import AdminRegisterModule from './Component/loginModule/AdminRegisterModule';
import AdminLoginModule from './Component/loginModule/AdminLoginModule';
import UserLoginModule from './Component/loginModule/UserLoginModule';
import UserRegisterModule from './Component/loginModule/UserRegisterModule';
import AgentHome from './Component/loginModule/AgentHome';
import GalleryAdd from './Component/Gallery/GalleryAdd';
import Logout from './Component/Logout/Logout';
import Unauthorized from './Component/Unauthorized/Unauthorized';

const MainContent = ({ showSidebarAndTitle }) => {
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 1000);

  const toggleSidebar = () => {
    if (window.innerWidth < 1000) {
      setSidebarVisible(!sidebarVisible);
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setSidebarVisible(window.innerWidth >= 1000);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        sx={{
          flex: '0 0 300px',
          backgroundColor: '#f0f0f0',
          transform: `translateX(${sidebarVisible && showSidebarAndTitle ? '0%' : '-100%'})`,
          transition: 'transform 0.3s ease',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <SideBarGreen />
      </Box>
      {/* Right Grid */}
      <Box
        sx={{
          flex: '1',
          marginLeft: (showSidebarAndTitle && sidebarVisible) ? '300px' : '0',
          transition: 'margin-left 0.3s ease',
          position: 'relative', // Add relative position to the container
        }}
      >
        {/* Main Content */}
        {showSidebarAndTitle && (
          <Box
            sx={{
              height: '8%',
              boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between', // Add this to separate the elements horizontally
              padding: '0 16px', // Add padding to create some space
            }}
          >
            {window.innerWidth < 1000 && (
              <IconButton
                onClick={toggleSidebar}
                style={{ zIndex: 1 }}
                color="inherit"
                aria-label={sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
              >
                {sidebarVisible ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '20px', fontWeight: '600' }}>DASHBOARD</span>
              <span style={{ fontSize: '15px', color: 'grey', marginLeft: '8px' }}>Home/Dashboard</span>
            </div>
          </Box>
        )}
        <Box sx={{ marginTop: '1%' }}>
          <Routes>
            <Route path="/tourist" element={<AddTourism />} />
            <Route path="/" element={<AddTourism />} />
            <Route path="/hotel" element={<AddHotel />} />
            <Route path="/restaurant" element={<AddRestaurant/>}/>
            <Route path="/agentRegister" element={<AgentRegisterModule/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/action-tourism" element={<AddTourismActions/>}/>
            <Route path="/action-hotel" element={<AddHotelActions/>}/>
            <Route path="/action-restaurant" element={<AddRestaurantActions/>}/>
            <Route path="/agent-login" element={<AgentLoginModule/>}/>
            <Route path="/admin-login" element={<AdminLoginModule/>}/>
            <Route path="/admin-register" element={<AdminRegisterModule/>}/>
            <Route path="/approval"  element={<Approval/>}/>
            <Route path="/feedback"  element={<Feedback/>}/>
            <Route path="/agentHome" element={<AgentHome/>}/>
            <Route path="/galleryAdd" element={<GalleryAdd/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/Unauthorized" element={<Unauthorized/>}/>
        {/* <Route path="/restaurant/:placeId" element={<Restaurant />} /> */}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  const location = window.location.pathname;
  const hideSidebarAndTitle = ['/login', '/Register','/register', '/agentRegister', '/admin-login','/agent-login','/admin-register'];
  const shouldHideSidebarAndTitle = hideSidebarAndTitle.includes(location);

  return (
    <Router>
      <MainContent showSidebarAndTitle={!shouldHideSidebarAndTitle} />
    </Router>
  );
}

export default App;
