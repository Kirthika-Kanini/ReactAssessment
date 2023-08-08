import React from 'react'
import imgL1 from './files/l1.jpg';
import imgL2 from './files/l2.jpg';
import imgL3 from './files/l3.jpg';
import imgL4 from './files/l4.jpg';
import imgL5 from './files/l5.jpg';
import imgL6 from './files/l6.jpg';
import imgL7 from './files/l7.jpg';
import imgL8 from './files/l8.jpg';

function Locations() {
  return (
    <div>
      <section className="locations" id="locations">
        <div className="package-title">
          <h2>Locations</h2>
        </div>

        <div className="location-content">
          {/* Col-content for Location - Kashmir */}
          <a href="./locations.html#kashmir" target="_blank">
            <div className="col-content">
              <img src={imgL1} alt="" />
              <h5>India</h5>
              <p>Kashmir</p>
            </div>
          </a>

          {/* Col-content for Location - Istanbul */}
          <a href="./locations.html#istanbul" target="_blank">
            <div className="col-content">
              <img src={imgL2} alt="" />
              <h5>Turkey</h5>
              <p>Istanbul</p>
            </div>
          </a>

          {/* Col-content for Location - Paris */}
          <a href="./locations.html#paris" target="_blank">
            <div className="col-content">
              <img src={imgL3} alt="" />
              <h5>France</h5>
              <p>Paris</p>
            </div>
          </a>

          {/* Col-content for Location - Bali */}
          <a href="./locations.html#bali" target="_blank">
            <div className="col-content">
              <img src={imgL4} alt="" />
              <h5>Indonesia</h5>
              <p>Bali</p>
            </div>
          </a>

          {/* Col-content for Location - Dubai */}
          <a href="./locations.html#dubai" target="_blank">
            <div className="col-content">
              <img src={imgL5} alt="" />
              <h5>United Arab Emirates</h5>
              <p>Dubai</p>
            </div>
          </a>

          {/* Col-content for Location - Geneva */}
          <a href="./locations.html#geneva" target="_blank">
            <div className="col-content">
              <img src={imgL6} alt="" />
              <h5>Switzerland</h5>
              <p>Geneva</p>
            </div>
          </a>

          {/* Col-content for Location - Andaman & Nicobar */}
          <a href="./locations.html#port-blair" target="_blank">
            <div className="col-content">
              <img src={imgL7} alt="" />
              <h5>Andaman & Nicobar</h5>
              <p>Port Blair</p>
            </div>
          </a>

          {/* Col-content for Location - Rome */}
          <a href="./locations.html#rome" target="_blank">
            <div className="col-content">
              <img src={imgL8} alt="" />
              <h5>Italy</h5>
              <p>Rome</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}

export default Locations
