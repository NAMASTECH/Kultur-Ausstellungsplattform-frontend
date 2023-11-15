import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <span className="contact-info">
        <ul>{<Link to="/kontakt">Kontakt</Link>}</ul>
      </span>
    </footer>
  );
};
