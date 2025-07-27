import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/clerk-react';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Weather', path: '/weather' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: '#fff',
            fontFamily: 'Montserrat, Poppins, sans-serif',
            fontWeight: 700,
            letterSpacing: 2,
            fontSize: { xs: '1.3rem', md: '2rem' },
            textShadow: '2px 2px 12px #143a52, 0 1px 8px #0008',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <span style={{ fontSize: 28, marginRight: 8, display: 'flex', alignItems: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 16.5L23 7.5M2 16.5L9 18.5L12 21.5L13.5 19.5L11.5 16.5M2 16.5L11.5 16.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          JetSetGo
        </Typography>

        {isMobile ? (
          <IconButton
            color="inherit"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                color="inherit"
                sx={{
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                }}
              >
                {item.name}
              </Button>
            ))}
            <SignedOut>
              <SignInButton mode="modal">
                <Button color="inherit">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  variant="contained"
                  color="secondary"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button
                component={RouterLink}
                to="/trip-history"
                color="inherit"
                sx={{
                  fontWeight: location.pathname === '/trip-history' ? 'bold' : 'normal',
                }}
              >
                My Trips
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 