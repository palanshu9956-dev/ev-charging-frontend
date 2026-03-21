import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

function Footer() {
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      width: "100%",
      height: "65px",
      background: "#f5f6fb",
      borderTop: "1px solid #ddd",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    }}>

      <Link to="/dashboard" style={{ textAlign: "center", color: "#333", textDecoration: "none" }}>
        <HomeOutlinedIcon style={{ fontSize: 28 }} />
        <div style={{ fontSize: "12px" }}>Home</div>
      </Link>

      <Link to="/dashboard/map" style={{ textAlign: "center", color: "#333", textDecoration: "none" }}>
        <MapOutlinedIcon style={{ fontSize: 28 }} />
        <div style={{ fontSize: "12px" }}>Map</div>
      </Link>

      <Link to="/dashboard/profile" style={{ textAlign: "center", color: "#333", textDecoration: "none" }}>
        <PersonOutlineIcon style={{ fontSize: 28 }} />
        <div style={{ fontSize: "12px" }}>Profile</div>
      </Link>

    </div>
  );
}

export default Footer;