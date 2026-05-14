import React from 'react';
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@/payload.config';

const colorClassMap: Record<string, string> = {
  blue: 'card-guia',
  red: 'card-ipva',
  green: 'card-guia',
  orange: 'card-guia',
};

export async function Sidebar() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const [cardsGlobal, downloadsResult] = await Promise.all([
    payload.findGlobal({ slug: 'sidebar-cards' }),
    payload.find({
      collection: 'downloads',
      where: { isPublic: { equals: true } },
      sort: 'sortOrder',
    }),
  ]);

  const cards = cardsGlobal?.cards || [];
  const downloads = downloadsResult?.docs || [];

  const fileTypeIcon: Record<string, string> = {
    doc: '📄',
    pdf: '📕',
    excel: '📗',
  };

  // Fallback cards if none configured in CMS
  const fallbackCards = [
    { id: 'guia', title: 'GUIA do\nUSUARIO', icon: '🧭', colorVariant: 'blue', link: '#', description: '' },
    { id: 'ipva', title: 'IPVA\n2014', icon: '🚗', colorVariant: 'red', link: '#', description: '' },
  ];

  const resolvedCards = cards.length > 0 ? cards : fallbackCards;

  return (
    <aside className="sidebar">
      {resolvedCards.map((card, idx) => {
        const cssClass = colorClassMap[card.colorVariant || 'blue'] || 'card-guia';
        return (
          <Link href={card.link || '#'} key={card.id ?? idx} style={{ textDecoration: 'none' }}>
            <div className={`sidebar-card ${cssClass}`}>
              <div className="card-overlay">
                <div className="card-icon"><span>{card.icon}</span></div>
                <h3>{card.title?.split('\\n').map((line, i) => (
                  <React.Fragment key={i}>{line}{i < (card.title?.split('\\n').length ?? 1) - 1 && <br />}</React.Fragment>
                ))}</h3>
              </div>
            </div>
          </Link>
        );
      })}

      <div className="downloads-box">
        <div className="downloads-title"><span>Descargas</span></div>
        {downloads.length > 0 ? (
          downloads.map((doc) => (
            <div className="download-item" key={doc.id}>
              <Link href={typeof doc.file === 'object' && doc.file !== null ? (doc.file as { url?: string }).url ?? '#' : '#'}>
                {doc.title} <span className="dl-ext">.{doc.fileType}</span>
              </Link>
              <span className={`dl-icon dl-icon-${doc.fileType}`}>
                {fileTypeIcon[doc.fileType as string] || '📄'}
              </span>
            </div>
          ))
        ) : (
          <>
            <div className="download-item">
              <Link href="#">Ouvidoria <span className="dl-ext">.doc</span></Link>
              <span className="dl-icon dl-icon-doc">📄</span>
            </div>
            <div className="download-item">
              <Link href="#">Lorem Ipsum Dolor <span className="dl-ext">.pdf</span></Link>
              <span className="dl-icon dl-icon-pdf">📕</span>
            </div>
            <div className="download-item">
              <Link href="#">Catálogo completo de serviços <span className="dl-ext">.pdf</span></Link>
              <span className="dl-icon dl-icon-pdf">📕</span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

