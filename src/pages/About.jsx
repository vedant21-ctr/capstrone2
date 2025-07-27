import { Container, Typography, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Container>
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" className="section-title" sx={{ fontFamily: 'Montserrat, Poppins, sans-serif', color: 'var(--primary-color)', fontWeight: 700 }}>
            About Us
          </Typography>
        </motion.div>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  boxShadow: '0 10px 24px rgba(20,58,82,0.10)',
                  backgroundColor: 'var(--surface-color)',
                  border: '1px solid #e3e9f1',
                  height: '100%',
                  transition: 'var(--transition)',
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.02)',
                    boxShadow: '0 15px 30px rgba(20,58,82,0.15)',
                    borderColor: 'var(--secondary-color)',
                  },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    color: 'var(--secondary-color)',
                    fontWeight: 700,
                    mb: 3,
                    fontFamily: 'Montserrat, Poppins, sans-serif',
                  }}
                >
                  Our Story
                </Typography>
                <Typography paragraph sx={{ color: 'var(--text-light)' }}>
                  Travel Adventures was founded with a simple mission: to help people discover the world's most amazing destinations and create unforgettable experiences. Our team of passionate travelers and adventure enthusiasts work tirelessly to curate the best travel experiences for our clients.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  boxShadow: '0 10px 24px rgba(20,58,82,0.10)',
                  backgroundColor: 'var(--surface-color)',
                  border: '1px solid #e3e9f1',
                  height: '100%',
                  transition: 'var(--transition)',
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.02)',
                    boxShadow: '0 15px 30px rgba(20,58,82,0.15)',
                    borderColor: 'var(--secondary-color)',
                  },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    color: 'var(--secondary-color)',
                    fontWeight: 700,
                    mb: 3,
                    fontFamily: 'Montserrat, Poppins, sans-serif',
                  }}
                >
                  Our Mission
                </Typography>
                <Typography paragraph sx={{ color: 'var(--text-light)' }}>
                  We believe that travel has the power to transform lives. Our mission is to make adventure travel accessible to everyone while promoting sustainable tourism practices that protect the places we love to visit.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About; 