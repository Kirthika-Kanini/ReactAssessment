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
import { Container} from "@mui/material";
import { useEffect, useState } from "react";
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";


export default function AgentLoginModule() {
    
    const [travelAgentEmail, setEmail] = useState('');
    const [travelAgentPassword, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();
    useEffect(() => {
        sessionStorage.clear();
      }, []);
    
      const proceedLoginUsingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
          const inputObj = { travelAgentEmail: travelAgentEmail, travelAgentPassword: travelAgentPassword };
    
          fetch('https://localhost:7036/api/Token/Agent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputObj),
          })
            .then((res) => {
              if (res.ok) {
                return res.text();
              } else {
                throw new Error('Invalid Credentials');
              }
            })
            .then((resp) => {
            
              displaySnackbar('Token Generated', 'success');
              console.log(resp);
              const token = resp;
              // Store the token in a cookie
              document.cookie = `token=${resp}; expires=${getCookieExpirationDate()}; path=/`;
               const decodedToken = JSON.parse(atob(token.split('.')[1]));
               console.log(decodedToken);
               localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
            
               console.log(decodedToken.TravelAgentId);
               console.log(decodedToken.TravelAgentName);
               
               const approvalcheck = decodedToken.TravelAgentStatus
               if(approvalcheck === "Approved"){
                localStorage.setItem('token', resp);
                localStorage.setItem("UserId", decodedToken.TravelAgentId)
                localStorage.setItem("UserName", decodedToken.TravelAgentName)
                navigate('/tourist');  
               }
               else{
                displaySnackbar('You are not approved ', 'error');
               }
               localStorage.setItem("userRole", decodedToken.Role)
              
            })
            .catch((err) => {
              displaySnackbar('Login Failed due to: ' + err.message, 'error');
            });
        }
      };
      const getCookieExpirationDate = () => {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 30); // Set expiration to 10 minutes from now
        return expirationDate.toUTCString();
      };
    
      const validate = () => {
        let result = true;
        if (travelAgentEmail === '' || travelAgentEmail === null) {
          result = false;
          displaySnackbar('Please Enter Username', 'warning');
        }
        if (travelAgentPassword === '' || travelAgentPassword === null) {
          result = false;
          displaySnackbar('Please Enter Password', 'warning');
        }
        return result;
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
                                    noValidate
                                   onSubmit={proceedLoginUsingAPI}
                                    sx={{ mt: 1 }}
                                >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="travelAgentEmail"
                                        autoComplete="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="travelAgentPassword"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
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
                                            <Link href="#" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
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