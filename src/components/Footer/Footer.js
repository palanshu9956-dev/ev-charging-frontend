import { Link, useLocation } from "react-router-dom";

import {
  IoHome,
  IoMap,
  IoPerson
} from "react-icons/io5";

function Footer() {

  const location = useLocation();

  const navItems = [

    {
      path: "/dashboard",
      icon: <IoHome size={24} />,
      label: "Home"
    },

    {
      path: "/dashboard/map",
      icon: <IoMap size={24} />,
      label: "Map"
    },

    {
      path: "/dashboard/profile",
      icon: <IoPerson size={24} />,
      label: "Profile"
    }

  ];

  return (

    <div
      style={{
        position: "fixed",

        bottom: "20px",

        left: "50%",

        transform:
          "translateX(-50%)",

        width: "92%",

        maxWidth: "420px",

        height: "74px",

        background:
          "rgba(255,255,255,0.88)",

        backdropFilter:
          "blur(18px)",

        border:
          "1px solid rgba(255,255,255,0.2)",

        borderRadius: "28px",

        display: "flex",

        justifyContent:
          "space-around",

        alignItems: "center",

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",

        zIndex: 999
      }}
    >

      {navItems.map((item, index) => {

        const active =
          location.pathname === item.path;

        return (

          <Link
            key={index}

            to={item.path}

            style={{
              textDecoration:
                "none",

              display: "flex",

              flexDirection:
                "column",

              alignItems:
                "center",

              justifyContent:
                "center",

              gap: "4px",

              color: active
                ? "#00c853"
                : "#6b7280",

              transition:
                "0.3s ease"
            }}
          >

            {/* ACTIVE ICON BG */}
            <div
              style={{
                width: active
                  ? "48px"
                  : "42px",

                height: active
                  ? "48px"
                  : "42px",

                borderRadius:
                  "16px",

                background: active
                  ? "linear-gradient(135deg,#00c853,#00e676)"
                  : "transparent",

                color: active
                  ? "#fff"
                  : "#6b7280",

                display: "flex",

                justifyContent:
                  "center",

                alignItems:
                  "center",

                transition:
                  "0.3s ease",

                boxShadow: active
                  ? "0 8px 18px rgba(0,200,83,0.28)"
                  : "none"
              }}
            >
              {item.icon}
            </div>

            {/* LABEL */}
            <span
              style={{
                fontSize: "12px",

                fontWeight: active
                  ? "600"
                  : "500"
              }}
            >
              {item.label}
            </span>

          </Link>

        );
      })}

    </div>

  );
}

export default Footer;