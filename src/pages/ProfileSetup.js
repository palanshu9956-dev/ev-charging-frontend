import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  IoLocationSharp,
  IoFlash,
  IoNavigate,
  IoHeartOutline,
  IoStar,
  IoBatteryCharging
} from "react-icons/io5";

import "../styles/ProfileSetup.css";
import kanpurStations from "../data/KanpurStations";

function ProfileSetup() {

  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName") || "User";

  const [location, setLocation] =
    useState("Kanpur");

  const [stations, setStations] =
    useState([]);

  /* DISTANCE CALCULATOR */
  const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {

    const R = 6371;

    const dLat =
      (lat2 - lat1) *
      (Math.PI / 180);

    const dLon =
      (lon2 - lon1) *
      (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos(
        lat1 * (Math.PI / 180)
      ) *
        Math.cos(
          lat2 * (Math.PI / 180)
        ) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  };

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat =
          position.coords.latitude;

        const lon =
          position.coords.longitude;

        setLocation(`${lat},${lon}`);

        const updatedStations =
          kanpurStations.map(
            (station) => {

              const distance =
                calculateDistance(
                  lat,
                  lon,
                  station.lat,
                  station.lng
                );

              return {
                ...station,
                realDistance:
                  distance
              };
            }
          );

        updatedStations.sort(
          (a, b) =>
            a.realDistance -
            b.realDistance
        );

        setStations(
          updatedStations
        );
      },

      () => {
        setLocation("Kanpur");
        setStations(
          kanpurStations
        );
      }
    );

  }, []);

  /* OPEN GOOGLE MAP */
  const openDirections = (
    lat,
    lng
  ) => {

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  return (

    <div className="profile-container">

      {/* TOP */}
      <div className="top-section">

        <h2>
          Welcome Back
        </h2>

        <h1>
          {userName}
        </h1>

      </div>

      {/* TITLE */}
      <h3 className="nearby-title">
        Nearby EV Stations
      </h3>

      {/* MAP */}
      <div className="map-wrapper">

        <iframe
          title="Google Map"

          src={`https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}

          width="100%"
          height="350"

          style={{
            border: 0,
            borderRadius: "24px"
          }}

          allowFullScreen=""
          loading="lazy"
        ></iframe>

      </div>

      {/* STATIONS */}
      <div
        style={{
          marginTop: "22px"
        }}
      >

        {stations.map(
          (station, index) => (

            <div
              key={index}

              onClick={() =>
                openDirections(
                  station.lat,
                  station.lng
                )
              }

              style={{
                background:
                  "#ffffff",

                borderRadius:
                  "28px",

                padding: "22px",

                marginBottom:
                  "20px",

                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.06)",

                cursor:
                  "pointer",

                transition:
                  "0.3s ease"
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

                <div>

                  {/* NAME */}
                  <div
                    style={{
                      display:
                        "flex",

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
                      {station.name}
                    </h3>

                  </div>

                  {/* NEAREST */}
                  {index === 0 && (

                    <div
                      style={{
                        marginTop:
                          "12px",

                        display:
                          "flex",

                        alignItems:
                          "center",

                        gap: "6px",

                        width:
                          "fit-content",

                        padding:
                          "7px 14px",

                        borderRadius:
                          "20px",

                        background:
                          "#fef9c3",

                        color:
                          "#ca8a04",

                        fontSize:
                          "13px",

                        fontWeight:
                          "600"
                      }}
                    >

                      <IoStar
                        size={15}
                      />

                      <span>
                        Nearest
                        Station
                      </span>

                    </div>

                  )}

                </div>

                {/* HEART */}
                <div
                  style={{
                    width: "42px",

                    height:
                      "42px",

                    borderRadius:
                      "14px",

                    background:
                      "#f9fafb",

                    display:
                      "flex",

                    justifyContent:
                      "center",

                    alignItems:
                      "center"
                  }}
                >

                  <IoHeartOutline
                    size={20}
                    color="#ff4d6d"
                  />

                </div>

              </div>

              {/* LOCATION */}
              <div
                style={{
                  display: "flex",

                  alignItems:
                    "flex-start",

                  gap: "10px",

                  marginTop:
                    "18px",

                  color:
                    "#6b7280",

                  lineHeight:
                    "1.6"
                }}
              >

                <IoLocationSharp
                  size={18}
                />

                <span>
                  {station.location}
                </span>

              </div>

              {/* FEATURES */}
              <div
                style={{
                  display: "flex",

                  gap: "12px",

                  flexWrap:
                    "wrap",

                  marginTop:
                    "20px"
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
                    DC Fast
                    Charger
                  </span>

                </div>

                {/* OPEN */}
                <div
                  style={{
                    background:
                      "#ecfdf3",

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
                  Open
                </div>

                {/* SLOT */}
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
                  3 Slots
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

                {/* DISTANCE */}
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
                      "700",

                    fontSize:
                      "16px"
                  }}
                >

                  <IoNavigate
                    size={18}
                  />

                  <span>

                    {station.realDistance
                      ? `${station.realDistance.toFixed(
                          1
                        )} KM Away`
                      : station.distance}

                  </span>

                </div>

                {/* BUTTON */}
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
                      "600",

                    fontSize:
                      "14px"
                  }}
                >
                  Directions
                </button>

              </div>

            </div>

          )
        )}

      </div>

      {/* BUTTON */}
      <button
        className="proceed-btn"

        onClick={() =>
          navigate("/dashboard")
        }
      >
        Find Stations
      </button>

    </div>
  );
}

export default ProfileSetup;