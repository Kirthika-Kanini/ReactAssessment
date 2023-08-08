import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system'
import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function addRestaurantActions() {
    const [restaurant, setRestaurants] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

    const navigate = useNavigate();
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
      const isAuthenticated = getCookieValue('token');
      if (!isAuthenticated) {
        navigate('/agent-login'); // Redirect to the login page if not authenticated
      } else {
        fetchAllRestaurants();
      }
    }, [navigate]);
    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const fetchAllRestaurants = async () => {
        try {
            const response = await fetch('https://localhost:7036/api/Restaurant',{
                Authorization: `Bearer ${getCookieValue('token')}`,
            });
            const responseBody = await response.json(); // Parsing the JSON response

            if (response.ok) {
                // Set the rooms using the data in the response body
                setRestaurants(responseBody); // Assuming setRooms is a state update function
            } else {
                const errorMessage = responseBody.errorMessage;
                alert('Error: ' + errorMessage); // Display the errorMessage value in the alert
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const initialFormData = {
        restaurantName: '',
        restaurantLocation: '',
        restaurantSubLocation: '',
        restaurantPincode: '',
        restaurantImage: '',
        restaurantContact: '',
        imageFile: null,
        place: {
            placeId: 0,
        },
    };

    const [formData, setFormData] = useState(initialFormData);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'place.placeId') {
            setFormData((prevData) => ({
                ...prevData,
                place: {
                    ...prevData.place,
                    placeId: value,
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
        setFormData((prevData) => ({
            ...prevData,
            imageFile: file,
        }));
        console.log(file); // Add this line to check the selected file in the console
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const restaurantId = formData.restaurantId;

        // Construct the URL for the specific place using its ID
        const apiUrl = `https://localhost:7036/api/Restaurant/${restaurantId}`;
        const data = new FormData();
        data.append('restaurantName', formData.restaurantName);
        data.append('restaurantLocation', formData.restaurantLocation);
        data.append('restaurantSubLocation', formData.restaurantSubLocation);
        data.append('restaurantPincode', formData.restaurantPincode);
        data.append('restaurantImage', formData.restaurantImage);
        data.append('restaurantContact', formData.restaurantContact);
        data.append('imageFile', formData.imageFile);
        data.append('place.placeId', formData.place.placeId);

        // Perform form submission using Axios POST request
        axios
            .put(apiUrl, data, {
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                },
            })
            .then((response) => {
                console.log('Form data submitted successfully:', response.data);
                setFormData(initialFormData);
                setOpenDialog(false); // Close the dialog after successful submission
            })
            .catch((error) => {
                console.error('Error submitting form data:', error);
            });
    };

    const fetchPlaceDetails = async (restaurantId) => {
        try {
            const response = await axios.get(`https://localhost:7036/api/Restaurant/${restaurantId}`);
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

    const handleUpdateClick = async (restaurantId) => {
        const placeDetails = await fetchPlaceDetails(restaurantId);
        if (placeDetails) {
            setFormData(placeDetails);
            setOpenDialog(true);
        } else {
            console.log('Failed to fetch place details for update.');
        }
    };
    const handleDeleteClick = async (restaurantId) => {
        try {
            const response = await axios.delete(`https://localhost:7036/api/Restaurant/${restaurantId}`,{
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                },
            });
            if (response.status === 200) {
                console.log('Place deleted successfully:', response.data);
                // After successful deletion, you can fetch all packages again to update the list
                fetchAllRestaurants();
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
                    {restaurant.map((Restaurant) => (
                        <Grid item xs={12} sm={6} md={3} key={Restaurant.restaurantId}>
                            <Card sx={{ marginRight: '2%', marginBottom: '2%' }}>

                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://localhost:7036/uploads/restaurant/${Restaurant.restaurantImage}`}
                                     
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            
                                            <span style={{ backgroundColor: 'rgba(81, 98, 246, 0.14)', float: 'right', orderRadius: '3px', paddingLeft: '8px', paddingRight: '8px', padding: '2px', color: 'blue', borderRadius: '5px' }}>{Restaurant.restaurantLocation}</span>
                                        </Typography>
                                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                                            {Restaurant.restaurantName}
                                        </Typography>
                                    </CardContent>

                                </CardActionArea>
                                <CardActions>
                                    <Box sx={{ marginLeft: '3%' }}>
                                        <Grid container>
                                            <Grid item sx={{ border: '2px solid grey', borderRadius: '5px', padding: '2px', marginRight: '8px' }}>
                                                <Button variant="outlined" onClick={() => handleUpdateClick(Restaurant.restaurantId)}>
                                                    <span className="cardtext">Update</span>
                                                </Button>
                                            </Grid>
                                            <Grid item sx={{ border: '2px solid grey', borderRadius: '5px', padding: '2px', marginRight: '8px' }}>
                                                <Button variant="outlined" onClick={() => handleDeleteClick(Restaurant.restaurantId)}>
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
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="restaurantName"
                            value={formData.restaurantName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Location"
                            name="restaurantLocation"
                            value={formData.restaurantLocation}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Sub Location"
                            name="restaurantSubLocation"
                            value={formData.restaurantSubLocation}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Pincode"
                            name="restaurantPincode"
                            value={formData.restaurantPincode}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Contact"
                            name="restaurantContact"
                            value={formData.restaurantContact}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Place ID"
                            name="place.placeId"
                            value={formData.place.placeId}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Box>
                            <label htmlFor="imageFile">Upload Image</label>
                            <input
                                type="file"
                                id="imageFile"
                                name="imageFile"
                                className="form-control-file"
                                onChange={handleImageChange}
                                required
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </DialogContent>
                </Dialog>
        </Box>
    )
}

export default addRestaurantActions
