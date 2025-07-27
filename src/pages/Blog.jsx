import { Container, Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';

const Blog = () => {
  const blogPosts = [
    {
      title: 'Top 10 Adventure Destinations',
      excerpt: 'Discover the most thrilling destinations for adventure seekers.',
      image: 'https://source.unsplash.com/random/300x200?adventure',
      author: 'John Doe',
      date: 'March 15, 2024',
    },
    {
      title: 'Sustainable Travel Tips',
      excerpt: 'Learn how to travel responsibly and reduce your environmental impact.',
      image: 'https://source.unsplash.com/random/300x200?sustainability',
      author: 'Jane Smith',
      date: 'March 10, 2024',
    },
    {
      title: 'Hidden Gems of Europe',
      excerpt: 'Explore the lesser-known but equally amazing destinations in Europe.',
      image: 'https://source.unsplash.com/random/300x200?europe',
      author: 'Mike Johnson',
      date: 'March 5, 2024',
    },
  ];

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
            Travel Blog
          </Typography>
        </motion.div>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
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
                    boxShadow: '0 10px 24px rgba(20,58,82,0.10)',
                    backgroundColor: 'var(--surface-color)',
                    border: '1px solid #e3e9f1',
                    transition: 'var(--transition)',
                    '&:hover': {
                      transform: 'translateY(-10px) scale(1.02)',
                      boxShadow: '0 15px 30px rgba(20,58,82,0.15)',
                      borderColor: 'var(--secondary-color)',
                    },
                  }}
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
                      image={post.image}
                      alt={post.title}
                      sx={{
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
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
                        background: 'linear-gradient(to bottom, transparent, rgba(20,58,82,0.15))',
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: 4,
                      backgroundColor: 'var(--surface-color)',
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        color: 'var(--secondary-color)',
                        fontWeight: 700,
                        mb: 2,
                        fontFamily: 'Montserrat, Poppins, sans-serif',
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'var(--text-light)',
                      }}
                    >
                      <span>By {post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--text-light)',
                        lineHeight: 1.8,
                      }}
                    >
                      {post.excerpt}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Blog; 