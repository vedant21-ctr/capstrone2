import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  Divider,
  ImageList,
  ImageListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpaIcon from '@mui/icons-material/Spa';
import { motion } from 'framer-motion';

const HotelDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Mock room data
  const roomTypes = [
    {
      id: 1,
      name: 'Standard Room',
      price: 180,
      originalPrice: 220,
      size: '25 sqm',
      beds: '1 Queen Bed',
      maxGuests: 2,
      amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar'],
      image: 'https://source.unsplash.com/400x300?hotel+room+standard',
      available: 5
    },
    {
      id: 2,
      name: 'Deluxe Room',
      price: 250,
      originalPrice: 300,
      size: '35 sqm',
      beds: '1 King Bed',
      maxGuests: 2,
      amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony', 'Coffee Machine'],
      image: 'https://source.unsplash.com/400x300?hotel+room+deluxe',
      available: 3
    },
    {
      id: 3,
      name: 'Suite',
      price: 450,
      originalPrice: 550,
      size: '60 sqm',
      beds: '1 King Bed + Sofa Bed',
      maxGuests: 4,
      amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony', 'Coffee Machine', 'Living Area', 'Bathtub'],
      image: 'https://source.unsplash.com/400x300?hotel+suite',
      available: 2
    }
  ];

  const hotelImages = [
    'https://source.unsplash.com/800x600?luxury+hotel+lobby',
    'https://source.unsplash.com/800x600?hotel+pool',
    'https://source.unsplash.com/800x600?hotel+restaurant',
    'https://source.unsplash.com/800x600?hotel+spa',
    'https://source.unsplash.com/800x600?hotel+gym',
    'https://source.unsplash.com/800x600?hotel+exterior'
  ];

  const amenityIcons = {
    'WiFi': <WifiIcon />,
    'Pool': <PoolIcon />,
    'Restaurant': <RestaurantIcon />,
    'Gym': <FitnessCenterIcon />,
    'Spa': <SpaIcon />
  };

  useEffect(() => {
    if (location.state) {
      setHotel(location.state.hotel);
      setSearchParams(location.state.searchParams);
    } else {
      // Fallback: fetch hotel data by ID (mock)
      const mockHotel = {
        id: parseInt(id),
        name: 'Grand Palace Hotel',
        location: 'Paris, France',
        price: 250,
        rating: 4.8,
        image: 'https://source.unsplash.com/400x300?luxury+hotel',
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
        description: 'Luxury hotel in the heart of Paris with stunning city views.',
        starRating: 5,
        fullDescription: 'Experience the epitome of luxury at Grand Palace Hotel, where timeless elegance meets modern sophistication. Located in the heart of Paris, our hotel offers unparalleled access to the city\'s most iconic attractions while providing a serene retreat from the bustling streets.',
        address: '123 Champs-Élysées, 75008 Paris, France',
        checkIn: '3:00 PM',
        checkOut: '11:00 AM'
      };
      setHotel(mockHotel);
    }
  }, [id, location.state]);

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setBookingOpen(true);
  };

  const handleBookingSubmit = () => {
    // Save booking to localStorage (mock)
    const booking = {
      id: Date.now(),
      hotel: hotel,
      room: selectedRoom,
      searchParams: searchParams,
      bookingData: bookingData,
      totalPrice: selectedRoom.price * (searchParams?.nights || 1),
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };

    const existingBookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('hotelBookings', JSON.stringify(existingBookings));

    setBookingOpen(false);
    navigate('/booking-confirmation', { state: { booking } });
  };

  if (!hotel) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography>Loading hotel details...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hotel Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
                {hotel.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon sx={{ mr: 1, color: '#6c757d' }} />
                <Typography variant="body1" color="text.secondary">
                  {hotel.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={hotel.rating} readOnly precision={0.1} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {hotel.rating} ({hotel.starRating} star hotel)
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h4" sx={{ color: '#ff6f61', fontWeight: 600 }}>
                From ${hotel.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                per night
              </Typography>
            </Box>
          </Box>
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        {/* Images Gallery */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ImageList variant="quilted" cols={4} rowHeight={200} sx={{ mb: 4 }}>
              {hotelImages.map((image, index) => (
                <ImageListItem 
                  key={index} 
                  cols={index === 0 ? 2 : 1} 
                  rows={index === 0 ? 2 : 1}
                >
                  <img
                    src={image}
                    alt={`Hotel view ${index + 1}`}
                    loading="lazy"
                    style={{ borderRadius: 8 }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </motion.div>

          {/* Hotel Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  About This Hotel
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                  {hotel.fullDescription || hotel.description}
                </Typography>
                
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Amenities
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {hotel.amenities.map((amenity) => (
                    <Chip
                      key={amenity}
                      icon={amenityIcons[amenity]}
                      label={amenity}
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Room Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Available Rooms
            </Typography>
            {roomTypes.map((room, index) => (
              <Card key={room.id} sx={{ mb: 3 }}>
                <CardContent sx={{ p: 0 }}>
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <img
                        src={room.image}
                        alt={room.name}
                        style={{ 
                          width: '100%', 
                          height: 200, 
                          objectFit: 'cover',
                          borderRadius: '8px 0 0 8px'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Box sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {room.name}
                          </Typography>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography 
                              variant="body2" 
                              sx={{ textDecoration: 'line-through', color: '#6c757d' }}
                            >
                              ${room.originalPrice}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#ff6f61', fontWeight: 600 }}>
                              ${room.price}/night
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={6} md={3}>
                            <Typography variant="body2" color="text.secondary">
                              Size: {room.size}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Typography variant="body2" color="text.secondary">
                              {room.beds}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Typography variant="body2" color="text.secondary">
                              Max: {room.maxGuests} guests
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Typography variant="body2" color="text.secondary">
                              {room.available} rooms left
                            </Typography>
                          </Grid>
                        </Grid>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                          {room.amenities.map((amenity) => (
                            <Chip 
                              key={amenity} 
                              label={amenity} 
                              size="small" 
                              variant="outlined"
                            />
                          ))}
                        </Box>
                        
                        <Button
                          variant="contained"
                          onClick={() => handleBookRoom(room)}
                          sx={{ backgroundColor: '#ff6f61' }}
                          disabled={room.available === 0}
                        >
                          {room.available === 0 ? 'Sold Out' : 'Book Now'}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </Grid>

        {/* Booking Summary Sidebar */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Hotel Information
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1">
                    {hotel.address || hotel.location}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Check-in
                  </Typography>
                  <Typography variant="body1">
                    {hotel.checkIn || '3:00 PM'}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Check-out
                  </Typography>
                  <Typography variant="body1">
                    {hotel.checkOut || '11:00 AM'}
                  </Typography>
                </Box>
                
                {searchParams && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Your Search
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Guests: {searchParams.guests} | Rooms: {searchParams.rooms}
                      </Typography>
                    </Box>
                    {searchParams.checkIn && searchParams.checkOut && (
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(searchParams.checkIn).toLocaleDateString()} - {new Date(searchParams.checkOut).toLocaleDateString()}
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onClose={() => setBookingOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Book {selectedRoom?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={bookingData.name}
              onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={bookingData.email}
              onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={bookingData.phone}
              onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Special Requests"
              multiline
              rows={3}
              value={bookingData.specialRequests}
              onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
              placeholder="Any special requests or preferences..."
            />
            
            {selectedRoom && (
              <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Booking Summary
                </Typography>
                <Typography variant="body2">
                  Room: {selectedRoom.name}
                </Typography>
                <Typography variant="body2">
                  Price: ${selectedRoom.price} per night
                </Typography>
                {searchParams?.nights && (
                  <Typography variant="body2">
                    Total: ${selectedRoom.price * searchParams.nights} ({searchParams.nights} nights)
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setBookingOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleBookingSubmit}
            disabled={!bookingData.name || !bookingData.email || !bookingData.phone}
            sx={{ backgroundColor: '#ff6f61' }}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HotelDetails;