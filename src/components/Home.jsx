import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChatIcon from '@mui/icons-material/Chat';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05 }}
  >
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'center',
            '& > svg': {
              fontSize: 48,
              color: 'primary.main',
            },
          }}
        >
          {icon}
        </Box>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
          bgcolor: 'background.paper',
          borderRadius: 4,
          mb: 6,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            Learn from Alex Hormozi
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Typography variant="h5" color="text.secondary" paragraph>
            Your AI-powered business mentor, available 24/7
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/chat')}
            sx={{
              mt: 4,
              py: 2,
              px: 6,
              borderRadius: 3,
              fontSize: '1.2rem',
              textTransform: 'none',
            }}
          >
            Start Learning
          </Button>
        </motion.div>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<ChatIcon />}
            title="Interactive Chat"
            description="Have natural conversations with an AI trained on Alex's content across all platforms."
            delay={0.2}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<TrendingUpIcon />}
            title="Business Growth"
            description="Learn proven strategies for scaling your business and increasing revenue."
            delay={0.4}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<SchoolIcon />}
            title="Learning Hub"
            description="Access curated content and insights from Alex's most impactful teachings."
            delay={0.6}
          />
        </Grid>
      </Grid>

      {/* Stats Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 4,
          p: 6,
          textAlign: 'center',
        }}
      >
        <Grid container spacing={4}>
          {[
            { label: 'Content Sources', value: '6+' },
            { label: 'Business Topics', value: '100+' },
            { label: 'Success Stories', value: '1000+' },
          ].map((stat, index) => (
            <Grid item xs={12} md={4} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontWeight: 700, color: 'primary.main' }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {stat.label}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home; 