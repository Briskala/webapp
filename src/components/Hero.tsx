import React from 'react';
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function Hero() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const hero = (await payload.findGlobal({ slug: 'hero-section' })) as any;

  const title = hero?.title || 'Uw complete boekhoudplatform';
  const subtitle = hero?.subtitle || 'Beheer facturen, uitgaven, btw en financiële rapporten — zelf, voor particulieren, zzp’ers, mkb en accountants.';
  const primaryButtonText = hero?.primaryButtonText || '↗ Ontdek functies';
  const primaryButtonUrl = hero?.primaryButtonUrl || '/functies';
  const secondaryButtonText = hero?.secondaryButtonText || 'Bekijk prijzen';
  const secondaryButtonUrl = hero?.secondaryButtonUrl || '/prijzen';
  const tagline = hero?.tagline || 'Briskala helpt u uw boekhouding en financiële administratie zelf te beheren.';
  const stripServices = hero?.stripServices && hero.stripServices.length > 0
    ? hero.stripServices
    : [
        { id: '1', icon: '🧾', title: 'Facturen', linkText: 'Meer info', url: '/facturen' },
        { id: '2', icon: '📚', title: 'Boekhouding', linkText: 'Meer info', url: '/boekhouding' },
        { id: '3', icon: '📊', title: 'Rapporten', linkText: 'Meer info', url: '/rapporten' },
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

