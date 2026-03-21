import { Link } from "react-router-dom";

function BottomNav() {
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      width: "100%",
      height: "60px",
      background: "#f2f2f2",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    }}>
      
      <Link to="/">Home</Link>
      <Link to="/map">Map</Link>
      <Link to="/profile">Profile</Link>

    </div>
  );
}

export default BottomNav;