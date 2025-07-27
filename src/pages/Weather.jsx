import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Tab,
  Tabs,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import WeatherCard from '../components/WeatherCard';
import { getWeatherForecast } from '../services/weatherApi';
import { popularDestinations } from '../utils/imageApi';

const Weather = () => {
  const [selectedDestination, setSelectedDestination] = useState('Paris');
  const [forecast, setForecast] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const popularCities = popularDestinations.map(dest => dest.name);

  useEffect(() => {
    if (selectedDestination && tabValue === 1) {
      fetchForecast();
    }
  }, [selectedDestination, tabValue]);

  const fetchForecast = async () => {
    try {
      setLoading(true);
      const forecastData = await getWeatherForecast(selectedDestination);
      setForecast(forecastData);
    } catch (error) {
      console.error('Error fetching forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
            Weather Information
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Check current weather and forecasts for your travel destinations
          </Typography>

          {/* Destination Selector */}
          <Box sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
            <Autocomplete
              value={selectedDestination}
              onChange={(event, newValue) => setSelectedDestination(newValue)}
              options={popularCities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Destination"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Box>

          {/* Tabs */}
          <Paper sx={{ maxWidth: 400, mx: 'auto' }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Current Weather" />
              <Tab label="5-Day Forecast" />
            </Tabs>
          </Paper>
        </Box>

        {/* Content */}
        {tabValue === 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={6} lg={5}>
                <WeatherCard destinationName={selectedDestination} />
              </Grid>
              <Grid item xs={12} md={6} lg={7}>
                {/* Additional Weather Info */}
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Travel Tips for {selectedDestination}
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Best Time to Visit
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        The ideal time to visit {selectedDestination} depends on your preferences for weather and activities. Check the current conditions and plan accordingly.
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        What to Pack
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Based on current weather conditions, we recommend packing appropriate clothing for the temperature and weather patterns.
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Local Weather Patterns
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Weather can vary throughout the day. Check the hourly forecast for more detailed planning of your activities.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {tabValue === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h5" sx={{ textAlign: 'center', mb: 3, fontWeight: 600 }}>
              5-Day Weather Forecast for {selectedDestination}
            </Typography>
            
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography>Loading forecast...</Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {forecast.map((day, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card sx={{ 
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white'
                      }}>
                        <CardContent>
                          <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.9 }}>
                            {new Date(day.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </Typography>
                          
                          <img 
                            src={day.iconUrl} 
                            alt={day.description}
                            style={{ width: 50, height: 50, margin: '8px 0' }}
                          />
                          
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {day.temperature}°C
                          </Typography>
                          
                          <Typography variant="caption" sx={{ 
                            textTransform: 'capitalize',
                            opacity: 0.9,
                            display: 'block',
                            mb: 1
                          }}>
                            {day.description}
                          </Typography>
                          
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {day.minTemp}° / {day.maxTemp}°
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}
          </motion.div>
        )}

        {/* Popular Destinations Weather */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}>
            Weather Around the World
          </Typography>
          <Grid container spacing={3}>
            {popularCities.slice(0, 6).map((city, index) => (
              <Grid item xs={12} sm={6} md={4} key={city}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WeatherCard destinationName={city} compact={true} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Weather;