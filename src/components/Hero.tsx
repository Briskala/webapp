import React from 'react';
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function Hero() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const hero = (await payload.findGlobal({ slug: 'hero-section' })) as any;

  const title = hero?.title || 'Discover, Live, and Enjoy.';
  const subtitle = hero?.subtitle || 'From essential local services and community news to must-see attractions, vibrant events, and unforgettable experiences';
  const primaryButtonText = hero?.primaryButtonText || '↗ Explore Services';
  const primaryButtonUrl = hero?.primaryButtonUrl || '/our-services';
  const secondaryButtonText = hero?.secondaryButtonText || 'Contact Us';
  const secondaryButtonUrl = hero?.secondaryButtonUrl || '/contact';
  const tagline = hero?.tagline || 'We proudly deliver these core services and much more as your council.';
  const stripServices = hero?.stripServices && hero.stripServices.length > 0
    ? hero.stripServices
    : [
        { id: '1', icon: '👶', title: 'Woningbouw', linkText: 'Learn More', url: '/housing-development' },
        { id: '2', icon: '🏗️', title: 'Vastgoed', linkText: 'Register Today', url: '/real-estate' },
        { id: '3', icon: '🎉', title: 'Autofinanciering', linkText: 'Learn More', url: '/car-financing' },
      ];

  return (
    <section className="hero">
      <div className="hero-img" style={{ background: 'url("/assets/img/photo-1503505946976-e489ce29e0fd.jpg") center / cover repeat-x' }}></div>
      <div className="ms-0 ps-5 hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="hero-btns">
          <Link href={primaryButtonUrl} className="btn-primary">{primaryButtonText}</Link>
          <Link href={secondaryButtonUrl} className="btn-outline">{secondaryButtonText}</Link>
        </div>
      </div>
      <div className="hero-strip">
        <div className="inner">
          <p className="tagline">{tagline}</p>
          <div className="strip-services">
            {stripServices.map((svc: any, idx: number) => (
              <div className="strip-service" key={svc.id ?? idx}>
                <div className="svc-icon"><span>{svc.icon}</span></div>
                <div className="svc-text">
                  <strong>{svc.title}</strong>
                  <Link href={svc.url}>{svc.linkText}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

