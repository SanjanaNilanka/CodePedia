import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Userprofile.css";
import axios from "axios";
import jwt from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

function Userprofile() {
  const [profileImage, setProfileImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    country: "",
  });
 
  const[userId, setUserId]=useState("")

  useEffect(() => {
    console.log(" for test", JSON.stringify(user));
  }, [JSON.stringify(user)]);
  useEffect(() => {
    let userId = null;

    const token = localStorage.getItem("AuthToken");
    const jwtToken = jwt(token);

    console.log("tokentokentokentoken", jwtToken);

    // const decoded = jwt.verify(token, process.env.jwt_secret);
    if (jwtToken.userId) {
      userId = jwtToken.userId;
      setUserId(userId);
    }
    axios
      .get("http://localhost:5000/admin/users/get-user-by-id/" + userId)
      .then((response) => {
        // console.log(response.data.data);
        const userData = response?.data?.data;
        if (userData) {
          setUser(userData);

          formik.setFieldValue("firstName", userData?.firstName);
          formik.setFieldValue("lastName", userData?.lastName);
          formik.setFieldValue("emailAddress", userData?.emailAddress);
          formik.setFieldValue("country", userData?.country);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  //update
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/users/update-user/${user.id}`,
        formik.values
      );

      if (response.data.success) {
        console.log("User data updated successfully");
      } else {
        console.error("User data update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  //delete
  const handleDelete = async () => {
    console.log("Hello");
    try {
      console.log(userId);
      const response = await axios.delete(
        `http://localhost:5000/admin/users/delete-user/${userId}`
      );
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      if (response.data.success) {
        console.log("User deleted successfully");
        navigate("/");
      } else {
        console.error("User deletion failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  //validations
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // password: editMode
    //   ? Yup.string()
    //       .min(6, "Password must be at least 6 characters")
    //       .required("Password is required")
    //   : Yup.string(),
    country: Yup.string().required("Country is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: "",
      country: user.country,
    },

    validationSchema,
    onSubmit: (values) => {
      // Prepare data for submission
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("emailAddress", values.emailAddress);
      formData.append("password", values.password);
      formData.append("country", values.country);

      // const userId = user.id;

      // axios
      //   .put(`http://localhost:5000/admin/users/update-user/`, formData)

      //   .then((response) => {
      //     console.log("User data updated successfully");
      //     setEditMode(false); // Disable editing after submission
      //   })

      //   .catch((error) => {
      //     console.error("Error updating user data:", error);
      //   });
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Sri Lanka",

    "Other",
  ];

  return (
    <div className="profile-container">
      <h2 className="Heading">My Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="error-message">{formik.errors.firstName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="error-message">{formik.errors.lastName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emailAddress}
          />
          {formik.touched.emailAddress && formik.errors.emailAddress && (
            <div className="error-message">{formik.errors.emailAddress}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {formik.touched.country && formik.errors.country && (
            <div className="error-message">{formik.errors.country}</div>
          )}
        </div>
        {/* 
        {editMode && (
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>
        )} */}

        <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="profile-image-preview">
          {profileImage && (
            <img src={URL.createObjectURL(profileImage)} alt="Profile" />
          )}
        </div>

        {editMode ? (
          <div>
            <button type="submit" className="save-button">
              Save Profile
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="delete-button"
            >
              Delete Profile
            </button>
          </div>
        ) : (
          <button type="button"className="edit-button" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
}

export default Userprofile;
