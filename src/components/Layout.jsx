import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './layout.css';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="layout-container">
      <header className="header">
        <div className="header-content">
          
          
          <nav className="nav-desktop">
            <NavLink
              to="/accountopeningform"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Account Opening
            </NavLink>
            <NavLink
              to="/fundtransferform"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Fund Transfer
            </NavLink>
            <NavLink
              to="/loanapplicationform"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Loan Application
            </NavLink>
          </nav>

          <div className="logo">
            🏦 SmartBank
          </div>

          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="hamburger-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="nav-mobile">
            <NavLink
              to="/accountopeningform"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              Account Opening
            </NavLink>
            <NavLink
              to="/fundtransferform"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              Fund Transfer
            </NavLink>
            <NavLink
              to="/loanapplicationform"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              Loan Application
            </NavLink>
          </nav>
        )}
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2025 SmartBank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;