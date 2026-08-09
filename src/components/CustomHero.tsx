import React from 'react';
import Link from 'next/link';
import { HERO_DEFAULT } from '@/content/briskala';

interface HeroCard {
  id?: string | null;
  title: string;
  linkText: string;
  linkUrl: string;
}

interface CustomHeroProps {
  heading?: string | null;
  backgroundImage?: any;
  actionCards?: HeroCard[] | null;
}

export function CustomHero({ heading, backgroundImage, actionCards }: CustomHeroProps) {
  const displayHeading = heading || HERO_DEFAULT.heading;
  const bgUrl = backgroundImage && typeof backgroundImage === 'object' && backgroundImage.url
    ? backgroundImage.url
    : '/assets/img/family_accounting_bg.jpeg';
  
  const cards = actionCards && actionCards.length > 0 ? actionCards : HERO_DEFAULT.cards;

  return (
    <section 
      className="custom-hero-v1-1"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <div className="hero-content">
        <h1 className="hero-heading">
          {displayHeading}
        </h1>
        
        <div className="hero-cards-grid">
          {cards.map((card, index) => (
            <Link key={card.id || index} href={card.linkUrl || '#'} className="hero-action-card">
              <h2 className="hero-action-title">{card.title}</h2>
              <div className="hero-action-link">
                <span className="hero-action-chevron">›</span>
                {card.linkText}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
