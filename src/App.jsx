import { createContext, useContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Home from './pages/Home';
import Tours from './pages/Tours';
import Guide from './pages/Guide';

const BookingContext = createContext(null);
export const useBooking = () => useContext(BookingContext);

export default function App() {
  // booking = { tourId, waterId? } | null
  const [booking, setBooking] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  const openBooking = (tourId, waterId) => setBooking({ tourId, waterId });
  const closeBooking = () => setBooking(null);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
      <Footer />
      {booking && <BookingModal tourId={booking.tourId} waterId={booking.waterId} onClose={closeBooking} />}
    </BookingContext.Provider>
  );
}
