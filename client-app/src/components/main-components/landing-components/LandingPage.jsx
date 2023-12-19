import React from "react";
import imgSrc2 from "./landingImage3.png";
import "./LandingPage.css"; // Import the CSS file
import { Link } from "react-router-dom";
import challengers from "./landingImages/challengers.png";
import tutorials from "./landingImages/tutorials.png";
import compiler from "./landingImages/compiler.png";
import quiz from "./landingImages/quiz.png";
export default function LandingPage() {
  return (
    <section className="landing-page">


      
      <div className="landing-flex-container">
        <div className="text-container">
          Start Coding,
          Start Building,
          Start Innovating
          <div className="sub-text-container1">
            Welcome to CodePedia,
            <div className="sub-text-container2">
              your ultimate code learning web app. At CodePedia, we're on a
              mission to empower you with the knowledge and skills to master the
              world of coding. Whether you're a beginner taking your first steps
              up your skills, we have you covered.
            </div>
            
            <Link to="/register" className="button-container">
              Get Started
            </Link>

          </div>
        </div>

        <div className="image-container">
          <img src={imgSrc2} alt="Your Image" className="l-custom-image" />
        </div>
      </div>
      <section className="second-section">
        <div className="heading-features">
          Explore CodePedia's Cool Features
        </div>

        <div class="photo-cards">
          <div class="photo-card">
            <h2>Real-time Challenges</h2>
            <div class="card-content">
              <img src={challengers} alt="Real-time Challenges" />
              <div class="description">
                <p>
                  Join coding challenges and compete with others in real-time.
                  Sharpen your coding skills and rise to the challenge.
                </p>
              </div>
            </div>
          </div>

       

          <div class="photo-card">
            <h2>Quizzes</h2>
            <div class="card-content">
              <img src={quiz} alt="Quizzes" />
              <div class="description">
                <p>
                  Test your knowledge with interactive quizzes. Receive instant
                  feedback and track your progress.
                </p>
              </div>
            </div>
          </div>

          <div class="photo-card">
            <h2>Compiler</h2>
            <div class="card-content">
              <img src={compiler} alt="Compiler" />
              <div class="description">
                <p>
                  Compile and run your code online. Supports multiple
                  programming languages.
                </p>
              </div>
            </div>
          </div>
          
          <div class="photo-card">
            <h2>Tutorials</h2>
            <div class="card-content">
              <img src={tutorials} alt="tutorials" />
              <div class="description">
                <p>
                Access a vast library of tutorials covering programming languages, web development, and more. 
                Learn at your own pace.
                </p>
              </div>
            </div>
          </div>


        </div>
      </section>
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

    </section>



  );
}
