import React, { useEffect, useState } from 'react';
import logo from '../img/logo.png';
import { useParams, Link, useNavigate } from 'react-router-dom';

function Hotel() {
  const { placeId } = useParams();
  console.log('Place ID:', placeId);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [place, setPlaces] = useState([]);
  const [selectedPlaceName, setSelectedPlaceName] = useState(''); // State to hold the selected place name

  const fetchAllPlaces = async () => {
    try {
      const token = getCookieValue('token');
      const response = await fetch('https://localhost:7036/api/Place', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const responseBody = await response.json();

      if (response.ok) {
        setPlaces(responseBody);
        // Find the selected place and update the selectedPlaceName state
        const selectedPlace = responseBody.find((p) => p.placeId === parseInt(placeId, 10));
        if (selectedPlace) {
          setSelectedPlaceName(selectedPlace.placeName);
        }
      } else {
        const errorMessage = responseBody.errorMessage;
        alert('Error: ' + errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = getCookieValue('token');
    if (!isAuthenticated) {
      navigate('/user-login'); // Redirect to the login page if not authenticated
    } else {
      fetchAllPlaces();
    }
  }, [navigate]);
  const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };


  const [filteredHotels, setFilteredHotels] = useState([]);
  const fetchHotels = async () => {
    try {
      const response = await fetch('https://localhost:7036/api/Hotel');
      const data = await response.json();

      if (response.ok) {
        const selectedPlace = place.find((p) => p.placeId === parseInt(placeId, 10));
        if (!selectedPlace) {
          console.error('Invalid placeId:', placeId);
          return;
        }

        const matchingHotels = data.filter((hotel) =>
          selectedPlace.hotels.some((placeHotel) => placeHotel.hotelId === hotel.hotelId)
        );

        setFilteredHotels(matchingHotels);
      } else {
        console.log('Error:', data.errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [placeId, place]);

  return (
    <div>
      <nav className="padding-5">
        <img src={logo} alt="Logo image" />
        <div className="nav__items">
          <div className="nav-line"></div>
          <a href="/home">Home</a>
          <a href="/tour">Tour</a>
          <a href="/feedback">Feedback</a>
          <a href="/gallery"  >Gallery</a>
          <a href="/logout">Logout</a>
        </div>
        <div className="nav__buttons">
        <button><Link to='/user-login'>Login</Link></button>
          <button><Link to='/user-register'>Sign up</Link></button>
        </div>
      </nav>

      <button className="menu" onClick={handleMenuToggle}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside className={`padding-5 ${isMobileMenuOpen ? 'show' : ''}`}>
        <div className="aside__items">
          <div className="aside-line"></div>
          <a href="/home" className="nav--active">Home</a>
          <a href="/tour">Tour</a>
          <a href="/feedback">Feedback</a>
          <a href="/gallery">Gallery</a>
          <a href="/logout">Logout</a>
        </div>
        <div className="nav__buttons">
        <button><Link to='/user-login'>Login</Link></button>
          <button><Link to='/user-register'>Sign up</Link></button>
        </div>
      </aside>

      <section className="destination padding-5" id="pricing">
        <h3 className="subtitle">Best Places In The World</h3>
        <h2 className="title">Hotels Under {selectedPlaceName}</h2>
        <div className="destination-box">
          {filteredHotels.map((hotel) => (
            <div className="destination__item" key={hotel.hotelId}>
              <Link to={`/hotel/${hotel.hotelId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="destination-image">
                  <img src={`https://localhost:7036/uploads/hotel/${hotel.hotelImage}`} alt="Hotel" />
                  <div className="price">{hotel.hotelSubLocation}</div>
                </div>
                <h2>{hotel.hotelName}</h2>
                <p className="description">{hotel.hotelDescription}</p>
                <div className="opinion">
                  <div className="rating">
                    <ion-icon name="star" role="img" className="md hydrated" aria-label="star"></ion-icon>
                    <p className="description">5</p>
                  </div>
                  <p className="description">(20k Review)</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Hotel;
