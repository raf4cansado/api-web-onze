import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Navbar = ({ token, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            STUDIO ONZE 
          </Typography>
          {token && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
