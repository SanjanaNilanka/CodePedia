import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate, Link } from "react-router-dom";
import { GetUserById } from "../login-register-components/apiCalls/users";
import { message } from "antd";
import { Avatar } from "@nextui-org/react";
import img1 from "./images/img1.png";
import jwt from 'jwt-decode'
import { Icon } from '@iconify/react';


function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const validateUserToken = async () => {
    try {
      let userId = null;
    
    const token = localStorage.getItem('AuthToken');
    const jwtToken = jwt(token);
    
    console.log("tokentokentokentoken",jwtToken)
     
    // const decoded = jwt.verify(token, process.env.jwt_secret);
    if (jwtToken.userId) {
      userId = jwtToken.userId;
    }
      const response = await GetUserById(userId);
      if (response.success) {
        setUser(response.data);
      } else {
        // localStorage.removeItem("AuthToken");
        message.error(response.message);
      }
    } catch (error) {
      // localStorage.removeItem("AuthToken");
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    if (!token) {
      navigate("/login");
    } else {
      validateUserToken();
    }
  }, [navigate]);

  return (
    <div>
      <div className="dashboard-container">
      <div className="top-main-container">
        <div className="user-info">
          <Link to="/profile">
            <Avatar
              style={{ width: "120px", height: "120px" }}
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              color="primary"
              bordered
            />
          </Link>
          {user && (
            <div className="name-container">
              {user.firstName} {user.lastName}
              <br/>
              <span style={{fontSize:'25px'}}>
                <Icon style={{color:'yellow'}} width={20} icon="material-symbols:star" />
                &nbsp; {user.points}
              </span>
              
            </div>
          )}
        </div>
      </div>
      </div>
      <div className="additional-container">
        <div>
          <h1 className="logo-text1">CodePedia</h1>
        </div>
        <div>
          <h1 className="text1">Challenges Await, Will You?</h1>
        </div>
        <img src={img1} alt="Img1" className="img1" />
        <button className="get-started-button">Start Today</button>
      </div>
     
    {/* //footer */}
    <footer class="footer">
  <div class="footer-content">
    <div class="contact-info">
      <h3>Contact Us</h3>
      <p>Email: contact@codepedia.com</p>
      <p>Phone: +123-456-7890</p>
    </div>
    <div class="social-links">
      <h3>Follow Us</h3>
      <ul>
        <li><a href="#" target="_blank">Facebook</a></li>
        <li><a href="#" target="_blank">Twitter</a></li>
        <li><a href="#" target="_blank">LinkedIn</a></li>
        <li><a href="#" target="_blank">Instagram</a></li>
      </ul>
    </div>
  </div>
  <div class="copyright">
    <p>&copy; 2023 CodePedia. All Rights Reserved.</p>
  </div>
</footer>
    </div>
  );
}

export default Dashboard;
