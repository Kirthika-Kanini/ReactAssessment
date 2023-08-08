import React from 'react'
import imgP1 from './files/p1.jpg';
import imgP2 from './files/p2.jpg';
import imgP3 from './files/p3.jpg';
import imgP4 from './files/p4.jpg';

function Packages() {
  return (
    <div>
      <section className="package" id="package">
        <div className="package-title">
          <h2>Packages</h2>
        </div>

        <div className="package-content">
          {/* Box for Package - Bronze */}
          <div className="box">
            <div className="image">
              <img src={imgP1} alt="" />
              <h3>Rs.9,999/-</h3>
            </div>

            <div className="dest-content">
              <div className="location">
                <h4>Bronze</h4>
                <ul className="pac-details">
                  <li>2 Star Hotel</li>
                  <li>5 Nights Stay</li>
                  <li>Free photo Session</li>
                  <li>Friendly Tour Guide</li>
                  <li>24/7 Customer Help Center</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Box for Package - Silver */}
          <div className="box">
            <div className="image">
              <img src={imgP2} alt="" />
              <h3>Rs.19,999/-</h3>
            </div>

            <div className="dest-content">
              <div className="location">
                <h4>Silver</h4>
                <ul className="pac-details">
                  <li>3 Star Hotel</li>
                  <li>7 Nights Stay</li>
                  <li>Free photo Session</li>
                  <li>Friendly Tour Guide</li>
                  <li>24/7 Customer Help Center</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Box for Package - Gold */}
          <div className="box">
            <div className="image">
              <img src={imgP3} alt="" />
              <h3>Rs.29,999/-</h3>
            </div>

            <div className="dest-content">
              <div className="location">
                <h4>Gold</h4>
                <ul className="pac-details">
                  <li>4 Star Hotel</li>
                  <li>10 Nights Stay</li>
                  <li>Breakfast and Dinner</li>
                  <li>Free photo Session</li>
                  <li>Friendly Tour Guide</li>
                  <li>24/7 Customer Help Center</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Box for Package - Platinum */}
          <div className="box">
            <div className="image">
              <img src={imgP4} alt="" />
              <h3>Rs.39,999/-</h3>
            </div>

            <div className="dest-content">
              <div className="location">
                <h4>Platinum</h4>
                <ul className="pac-details">
                  <li>5 Star Hotel</li>
                  <li>14 Nights Stay</li>
                  <li>Breakfast, Lunch and Dinner</li>
                  <li>Bornfire</li>
                  <li>Free photo Session</li>
                  <li>Friendly Tour Guide</li>
                  <li>24/7 Customer Help Center</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Packages
