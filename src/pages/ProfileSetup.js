import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileSetup.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* MAP RECENTER COMPONENT */
function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  return null;
}

function ProfileSetup() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setPosition([lat, lon]);
      },
      () => {
        // fallback location (Kanpur)
        setPosition([26.4499, 80.3319]);
      }
    );
  }, []);

  return (
    <div className="profile-container">

      <div className="top-section">
        <h2>Welcome Back,</h2>
        <h1>{userName}</h1>
      </div>

      <div className="battery-card">
        <div>
          <h1>31 Km</h1>
          <p>26 Km | 2hr 09min</p>
          <p>Charging Now ⚡ 39%</p>
        </div>
      </div>

      <h3 className="nearby-title">Nearby Stations</h3>

      <input
        type="text"
        placeholder="Search charging station"
        className="search-box"
      />

      <div className="map-wrapper">
        <MapContainer
          center={[26.4499, 80.3319]}
          zoom={12}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <RecenterMap position={position} />

          {position && (
            <Marker position={position}>
              <Popup>You are here 📍</Popup>
            </Marker>
          )}

        </MapContainer>
      </div>

      <button className="proceed-btn" onClick={() => navigate("/dashboard")}>
        Proceed →
      </button>

    </div>
  );
}

export default ProfileSetup;