import React, { useEffect, useState } from 'react'
import logo from '../img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, InputAdornment, MenuItem, TextField } from '@mui/material';

import LocationIcon from '@mui/icons-material/LocationOnOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TourIcon from '@mui/icons-material/Tour';
import { Card, CardContent, CardMedia } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { Dialog, DialogContent, DialogTitle, } from '@mui/material';
function Tour() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [usernamestate, setUserNameState] = useState('');
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const handleSnackbarClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setSnackbarOpen(false);
};

  const [place, setPlaces] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [uniquePlaceNames, setUniquePlaceNames] = useState([]);
  const [uniqueCost, setUniquetourCost] = useState([]);
  const [uniqueSpots, setUniquespots] = useState([]);
  const navigate = useNavigate();
  const fetchAllPlaces = async () => {
    try {
      const token = getCookieValue('token');
      const response = await fetch('https://localhost:7036/api/Place', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseBody = await response.json();
  
      if (response.ok) {
        setPlaces(responseBody);
        const uniqueNamesSet = new Set(responseBody.map((place) => place.placeName));
        const uniqueNamesArray = Array.from(uniqueNamesSet);
        setUniquePlaceNames(uniqueNamesArray);
        const uniqueCost = new Set(responseBody.map((place) => place.tourCost));
        const uniqueCostArray = Array.from(uniqueCost);
        setUniquetourCost(uniqueCostArray);
        const uniqueSpots = new Set(responseBody.map((place) => place.spots));
        const uniqueSpotArray = Array.from(uniqueSpots);
        setUniquespots(uniqueSpotArray);
      } else {
        const errorMessage = responseBody.errorMessage;
        console.error('Error:', errorMessage);
        setErrorMessage('An error occurred: ' + errorMessage); // Customize the error message here
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred: ' + error.message); // Customize the error message here
      setSnackbarOpen(true);
    }
  };
  
  const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };
  useEffect(() => {
    // Check if the user is authenticated
    const UserName=localStorage.getItem('UserName')
    setUserNameState(UserName);
    const isAuthenticated = getCookieValue('token');
    const token=localStorage.getItem ('token');
    if (!isAuthenticated) {
      navigate('/user-login'); // Redirect to the login page if not authenticated
    } else {
      fetchAllPlaces();
    }
  }, [navigate]);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  const buttonStyle = {
    backgroundColor: 'trans',
    color: 'black',
    boxShadow: 'none',
    textTransform: 'none',
    width: '10%'
  };



  const [selectedPlaceName, setSelectedPlaceName] = useState('');
  const [selectedTourCost, setSelectedTourCost] = useState('');
  const [selectedSpots, setSelectedSpots] = useState('');

  const fetchFilteredPlaces = async (placeName, tourCost, spots) => {
    try {
      const queryParams = new URLSearchParams();
      if (placeName) {
        queryParams.append('placeName', placeName);
      }
      if (tourCost) {
        queryParams.append('tourCost', parseInt(tourCost));
      }
      if (spots) {
        queryParams.append('spots', spots);
      }

      const queryString = queryParams.toString();
      const apiUrl = `https://localhost:7036/api/Place/filter?${queryString}`;
      console.log('API URL:', apiUrl); // Log the API URL for debugging
      const response = await fetch(apiUrl);
      const responseBody = await response.json();
      console.log('API Response:', responseBody); // Log the API response for debugging

      if (response.ok) {
        setPlaces(responseBody);
      } else {
        const errorMessage = responseBody.errorMessage;
        alert('Error: ' + errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearchButtonClick = () => {
    fetchFilteredPlaces(selectedPlaceName, selectedTourCost, selectedSpots);
  };

  const [selectedPlace, setSelectedPlace] = useState(null);
  const handleImageClick = (place) => {
    // Split the spotsImage string into an array of images using the split() method
    const spotsImageArray = place.spotsImage.split(',');

    setSelectedPlace({ ...place, spotsImageArray });
    setIsDialogOpen(true);
  };

  return (
    <div>
<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
  <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
    {errorMessage}
  </MuiAlert>
</Snackbar>

      <nav className="padding-5">
        <img src={logo} alt="Logo image" />
        <div className="nav__items">
          <div className="nav-line"></div>
          <a href="/home" className="nav--active">Home</a>
          <a href="/tour">Tour</a>
          <a href="/feedback">Feedback</a>
          <a href="/gallery">Gallery</a>
          <a href="/logout">Logout</a>
        </div>
        <div className="nav__buttons">
        <button><Link to='/user-login'>Login</Link></button>
          <button><Link to='/user-register'>Sign up</Link></button>
        </div>
      </nav>

      <button className="menu" onClick={handleMenuToggle}>
        <span></span><span></span><span></span>
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
        <button><Link to='/user-login'>Login</Link></button>
          <button><Link to='/user-register'>Sign up</Link></button>
        </div>
      </aside>
      <Box className="" style={{ marginLeft: '20%', marginRight: '5%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: '3%', flexWrap: 'wrap' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                id="placeName"
                select
                label="Location"
                variant="outlined"
                sx={{ width: '100%', marginBottom: '8px' }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LocationIcon /></InputAdornment>,
                }}
                SelectProps={{ style: { height: '43px' } }}
                value={selectedPlaceName} // Set the value to the selectedTourCost state
                onChange={(e) => setSelectedPlaceName(e.target.value)} // Update the selectedTourCost state on change
              >
                {uniquePlaceNames.map((placeName) => (
                  <MenuItem key={placeName} value={placeName}>
                    {placeName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>


            <Grid item xs={12} sm={3}>
              <TextField
                id="tourCost"
                select
                label="Tour Cost"
                variant="outlined"
                sx={{ width: '100%', marginBottom: '8px' }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon /></InputAdornment>,
                }}
                SelectProps={{ style: { height: '43px' } }}
                value={selectedTourCost} // Set the value to the selectedTourCost state
                onChange={(e) => setSelectedTourCost(e.target.value)} // Update the selectedTourCost state on change
              >
                {uniqueCost.map((tourCost) => (
                  <MenuItem key={tourCost} value={tourCost}>
                    {tourCost}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                id="spots"
                select
                label="Spots"
                variant="outlined"
                sx={{ width: '100%', marginBottom: '8px' }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><TourIcon /></InputAdornment>,
                }}
                SelectProps={{ style: { height: '43px' } }}
                value={selectedSpots} // Set the value to the selectedSpots state
                onChange={(e) => setSelectedSpots(e.target.value)} // Update the selectedSpots state on change
              >
                {uniqueSpots.map((spots) => ( // Use uniqueSpots to populate the options
                  <MenuItem key={spots} value={spots}>
                    {spots}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>



            <Grid item xs={12} sm={3}>
              <Button variant="contained" sx={buttonStyle} onClick={handleSearchButtonClick} >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box></Box>
      <section className="destination padding-5" id="pricing">
      <h3 className="subtitle">Hi User, {usernamestate}</h3>
        <h3 className="subtitle">Best Places In The World</h3>
        <h2 className="title">Explore Top Destination</h2>

        <div class="destination-box">

          {place.map((Place) => (
            <div class="destination__item" key={Place.placeId}>

              <div class="destination-image">
                <img src={`https://localhost:7036/uploads/place/${Place.placeImage}`} alt="Destination image" onClick={() => handleImageClick(Place)} />
                <div class="price">₹{Place.tourCost}</div>
              </div>
              <h2>{Place.placeName}</h2>
              <p class="description">{Place.placeDescription}</p>
              

              <Grid container spacing={-4}>
                <Link to={`/hotel/${Place.placeId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Grid item sx={{ border: '2px solid grey', borderRadius: '5px', padding: '2px', marginRight: '8px' }}>
                    <Button variant="outlined">
                      <span className="cardtext">Hotel</span>
                    </Button>
                  </Grid></Link>
                <Link to={`/restaurant/${Place.placeId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Grid item sx={{ border: '2px solid grey', borderRadius: '5px', padding: '2px', marginRight: '8px' }}>
                    <Button variant="outlined" >
                      <span className="cardtext">Restaurant</span>
                    </Button>
                  </Grid></Link>
              
              </Grid><br></br>
              <Grid container >
              <Grid item sx={{ border: '2px solid grey', borderRadius: '5px', padding: '2px', marginRight: '8px',alignItems:'center' }}>
              <Link to='/booking'>
                    <Button variant="outlined" >
                      <span className="cardtext">Book Your Favorite Trip Now</span>
                    </Button></Link></Grid>
              </Grid>
              <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                {selectedPlace && (
                  <React.Fragment>
                       <DialogTitle>Total Days:{selectedPlace.totalDays}</DialogTitle>
                       <DialogTitle>Maximum Distance:{selectedPlace.maxDistance} km</DialogTitle>
                       <DialogTitle>Day Cost:₹{selectedPlace.dayCost}</DialogTitle>
                    <DialogTitle>Route:{selectedPlace.route}</DialogTitle>
                    <DialogTitle>Spots:{selectedPlace.spots}</DialogTitle>
                    <DialogContent>
                      <Card>
                        <CardContent>
                          {selectedPlace.spotsImageArray.map((image, index) => (
                            <CardMedia
                              key={index}
                              component="img"
                              src={image}
                              alt={`Spot ${index + 1}`}
                              style={{ width: '100%', maxWidth: '300px', height: 'auto', margin: '5px' }}
                            />
                          ))}
                        </CardContent>
                      </Card>
                    </DialogContent>
                  </React.Fragment>
                )}
              </Dialog>
           
            </div>

          ))}
        </div>

      </section>


    </div>
  )
}

export default Tour
