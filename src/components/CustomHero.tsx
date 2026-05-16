import React from 'react';
import Link from 'next/link';

export function CustomHero() {
  return (
    <section className="custom-hero">
      <div className="ch-left">
        <div className="ch-top-text">
          We're helped 95+ business
        </div>
        <div className="ch-bottom-text">
          <h1 className="ch-heading">
            Building the<br />
            future with<br />
            founders who<br />
            move the world
          </h1>
        </div>
      </div>
      <div className="ch-right">
        <div className="ch-col ch-col-1">
          <div className="ch-col-content">
            <p className="ch-col-text">
              Progress, not waiters. We fund teams daring to imagine differently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
