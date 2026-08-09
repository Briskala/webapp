import React from 'react';
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function Footer() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const footerGlobal = await payload.findGlobal({
    slug: 'footer',
  });

  const columns = footerGlobal?.columns || [];
  const copyrightText =
    footerGlobal?.copyrightText ||
    '© 2026 Briskala · Boekhouding & financieel beheer';
  const siteRegister = footerGlobal?.siteRegister || '';

  const fallbackColumns = [
    {
      title: 'Platform',
      links: [
        { label: 'Functies', url: '/functies' },
        { label: 'Facturen', url: '/facturen' },
        { label: 'Boekhouding', url: '/boekhouding' },
        { label: 'Rapporten', url: '/rapporten' },
      ],
    },
    {
      title: 'Informatie',
      links: [
        { label: 'Over Ons', url: '/over-ons' },
        { label: 'Prijzen', url: '/prijzen' },
        { label: 'FAQ', url: '/faq' },
        { label: 'Contact', url: '/contact' },
      ],
    },
    {
      title: 'Juridisch',
      links: [
        { label: 'Privacy Policy', url: '/privacy-policy' },
        { label: 'Algemene Voorwaarden', url: '/terms-and-conditions' },
        { label: 'Cookiebeleid', url: '/cookiebeleid' },
      ],
    },
  ];

  const resolvedColumns = columns && columns.length > 0 ? columns : fallbackColumns;

  return (
    <footer className="footer">
      <div className="inner">
        <div className="footer-grid">
          {resolvedColumns.map((col, idx) => (
            <div className="footer-col" key={idx}>
              <h4>{col.title}</h4>
              <ul>
                {col.links?.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link href={link.url}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="inner">
          <p>
            {copyrightText}
            {siteRegister && <span> · {siteRegister}</span>}
          </p>
          <div className="footer-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Algemene Voorwaarden</Link>
            <Link href="/cookiebeleid">Cookiebeleid</Link>
            <div className="erickson-badge">
              <span className="erickson-badge-label">Supported by</span>
              <img
                src="/assets/img/erickson-holding-logo.png"
                alt="Erickson Holding"
                className="erickson-badge-logo"
              />
            </div>
          </div>
          <div className="logo-sp"></div>
        </div>
      </div>
    </footer>
  );
}
