import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
    <div className="logo-section">
      <div className="logo-icon">S</div>
      <span className="logo-text">WIFT</span>
    </div>
    <div className="profile-section">
      <div className="avatar">EH</div>
      <span className="username">Ervin Howell</span>
    </div>
  </nav>
  );
}

export default Navbar;
