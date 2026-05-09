import React, {
  useEffect,
  useState
} from "react";

import {
  Routes,
  Route
} from "react-router-dom";

import {
  IoLocationSharp,
  IoFlash,
  IoBatteryCharging,
  IoNavigate
} from "react-icons/io5";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import Map from "./Map";
import Profile from "./Profile";

function Dashboard() {

  const userName =
    localStorage.getItem("userName") || "User";

  const [stations, setStations] =
    useState([]);

  useEffect(() => {

    fetch(
      "http://localhost:8080/stations"
    )
      .then((res) => res.json())

      .then((data) =>
        setStations(data)
      )

      .catch((err) =>
        console.error(
          "Error fetching stations:",
          err
        )
      );

  }, []);

  /* HOME PAGE */
  const HomeContent = () => (

    <div>

      {/* TOP */}
      <div
        style={{
          marginBottom: "28px"
        }}
      >

        <h2
          style={{
            color: "#6b7280",
            marginBottom: "6px",
            fontWeight: "500"
          }}
        >
          Welcome Back
        </h2>

        <h1
          style={{
            margin: 0,
            fontSize: "38px",
            fontWeight: "700",
            color: "#111827"
          }}
        >
          {userName}
        </h1>

      </div>

      {/* TITLE */}
      <h3
        style={{
          marginBottom: "20px",
          fontSize: "24px",
          color: "#111827"
        }}
      >
        Nearby EV Stations
      </h3>

      {/* STATIONS */}
      {stations.map((station) => (

        <div
          key={station.id}

          style={{
            background: "#ffffff",

            borderRadius: "28px",

            padding: "22px",

            marginBottom: "20px",

            boxShadow:
              "0 8px 24px rgba(0,0,0,0.06)"
          }}
        >

          {/* TOP */}
          <div
            style={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems:
                "flex-start"
            }}
          >

            {/* LEFT */}
            <div>

              {/* NAME */}
              <div
                style={{
                  display: "flex",

                  alignItems:
                    "center",

                  gap: "12px"
                }}
              >

                <div
                  style={{
                    width: "44px",

                    height:
                      "44px",

                    borderRadius:
                      "14px",

                    background:
                      "rgba(0,200,83,0.12)",

                    display:
                      "flex",

                    justifyContent:
                      "center",

                    alignItems:
                      "center"
                  }}
                >

                  <IoBatteryCharging
                    size={22}
                    color="#00c853"
                  />

                </div>

                <h3
                  style={{
                    margin: 0,

                    fontSize:
                      "20px",

                    fontWeight:
                      "700",

                    color:
                      "#111827"
                  }}
                >
                  {station.stationName}
                </h3>

              </div>

              {/* LOCATION */}
              <div
                style={{
                  display: "flex",

                  alignItems:
                    "center",

                  gap: "8px",

                  marginTop:
                    "16px",

                  color:
                    "#6b7280"
                }}
              >

                <IoLocationSharp
                  size={18}
                />

                <span>
                  {station.location}
                </span>

              </div>

            </div>

            {/* STATUS */}
            <div
              style={{
                background:
                  "#ecfdf3",

                color:
                  "#16a34a",

                padding:
                  "8px 14px",

                borderRadius:
                  "16px",

                fontSize:
                  "13px",

                fontWeight:
                  "600"
              }}
            >
              Open
            </div>

          </div>

          {/* FEATURES */}
          <div
            style={{
              display: "flex",

              gap: "12px",

              flexWrap:
                "wrap",

              marginTop: "20px"
            }}
          >

            {/* CHARGER */}
            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap: "6px",

                background:
                  "#f3f4f6",

                padding:
                  "10px 14px",

                borderRadius:
                  "16px",

                fontSize:
                  "13px",

                fontWeight:
                  "500"
              }}
            >

              <IoFlash
                color="#facc15"
                size={16}
              />

              <span>
                Fast Charger
              </span>

            </div>

            {/* TOTAL */}
            <div
              style={{
                background:
                  "#eff6ff",

                color:
                  "#2563eb",

                padding:
                  "10px 14px",

                borderRadius:
                  "16px",

                fontSize:
                  "13px",

                fontWeight:
                  "600"
              }}
            >
              {station.totalSlots}
              {" "}
              Total Slots
            </div>

            {/* AVAILABLE */}
            <div
              style={{
                background:
                  "#f0fdf4",

                color:
                  "#16a34a",

                padding:
                  "10px 14px",

                borderRadius:
                  "16px",

                fontSize:
                  "13px",

                fontWeight:
                  "600"
              }}
            >
              {station.availableSlots}
              {" "}
              Available
            </div>

          </div>

          {/* BOTTOM */}
          <div
            style={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              marginTop:
                "24px"
            }}
          >

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap: "8px",

                color:
                  "#00c853",

                fontWeight:
                  "700"
              }}
            >

              <IoNavigate
                size={18}
              />

              <span>
                Nearby Station
              </span>

            </div>

            <button
              style={{
                background:
                  "#111827",

                border:
                  "none",

                color:
                  "#fff",

                padding:
                  "12px 18px",

                borderRadius:
                  "16px",

                cursor:
                  "pointer",

                fontWeight:
                  "600"
              }}
            >
              View Details
            </button>

          </div>

        </div>

      ))}

    </div>

  );

  return (

    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        flexDirection:
          "column",

        background:
          "#f5f7fb"
      }}
    >

      {/* HEADER */}
      <Header />

      {/* MAIN */}
      <div
        style={{
          flex: 1,

          padding: "24px",

          marginBottom:
            "80px"
        }}
      >

        <Routes>

          <Route
            path="/"
            element={<HomeContent />}
          />

          <Route
            path="map"
            element={<Map />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

        </Routes>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Dashboard;