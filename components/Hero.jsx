import React from 'react';

import Logo from './Logo';

const Hero = () => (
  <div className="  my-5 text-center" data-testid="hero">
    <Logo testId="hero-logo" />
    <h1 style={{ fontSize: '7rem' }} className="mb-4" data-testid="hero-title">
      the <strong>racoon</strong> app
    </h1>

    <p className="lead" data-testid="hero-lead">
      The next best issue ticketing platform.
    </p>
  </div>
);

export default Hero;
