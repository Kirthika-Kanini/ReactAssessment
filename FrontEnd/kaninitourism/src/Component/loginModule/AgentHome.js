import { Button, Card, CardContent, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

function AgentHome() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get('https://localhost:7036/api/Agents')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box sx={{ backgroundColor: '#F0F4F7', height: '97vh', p: 2 }}>
      {data.map((agent) => (
        <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }} key={agent.travelAgentId}>
          <Card sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
            <CardContent>
            <Typography variant="h5" component="h2">
                Hello {agent.travelAgentName}
              </Typography>
              <Typography variant="h5" component="h2">
                Welcome to the Agent Home Page, Your status is {agent.travelAgentStatus}
              </Typography>
              
              {agent.travelAgentStatus === "Approved" && (
                <Button variant="outlined" component={RouterLink} to="/agent-login">
                Login Now
              </Button>
              )}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default AgentHome;
