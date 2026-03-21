import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../styles/Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName?.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain 1 Capital, 1 Number, 1 Special Character & 8+ characters"
      );
      return;
    }

    setPasswordError("");

    const endpoint = isLogin
      ? "http://localhost:8080/auth/login"
      : "http://localhost:8080/auth/signup";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      await response.text();

      localStorage.setItem("userName", fullName || email);
      localStorage.setItem("isLoggedIn", "true");

      navigate("/profile");

    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              style={{ width: "100%", paddingRight: "14px" }}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "34%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "13px",
                color: "#00c853",
                fontWeight: "bold"
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {passwordError && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {passwordError}
            </p>
          )}

          <button type="submit" className="main-btn">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Google Login Button */}
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);

              localStorage.setItem("userName", decoded.name);
              localStorage.setItem("isLoggedIn", "true");

              navigate("/profile");
            }}
            onError={() => {
              alert("Google Login Failed");
            }}
          />
        </div>

        <p className="toggle-text">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Auth;