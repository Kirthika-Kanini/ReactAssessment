import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function addRestaurant() {
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
        handleSubmit;
      }
    }, [navigate]);
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
            .post('https://localhost:7036/api/Restaurant', data,{
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                },
            })
            .then((response) => {
                console.log('Form data submitted successfully:', response.data);
                // Clear the form data and selectedImage
                setFormData(initialFormData);
            })
            .catch((error) => {
                console.error('Error submitting form data:', error);
                // Handle error if needed
            });
    };
    return (
        <Box sx={{ backgroundColor: '#F0F4F7', height: '97vh', p: 2 }}>
            <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
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
            </Box>
        </Box>
    )
}

export default addRestaurant
