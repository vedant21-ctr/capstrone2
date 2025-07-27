// Utility functions for fetching tourist destination images

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = 'your_unsplash_access_key_here'; // You'll need to get this from unsplash.com/developers

// Predefined high-quality images for popular destinations
export const destinationImages = {
  'paris': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'bali': 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'santorini': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'maldives': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'iceland': 'https://images.unsplash.com/photo-1539066834-3fa5463eeaaa?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'thailand': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'greece': 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'switzerland': 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'egypt': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'india': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'brazil': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'australia': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'canada': 'https://images.unsplash.com/photo-1503614472-8c93d56cd601?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'norway': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'peru': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80'
};

// Function to get image for a destination
export const getDestinationImage = (destinationName, width = 800, height = 600) => {
  const key = destinationName.toLowerCase();
  
  // Check if we have a predefined image
  if (destinationImages[key]) {
    return destinationImages[key];
  }
  
  // Fallback to Unsplash with destination name
  return `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=${width}&h=${height}&fit=crop&crop=entropy&auto=format&q=80`;
};

// Function to fetch images from Unsplash API (requires API key)
export const fetchUnsplashImage = async (query, width = 800, height = 600) => {
  if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'your_unsplash_access_key_here') {
    console.warn('Unsplash API key not configured, using fallback image');
    return getDestinationImage(query, width, height);
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const photo = data.results[0];
      return `${photo.urls.raw}&w=${width}&h=${height}&fit=crop&crop=entropy&auto=format&q=80`;
    }
    
    // Fallback if no results
    return getDestinationImage(query, width, height);
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return getDestinationImage(query, width, height);
  }
};

// Popular tourist destinations with descriptions
export const popularDestinations = [
  { name: 'Paris', description: 'The City of Light', country: 'France' },
  { name: 'Tokyo', description: 'Where Tradition Meets Future', country: 'Japan' },
  { name: 'New York', description: 'The City That Never Sleeps', country: 'USA' },
  { name: 'Bali', description: 'Tropical Paradise', country: 'Indonesia' },
  { name: 'Rome', description: 'Eternal City', country: 'Italy' },
  { name: 'Dubai', description: 'City of Gold', country: 'UAE' },
  { name: 'London', description: 'Historic Charm', country: 'UK' },
  { name: 'Santorini', description: 'Greek Island Beauty', country: 'Greece' },
  { name: 'Maldives', description: 'Paradise on Earth', country: 'Maldives' },
  { name: 'Iceland', description: 'Land of Fire and Ice', country: 'Iceland' },
  { name: 'Thailand', description: 'Land of Smiles', country: 'Thailand' },
  { name: 'Switzerland', description: 'Alpine Wonderland', country: 'Switzerland' },
  { name: 'Egypt', description: 'Land of Pharaohs', country: 'Egypt' },
  { name: 'India', description: 'Incredible India', country: 'India' },
  { name: 'Brazil', description: 'Carnival Nation', country: 'Brazil' },
  { name: 'Australia', description: 'Down Under', country: 'Australia' },
  { name: 'Canada', description: 'Great White North', country: 'Canada' },
  { name: 'Norway', description: 'Land of Fjords', country: 'Norway' },
  { name: 'Peru', description: 'Land of the Incas', country: 'Peru' }
];

// Function to get random destinations
export const getRandomDestinations = (count = 6) => {
  const shuffled = [...popularDestinations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(dest => ({
    ...dest,
    image: getDestinationImage(dest.name)
  }));
};