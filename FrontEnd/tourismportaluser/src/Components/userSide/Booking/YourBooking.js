import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import logo from '../img/logo.png';
import { Box } from '@mui/system';

function YourBooking() {
    useEffect(() => {
        const navItemLinks = document.querySelectorAll('.nav__items a');
        const navLine = document.querySelector('.nav-line');
    
        const handleNavItemClick = (e) => {
          if (e.target.matches('.nav__items a')) {
            const navItemActive = e.target;
            document.querySelector('.nav--active').classList.remove('nav--active');
            navItemActive.classList.add('nav--active');
            setNavLine(navItemActive);
          }
        };
        const setNavLine = (navItemActive) => {
          const offsetLeft = navItemActive.getBoundingClientRect().left;
          const width = navItemActive.getBoundingClientRect().width;
          const left = offsetLeft + width / 2 - 10;
          navLine.style.transform = 'translateX(0)';
          navLine.style.left = left + 'px';
        };
    
        navItemLinks.forEach((link) => {
          link.addEventListener('click', handleNavItemClick);
        });
    
        // ASIDE
        const asideItemLinks = document.querySelectorAll('.aside__items a');
        const asideLine = document.querySelector('.aside-line');
    
        const handleAsideItemClick = (e) => {
          if (e.target.matches('.aside__items a')) {
            const asideItemActive = e.target;
            document.querySelector('.aside--active').classList.remove('aside--active');
            asideItemActive.classList.add('aside--active');
            setAsideLine(asideItemActive);
            setTimeout(() => {
              const menu = document.querySelector('button.menu');
              const aside = document.querySelector('aside');
              menu.classList.remove('show');
              aside.classList.remove('show');
            }, 400);
          }
        };
    
        const setAsideLine = (asideItemActive) => {
          const offsetTop = asideItemActive.getBoundingClientRect().top;
          const height = asideItemActive.getBoundingClientRect().height;
          const top = offsetTop + height / 2 - 15;
          asideLine.style.top = top + 'px';
        };
    
        asideItemLinks.forEach((link) => {
          link.addEventListener('click', handleAsideItemClick);
        });
    
    
    
      }, []);
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const handleMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      };
    const [destinations, setDestinations] = useState([]);
    const [userId, setUserId] = useState(0);
  
    useEffect(() => {
      const userid = localStorage.getItem("UserId");
      if (userid !== null) {
        setUserId(parseInt(userid));
      } else {
        console.warn("UserId not found in localStorage.");
      }
    }, []);

    useEffect(() => {
        
          fetchData();
        
      }, [destinations]);
  
    const fetchData = async () => {
        try {
          const response = await axios.get('https://localhost:7194/api/Bookings');
          const places = response.data;
 
            const placewithid = places.filter(
              destination => destination.users && destination.users.id === userId
            );
            console.log(`Total hotels with place.placeId === ${userId}: ${placewithid.length}`);
            setDestinations(placewithid);
            console.log(placewithid);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
  return(
   <div>
      <nav className="padding-5">
        <img src={logo} alt="Logo image" />
        <div className="nav__items">
          <div className="nav-line"></div>
          <a href="/home">Home</a>
          <a href="/tour">Tour</a>
          <a href="/feedback">Feedback</a>
          <a href="/gallery"  >Gallery</a>
          <a href="/logout">Logout</a>
        </div>
        <div className="nav__buttons">
          <button>Login</button>
          <button>Sign up</button>
        </div>
      </nav>

      <button className="menu" onClick={handleMenuToggle}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside className={`padding-5 ${isMobileMenuOpen ? 'show' : ''}`}>
        <div className="aside__items">
          <div className="aside-line"></div>
          <a href="/home" className="nav--active">Home</a>
          <a href="/tour">Tour</a>
          <a href="/feedback">Feedback</a>
          <a href="/gallery">Gallery</a>
          <a href="/logout">Logout</a>
        </div>
        <div className="nav__buttons">
          <button>Login</button>
          <button>Sign up</button>
        </div>
      </aside>
    <section className="section popular" style={{height: '89vh',maxWidth:'100%'}}>
    <Box className="" style={{ marginLeft: '10%', marginRight: '5%',maxWidth:"100%" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: '3%', flexWrap: 'wrap' }}>
    <div className="container">
    {destinations && destinations.length > 0 ? (
       <Grid container spacing={2}>
       {destinations.map((booking) => (
         <Grid item xs={12} sm={6} md={4} key={booking.bookingId} sx={{maxWidth:'100%'}}>
         <Card
        sx={{
          border: '1px solid black',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
          margin: '10px', // Adjust margin as needed
          width: '100%', // Make the card width 100%
          maxWidth: '400px', // Set a maximum width for larger screens
        }}
      >
             <CardContent>
               <Typography variant="h5" component="div">
                 Booking ID: {booking.bookingId}
               </Typography>
               <Typography variant="body1">
                 Starting Point: {booking.startingPoint}
               </Typography>
               <Typography variant="body1">
                 Ending Point: {booking.endingPoint}
               </Typography>
               <Typography variant="body1">
                 Hotel: {booking.hotel}
               </Typography>
               <Typography variant="body1">
                 Head Count: {booking.headCount}
               </Typography>
               <Typography variant="body1">
                 Days Count: {booking.daysCount}
               </Typography>
               <Typography variant="body1">
                 Start Date: {booking.startDate}
               </Typography>
               <Typography variant="body1">
                 End Date: {booking.endDate}
               </Typography>
               
              
               <Button href={`/feedback/${booking.bookingId}`} variant="contained">
                 Add Feedback
               </Button>
             </CardContent>
           </Card>
         </Grid>
       ))}
     </Grid>
     
      ) : (
        <Typography variant="h5">Loading...</Typography> 
      )}
      <br /><br /><br />
    </div></Box></Box>
  </section>
   </div>
  )
}

export default YourBooking
