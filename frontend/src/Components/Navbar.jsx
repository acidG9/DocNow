import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import isDoctor from "../Utils/RoleBased";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="app-name">DocNow</span>

          <button
            className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
          </button>
        </div>

        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link
              to={isDoctor() ? "/doctor/home" : "/patient/home"}
              className={
                isActive("/doctor/home") || isActive("/patient/home")
                  ? "active"
                  : ""
              }
              onClick={closeMenu}
            >
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to={isDoctor() ? "/doctor/profile" : "/patient/bookDoc"}
              className={
                isActive(isDoctor() ? "/doctor/profile" : "/patient/bookDoc")
                  ? "active"
                  : ""
              }
              onClick={closeMenu}
            >
              <span>{isDoctor() ? "Profile" : "BookDoc"}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/appointments"
              className={isActive("/appointments") ? "active" : ""}
              onClick={closeMenu}
            >
              <span>Appointments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className={isActive("/notifications") ? "active" : ""}
              onClick={closeMenu}
            >
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
            >
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
