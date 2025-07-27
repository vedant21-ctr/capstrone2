import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5">Booking not found</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Go Home
        </Button>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 1, color: '#2c3e50' }}>
            Booking Confirmed!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Your reservation has been successfully processed
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Booking ID: <strong>#{booking.id}</strong>
          </Typography>
        </Box>

        {/* Booking Details Card */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Booking Details
            </Typography>

            <Grid container spacing={3}>
              {/* Hotel Information */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Hotel Information
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {booking.hotel.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 16, mr: 1, color: '#6c757d' }} />
                    <Typography variant="body2" color="text.secondary">
                      {booking.hotel.location}
                    </Typography>
                  </Box>
                  <Chip 
                    label={`${booking.hotel.starRating} Star Hotel`} 
                    size="small" 
                    color="primary" 
                  />
                </Box>
              </Grid>

              {/* Room Information */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Room Details
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>{booking.room.name}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {booking.room.size} • {booking.room.beds}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Max {booking.room.maxGuests} guests
                  </Typography>
                </Box>
              </Grid>

              {/* Guest Information */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Guest Information
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>{booking.bookingData.name}</strong>
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ fontSize: 16, mr: 1, color: '#6c757d' }} />
                    <Typography variant="body2" color="text.secondary">
                      {booking.bookingData.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ fontSize: 16, mr: 1, color: '#6c757d' }} />
                    <Typography variant="body2" color="text.secondary">
                      {booking.bookingData.phone}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Stay Information */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Stay Information
                  </Typography>
                  {booking.searchParams?.checkIn && booking.searchParams?.checkOut ? (
                    <>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Check-in: {formatDate(booking.searchParams.checkIn)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Check-out: {formatDate(booking.searchParams.checkOut)}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Dates to be confirmed
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {booking.searchParams?.guests || 2} guests • {booking.searchParams?.rooms || 1} room
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Special Requests */}
            {booking.bookingData.specialRequests && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Special Requests
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {booking.bookingData.specialRequests}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Pricing */}
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Room Rate: ${booking.room.price} per night
              </Typography>
              {booking.searchParams?.nights && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Duration: {booking.searchParams.nights} nights
                </Typography>
              )}
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#ff6f61' }}>
                Total: ${booking.totalPrice}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card sx={{ mb: 4, backgroundColor: '#f8f9fa' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Important Information
            </Typography>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  A confirmation email has been sent to {booking.bookingData.email}
                </Typography>
              </li>
              <li>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Please arrive at the hotel with a valid ID and credit card
                </Typography>
              </li>
              <li>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Check-in time: 3:00 PM | Check-out time: 11:00 AM
                </Typography>
              </li>
              <li>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  For any changes or cancellations, please contact the hotel directly
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/trip-history')}
            sx={{ backgroundColor: '#ff6f61' }}
          >
            View My Bookings
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/hotels')}
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
    </Container>
  );
};

export default BookingConfirmation;