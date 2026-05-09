import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";

import {
  IoMailOutline,
  IoLockClosedOutline,
  IoPersonOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoFlash
} from "react-icons/io5";

import "../styles/Auth.css";

function Auth() {

  const [isLogin, setIsLogin] =
    useState(false);

  const [passwordError, setPasswordError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  /* PASSWORD VALIDATION */
  const validatePassword = (password) => {

    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    return regex.test(password);
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {

    e.preventDefault();

    const fullName =
      e.target.fullName?.value;

    const email =
      e.target.email.value;

    const password =
      e.target.password.value;

    if (
      !validatePassword(password)
    ) {

      setPasswordError(
        "Use 1 Capital, 1 Number, 1 Special Character & 8+ characters"
      );

      return;
    }

    setPasswordError("");

    const endpoint = isLogin
      ? "http://localhost:8080/auth/login"
      : "http://localhost:8080/auth/signup";

    try {

      const response =
        await fetch(endpoint, {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            fullName,
            email,
            password
          })

        });

      if (!response.ok) {

        throw new Error(
          "Authentication failed"
        );
      }

      await response.text();

      localStorage.setItem(
        "userName",
        fullName || email
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      navigate("/profile");

    } catch (error) {

      alert(
        "Error: " + error.message
      );
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        {/* LOGO */}
        <div
          style={{
            width: "70px",
            height: "70px",

            borderRadius: "22px",

            background:
              "linear-gradient(135deg,#00c853,#00e676)",

            display: "flex",

            justifyContent:
              "center",

            alignItems:
              "center",

            margin:
              "0 auto 24px auto",

            boxShadow:
              "0 10px 24px rgba(0,200,83,0.25)"
          }}
        >

          <IoFlash
            size={34}
            color="#fff"
          />

        </div>

        {/* TITLE */}
        <h2>
          {isLogin
            ? "Welcome Back"
            : "Create Account"}
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "28px",
            marginTop: "-8px"
          }}
        >
          Access smart EV charging
          anytime, anywhere.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* NAME */}
          {!isLogin && (

            <div
              style={{
                position:
                  "relative"
              }}
            >

              <IoPersonOutline
                size={20}

                color="#6b7280"

                style={{
                  position:
                    "absolute",

                  left: "16px",

                  top: "17px"
                }}
              />

              <input
                type="text"

                name="fullName"

                placeholder="Full Name"

                required

                style={{
                  paddingLeft:
                    "46px"
                }}
              />

            </div>

          )}

          {/* EMAIL */}
          <div
            style={{
              position:
                "relative"
            }}
          >

            <IoMailOutline
              size={20}

              color="#6b7280"

              style={{
                position:
                  "absolute",

                left: "16px",

                top: "17px"
              }}
            />

            <input
              type="email"

              name="email"

              placeholder="Email Address"

              required

              style={{
                paddingLeft:
                  "46px"
              }}
            />

          </div>

          {/* PASSWORD */}
          <div
            style={{
              position:
                "relative"
            }}
          >

            <IoLockClosedOutline
              size={20}

              color="#6b7280"

              style={{
                position:
                  "absolute",

                left: "16px",

                top: "17px"
              }}
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }

              name="password"

              placeholder="Password"

              required

              style={{
                paddingLeft:
                  "46px",

                paddingRight:
                  "48px"
              }}
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }

              style={{
                position:
                  "absolute",

                right: "16px",

                top: "16px",

                cursor:
                  "pointer"
              }}
            >

              {showPassword ? (

                <IoEyeOffOutline
                  size={20}
                  color="#00c853"
                />

              ) : (

                <IoEyeOutline
                  size={20}
                  color="#00c853"
                />

              )}

            </span>

          </div>

          {/* ERROR */}
          {passwordError && (

            <p
              style={{
                color: "#ef4444",

                fontSize: "13px",

                marginTop: "-4px",

                marginBottom:
                  "16px",

                textAlign: "left"
              }}
            >
              {passwordError}
            </p>

          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="main-btn"
          >

            {isLogin
              ? "Login"
              : "Create Account"}

          </button>

        </form>

        {/* DIVIDER */}
        <div className="divider">
          OR CONTINUE WITH
        </div>

        {/* GOOGLE */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "center"
          }}
        >

          <GoogleLogin

            onSuccess={(
              credentialResponse
            ) => {

              const decoded =
                jwtDecode(
                  credentialResponse.credential
                );

              localStorage.setItem(
                "userName",
                decoded.name
              );

              localStorage.setItem(
                "isLoggedIn",
                "true"
              );

              navigate("/profile");
            }}

            onError={() => {

              alert(
                "Google Login Failed"
              );
            }}
          />

        </div>

        {/* TOGGLE */}
        <p className="toggle-text">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() =>
              setIsLogin(
                !isLogin
              )
            }
          >

            {isLogin
              ? " Sign Up"
              : " Login"}

          </span>

        </p>

      </div>

    </div>
  );
}

export default Auth;