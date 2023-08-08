import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function addHotel() {
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
        hotelName: '',
        hotelLocation: '',
        hotelSubLocation: '',
        hotelPincode: '',
        hotelImage: '',
        hotelContact: '',
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
        data.append('hotelName', formData.hotelName);
        data.append('hotelLocation', formData.hotelLocation);
        data.append('hotelSubLocation', formData.hotelSubLocation);
        data.append('hotelPincode', formData.hotelPincode);
        data.append('hotelImage', formData.hotelImage);
        data.append('hotelContact', formData.hotelContact);
        data.append('imageFile', formData.imageFile);
        data.append('place.placeId', formData.place.placeId);

        // Perform form submission using Axios POST request
        axios
            .post('https://localhost:7036/api/Hotel', data, {
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
                        name="hotelName"
                        value={formData.hotelName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Location"
                        name="hotelLocation"
                        value={formData.hotelLocation}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Sub Location"
                        name="hotelSubLocation"
                        value={formData.hotelSubLocation}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Pincode"
                        name="hotelPincode"
                        value={formData.hotelPincode}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Contact"
                        name="hotelContact"
                        value={formData.hotelContact}
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

export default addHotel
