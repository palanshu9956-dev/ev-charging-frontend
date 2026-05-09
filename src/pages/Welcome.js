import { useNavigate } from "react-router-dom";
import {
  IoFlash,
  IoLocationSharp,
  IoBatteryCharging
} from "react-icons/io5";

import "../styles/Welcome.css";

function Welcome() {

  const navigate = useNavigate();

  return (
    <div className="welcome-container">

      <div className="welcome-content">

        {/* BADGE */}
        <div className="welcome-badge">
          <IoFlash size={18} />
          <span>Smart EV Charging Network</span>
        </div>

        {/* IMAGE */}
        <img
          src="/ev-hero.png"
          alt="EV Charging"
          className="welcome-image"
        />

        {/* TITLE */}
        <h1>Power Your Journey With EvoCharge</h1>

        {/* SUBTITLE */}
        <p>
          Find nearby EV charging stations,
          get live directions and enjoy
          seamless electric mobility.
        </p>

        {/* FEATURES */}
        <div className="feature-row">

          <div className="feature-box">
            <IoLocationSharp
              size={22}
              color="#00c853"
            />
            <span>Live Stations</span>
          </div>

          <div className="feature-box">
            <IoBatteryCharging
              size={22}
              color="#00c853"
            />
            <span>Fast Charging</span>
          </div>

        </div>

        {/* BUTTON */}
        <button
          className="start-btn"
          onClick={() => navigate("/Auth")}
        >
          Get Started
        </button>

      </div>

    </div>
  );
}

export default Welcome;