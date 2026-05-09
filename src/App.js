import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProfileSetup from "./pages/ProfileSetup";

/* PROTECTED ROUTE */
function ProtectedRoute({ children }) {

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  return isLoggedIn
    ? children
    : <Navigate to="/auth" />;
}

function App() {

  return (

    <Router>

      <Routes>

        {/* WELCOME */}
        <Route
          path="/"
          element={<Welcome />}
        />

        {/* AUTH */}
        <Route
          path="/auth"
          element={<Auth />}
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileSetup />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* INVALID ROUTE */}
        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />

      </Routes>

    </Router>

  );
}

export default App;