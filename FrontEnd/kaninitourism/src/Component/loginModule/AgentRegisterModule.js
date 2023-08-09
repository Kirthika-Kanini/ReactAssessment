import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, Snackbar } from "@mui/material";
import { useState } from "react";
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AgentRegisterModule() {
    const initialFormData = {
        travelAgentName: '',
        travelAgentPassword: '',
        travelAgentContact: '',
        travelAgentEmail: '',
        travelAgentCompany: '',
        travelAgentCompanyAddress: '',
      };
    
      const [formData, setFormData] = useState(initialFormData);
      const [openSnackbar, setOpenSnackbar] = useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState('');
      const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const navigate = useNavigate();
      const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
    
        if (!formData.travelAgentName) {
          isproceed = false;
          errormessage += ' Full Name';
        }
        if (!formData.travelAgentPassword) {
          isproceed = false;
          errormessage += ' Password';
        }
        if (!formData.travelAgentEmail) {
          isproceed = false;
          errormessage += ' Email';
        }
        if (!formData.travelAgentContact) {
          isproceed = false;
          errormessage += ' Contact';
        } 
        else if(formData.travelAgentContact.length !== 10){
          isproceed = false;
          errormessage = ' Contact number has to be of 10 digits';
        }
        if (!formData.travelAgentCompany) {
          isproceed = false;
          errormessage += ' Company';
        }
        if (!formData.travelAgentCompanyAddress) {
          isproceed = false;
          errormessage += ' Company Address';
        }
    
        if (!isproceed) {
          displaySnackbar(errormessage, 'error');
        } else {
          if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formData.travelAgentEmail)) {
            isproceed = false;
            displaySnackbar('Please enter a valid email', 'error');
          }
          if (formData.travelAgentPassword.length < 8) {
            isproceed = false;
            displaySnackbar('Password must be at least 8 characters long', 'error');
          } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}/.test(formData.travelAgentPassword)) {
            isproceed = false;
            displaySnackbar('Password must contain at least one uppercase letter, one lowercase letter, and one special character.', 'error');
          }
        }
    
        return isproceed;
      };
    
      const displaySnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
      };
    
      const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (IsValidate()) {
          // Perform form submission using Axios POST request
          axios
            .post('https://localhost:7036/api/Agents', { ...formData, travelAgentStatus: 'Requested' })
            .then((response) => {
              console.log('Agent registered successfully:', response.data);
              displaySnackbar('Agent registered successfully', 'success');
              // Clear the form data after successful registration
              setFormData(initialFormData);
              navigate('/agent-login');
            })
            .catch((error) => {
              console.error('Error registering agent:', error);
              displaySnackbar('Error registering agent', 'error');
            });
        }
      };
    
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "95vh", // Set the container's height to viewport height
            }}
        >
            <Container component="main" maxWidth="lg">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center", // Center the content vertically
                    }}
                > <form onSubmit={handleSubmit}>
                    <Grid container>
                       
                        <CssBaseline />
                        <Grid
                            item
                            xs={12}
                            sm={4} 
                            md={4}
                            sx={{
                                backgroundImage: "url(https://media.cntraveler.com/photos/58de89946c3567139f9b6cca/1:1/w_3633,h_3633,c_limit/GettyImages-468366251.jpg)",
                                backgroundRepeat: "no-repeat",
                                backgroundColor: (t) =>
                                    t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                        {/* Right Grid */}
                        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>

                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Typography component="h1" variant="h5">
                                    Sign Up
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="TravelAgent Name"
                                            name="travelAgentName"
                                            autoComplete="travelAgentName"
                                            value={formData.travelAgentName}
                                            onChange={handleChange}
                                            autoFocus
                                            maxLength={100} 
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="travelAgentPassword"
                                            label="TravelAgent Password"
                                            type="password"
                                            id="password"
                                            value={formData.travelAgentPassword}
                                            onChange={handleChange}
                                            autoComplete="current-password"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="travelAgentEmail"
                                            label="Email Address"
                                            name="travelAgentEmail"
                                            autoComplete="email"
                                            value={formData.travelAgentEmail}
                                            onChange={handleChange}
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="travelAgentContact"
                                            label="Travel AgentContact"
                                            type="number"
                                            id="travelAgentContact"
                                            value={formData.travelAgentContact}
                                            onChange={handleChange}
                                            autoComplete="current-password"
                                            minLength={10} // Added min length validation
                                            maxLength={10}
                                        />
                                    </Grid>

                                </Grid>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="travelAgentCompany"
                                    label="TravelAgent Company"
                                    type="text"
                                    id="travelAgentCompany"
                                    value={formData.travelAgentCompany}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="travelAgentCompanyAddress"
                                    label="Company Address"
                                    name="travelAgentCompanyAddress"
                                    value={formData.travelAgentCompanyAddress}
                                    onChange={handleChange}
                                    type="text"
                                />
                            
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Agent Sign Up
                                </Button>
                                <Grid container>
                                
                                    <Grid item>
                                        <Link to="/agent-login" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                    </Grid>
                   
                </Grid>
                </form>
                </Box>
            </Container >
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
        </Box >
    );
}