import React from 'react'
import img1 from './files/1a.jpg';
import img2 from './files/2a.jpg';
import img3 from './files/3a.jpg';
import img4 from './files/4a.jpg';

function Services() {
  return (
    <div>
      {/* Services */}
      <section className="container">
        <div className="text">
          <h2>We have the best services available for you!</h2>
        </div>
        <div className="rowitems">
          {/* Container-box for Flight Services */}
          <div className="container-box">
            <div className="container-image">
              <img src={img1} alt="Flight Services" />
            </div>
            <h4>Flight Services</h4>
            <p>Arrival and Departure</p>
          </div>

          {/* Container-box for Food Services */}
          <div className="container-box">
            <div className="container-image">
              <img src={img2} alt="Food Services" />
            </div>
            <h4>Food Services</h4>
            <p>Catering</p>
          </div>

          {/* Container-box for Travel Services */}
          <div className="container-box">
            <div className="container-image">
              <img src={img3} alt="Travel Services" />
            </div>
            <h4>Travel Services</h4>
            <p>Pick-up/drop</p>
          </div>

          {/* Container-box for Hotel Services */}
          <div className="container-box">
            <div className="container-image">
              <img src={img4} alt="Hotel Services" />
            </div>
            <h4>Hotel Services</h4>
            <p>Check-in/out</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
