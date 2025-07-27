import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ClerkProvider } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import DestinationPackages from './pages/DestinationPackages';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import SignInPage from './pages/SignIn';
import Buy from "./pages/Buy";
import HotelSearch from './pages/HotelSearch';
import HotelDetails from './pages/HotelDetails';
import BookingConfirmation from './pages/BookingConfirmation';
import TripHistory from './pages/TripHistory';
import Weather from './pages/Weather';
import './styles/index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh' 
          }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/destination/:destination" element={<DestinationPackages />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/hotels" element={<HotelSearch />} />
                <Route path="/hotel/:id" element={<HotelDetails />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route path="/trip-history" element={<TripHistory />} />
            <Route path="/weather" element={<Weather />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App; 