import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Gallery() {
  const [gallery, setGallery] = useState([]);
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
    } else if (userRole === 'Agent') {
      navigate('/Unauthorized');
    }
    else {
      fetchGallery();
    }
  }, [navigate]);
  const initialFormData = {
    Gname: '',
    GalImage: null,
  };
  const [formData, setFormData] = useState(initialFormData);

 
  const fetchGallery = async () => {
    try {
      const response = await axios.get("https://localhost:7029/api/GalleryBlobs",{
        Authorization: `Bearer ${getCookieValue('token')}`,
    });
      setGallery(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };
  return (
    <Box sx={{ backgroundColor: '#F0F4F7', height: '97vh', p: 2 }}>
            <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
      <Grid container spacing={'1%'}>
     {gallery.map((GalleryBlob) => (
        <Grid item xs={12} sm={6} md={3} key={GalleryBlob.galId}>
            <Card sx={{ marginRight: '2%', marginBottom: '2%' }}>

                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image= {GalleryBlob.galImage }
                        alt="Conference Room"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
       
                        </Typography>
                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                            {GalleryBlob.gname}
                        </Typography>
                    </CardContent>

                </CardActionArea>
               
            </Card>
        </Grid>
        
        ))}
        </Grid>
        </Box>
        </Box>
  );
}

export default Gallery;
