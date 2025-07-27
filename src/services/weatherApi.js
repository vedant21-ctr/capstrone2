// OpenWeatherMap API integration
// Sign up at: https://openweathermap.org/api to get your free API key

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// City coordinates for major tourist destinations
const cityCoordinates = {
  'paris': { lat: 48.8566, lon: 2.3522, country: 'FR' },
  'tokyo': { lat: 35.6762, lon: 139.6503, country: 'JP' },
  'new york': { lat: 40.7128, lon: -74.0060, country: 'US' },
  'bali': { lat: -8.3405, lon: 115.0920, country: 'ID' },
  'rome': { lat: 41.9028, lon: 12.4964, country: 'IT' },
  'dubai': { lat: 25.2048, lon: 55.2708, country: 'AE' },
  'london': { lat: 51.5074, lon: -0.1278, country: 'GB' },
  'santorini': { lat: 36.3932, lon: 25.4615, country: 'GR' },
  'maldives': { lat: 3.2028, lon: 73.2207, country: 'MV' },
  'iceland': { lat: 64.1466, lon: -21.9426, country: 'IS' },
  'thailand': { lat: 13.7563, lon: 100.5018, country: 'TH' },
  'switzerland': { lat: 46.8182, lon: 8.2275, country: 'CH' },
  'egypt': { lat: 30.0444, lon: 31.2357, country: 'EG' },
  'india': { lat: 28.7041, lon: 77.1025, country: 'IN' },
  'brazil': { lat: -22.9068, lon: -43.1729, country: 'BR' },
  'australia': { lat: -33.8688, lon: 151.2093, country: 'AU' },
  'canada': { lat: 45.4215, lon: -75.6972, country: 'CA' },
  'norway': { lat: 59.9139, lon: 10.7522, country: 'NO' },
  'peru': { lat: -12.0464, lon: -77.0428, country: 'PE' }
};

// Get weather icon URL
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Fetch current weather for a destination
export const getCurrentWeather = async (destinationName) => {
  const cityKey = destinationName.toLowerCase();
  const coords = cityCoordinates[cityKey];
  
  if (!coords) {
    throw new Error(`Coordinates not found for ${destinationName}`);
  }

  if (!WEATHER_API_KEY || WEATHER_API_KEY === 'your_openweather_api_key_here') {
    // Return mock data if API key is not configured
    return getMockWeatherData(destinationName);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      iconUrl: getWeatherIconUrl(data.weather[0].icon),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      visibility: data.visibility / 1000, // Convert to km
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return getMockWeatherData(destinationName);
  }
};

// Fetch 5-day weather forecast
export const getWeatherForecast = async (destinationName) => {
  const cityKey = destinationName.toLowerCase();
  const coords = cityCoordinates[cityKey];
  
  if (!coords) {
    throw new Error(`Coordinates not found for ${destinationName}`);
  }

  if (!WEATHER_API_KEY || WEATHER_API_KEY === 'your_openweather_api_key_here') {
    return getMockForecastData(destinationName);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Group forecast by day (take one forecast per day at noon)
    const dailyForecasts = [];
    const processedDates = new Set();
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();
      
      if (!processedDates.has(dateString) && date.getHours() >= 12) {
        processedDates.add(dateString);
        dailyForecasts.push({
          date: dateString,
          temperature: Math.round(item.main.temp),
          minTemp: Math.round(item.main.temp_min),
          maxTemp: Math.round(item.main.temp_max),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          iconUrl: getWeatherIconUrl(item.weather[0].icon),
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
        });
      }
    });
    
    return dailyForecasts.slice(0, 5); // Return 5 days
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return getMockForecastData(destinationName);
  }
};

// Mock weather data for demonstration
const getMockWeatherData = (destinationName) => {
  const mockData = {
    'paris': { temp: 18, desc: 'partly cloudy', icon: '02d', humidity: 65 },
    'tokyo': { temp: 24, desc: 'clear sky', icon: '01d', humidity: 70 },
    'new york': { temp: 22, desc: 'light rain', icon: '10d', humidity: 75 },
    'bali': { temp: 28, desc: 'scattered clouds', icon: '03d', humidity: 80 },
    'rome': { temp: 26, desc: 'clear sky', icon: '01d', humidity: 60 },
    'dubai': { temp: 35, desc: 'clear sky', icon: '01d', humidity: 45 },
    'london': { temp: 16, desc: 'overcast clouds', icon: '04d', humidity: 78 },
    'santorini': { temp: 25, desc: 'clear sky', icon: '01d', humidity: 55 },
    'maldives': { temp: 30, desc: 'few clouds', icon: '02d', humidity: 85 },
  };
  
  const cityKey = destinationName.toLowerCase();
  const mock = mockData[cityKey] || { temp: 20, desc: 'clear sky', icon: '01d', humidity: 60 };
  
  return {
    city: destinationName,
    country: 'Demo',
    temperature: mock.temp,
    feelsLike: mock.temp + 2,
    description: mock.desc,
    icon: mock.icon,
    iconUrl: getWeatherIconUrl(mock.icon),
    humidity: mock.humidity,
    windSpeed: 3.5,
    pressure: 1013,
    visibility: 10,
    sunrise: '06:30 AM',
    sunset: '07:45 PM',
  };
};

// Mock forecast data
const getMockForecastData = (destinationName) => {
  const baseTemp = getMockWeatherData(destinationName).temperature;
  const forecasts = [];
  
  for (let i = 1; i <= 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    forecasts.push({
      date: date.toDateString(),
      temperature: baseTemp + Math.floor(Math.random() * 6) - 3,
      minTemp: baseTemp - 5,
      maxTemp: baseTemp + 5,
      description: 'partly cloudy',
      icon: '02d',
      iconUrl: getWeatherIconUrl('02d'),
      humidity: 65,
      windSpeed: 3.2,
    });
  }
  
  return forecasts;
};

// Get weather recommendation for travel
export const getWeatherRecommendation = (weatherData) => {
  const temp = weatherData.temperature;
  const desc = weatherData.description.toLowerCase();
  
  if (temp >= 25 && !desc.includes('rain')) {
    return { 
      rating: 'excellent', 
      message: 'Perfect weather for sightseeing!', 
      color: '#4caf50',
      activities: ['Beach activities', 'Outdoor dining', 'City walking tours']
    };
  } else if (temp >= 15 && temp < 25) {
    return { 
      rating: 'good', 
      message: 'Great weather for exploring!', 
      color: '#ff9800',
      activities: ['Museums', 'Shopping', 'Light outdoor activities']
    };
  } else if (desc.includes('rain')) {
    return { 
      rating: 'fair', 
      message: 'Pack an umbrella!', 
      color: '#2196f3',
      activities: ['Indoor attractions', 'Cafes', 'Shopping malls']
    };
  } else {
    return { 
      rating: 'cool', 
      message: 'Dress warmly!', 
      color: '#607d8b',
      activities: ['Museums', 'Indoor dining', 'Cultural sites']
    };
  }
};