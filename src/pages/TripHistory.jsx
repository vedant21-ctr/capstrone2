import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  Divider,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

const TripHistory = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, booking: null });

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCancelBooking = (booking) => {
    setDeleteDialog({ open: true, booking });
  };

  const confirmCancelBooking = () => {
    const updatedBookings = bookings.map(b => 
      b.id === deleteDialog.booking.id 
        ? { ...b, status: 'cancelled' }
        : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('hotelBookings', JSON.stringify(updatedBookings));
    setDeleteDialog({ open: false, booking: null });
  };

  const filterBookings = () => {
    const now = new Date();
    switch (tabValue) {
      case 0: // All bookings
        return bookings;
      case 1: // Upcoming
        return bookings.filter(b => 
          b.status === 'confirmed' && 
          (!b.searchParams?.checkIn || new Date(b.searchParams.checkIn) >= now)
        );
      case 2: // Past
        return bookings.filter(b => 
          b.searchParams?.checkOut && new Date(b.searchParams.checkOut) < now
        );
      case 3: // Cancelled
        return bookings.filter(b => b.status === 'cancelled');
      default:
        return bookings;
    }
  };

  const filteredBookings = filterBookings();

  if (bookings.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
            No Bookings Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            You haven't made any hotel bookings yet. Start exploring amazing destinations!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/hotels')}
            sx={{ backgroundColor: '#ff6f61' }}
          >
            Find Hotels
          </Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
          My Trip History
        </Typography>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label={`All (${bookings.length})`} />
            <Tab label={`Upcoming (${bookings.filter(b => b.status === 'confirmed').length})`} />
            <Tab label="Past" />
            <Tab label={`Cancelled (${bookings.filter(b => b.status === 'cancelled').length})`} />
          </Tabs>
        </Box>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No bookings in this category
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredBookings.map((booking, index) => (
              <Grid item xs={12} key={booking.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card sx={{ 
                    '&:hover': { boxShadow: 6 },
                    transition: 'box-shadow 0.3s',
                    opacity: booking.status === 'cancelled' ? 0.7 : 1
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={3}>
                        {/* Hotel Image */}
                        <Grid item xs={12} md={3}>
                          <img
                            src={booking.hotel.image}
                            alt={booking.hotel.name}
                            style={{
                              width: '100%',
                              height: 150,
                              objectFit: 'cover',
                              borderRadius: 8
                            }}
                          />
                        </Grid>

                        {/* Booking Details */}
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {booking.hotel.name}
                              </Typography>
                              <Chip 
                                label={booking.status.toUpperCase()} 
                                color={getStatusColor(booking.status)}
                                size="small"
                              />
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <LocationOnIcon sx={{ fontSize: 16, mr: 1, color: '#6c757d' }} />
                              <Typography variant="body2" color="text.secondary">
                                {booking.hotel.location}
                              </Typography>
                            </Box>
                          </Box>

                          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                            {booking.room.name}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PersonIcon sx={{ fontSize: 16, mr: 1, color: '#6c757d' }} />
                            <Typography variant="body2" color="text.secondary">
                              {booking.bookingData.name}
                            </Typography>
                          </Box>

                          {booking.searchParams?.checkIn && booking.searchParams?.checkOut && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: '#6c757d' }} />
                              <Typography variant="body2" color="text.secondary">
                                {formatDate(booking.searchParams.checkIn)} - {formatDate(booking.searchParams.checkOut)}
                              </Typography>
                            </Box>
                          )}

                          <Typography variant="body2" color="text.secondary">
                            Booked on: {formatDate(booking.bookingDate)}
                          </Typography>
                        </Grid>

                        {/* Price and Actions */}
                        <Grid item xs={12} md={3}>
                          <Box sx={{ textAlign: 'right', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="h5" sx={{ color: '#ff6f61', fontWeight: 600, mb: 1 }}>
                                ${booking.totalPrice}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Total Amount
                              </Typography>
                            </Box>

                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Booking ID: #{booking.id}
                              </Typography>
                              
                              {booking.status === 'confirmed' && (
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => handleCancelBooking(booking)}
                                  sx={{ mb: 1, width: '100%' }}
                                >
                                  Cancel
                                </Button>
                              )}
                              
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => navigate(`/hotel/${booking.hotel.id}`, { 
                                  state: { hotel: booking.hotel, searchParams: booking.searchParams } 
                                })}
                                sx={{ width: '100%' }}
                              >
                                View Hotel
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/hotels')}
            sx={{ backgroundColor: '#ff6f61' }}
          >
            Book Another Hotel
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      </motion.div>

      {/* Cancel Booking Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, booking: null })}
      >
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel your booking at {deleteDialog.booking?.hotel.name}?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, booking: null })}>
            Keep Booking
          </Button>
          <Button onClick={confirmCancelBooking} color="error" variant="contained">
            Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TripHistory;