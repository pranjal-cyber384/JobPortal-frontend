import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer-modern mt-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold text-primary">JobPortal</h4>
            <p className="text-muted">
              Find your dream job or hire top talent easily.  
              A complete platform for job seekers and recruiters.
            </p>
          </div>
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Company</h6>
            <ul className="list-unstyled">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Resources</h6>
            <ul className="list-unstyled">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Connect</h6>
            <div className="d-flex gap-3 mt-2">
              <a href="#" className="social-icon">🌐</a>
              <a href="#" className="social-icon">💼</a>
              <a href="#" className="social-icon">📧</a>
            </div>
            <p className="text-muted mt-3 small">
              Email: support@jobportal.com
            </p>
          </div>
        </div>
        <div className="text-center border-top pt-3 mt-3 small text-muted">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;