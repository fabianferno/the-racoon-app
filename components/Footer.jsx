import React from 'react';

const Footer = () => (
  <footer className="bg-secondary text-center" data-testid="footer">
    <p className="text-black" data-testid="footer-text">
      Built by{' '}
      <a className="text-primary" href="https://www.fabianferno.com">
        Fabian Ferno ⚡
      </a>
    </p>
  </footer>
);

export default Footer;
