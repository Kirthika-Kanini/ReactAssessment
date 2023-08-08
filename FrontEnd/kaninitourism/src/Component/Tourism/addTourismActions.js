import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system'
import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function addTourismActions() {
    const [tourism, setTourisms] = useState([]);
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [travelId, setTravelId] = useState(0);

    useEffect(() => {
        const storedToken = localStorage.getItem("decodedToken");
        const decoded = JSON.parse(storedToken);
        setDecodedToken(decoded);
        setTravelId(decoded.TravelAgentId);
    }, []);

    // useEffect(() => {
    //     fetchAllPackages();
    // }, [travelId]); // Trigger fetchAllPackages whenever travelId changes
    const navigate = useNavigate();
    useEffect(() => {
        // Check if the user is authenticated
        const isAuthenticated = getCookieValue('token');
        if (!isAuthenticated) {
          navigate('/agent-login'); // Redirect to the login page if not authenticated
        } else {
          fetchAllPackages();
        }
      }, [navigate,travelId])

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
    

    const fetchAllPackages = async () => {
        try {
            const response = await fetch('https://localhost:7036/api/Place',{
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                },
            });
            if (response.ok) {
                const responseBody = await response.json();
                const placeWithId = responseBody.filter(place => place.agent.travelAgentId === parseInt(travelId));
                console.log(`Total places with travelAgentId === ${travelId}: ${placeWithId.length}`);
                setTourisms(placeWithId);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const initialFormData = {
        placeName: '',
        placeDescription: '',
        latitude: '',
        longitude: '',
        dayCost: 0,
        tourCost: 0,
        maxDistance: 0,
        totalDays: 0,
        spots: '',
        route:'',
        spotsImage:'',
        routeImage:'',
        imageFile: null,
        agent: {
            travelAgentId: 0,
        },
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'agent.travelAgentId') {
            setFormData((prevData) => ({
                ...prevData,
                agent: {
                    ...prevData.agent,
                    travelAgentId: parseInt(value),
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        console.log(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        // Extract the placeId from formData (assuming it's included in the fetched data)
        const placeId = formData.placeId;

        // Construct the URL for the specific place using its ID
        const apiUrl = `https://localhost:7036/api/Place/${placeId}`;

        // Prepare the data to be sent in the PUT request
        const data = new FormData();
        data.append('placeName', formData.placeName);
        data.append('placeDescription', formData.placeDescription);
        data.append('latitude', formData.latitude);
        data.append('longitude', formData.longitude);
        data.append('dayCost', formData.dayCost);
        data.append('tourCost', formData.tourCost);
        data.append('maxDistance', formData.maxDistance);
        data.append('totalDays', formData.totalDays);
        data.append('route', formData.route);
        data.append('spots', formData.spots);
        data.append('spotsImage', formData.spotsImage);
        data.append('routeImage', formData.routeImage);
        data.append('agent.travelAgentId', formData.agent.travelAgentId);
        if (selectedImage) {
            data.append('imageFile', selectedImage);
        }

        // Perform form submission using Axios PUT request
        axios
            .put(apiUrl, data, {
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                },
            })
            .then((response) => {
                console.log('Form data submitted successfully:', response.data);
                setFormData(initialFormData);
                setSelectedImage(null);
                setOpenDialog(false); // Close the dialog after successful submission
            })
            .catch((error) => {
                console.error('Error submitting form data:', error);
            });
    };

    const fetchPlaceDetails = async (placeId) => {
        try {
            const response = await axios.get(`https://localhost:7036/api/Place/${placeId}`);
            if (response.status === 200) {
                console.log(response.data)
                return response.data;
            } else {
                console.error('Failed to fetch place details:', response);
                return null;
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const handleUpdateClick = async (placeId) => {
        const placeDetails = await fetchPlaceDetails(placeId);
        if (placeDetails) {
            setFormData(placeDetails);
            setOpenDialog(true);
        } else {
            console.log('Failed to fetch place details for update.');
        }
    };
    const handleDeleteClick = async (placeId) => {
        try {
          const response = await axios.delete(`https://localhost:7036/api/Place/${placeId}`);
          if (response.status === 200) {
            console.log('Place deleted successfully:', response.data);
            // After successful deletion, you can fetch all packages again to update the list
            fetchAllPackages();
          } else {
            console.error('Failed to delete place:', response);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    return (

        <Box sx={{ backgroundColor: '#F0F4F7', height: '97vh', p: 2 }}>
            <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
                <Grid container spacing={'1%'}>
                    {tourism.map((Place) => (
                        <Grid item xs={12} sm={6} md={3} key={Place.placeId}>
                            <Card sx={{ marginRight: '2%', marginBottom: '2%' }}>

                                <CardActionArea>
                                <Link to={`/hotel/${Place.placeId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://localhost:7036/uploads/place/${Place.placeImage}`}
                                        alt="Conference Room"
                                    /></Link>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            <span style={{ backgroundColor: 'rgba(81, 98, 246, 0.14)', float: 'right', orderRadius: '3px', paddingLeft: '8px', paddingRight: '8px', padding: '2px', color: 'blue', borderRadius: '5px' }}>{Place.tourCost}</span>
                                        </Typography>
                                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                                            {Place.placeName}
                                        </Typography>
                                    </CardContent>

                                </CardActionArea>
                                <CardActions>
                                    <Box sx={{ marginLeft: '3%' }}>
                                        <Grid container>
                                            <Grid item sx={{ border: '2px solid grey', borderRadius: '5px', padding: '2px', marginRight: '8px' }}>
                                                <Button variant="outlined" onClick={() => handleUpdateClick(Place.placeId)}>
                                                    <span className="cardtext">Update</span>
                                                </Button>
                                            </Grid>
                                            <Grid item sx={{ border: '2px solid grey', borderRadius: '5px', padding: '2px', marginRight: '8px' }}>
                                                <Button variant="outlined" onClick={() => handleDeleteClick(Place.placeId)}>
                                                    <span className="cardtext">Delete</span>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {/* Dialog */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogContent>
                    <Typography variant="body1">Hi</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="placeName"
                            value={formData.placeName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Description"
                            name="placeDescription"
                            value={formData.placeDescription}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Latitude"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Longitude"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="DayCost"
                            name="dayCost"
                            value={formData.dayCost}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="TourCost"
                            name="tourCost"
                            value={formData.tourCost}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="MaxDistance"
                            name="maxDistance"
                            value={formData.maxDistance}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Total Days"
                            name="totalDays"
                            value={formData.totalDays}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Spots"
                            name="spots"
                            value={formData.spots}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="route"
                            name="route"
                            value={formData.route}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="spotsImage"
                            name="spotsImage"
                            value={formData.spotsImage}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="routeImage"
                            name="routeImage"
                            value={formData.routeImage}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Box>
                            <input
                                type="file"
                                name="placeImage"
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                            />
                            <Button onClick={() => fileInputRef.current.click()} variant="contained" color="primary">
                                Upload Image
                            </Button>
                            {selectedImage && <span>{selectedImage.name}</span>}
                        </Box><br></br>
                        <TextField
    label="Agent ID"
    name="agent.travelAgentId"
    value={formData.agent?.travelAgentId || ''} // Handle null or undefined value
    onChange={handleChange}
    fullWidth
    margin="normal"
/>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>

    )
}

export default addTourismActions
