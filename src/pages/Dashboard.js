import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import Map from "./Map";
import Profile from "./Profile";

function Dashboard() {

  const userName = localStorage.getItem("userName") || "User";
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/stations")
      .then((res) => res.json())
      .then((data) => setStations(data))
      .catch((err) => console.error("Error fetching stations:", err));
  }, []);

  const HomeContent = () => (
    <>
      <h2>Welcome, {userName}</h2>
      <h3>Nearby EV Charging Stations</h3>

      {stations.map((station) => (
        <div
          key={station.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px 0",
            borderRadius: "10px",
            background: "#f9f9f9"
          }}
        >
          <h3>{station.stationName}</h3>
          <p>📍 Location: {station.location}</p>
          <p>⚡ Total Slots: {station.totalSlots}</p>
          <p>🟢 Available Slots: {station.availableSlots}</p>
        </div>
      ))}
    </>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", marginBottom: "70px" }}>

        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="map" element={<Map />} />
          <Route path="profile" element={<Profile />} />
        </Routes>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Dashboard;