import React, { useState } from 'react';
import '../css/footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="footer">
      <div className="heading">
        <h2><b>Ac</b>pla</h2>
      </div>
      <div className="content">
        <div className="services">
          <h4>Services</h4>
          <p><a href="https://education.mcintoshsydney.com/">Home</a></p>
          <p><a href="https://education.mcintoshsydney.com/calculator.php">GPA and WAM Calculator</a></p>
          <p><a href="https://64b381505e708e7c9f6a39cd--harmonious-creponne-45874d.netlify.app/StudyPlanner">Program Planner</a></p>
        </div>
        <div className="social-media">
          <h4>Social</h4>
          <p>
            <a href="#"><i className="fab fa-linkedin"></i> Linkedin</a>
          </p>
          <p>
            <a href="#"><i className="fab fa-twitter"></i> Twitter</a>
          </p>
          <p>
            <a href="https://github.com/farazc60"><i className="fab fa-github"></i> Github</a>
          </p>
          <p>
            <a href="https://www.facebook.com/codewithfaraz"><i className="fab fa-facebook"></i> Facebook</a>
          </p>
          <p>
            <a href="https://www.instagram.com/codewithfaraz"><i className="fab fa-instagram"></i> Instagram</a>
          </p>
        </div>
        <div className="links">
          <h4>Quick links</h4>
          <p><a href="#">Home</a></p>
          <p><a href="#">About</a></p>
          <p><a href="#">Blogs</a></p>
          <p><a href="#">Contact</a></p>
        </div>
        <div className="details">
          <h4>Company</h4>
          <p>Education Planning, Assurance, and Academic Success.</p>
          <h5>GENERAL COUNSEL & LEGAL</h5>
          <p><a href="#">legal@mcintoshsydney.com</a></p>
          <h5 className="mail">ENGINEERING</h5>
          <p><a href="#">engineering@mcintoshsydney.com</a></p>
        </div>
      </div>
      <footer>
        <hr />
        © 2023 <b>Ac</b>pla, an asset of McIntosh-Sydney Capital Holdings Group.
      </footer>
    </div>
  );
};

export default Footer;
