import React from 'react';

import '../styles/partials/footer.css';
import dd9AppLogo from '../static/images/dd9app_logo.png';

const Footer = () => (
  <div className="container mt-5 mb-4 px-4">
    <div className="page-footer row mb-0">
      <div className="col px-0 py-0"><a className="px-0 py-0 navbar-brand" href="/"><img className="footer-logo" src={dd9AppLogo} alt="dd9AppLogo" /></a></div>
      <div className="col px-0 py-0">
        <div className="dd9-trademark text-right">
          <p className="text-secondary d-inline" />© 2018 Copyright<a href="https://www.dd9.com">
            <p className="d-inline" /> dd9.com
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
