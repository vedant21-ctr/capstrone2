import { Box, Typography, TextField, Button, Container, Grid, Card, CardContent, CardMedia, Autocomplete, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeadset, FaDollarSign, FaStar, FaPlane, FaHotel, FaUmbrellaBeach, FaUserFriends } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { getRandomDestinations, getDestinationImage } from '../utils/imageApi';
// import WeatherCard from '../components/WeatherCard';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();


  // Modal state for booking
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  // Newsletter state
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  // Ref for smooth scroll
  const packagesRef = useRef(null);

  useEffect(() => {
    // Fetch all countries
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const formattedCountries = data.map(country => ({
          name: country.name.common,
          flag: country.flags.png,
          capital: country.capital?.[0] || 'N/A',
          region: country.region,
        }));
        setCountries(formattedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
    if (newValue) {
      const filtered = countries
        .filter(country => 
          country.name.toLowerCase().includes(newValue.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleDestinationClick = (destination) => {
    const formattedDestination = destination.toLowerCase().replace(/\s+/g, '-');
    navigate(`/destination/${formattedDestination}`);
  };

  // Get random featured destinations with images
  const [featuredDestinations, setFeaturedDestinations] = useState([]);

  useEffect(() => {
    // Set featured destinations on component mount
    setFeaturedDestinations(getRandomDestinations(6));
  }, []);

  // Add these below the featured destinations
  const whyChooseUs = [
    { icon: <FaHeadset size={32} color="var(--accent-color)" />, title: '24/7 Support', desc: 'We are here for you anytime, anywhere.' },
    { icon: <FaDollarSign size={32} color="var(--accent-color)" />, title: 'Best Price Guarantee', desc: 'Unbeatable prices for top destinations.' },
    { icon: <FaStar size={32} color="var(--accent-color)" />, title: 'Handpicked Experiences', desc: 'Curated trips for unforgettable memories.' },
  ];

  const testimonials = [
    { name: 'Amit Sharma', review: 'The best travel experience I ever had! Everything was perfectly organized.', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Sara Lee', review: 'Amazing destinations and great support. Highly recommend!', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'John Doe', review: 'Loved the packages and the team was super helpful.', img: 'https://randomuser.me/api/portraits/men/65.jpg' },
  ];

  const popularPackages = [
    { 
      title: 'Maldives Getaway', 
      price: '$799', 
      img: getDestinationImage('maldives', 400, 250), 
      desc: '5 nights in a luxury resort with all meals.' 
    },
    { 
      title: 'Swiss Alps Adventure', 
      price: '$999', 
      img: getDestinationImage('switzerland', 400, 250), 
      desc: '7 days of hiking, skiing, and sightseeing.' 
    },
    { 
      title: 'Dubai City Break', 
      price: '$599', 
      img: getDestinationImage('dubai', 400, 250), 
      desc: '4 nights, desert safari, and city tours.' 
    },
    { 
      title: 'Thailand Explorer', 
      price: '$699', 
      img: getDestinationImage('thailand', 400, 250), 
      desc: '6 nights exploring temples, beaches, and culture.' 
    },
    { 
      title: 'Iceland Adventure', 
      price: '$1299', 
      img: getDestinationImage('iceland', 400, 250), 
      desc: '8 days of Northern Lights and natural wonders.' 
    },
    { 
      title: 'Greek Islands Hopping', 
      price: '$899', 
      img: getDestinationImage('greece', 400, 250), 
      desc: '7 nights island hopping in the Aegean Sea.' 
    },
  ];

  // Scroll to packages section
  const scrollToPackages = () => {
    if (packagesRef.current) {
      packagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle booking
  const handleBookNow = (pkg) => {
    navigate('/buy', { state: pkg });
  };
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setBookingSuccess(true);
    }, 800);
  };
  const closeBooking = () => {
    setBookingOpen(false);
    setBookingSuccess(false);
    setSelectedPackage(null);
  };

  // Handle newsletter
  const handleNewsletter = (e) => {
    e.preventDefault();
    setNewsletterSuccess(true);
    setTimeout(() => setNewsletterSuccess(false), 2000);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(https://source.unsplash.com/random/1920x1080?travel)',
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
            background: 'linear-gradient(120deg, rgba(20,58,82,0.7), rgba(29,233,182,0.3))',
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
                color: 'var(--accent-color)',
                textAlign: 'center',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                fontFamily: 'Montserrat, Poppins, sans-serif',
                textShadow: '2px 2px 12px rgba(20,58,82,0.5)',
                letterSpacing: 2,
              }}
            >
              Discover Your Next Adventure
            </Typography>
            <Typography sx={{ color: '#fffde4', textAlign: 'center', mb: 3, fontSize: { xs: '1.1rem', md: '1.5rem' }, fontWeight: 500, textShadow: '2px 2px 10px rgba(20,58,82,0.5), 0 1px 8px #0008' }}>
              Explore the world's best destinations, handpicked for you.
            </Typography>

          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box
              sx={{
                maxWidth: 600,
                mx: 'auto',
                p: 2,
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(20,58,82,0.10)',
                mb: 2,
              }}
            >
              <Autocomplete
                freeSolo
                options={suggestions}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      src={option.flag}
                      alt=""
                      style={{ marginRight: 8 }}
                    />
                    {option.name} ({option.capital})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search for a country..."
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        borderRadius: 1,
                      },
                    }}
                  />
                )}
                value={searchValue}
                onChange={(event, newValue) => {
                  setSearchValue(newValue);
                }}
                onInputChange={handleSearchChange}
                PaperComponent={({ children }) => (
                  <Paper
                    sx={{
                      backgroundColor: 'white',
                      '& .MuiAutocomplete-option': {
                        padding: '8px 16px',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      },
                    }}
                  >
                    {children}
                  </Paper>
                )}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 36px', fontWeight: 700, fontSize: 18, cursor: 'pointer', transition: 'var(--transition)', boxShadow: '0 2px 8px rgba(20,58,82,0.10)' }}
                onClick={scrollToPackages}
              >
                Start Planning
              </motion.button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Destinations */}
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" className="section-title" sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>
            Featured Destinations
          </Typography>
        </motion.div>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {featuredDestinations.map((destination, index) => (
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
                  onClick={() => handleDestinationClick(destination.name)}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: { xs: 180, md: 250 },
                      overflow: 'hidden',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="100%"
                      image={destination.image}
                      alt={destination.name}
                      sx={{
                        width: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.08)',
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, transparent, rgba(20,58,82,0.18))',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, backgroundColor: 'var(--surface-color)' }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ color: 'var(--secondary-color)', fontWeight: 700, fontFamily: 'Montserrat, Poppins, sans-serif', mb: 1 }}>
                      {destination.name}
                    </Typography>
                    <Typography sx={{ color: 'var(--text-light)', fontSize: { xs: '1rem', md: '1.08rem' }, mb: 2 }}>
                      {destination.description}
                    </Typography>
                    {/* Weather Information - Temporarily disabled */}
                    {/* <WeatherCard destinationName={destination.name} compact={true} /> */}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <Container sx={{ py: { xs: 4, md: 8 } }}>
          <Typography variant="h3" sx={{ color: 'var(--primary-color)', fontWeight: 700, textAlign: 'center', mb: 4, fontFamily: 'Montserrat, Poppins, sans-serif', fontSize: { xs: '1.5rem', md: '2.2rem' } }}>
            Why Choose Us
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {whyChooseUs.map((item, idx) => (
              <Grid item xs={12} sm={4} key={idx}>
                <div style={{ textAlign: 'center', padding: 16 }}>
                  <div style={{ marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, color: 'var(--primary-color)', fontSize: 18 }}>{item.title}</div>
                  <div style={{ color: 'var(--text-light)', marginTop: 6 }}>{item.desc}</div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </motion.div>

      {/* Popular Packages Section */}
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} ref={packagesRef}>
        <Container sx={{ py: { xs: 4, md: 8 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h3" sx={{ color: 'var(--primary-color)', fontWeight: 700, fontFamily: 'Montserrat, Poppins, sans-serif', fontSize: { xs: '1.5rem', md: '2.2rem' } }}>
              Popular Packages
            </Typography>
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              style={{ background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', fontSize: 15, transition: 'var(--transition)' }}
              onClick={scrollToPackages}
            >
              View All Packages
            </motion.button>
          </Box>
          <Grid container spacing={4}>
            {popularPackages.map((pkg, idx) => (
              <Grid item xs={12} sm={4} key={idx}>
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(20,58,82,0.18)' }}
                  style={{ background: '#fff', borderRadius: 16, boxShadow: 'var(--card-shadow)', overflow: 'hidden', transition: 'var(--transition)', height: '100%', cursor: 'pointer' }}
                  onClick={() => handleBookNow(pkg)}
                >
                  <img src={pkg.img} alt={pkg.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ fontWeight: 700, color: 'var(--primary-color)', fontSize: 18 }}>{pkg.title}</div>
                    <div style={{ color: 'var(--text-light)', margin: '8px 0 12px 0' }}>{pkg.desc}</div>
                    <div style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{pkg.price}</div>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', transition: 'var(--transition)' }}
                      onClick={e => { e.stopPropagation(); handleBookNow(pkg); }}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* Booking Modal */}
        <AnimatePresence>
          {bookingOpen && (
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(20,58,82,0.25)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={closeBooking}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{ background: '#fff', borderRadius: 18, padding: 32, minWidth: 320, maxWidth: 400, width: '100%', boxShadow: '0 8px 32px rgba(20,58,82,0.18)', position: 'relative' }}
                onClick={e => e.stopPropagation()}
              >
                {!bookingSuccess ? (
                  <form onSubmit={handleBookingSubmit}>
                    <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--primary-color)', marginBottom: 16 }}>Book {selectedPackage?.title}</div>
                    <input type="text" placeholder="Your Name" required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e3e9f1', marginBottom: 12 }} />
                    <input type="email" placeholder="Your Email" required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e3e9f1', marginBottom: 12 }} />
                    <motion.button type="submit" whileHover={{ scale: 1.05 }} style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', width: '100%', fontSize: 16, marginTop: 8 }}>Confirm Booking</motion.button>
                  </form>
                ) : (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ textAlign: 'center', color: 'var(--primary-color)', fontWeight: 700, fontSize: 20, padding: 24 }}>
                    Booking Confirmed! 🎉<br />
                    We'll contact you soon.
                  </motion.div>
                )}
                <button onClick={closeBooking} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: 'var(--accent-color)', cursor: 'pointer' }} title="Close">×</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
        <Container sx={{ py: { xs: 4, md: 8 } }}>
          <Typography variant="h3" sx={{ color: 'var(--primary-color)', fontWeight: 700, textAlign: 'center', mb: 4, fontFamily: 'Montserrat, Poppins, sans-serif', fontSize: { xs: '1.5rem', md: '2.2rem' } }}>
            What Our Customers Say
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((t, idx) => (
              <Grid item xs={12} sm={4} key={idx}>
                <div style={{ background: '#fff', borderRadius: 16, boxShadow: 'var(--card-shadow)', padding: 24, textAlign: 'center', height: '100%' }}>
                  <img src={t.img} alt={t.name} style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '2px solid var(--accent-color)' }} />
                  <div style={{ fontWeight: 700, color: 'var(--primary-color)', fontSize: 17 }}>{t.name}</div>
                  <div style={{ color: 'var(--text-light)', marginTop: 8, fontStyle: 'italic' }}>&quot;{t.review}&quot;</div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </motion.div>

      {/* Newsletter Signup Section */}
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
        <Container sx={{ py: { xs: 4, md: 8 } }}>
          <div style={{ background: 'var(--primary-color)', borderRadius: 18, padding: '40px 24px', textAlign: 'center', color: '#fff', maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 10 }}>Get Exclusive Travel Deals</div>
            <div style={{ color: '#e0eafc', marginBottom: 18 }}>Sign up for our newsletter and never miss an update!</div>
            <form onSubmit={handleNewsletter} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <input type="email" placeholder="Your email address" required style={{ padding: '12px 16px', borderRadius: 8, border: 'none', width: '100%', maxWidth: 320, fontSize: 16, marginBottom: 8 }} />
              <motion.button type="submit" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 600, cursor: 'pointer', fontSize: 16, transition: 'var(--transition)' }}>Subscribe</motion.button>
            </form>
            <AnimatePresence>
              {newsletterSuccess && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ color: '#fffde4', fontWeight: 600, marginTop: 12 }}>
                  Thank you for subscribing! 🎉
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </motion.div>


    </Box>
  );
};

export default Home; 