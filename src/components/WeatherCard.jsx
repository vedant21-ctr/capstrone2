import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  CircularProgress,
  Grid,
  Tooltip
} from '@mui/material';
import { 
  WbSunny as SunIcon,
  Opacity as HumidityIcon,
  Air as WindIcon,
  Visibility as VisibilityIcon,
  ThermostatAuto as TempIcon
} from '@mui/icons-material';
import { getCurrentWeather, getWeatherRecommendation } from '../services/weatherApi';
import { motion } from 'framer-motion';

const WeatherCard = ({ destinationName, compact = false }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const weatherData = await getCurrentWeather(destinationName);
        setWeather(weatherData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (destinationName) {
      fetchWeather();
    }
  }, [destinationName]);

  if (loading) {
    return (
      <Card sx={{ minHeight: compact ? 120 : 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={compact ? 24 : 40} />
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card sx={{ minHeight: compact ? 120 : 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Weather unavailable
        </Typography>
      </Card>
    );
  }

  const recommendation = getWeatherRecommendation(weather);

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card sx={{ 
          background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
          color: 'white',
          minHeight: 120
        }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {weather.temperature}°C
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, textTransform: 'capitalize' }}>
                  {weather.description}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Feels like {weather.feelsLike}°C
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <img 
                  src={weather.iconUrl} 
                  alt={weather.description}
                  style={{ width: 50, height: 50 }}
                />
                <Chip 
                  label={recommendation.rating.toUpperCase()} 
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '0.7rem'
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ 
        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
        color: 'white',
        minHeight: 300
      }}>
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {weather.city}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Current Weather
              </Typography>
            </Box>
            <img 
              src={weather.iconUrl} 
              alt={weather.description}
              style={{ width: 60, height: 60 }}
            />
          </Box>

          {/* Temperature */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h2" sx={{ fontWeight: 300, mb: 1 }}>
              {weather.temperature}°C
            </Typography>
            <Typography variant="h6" sx={{ textTransform: 'capitalize', mb: 1 }}>
              {weather.description}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Feels like {weather.feelsLike}°C
            </Typography>
          </Box>

          {/* Weather Details */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HumidityIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">
                  {weather.humidity}% Humidity
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WindIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">
                  {weather.windSpeed} m/s Wind
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VisibilityIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">
                  {weather.visibility} km Visibility
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SunIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">
                  UV Index: Moderate
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Travel Recommendation */}
          <Box sx={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            borderRadius: 2, 
            p: 2,
            backdropFilter: 'blur(10px)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Travel Conditions
              </Typography>
              <Chip 
                label={recommendation.rating.toUpperCase()} 
                size="small"
                sx={{ 
                  backgroundColor: recommendation.color,
                  color: 'white',
                  fontWeight: 600
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
              {recommendation.message}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Recommended: {recommendation.activities.join(', ')}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WeatherCard;