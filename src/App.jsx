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

  // Braces matter: an arrow with an implicit return would hand React whatever
  // window.scrollTo() returns as the effect's cleanup. Normally that's
  // undefined, but a browser extension that overrides scrollTo can make it
  // return a non-function — and React then throws "destroy is not a function"
  // on the next navigation. The block body returns nothing, so it's safe.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
