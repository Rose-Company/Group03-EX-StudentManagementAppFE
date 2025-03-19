import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css"; // Import CSS Module
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("email");
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  const UserDropdown = ({ username, handleLogout }) => {
    return (
      <Dropdown className={styles.userDropdown}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {username}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/management">Management</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/setting">Setting</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
          
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  UserDropdown.propTypes = {
    username: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>SMS</span>
          </Link>
        </div>

        <div className={styles.menuToggle} onClick={toggleMenu}>
          <div
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <nav
          className={`${styles.navContainer} ${
            isMenuOpen ? styles.active : ""
          }`}
        >
          <ul className={styles.navLinks}>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? styles.active : ""}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === "/about" ? styles.active : ""}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            {isLoggedIn ? (
              <div className={styles.userDropdown}>
                <li>
                  <UserDropdown
                    username={username}
                    handleLogout={handleLogout}
                  />
                </li>
              </div>
            ) : (
              <li id="login">
                <Link
                  to="/login"
                  className={`${styles.loginButton} ${
                    location.pathname === "/login" ? styles.active : ""
                  }`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
