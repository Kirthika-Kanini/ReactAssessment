import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
const addTourism = () => {
    
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
      const [usernamestate, setUserNameState] = useState('');
    useEffect(() => {
      // Check if the user is authenticated
      const UserName=localStorage.getItem('UserName')
      setUserNameState(UserName)
      const isAuthenticated = getCookieValue('token');
      if (!isAuthenticated) {
        navigate('/agent-login'); // Redirect to the login page if not authenticated
      } else {
        handleSubmit;
      }
    }, [navigate]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const displaySnackbar = (message, severity = 'success')=> {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value for ';

       
    if (!formData.placeName) {
        isproceed = false;
        errormessage += ' Place Name';
    }
    if (!formData.placeDescription) {
        isproceed = false;
        errormessage += ' Place Description';
    }
    if (!formData.latitude) {
        isproceed = false;
        errormessage += ' Latitude';
    }
    if (!formData.longitude) {
        isproceed = false;
        errormessage += ' Longitude';
    }
    if (!formData.tourCost) {
        isproceed = false;
        errormessage += ' Tour Cost';
    } else  if (formData.tourCost < 0) {
        isproceed = false;
        errormessage = ' Tour Cost Cant be Negative';
      }else if (formData.tourCost < 2000 || formData.tourCost > 400000) {
        isproceed = false;
        errormessage = ' Tour Cost must be between 2000 and 400000';
    }
    if (!formData.dayCost) {
        isproceed = false;
        errormessage += ' Day Cost';
    } else if (formData.dayCost < 0) {
        isproceed = false;
        errormessage = ' Day Cost Cant be Negative';
      }else if (formData.dayCost < 2000 || formData.dayCost > 40000) {
        isproceed = false;
        errormessage = ' Day Cost must be between 2000 and 40000';
    }
    if (!formData.maxDistance) {
        isproceed = false;
        errormessage += ' Max Distance';
    } else  if (formData.maxDistance < 0) {
        isproceed = false;
        errormessage = ' Max Distance Cant be Negative';
      }else if (formData.maxDistance < 100 || formData.maxDistance > 10000) {
        isproceed = false;
        errormessage = ' Max Distance must be between 100 and 10000';
    }
    if (!formData.totalDays) {
        isproceed = false;
        errormessage += ' Total Days';
    }else if (formData.totalDays < 0) {
        isproceed = false;
        errormessage = ' Total Days Cant be Negative';
      } else if (formData.totalDays < 1 || formData.totalDays > 20) {
        isproceed = false;
        errormessage += ' Total Days must be between 1 and 20';
    }
        
        if (!isproceed) {
            displaySnackbar(errormessage, 'error');
        } else {
       
        }

        return isproceed;
    };


    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false);
      };
    const initialFormData = {
        placeName: '',
        placeDescription: '',
        latitude: '',
        longitude: '',
        dayCost: 0,
        tourCost: 0,
        maxDistance: 0,
        totalDays:0,
        spots:'',
        spotsImage:'',
        route:'',
        routeImage:'',
        imageFile: null, // Initialize imageFile with null
        agent: {
            travelAgentId: 0,
        },
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedImage, setSelectedImage] = useState(null); // Initialize selectedImage with null
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'agent.travelAgentId') {
            setFormData((prevData) => ({
                ...prevData,
                agent: {
                    ...prevData.agent,
                    travelAgentId: value,
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
        console.log(file); // Add this line to check the selected file in the console
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
if(IsValidate()){
        const data = new FormData();
        data.append('placeName', formData.placeName);
        data.append('placeDescription', formData.placeDescription);
        data.append('latitude', formData.latitude);
        data.append('longitude', formData.longitude);
        data.append('dayCost', formData.dayCost);
        data.append('tourCost', formData.tourCost);
        data.append('maxDistance', formData.maxDistance);
        data.append('totalDays', formData.totalDays);
        data.append('spots', formData.spots);
        data.append('spotsImage', formData.spotsImage);
        data.append('route', formData.route);
        data.append('routeImage', formData.routeImage);
        data.append('agent.travelAgentId', formData.agent.travelAgentId);
        if (selectedImage) {
            data.append('imageFile', selectedImage); // Use 'imageFile' as the key
        }
        
        // Perform form submission using Axios POST request
        axios
            .post('https://localhost:7036/api/Place', data, {
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                },
            })
            .then((response) => {
                console.log('Form data submitted successfully:', response.data);
                // Clear the form data and selectedImage
                setFormData(initialFormData);
                setSelectedImage(null);
            })
            .catch((error) => {
                console.error('Error submitting form data:', error);
                // Handle error if needed
            });
        }
    };



    return (
        <Box sx={{ backgroundColor: '#F0F4F7', height: '97vh', p: 2 }}>
            <h3>Hi Agent, {usernamestate}</h3>
           
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
            <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
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
                        label="Spots Image"
                        name="spotsImage"
                        value={formData.spotsImage}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                  
                     <TextField
                        label="Route"
                        name="route"
                        value={formData.route}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                     <TextField
                        label="Agent ID"
                        name="agent.travelAgentId"
                        value={formData.agent.travelAgentId}
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

                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default addTourism;