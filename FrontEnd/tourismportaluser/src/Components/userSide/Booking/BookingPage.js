import React, { useEffect, useState } from "react";
import ReactBingMap, { Pushpin, Polyline } from "@3acaga/react-bing-maps";
import { Box } from "@mui/system";
import bgimage from '../HomePage/files/bg.avif';
import { Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { Dialog, DialogContent } from "@mui/material";
import emailjs, { send } from 'emailjs-com';
const key = "Ag0GqkzU5oJB_zfxYlTUdazhHjgjqw8uvUKpvxlRqbfHHDo2LR9dekSy-kVQd_Fq";

const BookingPage = () => {

    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#fff',
            color: 'black',
        },
        hospitalName: {
            fontSize: '15px'
        },
        logo: {
            width: '50px',
            height: 'auto',
            marginBottom: '10px',
        },
        section: {
            margin: 10,
            padding: 10,
        },
        viewer: {
            width: '100%',
            height: '100vh',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        invoiceNumber: {
            fontSize: 14,
        },
        address: {
            fontSize: 10,
        },
        generalInfoHeading: {
            fontSize: 13,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        infoLabel: {
            fontSize: 10,
            fontWeight: 'bold',
            marginBottom: 5,
        },
        infoValue: {
            fontSize: 11,
            marginBottom: 5,
        },
        table: {
            marginTop: 1,
            border: '1px solid #000',
            borderRadius: '5px',
        },
        tableHeader: {
            backgroundColor: '#f1f1f1',
            flexDirection: 'row',
            fontWeight: 'bold',
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableCell: {
            flex: 1,
            padding: '8px 10px',
            fontSize: 12,
            borderRight: '1px solid #000',
            borderBottom: '1px solid #000',
        },
        alternateCell: {
            backgroundColor: '#f1f1f1',
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
        },
        billingInfo: {
            flex: 1,
            padding: '10px',
            borderRight: '1px solid #ccc',
        },
        tourInfo: {
            flex: 1,
            padding: '10px',
        },
    });

    const [placeNames, setPlaceNames] = useState([]);
    const [totalRupeePerKm, setTotalRupeePerKm] = useState(0);
    const [selectedPlaceId, setSelectedPlaceId] = useState('');
    const [selectedHotelName, setSelectedHotelName] = useState('');
    const [hotelNames, setHotelNames] = useState([])
    const [selectedRestaurantName, setSelectedRestaurantName] = useState('');
    const [restaurantNames, setRestaurantNames] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState({
        latitude: 0,
        longitude: 0,
        maxDistance: 0,
        tourCost: 0,
        agentName:''
    });

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
    });

    const [startDefault, setStartDefault] = useState({
        latitude: 0,
        longitude: 0,
    });

    const [endDefault, setEndDefault] = useState({
        latitude: 50,
        longitude: 50,
    });

    const labelStyle = {
        fontSize: "11px", // Adjust the font size as needed
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );
    }, []);

    const [start, setStart] = useState(startDefault);
    const [end, setEnd] = useState(endDefault);

    const fetchPlaceNames = async () => {
        try {
            const response = await fetch('https://localhost:7036/api/Place');
            const data = await response.json();
            setPlaceNames(data);

            if (selectedPlace) {
                setEndDefault({
                    latitude: parseFloat(selectedPlace.latitude),
                    longitude: parseFloat(selectedPlace.longitude),
                });
            }

        } catch (error) {
            console.error("Error fetching place names:", error);
        }
    };

    const handleSelectChange = (event) => {
        // Find the selected option by value
        const selectedOption = placeNames.find((place) => place.placeName === event.target.value);

        if (selectedOption) {
            // Update selected place
            setSelectedPlace({
                latitude: parseFloat(selectedOption.latitude),
                longitude: parseFloat(selectedOption.longitude),
                maxDistance: parseInt(selectedOption.maxDistance),
                tourCost: parseInt(selectedOption.tourCost),
                agentName: selectedOption.agent ? selectedOption.agent.travelAgentName : '',
            });
            console.log(selectedOption.agentName);
            // Update selected place ID
            setSelectedPlaceId(selectedOption.placeName);

            // Fetch the corresponding hotel names for the selected place
            const hotelsForSelectedPlace = selectedOption.hotels.map((hotel) => hotel.hotelName);
            setHotelNames(hotelsForSelectedPlace);
            const restaurantsForSelectedPlace = selectedOption.restaurants.map((restaurant) => restaurant.restaurantName);
            setRestaurantNames(restaurantsForSelectedPlace);
            setMapKey((prevKey) => prevKey + 1)

           
            // Update the start and end coordinates
            setStart({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
            });

            setEnd({
                latitude: parseFloat(selectedOption.latitude),
                longitude: parseFloat(selectedOption.longitude),
            });

            if (currentLocation) {
                const distance = calculateDistance(
                    currentLocation.latitude,
                    currentLocation.longitude,
                    selectedOption.latitude,
                    selectedOption.longitude
                );
                if (distance > parseInt(selectedOption.maxDistance)) {
                    const totalRupeeForMaxDistance = parseInt(selectedOption.tourCost) / parseInt(selectedOption.maxDistance);
                    setTotalRupeePerKm(totalRupeeForMaxDistance);
                    console.log(totalRupeeForMaxDistance);
                    const totalCostForDistance = totalRupeeForMaxDistance * distance;
                    console.log(distance);
                    console.log(totalCostForDistance);
                    settotalCostforDist(totalCostForDistance);
                    setdistanceTot(distance);
                    console.log(start)
                    console.log(end)
                } else {
                    setTotalRupeePerKm(0);
                }
            }
   console.log("Agent Name:", selectedOption.agent ? selectedOption.agent.travelAgentName : '');
        }
    };
    const [users, setUsers] = useState({
        id: 0,
    });

    // Get the decoded token from local storage
    const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));

    // Extract the "id" value from the decoded token
    const userId = decodedToken ? decodedToken.Id : 0;
    const userName = decodedToken ? decodedToken.Name : "";
    const userPhone = decodedToken ? decodedToken.Phone : "";

    // Update the "users" state with the extracted "id", "Name", and "Phone" values when the component mounts
    useEffect(() => {
        // Update the users state whenever userId changes
        setUsers((prevUsers) => ({ ...prevUsers, id: userId, name: userName, phone: userPhone }));
    }, [userId, userName, userPhone]); // Add userPhone to the dependency array

    // Update the "users" state with the extracted "id" value when the component mounts

    const [totalCostforDist, settotalCostforDist] = useState();
    const [distanceTot, setdistanceTot] = useState();

    const [startLoc, setStartLoc] = useState("");
    const [selectedHeadCount, setSelectedHeadCount] = useState(0);
    const [selectedDaysCount, setSelectedDaysCount] = useState(0);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [selectedStartTime, setSelectedStartTime] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("");
    const [selectedBillingMail, setSelectedBillingMail] = useState("");
    const [selectedBillingAddress, setSelectedBillingAddress] = useState("");
    const [selectedUserMail, setSelectedUserMail] = useState("");

    const handleFormSubmit = async () => {
        // Prepare the data to be sent in the request body
        const requestData = {
            startingPoint: startLoc, // Add the starting point as per your requirement
            endingPoint: selectedPlaceId,
            hotel: selectedHotelName,
            restaurant: selectedRestaurantName,
            headCount: selectedHeadCount,
            daysCount: selectedDaysCount,
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            startTime: selectedStartTime,
            endTime: selectedEndTime,
            billingMail: selectedBillingMail,
            billingAddress: selectedBillingAddress,
            userMail: selectedUserMail,
            users: {
                id: users.id, // Assigning the "id" from the "users" state to the request data
            },
        };

        try {
            console.log(requestData)
            // Make the POST request to the API
            const response = await axios.post("https://localhost:7194/api/Bookings", requestData);

            // Handle the response data (if needed)
            console.log("Booking placed successfully:", response.data);
            const emailSubject = `Thanks for Booking,Your Booking Details for ${selectedPlaceId} are`;
            const emailBody = `
            Starting Point:${startLoc}
            Ending Point: ${selectedPlaceId}
            Hotel: ${selectedHotelName}
            Restaurant: ${selectedRestaurantName}
            Head Count: ${selectedHeadCount}
              Start Date: ${selectedStartDate}
              End Date: ${selectedEndDate}
              Start Time: ${selectedStartTime}
              End Time: ${selectedEndTime}
            
            `;

            // Call the sendEmail function to send the email with the details
            sendEmail(emailSubject, emailBody);
            // Add any other logic you want to perform after a successful booking
        } catch (error) {
            console.error("Error placing booking:", error);
        }
    }

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    useEffect(() => {
        const token=localStorage.getItem ('token');
        fetchPlaceNames();
    }, []);

    const [mapKey, setMapKey] = useState(1);

    const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);

    const handleViewInvoice = (event) => {
        event.preventDefault(); // Prevent form submission from reloading the page
        console.log("hi")
        setIsPdfDialogOpen(true); // Set the state to true to open the PDF dialog
        console.log(isPdfDialogOpen)
    };

    // Function to handle the dialog close event
    const handlePdfDialogClose = () => {
        setIsPdfDialogOpen(false);
    };
  
    //Email
    function sendEmail(subject, body) {
        console.log('Sending email...');

        const templateParams = {
            to_name: userName,
            from_name: 'Sarah Tourism',
            message: 'Thanks for Booking,Your Booking Details are' + body, // Use the body parameter to pass the email content
            to_email: selectedBillingMail,
            subject: subject, // Use the subject parameter to set the email subject
        };

        emailjs
            .send('hotelmanagament_service', 'template_agfnema', templateParams, 'y9Jw_fUJNpRrdMxQC')
            .then((response) => {
                console.log('Email sent successfully:', response);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    }

    return (
        <Box sx={{ height: '100vh', backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
            <Button type="submit" variant="contained" color="primary" onClick={(event) => handleViewInvoice(event)}>
                Generate Billing
            </Button>
            {isPdfDialogOpen !== null && (
                <Dialog open={isPdfDialogOpen} onClose={handlePdfDialogClose} maxWidth="md" fullWidth>
                    <DialogContent>
                        <PDFViewer style={styles.viewer}>
                            <Document>
                                <Page size="A4" style={styles.page}>
                                    <View style={styles.section}>
                                        {/* Header */}
                                        <View style={styles.header}>
                                            <View>
                                                {/* <Image style={styles.logo} src={logo} /> */}
                                                <Text style={styles.hospitalName}>SARAH TOURISM</Text>
                                                <Text style={styles.address}>COIMBATORE</Text>
                                                <Text style={styles.address}>Email: kiki@gmail.com</Text>
                                                <Text style={styles.address}>Website: www.kikitourism.com</Text>
                                                <Text style={styles.address}>Fax: +102-182-210</Text>
                                                <Text style={styles.address}>Phone: +102-182-210</Text>
                                            </View>
                                            <Text style={styles.invoiceNumber}>Invoice #SNG00</Text>
                                            <hr />
                                        </View>

                                        <View style={styles.container}>
                                            <div style={styles.billingInfo}>
                                                <Text style={styles.generalInfoHeading}>BILLING INFORMATION:</Text>
                                                <View>
                                                    <Text style={styles.infoLabel}>Starting Point: {startLoc}</Text>
                                                    <Text style={styles.infoLabel}>Ending Point: {selectedPlaceId}</Text>
                                                    <Text style={styles.infoLabel}>Head Count: {selectedHeadCount}</Text>
                                                    <Text style={styles.infoLabel}>Days Count: {selectedDaysCount}</Text>
                                                    <Text style={styles.infoLabel}>Start Date: {selectedStartDate}</Text>
                                                    <Text style={styles.infoLabel}>End Date: {selectedEndDate}</Text>
                                                    <Text style={styles.infoLabel}>Total Distance: {distanceTot}</Text>
                                                    <Text style={styles.infoLabel}>Agent Name: {selectedPlace.agentName}</Text>

                                                </View>
                                            </div>
                                            <div style={styles.tourInfo}>
                                                <Text style={styles.generalInfoHeading}>PACKAGE INFORMATION:</Text>
                                                <View>
                                                    {/* Display tour information here */}
                                                    <Text style={styles.infoLabel}>Billing Name: {userName}</Text>
                                                    <Text style={styles.infoLabel}>Billing Address: {selectedBillingAddress}</Text>
                                                    <Text style={styles.infoLabel}>Phone Number:{userPhone} </Text>
                                                    <Text style={styles.infoLabel}>Billing Email: {selectedBillingMail}</Text>
                                                    <Text style={styles.infoLabel}>Date: February 31, 2023</Text>
                                                </View>
                                            </div>
                                        </View>

                                        <View style={styles.section}>
                                            <Text style={styles.generalInfoHeading}>Invoice Details</Text>
                                            <View style={styles.table}>
                                                <View style={styles.tableHeader}>
                                                    <Text style={styles.tableCell}>Serial Number</Text>
                                                    <Text style={styles.tableCell}>Package</Text>
                                                    <Text style={styles.tableCell}>Price</Text>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <Text style={[styles.tableCell, { backgroundColor: 'red' }]}>1</Text>
                                                    <Text style={[styles.tableCell, { backgroundColor: 'red' }]}>{selectedPlaceId}</Text>
                                                    <Text style={[styles.tableCell, { backgroundColor: 'red' }]}>Rs. {totalCostforDist}</Text>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <Text style={[styles.tableCell, styles.alternateCell]}></Text>
                                                    <Text style={[styles.tableCell, styles.alternateCell]}>Total</Text>
                                                    <Text style={[styles.tableCell, styles.alternateCell]}>Rs. </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Page>
                            </Document>
                        </PDFViewer>
                    </DialogContent>
                </Dialog>
            )}
            <Box sx={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '3%' }}>
                <Grid container sx={{ height: '100%' }} spacing={0}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ height: '102.7%', paddingLeft: '15px', paddingBottom: '15px' }}>
                            <ReactBingMap apiKey={key} key={mapKey} style={{ height: "110%", width: "100%" }}>
                                <Pushpin location={start} />
                                <Polyline path={[start, end]} />
                                <Pushpin location={end} />
                            </ReactBingMap>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ padding: '2%', backgroundColor: 'white', height: '100%' }}>
                            <Typography sx={{ fontSize: '30px', fontWeight: '600', textAlign: 'center', marginTop: '10px' }}>
                                Book your trip now
                            </Typography>
                            <Grid container sx={{ height: '95%', marginTop: '2%' }} spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Starting Point"
                                        name="startingPoint"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ style: labelStyle }}
                                        // Capture the user input and update the state
                                        value={startLoc}
                                        onChange={(e) => setStartLoc(e.target.value)}
                                    />
                                    <Select
                                        name="endingPoint"
                                        fullWidth
                                        margin="normal"
                                        labelStyle={labelStyle}
                                        onChange={handleSelectChange}
                                    >
                                        {placeNames.map((place) => (
                                            <MenuItem key={place.id} value={place.placeName}>
                                                {place.placeName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Select
                                        name="hotel"
                                        sx={{ marginTop: '3%' }}
                                        fullWidth
                                        margin="normal"
                                        labelStyle={labelStyle}
                                        value={selectedHotelName}
                                        onChange={(event) => setSelectedHotelName(event.target.value)}

                                    >
                                        {hotelNames.map((hotelName) => (
                                            <MenuItem key={hotelName} value={hotelName}>
                                                {hotelName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Select
                                        name="restaurant"
                                        sx={{ marginTop: '3%' }}
                                        fullWidth
                                        margin="normal"
                                        labelStyle={labelStyle}
                                        value={selectedRestaurantName}
                                        onChange={(event) => setSelectedRestaurantName(event.target.value)}

                                    >
                                        {restaurantNames.map((restaurantName) => (
                                            <MenuItem key={restaurantName} value={restaurantName}>
                                                {restaurantName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <TextField
                                        label="Head Count"
                                        name="headCount"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ style: labelStyle }}
                                        // Capture the user input and update the state
                                        value={selectedHeadCount}
                                        onChange={(e) => setSelectedHeadCount(e.target.value)}
                                    />
                                    <TextField
                                        label="Days Count"
                                        name="daysCount"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ style: labelStyle }}
                                        // Capture the user input and update the state
                                        value={selectedDaysCount}
                                        onChange={(e) => setSelectedDaysCount(e.target.value)}
                                    />
                                    <TextField
                                        label="Start Date"
                                        name="startDate"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ style: labelStyle }}
                                        // Capture the user input and update the state
                                        value={selectedStartDate}
                                        onChange={(e) => setSelectedStartDate(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="End Date"
                                        name="endDate"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ style: labelStyle }}
                                        // Capture the user input and update the state
                                        value={selectedEndDate}
                                        onChange={(e) => setSelectedEndDate(e.target.value)}
                                    />
                                    <TextField
                                        label="Start Time"
                                        name="startTime"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ style: labelStyle }}
                                        // Capture the user input and update the state
                                        value={selectedStartTime}
                                        onChange={(e) => setSelectedStartTime(e.target.value)}
                                    />
                                    <TextField
                                        label="End Time"
                                        name="endTime"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ style: labelStyle }}
                                        // Capture the user input and update the state
                                        value={selectedEndTime}
                                        onChange={(e) => setSelectedEndTime(e.target.value)}
                                    />
                                    <TextField
                                        label="Billing Mail"
                                        name="billingMail"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ style: labelStyle }}
                                        // Capture the user input and update the state
                                        value={selectedBillingMail}
                                        onChange={(e) => setSelectedBillingMail(e.target.value)}
                                    />
                                    <TextField
                                        label="Billing Address"
                                        name="billingAddress"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ style: labelStyle }}
                                        // Capture the user input and update the state
                                        value={selectedBillingAddress}
                                        onChange={(e) => setSelectedBillingAddress(e.target.value)}
                                    />
                                    <TextField
                                        label="User Mail"
                                        name="userMail"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ style: labelStyle }}
                                        // Capture the user input and update the state
                                        value={selectedUserMail}
                                        onChange={(e) => setSelectedUserMail(e.target.value)}
                                    />
                                    <TextField
                                        label="User Id"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ style: labelStyle }}
                                        // Display the "id" from the "users" state as the value for "User Id"
                                        value={users.id}
                                        disabled
                                    />
                                    <Button type="submit" variant="contained" color="primary" onClick={handleFormSubmit}>
                                        Place Booking
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default BookingPage;