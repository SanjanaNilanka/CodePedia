import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { Card, Button } from "@nextui-org/react";
import { LoginUser } from "./apiCalls/users";
import { message } from "antd";
export default function Login({ isDark }) {
  // State variables to store form data
  const [formData, setFormData] = useState({
 
    emailAddress: "",
    password: "",
  });

  // Text Input
  const handleInputFocus = (e) => {
    e.target.parentNode.classList.add("active-label");
  };

  const handleInputBlur = (e) => {
    if (e.target.value === "") {
      e.target.parentNode.classList.remove("active-label");
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const onsubmit = () => {
  //   // Log the form data
  //   console.log("Form Data Submitted:", formData);
  // };
  const onFinish = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await LoginUser(formData);
      console.log("Response:", response);
      if (response.success) {
        message.success("Login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <Card className="custom-card">
        <form onSubmit={onFinish}>
          <div className="logo-container">
            <h1
              className="logo-text"
              style={{ marginTop: "20px", textAlign: "center" }}
            >
              CodePedia
            </h1>
          </div>
          <span className="heading1">Sign in</span>


          {/* Email address */}
          <div className="input-container" style={{ marginTop: "20px" }}>
            <input
              className="primary-form-element"
              type="email"
              id="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={onInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <label
              className={`primary-form-element ${isDark ? "dark" : "light"}`}
              htmlFor="email"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="input-container" style={{ marginTop: "20px" }}>
            <input
              className="primary-form-element"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <label
              className={`primary-form-element ${isDark ? "dark" : "light"}`}
              htmlFor="password"
            >
              Password
            </label>
          </div>

          <section
            className="center"
            style={{ justifyContent: "center", padding: "20px" }}
          >
             <button
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
          </section>
          <p className="link-container">
            Don't have an account? <Link to="/register">Click here to register</Link>
          </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
