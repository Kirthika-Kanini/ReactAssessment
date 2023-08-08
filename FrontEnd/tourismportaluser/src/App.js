import './App.css';
import HomePage from './Components/userSide/HomePage/HomePage';
import BookingPage from './Components/userSide/Booking/BookingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tour from './Components/userSide/TourPackages/Tour';
import Hotel from './Components/userSide/TourPackages/Hotel';
import Restaurant from './Components/userSide/TourPackages/Restaurant';
import UserRegisterModule from './Components/userSide/LoginModule/UserRegisterModule';
import AdminRegisterModule from './Components/userSide/LoginModule/AdminRegisterModule';
import UserLoginModule from './Components/userSide/LoginModule/UserLoginModule';
import AdminLoginModule from './Components/userSide/LoginModule/AdminLoginModule';
import Feedback from './Components/userSide/Feedback/Feedback';
import Gallery from './Components/userSide/TourPackages/Gallery';
import YourBooking from './Components/userSide/Booking/YourBooking';
import Logout from './Components/userSide/Logout/logout';
import TourProtected from './Components/userSide/ProtectedTour/TourProtected';
import BookingProtected from './Components/userSide/ProtectBooking/BookingProtected';

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
    <Router>
      <Routes>
        {/* <Route path="/booking" element={<BookingPage />} /> */}
        <Route path='/booking' element={<BookingProtected token={token}><BookingPage/></BookingProtected>}/>
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/tour" element={<Tour/>} /> */}
        <Route path='/tour' element={<TourProtected token={token}><Tour/></TourProtected>}/>
        <Route path="/hotel/:placeId" element={<Hotel />} />
        <Route path="/restaurant/:placeId" element={<Restaurant />} />
        <Route path="/user-register" element={<UserRegisterModule/>} />
        <Route path="/admin-register" element={<AdminRegisterModule/>} />
        <Route path="/user-login" element={<UserLoginModule/>} />
        <Route path="/admin-login" element={<AdminLoginModule/>} />
        <Route path="/feedback/:id" element={<Feedback/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/yourBooking" element={<YourBooking />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
