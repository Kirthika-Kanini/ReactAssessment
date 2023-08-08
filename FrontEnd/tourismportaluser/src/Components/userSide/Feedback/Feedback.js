import React, { useEffect, useState } from 'react';
import '../style.css';
import logo from '../img/logo.svg';
import { BrowserRouter as Router, Link, Route, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Feedback = () => {


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

    const { id } = useParams();
    const [idofuser, setUserId] = useState(0);

    useEffect(() => {
        const userodaId = localStorage.getItem("UserId")
        setUserId(userodaId)
    }, []);

    const initialFormData = {
        feedback: '',
        createdAt: '',
        booking: {
            bookingId: id,
        },
        user: {
            id: idofuser,
        },
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the field is nested (booking or user)
        if (name.includes('.')) {
            const [nestedField, nestedName] = name.split('.');
            setFormData((prevData) => ({
                ...prevData,
                [nestedField]: {
                    ...prevData[nestedField],
                    [nestedName]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert the form data to JSON format
        const jsonData = {
            feedback: formData.feedback,
            createdAt: formData.createdAt,
            user: {
                id: idofuser,
            },
            booking: {
                bookingId: formData.booking.bookingId,
            },
        };

        // Perform form submission using Axios POST request
        axios
            .post('https://localhost:7194/api/Feedbacks', jsonData, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                console.log('Form data submitted successfully:', response.data);
                // Clear the form data and selectedImage
                setFormData(initialFormData);
            })
            .catch((error) => {
                console.error('Error submitting form data:', error);
                // Handle error if needed
            });
    };

    return (
        <div className="container" id="home">
            <div className="bg"></div>

            <nav className="padding-5">
                <img src={logo} alt="Logo image" />
                <div className="nav__items">
                    <div className="nav-line"></div>
                    <a href="/home">Home</a>
                    <a href="/tour">Tour</a>
                    <a href="/feedback" className="nav--active">Feedback</a>
                    <a href="/gallery">Gallery</a>
                </div>
                <div className="nav__buttons">
                    <button>
                        <Link to="/user-login">Login</Link>
                    </button>
                    <button>
                        <Link to="/user-register">Sign up</Link>
                    </button>
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
                    <a href="/feedback" className="nav--active">Feedback</a>
                    <a href="/gallery">Gallery</a>
                </div>
                <div className="nav__buttons">
                    <button>
                        <Link to="/user-login">Login</Link>
                    </button>
                    <button>
                        <Link to="/user-register">Sign up</Link>
                    </button>
                </div>
            </aside>

            <Box sx={{ backgroundColor: '#F0F4F7', height: '97vh', p: 2 }}>
                <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
                    <h2>Feedback Form</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="User"
                            variant="outlined"
                            fullWidth
                            name="user.userId"
                            value={idofuser}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            label="Booking"
                            variant="outlined"
                            name="booking.bookingId"
                            fullWidth
                            value={id}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            label="Created At"
                            variant="outlined"
                            name="createdAt"
                            fullWidth
                            value={formData.createdAt}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            label="Feedback"
                            variant="outlined"
                            fullWidth
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            multiline
                            rows={4}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit Feedback
                        </Button>
                    </form>
                </Box>
            </Box>
        </div>
    );
};

export default Feedback;
