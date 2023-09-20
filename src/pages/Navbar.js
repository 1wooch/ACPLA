import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="navbar-link" to="/">
        <h1 className="navbar-title text-4xl font-serif">Griffith Insiders</h1>
      </Link>
      <div className="navbar-collapse" id="navbarNav">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link className="navbar-link" to="/">Main</Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/GPAcalculator">GPA Calculator</Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/StudyPlanner">Study Planner</Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/Review">Review</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
