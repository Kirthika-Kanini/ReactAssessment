import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
function Approval() {
    const [agents, setAgents] = useState([]);
    const [usernamestate, setUserNameState] = useState('');

    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');
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
        const UserName=localStorage.getItem('UserName');
        setUserNameState(UserName);
      // Check if the user is authenticated
      const isAuthenticated = getCookieValue('token');
      if (!isAuthenticated) {
        navigate('/admin-login'); // Redirect to the login page if not authenticated
      } else if (userRole === 'Agent') {
        navigate('/Unauthorized');
      }else {
        fetchAllAgents();
      }
    }, [navigate]);
    const fetchAllAgents = async () => {
        try {
            const response = await fetch('https://localhost:7036/api/Agents', {
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                },
            });
    
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }
    
            const responseBody = await response.json();
            setAgents(responseBody);
        } catch (error) {
            console.error('Error fetching agents:', error);
            alert('Error fetching agents. Please check console for details.');
        }
    };
    
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(agents);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Agents');
        XLSX.writeFile(workbook, 'agents.xlsx');
      };
    const handleApprove = async (agentId) => {
        try {
          // Find the specific agent to update
          const agentToUpdate = agents.find((agent) => agent.travelAgentId === agentId);
          if (!agentToUpdate) {
            alert('Agent not found');
            return;
          }
      
          // Update the status of the agent
          agentToUpdate.travelAgentStatus = 'Approved';
      
          // Send the updated agent to the server
          await axios.put(`https://localhost:7036/api/Agents/${agentId}`, agentToUpdate);
      
          // Update the state with the modified agents
          setAgents((prevAgents) => prevAgents.map((agent) => (agent.travelAgentId === agentId ? agentToUpdate : agent)));
          console.log('Sucessful');
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      const handleDecline = async (agentId) => {
        try {
          // Find the specific agent to update
          const agentToUpdate = agents.find((agent) => agent.travelAgentId === agentId);
          if (!agentToUpdate) {
            alert('Agent not found');
            return;
          }
      
          // Update the status of the agent
          agentToUpdate.travelAgentStatus = 'Declined';
      
          // Send the updated agent to the server
          await axios.put(`https://localhost:7036/api/Agents/${agentId}`, agentToUpdate);
      
          // Update the state with the modified agents
          setAgents((prevAgents) => prevAgents.map((agent) => (agent.travelAgentId === agentId ? agentToUpdate : agent)));
          console.log('Decline Sucessful');
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
    return (
        <Box sx={{ backgroundColor: '#F0F4F7', height: '97vh', p: 2 }}>
              <button onClick={exportToExcel} className="btn btn-primary mb-3">
        Export to Excel
      </button>
            <h3>Hi Admin {usernamestate}</h3>
            <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
                <Grid container spacing={'1%'}>
                    {agents.map((agent) => (
                        <Grid item xs={12} sm={6} md={3} key={agent.travelAgentId}>
                            <Card sx={{ marginRight: '2%', marginBottom: '2%' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            <span
                                                style={{
                                                    backgroundColor: 'rgba(81, 98, 246, 0.14)',
                                                    float: 'right',
                                                    orderRadius: '3px',
                                                    paddingLeft: '8px',
                                                    paddingRight: '8px',
                                                    padding: '2px',
                                                    color: 'blue',
                                                    borderRadius: '5px'
                                                }}
                                            >
                                                {agent.travelAgentStatus}
                                            </span>
                                        </Typography>
                                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                                            {agent.travelAgentName}
                                        </Typography>
                                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                                            {agent.travelAgentContact}
                                        </Typography>
                                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                                            {agent.travelAgentEmail}
                                        </Typography>
                                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                                            {agent.travelAgentCompany}
                                        </Typography>
                                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                                            {agent.travelAgentCompanyAddress}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Box sx={{ marginLeft: '3%' }}>
                                        <Grid container>
                                            <Grid item sx={{ border: '2px solid grey', borderRadius: '5px', padding: '2px', marginRight: '8px' }}>
                                                <Button variant="outlined" onClick={() => handleApprove(agent.travelAgentId)}>
                                                    <span className="cardtext">Approved</span>
                                                </Button>
                                            </Grid>
                                            <Grid item sx={{ border: '2px solid grey', borderRadius: '5px', padding: '2px', marginRight: '8px' }}>
                                                <Button variant="outlined" onClick={() => handleDecline(agent.travelAgentId)}>
                                                    <span className="cardtext">Declined</span>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Approval;
