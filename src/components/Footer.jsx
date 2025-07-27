import React from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => (
  <footer style={{
    background: "#f8f9fa",
    color: "#333",
    padding: "60px 0 20px 0",
    borderTop: "1px solid #e9ecef",
    width: "100%"
  }}>


    {/* Footer Links Section */}
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "40px",
      marginBottom: "40px"
    }}>
      {/* About Us */}
      <div>
        <h3 style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#2c3e50",
          marginBottom: "20px"
        }}>
          About us
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>About JetSetGo</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Our partners</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Partner policy</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Sustainability</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Accessibility</a>
          </li>
        </ul>
      </div>

      {/* Industry Solutions */}
      <div>
        <h3 style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#2c3e50",
          marginBottom: "20px"
        }}>
          Industry solutions
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Airlines</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Airports</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Destinations</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Online Travel Agencies</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Hotels</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Car Hire</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Other sectors</a>
          </li>
        </ul>
      </div>

      {/* Product Solutions */}
      <div>
        <h3 style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#2c3e50",
          marginBottom: "20px"
        }}>
          Product solutions
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Distribution</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Travel Insight</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Travel API</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Affiliates</a>
          </li>
        </ul>
      </div>

      {/* Advertising */}
      <div>
        <h3 style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#2c3e50",
          marginBottom: "20px"
        }}>
          Advertising
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Advertise with JetSetGo</a>
          </li>
        </ul>
      </div>

      {/* Insights */}
      <div>
        <h3 style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#2c3e50",
          marginBottom: "20px"
        }}>
          Insights
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>News & Insights</a>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.95rem" }}>Support resources</a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Section */}
    <div style={{
      borderTop: "1px solid #e9ecef",
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px"
    }}>
      {/* Brand and Copyright */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: 20, display: 'flex', alignItems: 'center', color: "#2196f3" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 16.5L23 7.5M2 16.5L9 18.5L12 21.5L13.5 19.5L11.5 16.5M2 16.5L11.5 16.5" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span style={{ fontWeight: 600, color: "#2196f3", fontSize: "1.1rem" }}>JetSetGo Partners</span>
        </div>
        <div style={{ fontSize: "0.9rem", color: "#6c757d" }}>
          © JetSetGo Ltd {new Date().getFullYear()} · Cookie Policy · Terms of Service · Modern Slavery
        </div>
      </div>

      {/* Social Media Icons */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#6c757d", fontSize: "20px" }}>
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#6c757d", fontSize: "20px" }}>
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#6c757d", fontSize: "20px" }}>
          <FaTwitter />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "#6c757d", fontSize: "20px" }}>
          <FaLinkedin />
        </a>
      </div>
    </div>

    {/* Back to Top Button */}
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
      position: 'fixed',
      right: 24,
      bottom: 24,
      background: '#2196f3',
      border: 'none',
      borderRadius: '50%',
      width: 48,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#fff',
      fontSize: 20,
      boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
      transition: 'all 0.3s ease',
      zIndex: 1000
    }} title="Back to Top">
      <FaArrowUp />
    </button>
  </footer>
);

export default Footer; 