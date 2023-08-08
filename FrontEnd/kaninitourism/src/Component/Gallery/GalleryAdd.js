import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GalleryAdd() {
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
    const userRole = localStorage.getItem('userRole');
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = getCookieValue('token');
    if (!isAuthenticated) {
      navigate('/admin-login'); // Redirect to the login page if not authenticated
    }
    else if (userRole === 'Agent') {
      navigate('/Unauthorized');
    }
     else {
      handleSubmit;
    }
  }, [navigate]);
    const initialFormData = {
      Gname: '',
      GalImage: null,
    };
    const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    // If the input is a file input (for the image), update the state with the selected file
    if (name === 'GalImage') {
      const selectedImage = files[0];
      setFormData({
        ...formData,
        GalImage: selectedImage,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const apiEndpoint = 'https://localhost:7029/api/GalleryBlobs'; // Adjust the endpoint to match your server

    // Create a FormData object to send the form data as a multipart/form-data request
    const formDataToSend = new FormData();
    formDataToSend.append('Gname', formData.Gname);
    formDataToSend.append('GalImage', formData.GalImage);

    // Send the form data to the API endpoint using Axios
    axios.post(apiEndpoint, formDataToSend)
    .then((response) => {
      // Handle the success response here
      console.log('Hotel added successfully:', response.data);
      // Clear the form data
      setFormData(initialFormData);
      // You can also refresh the gallery data after successful addition
      
    })
    .catch((error) => {
      // Handle the error response here
      console.error('Error adding hotel:', error);
      console.error('Error response data:', error.response.data);
    });
};

  return (
    <div>
              <Box sx={{ backgroundColor: '#F0F4F7', height: '97vh', p: 2 }}>
            <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
<form onSubmit={handleSubmit}>
<TextField
          label="Hotel Name"
          variant="outlined"
          name="Gname"
          value={formData.Gname}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <br></br>
        <input
          type="file"
          name="GalImage"
          accept="image/*"
          onChange={handleChange}
          required
        />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </Box>
    </Box>
    </div>
  )
}

export default GalleryAdd
