import React, { useEffect, useState, useRef } from 'react';
import '../style.css';
import logo from '../img/logo.png';
import heroBanner from '../img/hero-banner.png';
import gallery1 from '../img/gallery-1.jpg';
import gallery2 from '../img/gallery-2.jpg';
import gallery3 from '../img/gallery-3.jpg';
import gallery4 from '../img/gallery-4.jpg';
import gallery5 from '../img/gallery-5.jpg';
import gallery6 from '../img/gallery-6.jpg';
import tileicon from '../img/title-icon.svg';
import serviceIcon1 from '../img/service-icon-1.svg';
import serviceIcon2 from '../img/service-icon-2.svg';
import serviceIcon3 from '../img/service-icon-3.svg';
import experienceBanner from '../img/experience-banner.png';
import expShape from '../img/exp-shape.svg';

import { BrowserRouter as Router, Link, Route, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';




const Travelia = () => {



  useEffect(() => {
    // Custom JavaScript logic

    // NAVIGATION
    const navItemLinks = document.querySelectorAll('.nav__items a');
    const navLine = document.querySelector('.nav-line');

    const handleNavItemClick = (e) => {
      if (e.target.matches('.nav__items a')) {
        const navItemActive = e.target;
        document.querySelector('.nav--active').classList.remove('nav--active');
        navItemActive.classList.add('nav--active');
        setNavLine(navItemActive);
      }
    };

    const setNavLine = (navItemActive) => {
      const offsetLeft = navItemActive.getBoundingClientRect().left;
      const width = navItemActive.getBoundingClientRect().width;
      const left = offsetLeft + width / 2 - 10;
      navLine.style.transform = 'translateX(0)';
      navLine.style.left = left + 'px';
    };

    navItemLinks.forEach((link) => {
      link.addEventListener('click', handleNavItemClick);
    });

    // ASIDE
    const asideItemLinks = document.querySelectorAll('.aside__items a');
    const asideLine = document.querySelector('.aside-line');

    const handleAsideItemClick = (e) => {
      if (e.target.matches('.aside__items a')) {
        const asideItemActive = e.target;
        document.querySelector('.aside--active').classList.remove('aside--active');
        asideItemActive.classList.add('aside--active');
        setAsideLine(asideItemActive);
        setTimeout(() => {
          const menu = document.querySelector('button.menu');
          const aside = document.querySelector('aside');
          menu.classList.remove('show');
          aside.classList.remove('show');
        }, 400);
      }
    };

    const setAsideLine = (asideItemActive) => {
      const offsetTop = asideItemActive.getBoundingClientRect().top;
      const height = asideItemActive.getBoundingClientRect().height;
      const top = offsetTop + height / 2 - 15;
      asideLine.style.top = top + 'px';
    };

    asideItemLinks.forEach((link) => {
      link.addEventListener('click', handleAsideItemClick);
    });

    // TOGGLE MENU
    const menuButton = document.querySelector('button.menu');
    const aside = document.querySelector('aside');

    const handleMenuToggle = () => {
      menuButton.classList.toggle('show');
      aside.classList.toggle('show');
    };

    menuButton.addEventListener('click', handleMenuToggle);

    // SCROLLED NAVIGATION
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    const handleScroll = () => {
      const offsetTop = header.getBoundingClientRect().top;
      const height = header.getBoundingClientRect().height;
      const topHeader = offsetTop + height;
      if (window.scrollY >= topHeader) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listeners
    return () => {
      navItemLinks.forEach((link) => {
        link.removeEventListener('click', handleNavItemClick);
      });
      asideItemLinks.forEach((link) => {
        link.removeEventListener('click', handleAsideItemClick);
      });
      menuButton.removeEventListener('click', handleMenuToggle);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  const [place, setPlaces] = useState([]);
  const fetchAllPlaces = async () => {
    try {
      const response = await fetch('https://localhost:7036/api/Place');
      const responseBody = await response.json(); // Parsing the JSON response

      if (response.ok) {
        // Set the rooms using the data in the response body
        setPlaces(responseBody); // Assuming setRooms is a state update function
      } else {
        const errorMessage = responseBody.errorMessage;
        alert('Error: ' + errorMessage); // Display the errorMessage value in the alert
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchAllPlaces();
  }, []);



  return (
    <div className="container" id="home">
      <div className="bg"></div>

      <nav className="padding-5">
        <img src={logo} alt="Logo image" />
        <div className="nav__items">
          <div className="nav-line"></div>
          <a href="#home" className="nav--active">Home</a>
          <a href="#service">Service</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav__buttons">
          <button><Link to='/user-login'>Login</Link></button>
          <button><Link to='/user-register'>Sign up</Link></button>
        </div>
      </nav>

      <button className="menu">
        <span></span><span></span><span></span>
      </button>

      <aside className="padding-5">
        <img src={logo} alt="Logo image" />
        <div className="aside__items">
          <div className="aside-line"></div>
          <a href="#home" className="aside--active">Home</a>
          <a href="#service">Service</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav__buttons">
          <button><Link to='/user-login'>Login</Link></button>
          <button><Link to='/user-register'>Sign up</Link></button>
        </div>
      </aside>

      {/* <NavBar></NavBar> */}

      <header className="padding-5">
        <div className="header__left">
          <div className="header-tag">
            <p>Explore the World</p>
            <img src={tileicon} alt="Around the world" />
          </div>
          <h1>It's a Big World<br />Out There, Go Explore</h1>
          <p className="description">We always make our customer happy by providing as many choices as possible</p>

          <div className="buttons">
            <a href="#pricing" className="trip">
              <p>Plan a trip</p>
              <ion-icon name="chevron-forward"></ion-icon>
            </a>
          </div>

        </div>
        <div className="header__right">
          <img src={heroBanner} alt="Header banner image" />
        </div>
      </header>

      <section className="service padding-5" id="service">
        <div className="service-info">
          <h3 className="subtitle">What We Serve</h3>
          <h2 className="title">Top Values For You</h2>
          <p className="description">Try a variety of benefits when using our services.</p>
        </div>
        <div className="service-box">
          <div className="service__item" style={{ "--bg-service": "#ffe9db" }}>
            <img src={serviceIcon1} alt="Service image" />
            <h2>Lot of Choices</h2>
            <p className="description">Total 460+ destinations that we work with.</p>
          </div>
          <div className="service__item" style={{ "--bg-service": "#ffdfdc" }}>
            <img src={serviceIcon2} alt="Service image" />
            <h2>Best Tour Guide</h2>
            <p className="description">Our tour guide with 15+ years of experience.</p>
          </div>
          <div className="service__item" style={{ "--bg-service": "#eaddff" }}>
            <img src={serviceIcon3} alt="Service image" />
            <h2>Easy Booking</h2>
            <p className="description">With an easy and fast ticket purchase process.</p>
          </div>
        </div>
      </section>

      <section className="destination padding-5" id="pricing">
        <h3 className="subtitle">Best Places In The World</h3>
        <h2 className="title">Explore Top Destination</h2>
        <div class="destination-box">
          {place.map((Place) => (
            <div class="destination__item" key={Place.PlaceId}>
              <div class="destination-image">
                <img src={`https://localhost:7036/uploads/place/${Place.placeImage}`} alt="Destination image" />
                <div class="price">₹{Place.tourCost}</div>
              </div>
              <h2>{Place.placeDescription}</h2>
              <p class="description">{Place.placeName}</p>
              <div class="opinion">
                <div class="rating">
                  <ion-icon name="star" role="img" class="md hydrated" aria-label="star"></ion-icon>
                  <p class="description">5</p>
                </div>
                <p class="description">(20k Review)</p>
              </div>
            </div>

          ))}
        </div>

      </section>

      <section className="experience padding-5" id="about">
        <div className="experience-image">
          <img src={experienceBanner} alt="Experience banner" />
          <img src={expShape} alt="Experience shape" />
        </div>
        <div className="experience-info">
          <h3 className="subtitle">Quality And Comfort</h3>
          <h2 className="title">With Our Experience We Will Serve You</h2>
          <p className="description">Since we first opened we have always prioritized the convenience of our users by
            providing low prices and with an easy process.</p>
          <div className="experience-box">
            <div className="experience__item">
              <h2>20</h2>
              <p className="description">Years<br />Experience</p>
            </div>
            <div className="experience__item">
              <h2>460+</h2>
              <p className="description">Destination<br />Collaboration</p>
            </div>
            <div className="experience__item">
              <h2>50k+</h2>
              <p className="description">Happy<br />Customer</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery padding-5">
        <h3 className="subtitle">Photo Gallery</h3>
        <h2 className="title">Travel the Wonderful Landscapes</h2>
        <div className="gallery-box">
          <div className="gallery__item">
            <img src={gallery1} alt="Photo Gallery" />
          </div>
          <div className="gallery__item">
            <img src={gallery2} alt="Photo Gallery" />
          </div>
          <div className="gallery__item">
            <img src={gallery3} alt="Photo Gallery" />
          </div>
          <div className="gallery__item">
            <img src={gallery4} alt="Photo Gallery" />
          </div>
          <div className="gallery__item">
            <img src={gallery5} alt="Photo Gallery" />
          </div>
          <div className="gallery__item">
            <img src={gallery6} alt="Photo Gallery" />
          </div>
        </div>
      </section>

      <section className="started" id="contact">
        <h2 className="title">Prepare Yourself & Let's Explore The Beauty Of The World
          <img src={tileicon} alt="Title icon" />
        </h2>
        <p className="description">We have many special offers recommended for you.</p>
        <Link to='/tour'>
          <button className="btn-primary">
            <p>Get Started</p>
          </button></Link>
      </section>

      <footer className="padding-5">
        <div className="footer__left">
          <img src={logo} alt="Travelia Logo" />
          <p className="description">We always make our customer happy by providing as many choices as possible</p>
          <div className="social">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </div>
        </div>
        <ul className="footer__list">
          <h2>Navs</h2>
          <li><a href="#home" className="nav--active">Home</a></li>
          <li> <a href="#service">Service</a></li>
          <li> <a href="#pricing">Pricing</a></li>
          <li> <a href="#about">About</a></li>
          <li> <a href="#contact">Contact</a></li>
        </ul>

        <div className="footer__right">
          <h2>Get in Touch</h2>
          <p className="description">Question or feedback? We'd love to hear from you.</p>
          <p className="description">Phone:6383145933</p>
          <p className="description">Email:kirthikakumar123@gmail.com</p>
          <p className="description"><Link to='/feedback'>Feedback</Link></p>
        </div>
      </footer>
      <section className="credits">
        <p>Copyright 2023. Designed by Kiki</p>
        <span>
          <a href="#">Terms and Conditions</a>
          <a href="#">Privacy and Policy</a>
        </span>
      </section>
    </div>
  );

};

export default Travelia;
