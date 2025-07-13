import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="logo-text">DocNow</span>
        <nav className="footer-links">
          <a
            href="https://github.com/acidG9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/akshansh30/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/akshanshvaishnav/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© {year} DocNow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
