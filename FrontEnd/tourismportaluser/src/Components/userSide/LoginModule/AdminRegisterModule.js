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

export default function AdminRegisterModule() {
    const initialFormData = {
       name:'',
       password:'',
       email:'',
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
    
      const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
    
        if (!formData.name) {
          isproceed = false;
          errormessage += ' Full Name';
        }
        if (!formData.password) {
          isproceed = false;
          errormessage += ' Password';
        }
        if (!formData.email) {
          isproceed = false;
          errormessage += ' Email';
        }
       
    
        if (!isproceed) {
          displaySnackbar(errormessage, 'error');
        } else {
          if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formData.email)) {
            isproceed = false;
            displaySnackbar('Please enter a valid email', 'error');
          }
          if (formData.password.length < 8) {
            isproceed = false;
            displaySnackbar('Password must be at least 8 characters long', 'error');
          } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}/.test(formData.password)) {
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
          axios.post('https://localhost:7194/api/Admins', formData)
  .then((response) => {
    console.log('Admin registered successfully:', response.data);
    displaySnackbar('Admin registered successfully', 'success');
    // Clear the form data after successful registration
    setFormData(initialFormData);
  })
  .catch((error) => {
    console.error('Error registering admin:', error);
    displaySnackbar('Error registering admin', 'error');
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
                }}
            >
                <Grid container>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: "url(https://media.istockphoto.com/id/1371550452/photo/beautiful-scenery-at-hangzhou-west-lake-elegant-woman-in-dress-looks-in-into-the-jixian.jpg?b=1&s=612x612&w=0&k=20&c=qpQvFZ44g38Lgmpt1_0TV4nl_iYovlf2thZYdhaKNbo=)",
                            backgroundRepeat: "no-repeat",
                            backgroundColor: (t) =>
                                t.palette.mode === "light"
                                    ? t.palette.grey[50]
                                    : t.palette.grey[900],
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                    >
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
                                Sign in
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                               
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            name="name"
                                            autoComplete="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoFocus
                                            maxLength={100} 
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="current-password"
                                        />
                                <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="email"
                                  label="Email"
                                  type="email"
                                  id="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  autoComplete="current-password"
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
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                    <a href='/admin-login' variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </a>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                
            </Box>
        </Container>
        
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                {snackbarMessage}
            </MuiAlert>
        </Snackbar>
    </Box >
    );
}