import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "@nextui-org/react";
import { RegisterUser } from "./apiCalls/users";
import { message } from "antd";
import imgSrc from "./RegImage.jpg";
export default function Register({ isDark }) {
  // State variables to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });

  // const navigate = useNavigate();
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

  // const onFinish = async (event) => {
  //   event.preventDefault(); // Prevent the default form submission behavior
  //   try {
  //     const response = await RegisterUser(formData);
  //     console.log("Response:", response);
  //     if (response.success) {
  //       message.success(response.message);
  //     } else {
  //       message.error(response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     message.error(error.message);
  //   }
  // };
  const onFinish = async (event) => {
    event.preventDefault();
    //email validations
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(formData.emailAddress)) {
      message.error("Please enter a valid email address.");
      return;
    }
    //password validations
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      message.error(
        "Password must contain at least 8 characters with at least one letter and one number."
      );
      return;
    }
    try {
      const response = await RegisterUser(formData);
      console.log("Response:", response);

      if (response && response.success) {
        message.success(response.message);
        localStorage.setItem("AuthToken", response.data);
        // window.location.href = "/dashboard";
      } else {
        message.error(response?.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred.");
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/dashboard");
  //   }
  // }, []);
  return (
    <div className="page-container">
      <div className="flex-container">
        <div className="image-container">
          <img src={imgSrc} alt="Your Image" className="custom-image" />
        </div>

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
            <span className="heading1">Sign up</span>

            {/* First name */}
            <div className="input-container" style={{ marginTop: "20px" }}>
              <input
                className="primary-form-element"
                type="text"
                id="fname"
                name="firstName"
                value={formData.firstName}
                onChange={onInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                pattern="[A-Za-z ]+"
              />
              <label
                className={`primary-form-element ${isDark ? "dark" : "light"}`}
                htmlFor="fname"
              >
                First Name
              </label>
            </div>

            {/* Last Name */}
            <div className="input-container" style={{ marginTop: "20px" }}>
              <input
                className="primary-form-element"
                type="text"
                id="lname"
                name="lastName"
                value={formData.lastName}
                onChange={onInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                pattern="[A-Za-z ]+"
              />
              <label
                className={`primary-form-element ${isDark ? "dark" : "light"}`}
                htmlFor="lname"
              >
                Last Name
              </label>
            </div>

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
              {/* <Button type="submit" auto css={{ zIndex: "0" }} onClick={onFinish}>
              Submit
            </Button> */}
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
              Already have an account?{" "}
              <Link to="/login">Click here to join</Link>
            </p>
          </form>
        </Card>
      </div>
         
    </div>
  );
}
