import React from 'react';
import Link from 'next/link';

interface HeroCard {
  id?: string;
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
  const displayHeading = heading || 'Waarmee kunnen we u helpen?';
  const bgUrl = backgroundImage && typeof backgroundImage === 'object' && backgroundImage.url
    ? backgroundImage.url
    : '/assets/img/family_walking_bg.png';
  
  const cards = actionCards && actionCards.length > 0 ? actionCards : [
    {
      id: '1',
      title: 'Ik zoek onafhankelijk vastgoed of een bedrijfspand',
      linkText: 'Lees over ons vastgoed advies',
      linkUrl: '#diensten'
    },
    {
      id: '2',
      title: 'Ik wil een zakelijke auto of wagenpark financieren',
      linkText: 'Lees meer over autofinanciering',
      linkUrl: '/autofinanciering'
    },
    {
      id: '3',
      title: 'Ik wil bouwen en zoek de juiste aannemer of partners',
      linkText: 'Lees over woningbouw bemiddeling',
      linkUrl: '#diensten'
    }
  ];

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
