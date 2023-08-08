import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import logo from '../img/logo.png';
import { BrowserRouter as Router, Link, Route, useNavigate } from 'react-router-dom';

function Gallery() {
    useEffect(() => {
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
  const [gallery, setGallery] = useState([]);
  const initialFormData = {
    Gname: '',
    GalImage: null,
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // Fetch hotel data from your API endpoint
    const fetchGallery = async () => {
      try {
        const response = await axios.get("https://localhost:7029/api/GalleryBlobs");
        setGallery(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="container" id="home">
    <div className="bg"></div>

    <nav className="padding-5">
        <img src={logo} alt="Logo image" />
        <div className="nav__items">
            <div className="nav-line"></div>
            <a href="/home">Home</a>
          <a href="/tour">Tour</a>
          <a href="/feedback">Feedback</a>
          <a href="/gallery"  className="nav--active">Gallery</a>
        </div>
        <div className="nav__buttons">
        <button><Link to='/user-login'>Login</Link></button>
          <button><Link to='/user-register'>Sign up</Link></button>
        </div>
    </nav>

    <button className="menu">
        <span></span>
        <span></span>
        <span></span>
    </button>

    <aside className="padding-5">
        <img src={logo} alt="Logo image" />
        <div className="aside__items">
            <div className="aside-line"></div>
            <a href="/home">Home</a>
          <a href="/tour">Tour</a>
          <a href="/feedback">Feedback</a>
          <a href="/gallery"  className="nav--active">Gallery</a>
        </div>
        <div className="nav__buttons">
        <button><Link to='/user-login'>Login</Link></button>
          <button><Link to='/user-register'>Sign up</Link></button>
        </div>
    </aside>
    <Box sx={{ backgroundColor: '#F0F4F7', height: '97vh', p: 2 }}>
            <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
      <Grid container spacing={'1%'}>
     {gallery.map((GalleryBlob) => (
        <Grid item xs={12} sm={6} md={3} key={GalleryBlob.galId}>
            <Card sx={{ marginRight: '2%', marginBottom: '2%' }}>

                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        image= {GalleryBlob.galImage }
                        alt="Conference Room"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
       
                        </Typography>
                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                            {/* {GalleryBlob.galName} */}
                        </Typography>
                    </CardContent>

                </CardActionArea>
               
            </Card>
        </Grid>
        
        ))}
        </Grid>
        </Box>
        </Box>
        </div>
  );
}

export default Gallery;
