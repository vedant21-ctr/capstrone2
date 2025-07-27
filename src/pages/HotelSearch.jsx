import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Slider, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  Rating,
  Autocomplete
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HotelSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: null,
    checkOut: null,
    guests: 2,
    rooms: 1
  });
  
  const [filters, setFilters] = useState({
    priceRange: [50, 500],
    starRating: 0,
    amenities: []
  });
  
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Mock hotel data
  const mockHotels = [
    {
      id: 1,
      name: 'Grand Palace Hotel',
      location: 'Paris, France',
      price: 250,
      rating: 4.8,
      image: 'https://source.unsplash.com/400x300?luxury+hotel',
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
      description: 'Luxury hotel in the heart of Paris with stunning city views.',
      starRating: 5
    },
    {
      id: 2,
      name: 'Ocean View Resort',
      location: 'Maldives',
      price: 450,
      rating: 4.9,
      image: 'https://source.unsplash.com/400x300?maldives+resort',
      amenities: ['WiFi', 'Pool', 'Beach Access', 'Restaurant', 'Spa'],
      description: 'Overwater bungalows with pristine ocean views.',
      starRating: 5
    },
    {
      id: 3,
      name: 'City Center Inn',
      location: 'New York, USA',
      price: 180,
      rating: 4.2,
      image: 'https://source.unsplash.com/400x300?new+york+hotel',
      amenities: ['WiFi', 'Restaurant', 'Business Center'],
      description: 'Modern hotel in Manhattan with easy access to attractions.',
      starRating: 4
    },
    {
      id: 4,
      name: 'Mountain Lodge',
      location: 'Swiss Alps, Switzerland',
      price: 320,
      rating: 4.6,
      image: 'https://source.unsplash.com/400x300?mountain+lodge',
      amenities: ['WiFi', 'Restaurant', 'Ski Access', 'Spa', 'Fireplace'],
      description: 'Cozy alpine lodge with breathtaking mountain views.',
      starRating: 4
    },
    {
      id: 5,
      name: 'Beach Paradise Hotel',
      location: 'Bali, Indonesia',
      price: 120,
      rating: 4.4,
      image: 'https://source.unsplash.com/400x300?bali+beach+hotel',
      amenities: ['WiFi', 'Pool', 'Beach Access', 'Restaurant'],
      description: 'Tropical paradise with direct beach access.',
      starRating: 4
    },
    {
      id: 6,
      name: 'Historic Boutique Hotel',
      location: 'Rome, Italy',
      price: 200,
      rating: 4.5,
      image: 'https://source.unsplash.com/400x300?rome+boutique+hotel',
      amenities: ['WiFi', 'Restaurant', 'Historic Building', 'Concierge'],
      description: 'Charming boutique hotel in a historic Roman building.',
      starRating: 4
    }
  ];

  const availableAmenities = ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Beach Access', 'Ski Access', 'Business Center', 'Fireplace', 'Historic Building', 'Concierge'];

  useEffect(() => {
    setHotels(mockHotels);
    setFilteredHotels(mockHotels);
  }, []);

  useEffect(() => {
    filterHotels();
  }, [filters, hotels]);

  const filterHotels = () => {
    let filtered = hotels.filter(hotel => {
      const priceInRange = hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1];
      const starRatingMatch = filters.starRating === 0 || hotel.starRating >= filters.starRating;
      const amenitiesMatch = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => hotel.amenities.includes(amenity));
      
      return priceInRange && starRatingMatch && amenitiesMatch;
    });

    if (searchParams.location) {
      filtered = filtered.filter(hotel => 
        hotel.location.toLowerCase().includes(searchParams.location.toLowerCase())
      );
    }

    setFilteredHotels(filtered);
  };

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      filterHotels();
      setLoading(false);
    }, 1000);
  };

  const handleHotelClick = (hotel) => {
    navigate(`/hotel/${hotel.id}`, { state: { hotel, searchParams } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Search Header */}
        <Box sx={{ mb: 4, p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#2c3e50' }}>
            Find Your Perfect Hotel
          </Typography>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Destination"
                value={searchParams.location}
                onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                InputProps={{
                  startAdornment: <LocationOnIcon sx={{ mr: 1, color: '#6c757d' }} />
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={2}>
              <DatePicker
                label="Check In"
                value={searchParams.checkIn}
                onChange={(date) => setSearchParams({...searchParams, checkIn: date})}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            
            <Grid item xs={12} md={2}>
              <DatePicker
                label="Check Out"
                value={searchParams.checkOut}
                onChange={(date) => setSearchParams({...searchParams, checkOut: date})}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            
            <Grid item xs={6} md={2}>
              <TextField
                fullWidth
                label="Guests"
                type="number"
                value={searchParams.guests}
                onChange={(e) => setSearchParams({...searchParams, guests: parseInt(e.target.value)})}
                inputProps={{ min: 1, max: 10 }}
              />
            </Grid>
            
            <Grid item xs={6} md={2}>
              <TextField
                fullWidth
                label="Rooms"
                type="number"
                value={searchParams.rooms}
                onChange={(e) => setSearchParams({...searchParams, rooms: parseInt(e.target.value)})}
                inputProps={{ min: 1, max: 5 }}
              />
            </Grid>
            
            <Grid item xs={12} md={1}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                sx={{ height: 56, backgroundColor: '#ff6f61' }}
              >
                <SearchIcon />
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          {/* Filters Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Filters
              </Typography>
              
              {/* Price Range */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Price Range (per night)
                </Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={(e, newValue) => setFilters({...filters, priceRange: newValue})}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  valueLabelFormat={(value) => `$${value}`}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">${filters.priceRange[0]}</Typography>
                  <Typography variant="body2">${filters.priceRange[1]}</Typography>
                </Box>
              </Box>

              {/* Star Rating */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Minimum Star Rating
                </Typography>
                <Rating
                  value={filters.starRating}
                  onChange={(e, newValue) => setFilters({...filters, starRating: newValue || 0})}
                  size="large"
                />
              </Box>

              {/* Amenities */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Amenities
                </Typography>
                <Autocomplete
                  multiple
                  options={availableAmenities}
                  value={filters.amenities}
                  onChange={(e, newValue) => setFilters({...filters, amenities: newValue})}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select amenities" />
                  )}
                />
              </Box>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => setFilters({ priceRange: [50, 500], starRating: 0, amenities: [] })}
              >
                Clear Filters
              </Button>
            </Card>
          </Grid>

          {/* Hotel Results */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                {filteredHotels.length} hotels found
              </Typography>
            </Box>

            {loading ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography>Searching hotels...</Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredHotels.map((hotel, index) => (
                  <Grid item xs={12} key={hotel.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        sx={{ 
                          display: 'flex', 
                          cursor: 'pointer',
                          '&:hover': { boxShadow: 6 },
                          transition: 'box-shadow 0.3s'
                        }}
                        onClick={() => handleHotelClick(hotel)}
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 250, height: 200 }}
                          image={hotel.image}
                          alt={hotel.name}
                        />
                        <CardContent sx={{ flex: 1, p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {hotel.name}
                            </Typography>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="h5" sx={{ color: '#ff6f61', fontWeight: 600 }}>
                                ${hotel.price}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                per night
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: '#6c757d' }} />
                            <Typography variant="body2" color="text.secondary">
                              {hotel.location}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Rating value={hotel.rating} readOnly precision={0.1} size="small" />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              {hotel.rating} ({hotel.starRating} star)
                            </Typography>
                          </Box>
                          
                          <Typography variant="body2" sx={{ mb: 2, color: '#6c757d' }}>
                            {hotel.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {hotel.amenities.slice(0, 4).map((amenity) => (
                              <Chip 
                                key={amenity} 
                                label={amenity} 
                                size="small" 
                                variant="outlined"
                              />
                            ))}
                            {hotel.amenities.length > 4 && (
                              <Chip 
                                label={`+${hotel.amenities.length - 4} more`} 
                                size="small" 
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
};

export default HotelSearch;