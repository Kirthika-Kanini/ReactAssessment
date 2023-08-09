import React from 'react';
import { Grid, Typography } from '@mui/material';

function Unauthorized() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Typography variant="h4" component="h1">
          You are Restricted To use this Page
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Unauthorized;
