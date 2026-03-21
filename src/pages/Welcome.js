import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">

        {/* Public folder image */}
        <img
          src="/ev-hero.png"
          alt="EV Charging"
          className="welcome-image"
        />

        <h1>Welcome To EvoCharge</h1>
        <p>
          A one-stop solution for finding and booking charging locations
        </p>

        <button
          className="start-btn"
          onClick={() => navigate("/Auth")}
        >
          Enter Dashboard →
        </button>

      </div>
    </div>
  );
}

export default Welcome;