import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const DestinationPackages = () => {
  const { destination } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Format the destination name for lookup
  const formattedDestination = destination.toLowerCase().replace(/-/g, '');
  
  const destinationData = {
    bali: {
      name: 'Bali',
      image: 'https://source.unsplash.com/random/1920x1080?bali',
      description: 'Experience the magic of Bali with our curated packages',
      activities: [
        {
          title: 'Beach Paradise',
          description: 'Relax on pristine beaches and enjoy crystal clear waters',
          image: 'https://source.unsplash.com/random/800x600?bali-beach',
          duration: '3 days',
          price: '$299',
        },
        {
          title: 'Cultural Tour',
          description: 'Explore ancient temples and traditional villages',
          image: 'https://source.unsplash.com/random/800x600?bali-temple',
          duration: '2 days',
          price: '$199',
        },
        {
          title: 'Adventure Package',
          description: 'Hiking, surfing, and water sports activities',
          image: 'https://source.unsplash.com/random/800x600?bali-adventure',
          duration: '4 days',
          price: '$399',
        },
      ],
      packages: [
        {
          title: 'Luxury Escape',
          description: '5-star accommodation and premium experiences',
          image: 'https://source.unsplash.com/random/800x600?bali-luxury',
          duration: '7 days',
          price: '$999',
          includes: ['Private villa', 'Airport transfers', 'Personal guide', 'Spa treatments'],
        },
        {
          title: 'Family Fun',
          description: 'Perfect for families with kids',
          image: 'https://source.unsplash.com/random/800x600?bali-family',
          duration: '5 days',
          price: '$699',
          includes: ['Family-friendly activities', 'Kids club access', 'Childcare services'],
        },
        {
          title: 'Budget Explorer',
          description: 'Affordable way to experience Bali',
          image: 'https://source.unsplash.com/random/800x600?bali-budget',
          duration: '4 days',
          price: '$399',
          includes: ['3-star hotel', 'Group tours', 'Local experiences'],
        },
      ],
    },
    tokyo: {
      name: 'Tokyo',
      image: 'https://source.unsplash.com/random/1920x1080?tokyo',
      description: 'Discover the vibrant city of Tokyo with our exclusive packages',
      activities: [
        {
          title: 'City Exploration',
          description: 'Visit iconic landmarks and neighborhoods',
          image: 'https://source.unsplash.com/random/800x600?tokyo-city',
          duration: '2 days',
          price: '$199',
        },
        {
          title: 'Cultural Experience',
          description: 'Traditional tea ceremonies and temple visits',
          image: 'https://source.unsplash.com/random/800x600?tokyo-culture',
          duration: '1 day',
          price: '$99',
        },
        {
          title: 'Food Tour',
          description: 'Explore Tokyo\'s culinary scene',
          image: 'https://source.unsplash.com/random/800x600?tokyo-food',
          duration: '1 day',
          price: '$149',
        },
      ],
      packages: [
        {
          title: 'Premium Tokyo',
          description: 'Luxury experience in the heart of Tokyo',
          image: 'https://source.unsplash.com/random/800x600?tokyo-luxury',
          duration: '5 days',
          price: '$1299',
          includes: ['5-star hotel', 'Private tours', 'Michelin dining'],
        },
        {
          title: 'Cultural Immersion',
          description: 'Deep dive into Japanese culture',
          image: 'https://source.unsplash.com/random/800x600?tokyo-culture',
          duration: '4 days',
          price: '$799',
          includes: ['Traditional ryokan', 'Cultural workshops', 'Local guides'],
        },
        {
          title: 'City Break',
          description: 'Quick Tokyo getaway',
          image: 'https://source.unsplash.com/random/800x600?tokyo-city',
          duration: '3 days',
          price: '$499',
          includes: ['4-star hotel', 'City tours', 'Transport pass'],
        },
      ],
    },
    paris: {
      name: 'Paris',
      image: 'https://source.unsplash.com/random/1920x1080?paris',
      description: 'Experience the romance and culture of Paris',
      activities: [
        {
          title: 'Eiffel Tower Tour',
          description: 'Visit the iconic Eiffel Tower and enjoy panoramic views',
          image: 'https://source.unsplash.com/random/800x600?paris-eiffel',
          duration: 'Half day',
          price: '$99',
        },
        {
          title: 'Louvre Museum',
          description: 'Explore the world\'s largest art museum',
          image: 'https://source.unsplash.com/random/800x600?paris-louvre',
          duration: '1 day',
          price: '$79',
        },
        {
          title: 'Seine River Cruise',
          description: 'Romantic cruise along the Seine River',
          image: 'https://source.unsplash.com/random/800x600?paris-seine',
          duration: '2 hours',
          price: '$49',
        },
      ],
      packages: [
        {
          title: 'Romantic Paris',
          description: 'Perfect for couples',
          image: 'https://source.unsplash.com/random/800x600?paris-romantic',
          duration: '5 days',
          price: '$1299',
          includes: ['4-star hotel', 'River cruise', 'Dinner at Eiffel Tower'],
        },
        {
          title: 'Cultural Explorer',
          description: 'Art and history focused',
          image: 'https://source.unsplash.com/random/800x600?paris-culture',
          duration: '4 days',
          price: '$999',
          includes: ['Museum passes', 'Walking tours', 'Local guide'],
        },
        {
          title: 'Paris Essentials',
          description: 'Best of Paris in 3 days',
          image: 'https://source.unsplash.com/random/800x600?paris-essentials',
          duration: '3 days',
          price: '$699',
          includes: ['3-star hotel', 'City tour', 'Transport pass'],
        },
      ],
    },
    newyork: {
      name: 'New York',
      image: 'https://source.unsplash.com/random/1920x1080?newyork',
      description: 'Experience the energy of the Big Apple',
      activities: [
        {
          title: 'Times Square',
          description: 'Visit the heart of New York City',
          image: 'https://source.unsplash.com/random/800x600?newyork-times-square',
          duration: 'Half day',
          price: '$49',
        },
        {
          title: 'Central Park',
          description: 'Explore the famous urban park',
          image: 'https://source.unsplash.com/random/800x600?newyork-central-park',
          duration: '1 day',
          price: '$29',
        },
        {
          title: 'Broadway Show',
          description: 'Experience a world-class performance',
          image: 'https://source.unsplash.com/random/800x600?newyork-broadway',
          duration: '3 hours',
          price: '$149',
        },
      ],
      packages: [
        {
          title: 'NYC Explorer',
          description: 'Comprehensive New York experience',
          image: 'https://source.unsplash.com/random/800x600?newyork-explorer',
          duration: '5 days',
          price: '$1499',
          includes: ['4-star hotel', 'Broadway show', 'City pass'],
        },
        {
          title: 'Shopping Spree',
          description: 'Retail therapy in NYC',
          image: 'https://source.unsplash.com/random/800x600?newyork-shopping',
          duration: '4 days',
          price: '$1199',
          includes: ['Shopping tours', 'Personal shopper', 'Luxury hotel'],
        },
        {
          title: 'NYC Express',
          description: 'Quick New York getaway',
          image: 'https://source.unsplash.com/random/800x600?newyork-express',
          duration: '3 days',
          price: '$799',
          includes: ['3-star hotel', 'City tour', 'Subway pass'],
        },
      ],
    },
    rome: {
      name: 'Rome',
      image: 'https://source.unsplash.com/random/1920x1080?rome',
      description: 'Discover the Eternal City',
      activities: [
        {
          title: 'Colosseum Tour',
          description: 'Explore the ancient amphitheater',
          image: 'https://source.unsplash.com/random/800x600?rome-colosseum',
          duration: 'Half day',
          price: '$79',
        },
        {
          title: 'Vatican City',
          description: 'Visit St. Peter\'s Basilica and Vatican Museums',
          image: 'https://source.unsplash.com/random/800x600?rome-vatican',
          duration: '1 day',
          price: '$99',
        },
        {
          title: 'Roman Forum',
          description: 'Walk through ancient Roman ruins',
          image: 'https://source.unsplash.com/random/800x600?rome-forum',
          duration: 'Half day',
          price: '$59',
        },
      ],
      packages: [
        {
          title: 'Roman Holiday',
          description: 'Classic Rome experience',
          image: 'https://source.unsplash.com/random/800x600?rome-holiday',
          duration: '5 days',
          price: '$1199',
          includes: ['4-star hotel', 'Skip-the-line passes', 'Food tour'],
        },
        {
          title: 'History Buff',
          description: 'In-depth historical exploration',
          image: 'https://source.unsplash.com/random/800x600?rome-history',
          duration: '4 days',
          price: '$999',
          includes: ['Expert guide', 'All entrance fees', 'Local experiences'],
        },
        {
          title: 'Rome Express',
          description: 'Quick Rome experience',
          image: 'https://source.unsplash.com/random/800x600?rome-express',
          duration: '3 days',
          price: '$699',
          includes: ['3-star hotel', 'City tour', 'Transport pass'],
        },
      ],
    },
  };

  const currentDestination = destinationData[formattedDestination] || destinationData.bali;

  // If destination not found, redirect to home after 3 seconds
  if (!destinationData[formattedDestination]) {
    setTimeout(() => {
      navigate('/');
    }, 3000);
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Destination not found. Redirecting to home page...
        </Typography>
      </Container>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Add handler for buy navigation
  const handleBuy = (item) => {
    navigate('/buy', { state: item });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '50vh',
          backgroundImage: `url(${currentDestination.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3))',
          },
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                textAlign: 'center',
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {currentDestination.name}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                textAlign: 'center',
                mt: 2,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {currentDestination.description}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Content Section */}
      <Container>
        <Box sx={{ py: { xs: 4, md: 8 } }}>
          <Typography variant="h2" component="h1" className="section-title" sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>
            {destinationData[formattedDestination]?.name || 'Destination'} Packages
          </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Activities" />
            <Tab label="Packages" />
          </Tabs>
        </Box>

        {tabValue === 0 && (
            <Grid container spacing={{ xs: 2, md: 4 }}>
            {currentDestination.activities.map((activity, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card
                      className="card"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                        boxShadow: 'var(--card-shadow)',
                        backgroundColor: 'var(--surface-color)',
                        border: '1px solid #e3e9f1',
                        transition: 'var(--transition)',
                        cursor: 'pointer',
                      '&:hover': {
                          transform: 'translateY(-8px) scale(1.03)',
                          boxShadow: 'var(--hover-shadow)',
                          borderColor: 'var(--secondary-color)',
                      },
                    }}
                    onClick={() => handleBuy(activity)}
                  >
                      <Box sx={{ position: 'relative', height: { xs: 180, md: 250 }, overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                          height="100%"
                        image={activity.image}
                        alt={activity.title}
                        sx={{
                            width: '100%',
                            objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                              transform: 'scale(1.08)',
                          },
                        }}
                      />
                    </Box>
                      <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, backgroundColor: 'var(--surface-color)' }}>
                        <Typography gutterBottom variant="h5" component="h2" sx={{ color: 'var(--secondary-color)', fontWeight: 700, fontFamily: 'Montserrat, Poppins, sans-serif', mb: 1 }}>
                        {activity.title}
                      </Typography>
                        <Typography sx={{ color: 'var(--text-light)', fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.8, mb: 2 }}>
                        {activity.description}
                        </Typography>
                        <Typography sx={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '1.05rem' }}>
                          {activity.duration} &bull; {activity.price}
                        </Typography>
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.96 }}
                          style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', transition: 'var(--transition)', marginTop: 12 }}
                          onClick={e => { e.stopPropagation(); handleBuy(activity); }}
                        >
                          Buy Now
                        </motion.button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={4}>
            {currentDestination.packages.map((pkg, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                      },
                    }}
                    onClick={() => handleBuy(pkg)}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        height: '250px',
                        overflow: 'hidden',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="250"
                        image={pkg.image}
                        alt={pkg.title}
                        sx={{
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {pkg.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.8,
                          mb: 2,
                        }}
                      >
                        {pkg.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Includes:
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: 16 }}>
                          {pkg.includes.map((item, idx) => (
                            <li key={idx}>
                              <Typography variant="body2" color="text.secondary">
                                {item}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Duration: {pkg.duration}
                        </Typography>
                        <Typography variant="h6" color="primary.main">
                          {pkg.price}
                        </Typography>
                      </Box>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', transition: 'var(--transition)', marginTop: 12 }}
                        onClick={e => { e.stopPropagation(); handleBuy(pkg); }}
                      >
                        Buy Now
                      </motion.button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
        </Box>
      </Container>
    </Box>
  );
};

export default DestinationPackages; 