import React from 'react';

const Footer = () => (
  <footer className="bg-black p-3 text-center" data-testid="footer">
    <div className="logo" data-testid="footer-logo" />
    <h5 data-testid="footer-text">
      Developed by{' '}
      <a className="text-primary text-decoration-none font-weight-bold " href="https://www.fabianferno.tech">
        Fabian Ferno
      </a>
    </h5>
  </footer>
);

export default Footer;
