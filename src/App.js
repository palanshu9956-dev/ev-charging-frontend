import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProfileSetup from "./pages/ProfileSetup";

function App() {
  return (
    <Router>
      <Routes>

        {/* Welcome Page */}
        <Route path="/" element={<Welcome />} />

        {/* Login / Auth */}
        <Route path="/auth" element={<Auth />} />

        {/* Profile Setup */}
        <Route path="/profile" element={<ProfileSetup />} />

        {/* Dashboard */}
        <Route path="/dashboard/*" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;