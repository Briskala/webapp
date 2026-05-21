import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import Link from 'next/link';

export const metadata = {
  title: 'Vastgoed – Briskala Property & Asset Group',
  description: 'Ontdek ons actuele vastgoedaanbod. Woningen, bedrijfspanden en investeringsobjecten verspreid over heel Nederland.',
};

export const dynamic = 'force-dynamic';

// ── Decorative house SVG row ─────────────────────────────────────────────────
function HouseSkyline({ color = '#1a4a6e', opacity = 0.12 }: { color?: string; opacity?: number }) {
  const houses = [
    { x: 0, w: 48, h: 56, roof: 12 },
    { x: 52, w: 36, h: 44, roof: 10 },
    { x: 92, w: 60, h: 70, roof: 14 },
    { x: 156, w: 42, h: 50, roof: 11 },
    { x: 202, w: 52, h: 62, roof: 13 },
    { x: 258, w: 38, h: 46, roof: 9 },
    { x: 300, w: 56, h: 68, roof: 15 },
    { x: 360, w: 44, h: 52, roof: 11 },
    { x: 408, w: 48, h: 58, roof: 12 },
    { x: 460, w: 36, h: 44, roof: 10 },
    { x: 500, w: 62, h: 72, roof: 16 },
  ];
  return (
    <svg viewBox="0 0 562 90" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }} aria-hidden>
      {houses.map((h, i) => (
        <g key={i} fill={color} opacity={opacity}>
          {/* Body */}
          <rect x={h.x} y={90 - h.h} width={h.w} height={h.h} />
          {/* Roof */}
          <polygon points={`${h.x},${90 - h.h}  ${h.x + h.w / 2},${90 - h.h - h.roof}  ${h.x + h.w},${90 - h.h}`} />
          {/* Door */}
          <rect x={h.x + h.w / 2 - 5} y={82} width={10} height={8} fill="#fff" opacity={0.35} />
          {/* Window */}
          <rect x={h.x + 6} y={90 - h.h + 10} width={10} height={8} fill="#fff" opacity={0.3} rx={1} />
          {i < 8 && <rect x={h.x + h.w - 16} y={90 - h.h + 10} width={10} height={8} fill="#fff" opacity={0.3} rx={1} />}
        </g>
      ))}
      {/* Ground line */}
      <rect x={0} y={88} width={562} height={2} fill={color} opacity={opacity * 0.7} />
    </svg>
  );
}

export default async function VastgoedPage() {
  const payload = await getPayload({ config: await configPromise });
  const { docs } = await payload.find({
    collection: 'properties',
    limit: 50,
  });

  // Derived stats
  const totalDocs = docs.length;
  const avgPrice = totalDocs > 0
    ? Math.round(docs.reduce((s: number, p: any) => s + (p.price || 0), 0) / totalDocs)
    : 0;
  const maxPrice = totalDocs > 0
    ? Math.max(...docs.map((p: any) => p.price || 0))
    : 0;

  // Group by location (top 3 cities)
  const cityMap: Record<string, { count: number; total: number }> = {};
  docs.forEach((p: any) => {
    const loc = (p.location || 'Onbekend').split(',')[0].trim();
    if (!cityMap[loc]) cityMap[loc] = { count: 0, total: 0 };
    cityMap[loc].count++;
    cityMap[loc].total += p.price || 0;
  });
  const topCities = Object.entries(cityMap)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3);

  const typeCounts: Record<string, number> = {};
  docs.forEach((p: any) => {
    const t = p.type || 'Woning';
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  });
  const typeEntries = Object.entries(typeCounts);

  return (
    <>
      <style>{`
        /* ── Vastgoed Infographic Page ── */

        /* ── TOP HERO BANNER ── */
        .vg-hero {
          background: linear-gradient(140deg, #0d1b2a 0%, #1a3a5c 50%, #2471a3 100%);
          padding: 56px 24px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .vg-hero-watermark {
          position: absolute;
          inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 140px; font-weight: 900;
          color: rgba(255,255,255,0.035);
          letter-spacing: -4px;
          user-select: none; pointer-events: none;
          white-space: nowrap; overflow: hidden;
        }
        .vg-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
        }
        .vg-hero-inner {
          position: relative; z-index: 2;
          max-width: 780px; margin: 0 auto;
        }
        .vg-hero-tag {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px; padding: 5px 16px; font-size: 11px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase; color: #add8f7; margin-bottom: 20px;
        }
        .vg-hero h1 {
          font-size: 42px !important; font-weight: 800 !important; color: #fff !important;
          line-height: 1.15 !important; margin: 0 0 12px !important;
          font-family: 'Open Sans', sans-serif;
        }
        .vg-hero-sub {
          font-size: 15px; color: rgba(255,255,255,0.65); max-width: 540px;
          margin: 0 auto 40px; line-height: 1.7;
        }

        /* ── BIG STAT CARDS under hero ── */
        .vg-stat-row {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
          background: rgba(255,255,255,0.08);
          border-top: 1px solid rgba(255,255,255,0.1);
          position: relative; z-index: 2;
        }
        .vg-stat-cell {
          background: rgba(13,27,42,0.6);
          padding: 28px 24px; text-align: left;
          backdrop-filter: blur(4px);
        }
        .vg-stat-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.7px;
          text-transform: uppercase; color: rgba(173,216,247,0.7); margin-bottom: 8px;
        }
        .vg-stat-value {
          font-size: 34px; font-weight: 800; color: #fff;
          line-height: 1; margin-bottom: 4px; font-family: 'Open Sans', sans-serif;
        }
        .vg-stat-sub { font-size: 12px; color: rgba(255,255,255,0.4); }

        /* ── SKYLINE divider ── */
        .vg-skyline { background: #f0f4f8; line-height: 0; }

        /* ── MAIN BODY ── */
        .vg-body {
          background: #f0f4f8;
          padding: 0 20px 60px;
        }
        .vg-center { max-width: 860px; margin: 0 auto; }

        /* Section headers with watermark style */
        .vg-section-head {
          position: relative; padding: 40px 0 8px; margin-bottom: 28px;
        }
        .vg-section-head-wm {
          position: absolute; top: 20px; left: -4px;
          font-size: 56px; font-weight: 900; color: rgba(26,82,118,0.07);
          line-height: 1; white-space: nowrap; user-select: none;
          font-family: 'Open Sans', sans-serif;
        }
        .vg-section-head h2 {
          font-size: 24px !important; font-weight: 800 !important;
          color: #1a3a5c !important; margin: 0 !important;
          position: relative; z-index: 1;
        }
        .vg-section-divider {
          height: 3px; width: 48px; background: #1a5276;
          border-radius: 2px; margin-top: 8px;
        }

        /* ── TOP REGIONS (ranked list) ── */
        .vg-regions { display: flex; flex-direction: column; gap: 0; }
        .vg-region-row {
          display: grid; grid-template-columns: 44px 1fr 120px 120px;
          align-items: center; gap: 16px;
          padding: 18px 24px;
          background: #fff; margin-bottom: 8px; border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .vg-region-rank {
          width: 36px; height: 36px; border-radius: 50%;
          background: #1a5276; color: #fff;
          font-size: 16px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
        }
        .vg-region-rank.gold { background: linear-gradient(135deg, #f59e0b, #d97706); }
        .vg-region-rank.silver { background: linear-gradient(135deg, #94a3b8, #64748b); }
        .vg-region-rank.bronze { background: linear-gradient(135deg, #c2734c, #92400e); }
        .vg-region-name { font-size: 18px; font-weight: 700; color: #1a3a5c; }
        .vg-region-meta { font-size: 12px; color: #64748b; margin-top: 2px; }
        .vg-region-stat strong { display: block; font-size: 15px; font-weight: 700; color: #1a5276; }
        .vg-region-stat span { font-size: 11px; color: #94a3b8; }
        .vg-region-stat.right { text-align: right; }

        /* ── METRICS SECTION ── */
        .vg-metrics-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .vg-metric-card {
          background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
          padding: 24px 28px; box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .vg-metric-title {
          font-size: 11px; font-weight: 700; letter-spacing: 0.7px;
          text-transform: uppercase; color: #94a3b8; margin-bottom: 16px;
        }
        .vg-metric-big {
          font-size: 42px; font-weight: 800; color: #1a3a5c; line-height: 1;
          margin-bottom: 4px; font-family: 'Open Sans', sans-serif;
        }
        .vg-metric-big span { font-size: 22px; font-weight: 600; color: #1a5276; }
        .vg-metric-desc { font-size: 12px; color: #64748b; line-height: 1.5; }

        /* Progress bar */
        .vg-bar-row { margin-bottom: 14px; }
        .vg-bar-label {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12px; margin-bottom: 6px;
        }
        .vg-bar-label strong { color: #1a3a5c; font-weight: 600; }
        .vg-bar-label span { color: #64748b; }
        .vg-bar-track {
          height: 8px; background: #e8eef5; border-radius: 4px; overflow: hidden;
        }
        .vg-bar-fill {
          height: 100%; border-radius: 4px;
          background: linear-gradient(90deg, #1a5276, #2471a3);
          transition: width 0.6s ease;
        }

        /* ── PROPERTY GRID ── */
        .vg-prop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }
        .vg-prop-card {
          background: #fff; border-radius: 14px; overflow: hidden;
          border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          display: flex; flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .vg-prop-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        .vg-prop-img {
          height: 180px; background: linear-gradient(135deg, #dce8f4 0%, #bfd5ea 100%);
          display: flex; align-items: center; justify-content: center;
          color: #7fb3d3; overflow: hidden; position: relative;
        }
        .vg-prop-img img { width: 100%; height: 100%; object-fit: cover; }
        .vg-prop-type-tag {
          position: absolute; top: 12px; left: 12px;
          background: rgba(26,82,118,0.88); color: #fff;
          font-size: 10px; font-weight: 700; letter-spacing: 0.5px;
          text-transform: uppercase; border-radius: 4px; padding: 3px 8px;
        }
        .vg-prop-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
        .vg-prop-title {
          font-size: 16px; font-weight: 700; color: #1a3a5c; margin-bottom: 6px; line-height: 1.3;
        }
        .vg-prop-loc {
          font-size: 12px; color: #64748b; margin-bottom: 14px;
          display: flex; align-items: center; gap: 4px;
        }
        .vg-prop-price {
          font-size: 20px; font-weight: 800; color: #1a5276; margin-bottom: 16px;
        }
        .vg-prop-price span { font-size: 13px; font-weight: 500; color: #94a3b8; }
        .vg-prop-btn {
          display: block; background: #1a5276; color: #fff; text-decoration: none;
          padding: 11px 16px; border-radius: 8px; font-size: 13px; font-weight: 700;
          text-align: center; transition: background 0.2s;
          margin-top: auto;
        }
        .vg-prop-btn:hover { background: #154360; }

        /* Empty state */
        .vg-empty {
          background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
          padding: 60px 40px; text-align: center;
        }
        .vg-empty-icon {
          width: 64px; height: 64px; background: #eaf4fb;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; font-size: 28px;
        }
        .vg-empty h3 { font-size: 18px; color: #1a3a5c; font-weight: 700; margin: 0 0 8px; }
        .vg-empty p { font-size: 14px; color: #64748b; margin: 0 0 24px; }
        .vg-empty-btn {
          display: inline-block; background: #1a5276; color: #fff;
          padding: 12px 28px; border-radius: 8px; text-decoration: none;
          font-size: 14px; font-weight: 700;
        }

        /* ── CTA BANNER ── */
        .vg-cta {
          background: linear-gradient(135deg, #1a3a5c 0%, #1a5276 60%, #2471a3 100%);
          border-radius: 18px;
          padding: 48px 40px;
          text-align: center;
          margin-top: 40px;
          position: relative; overflow: hidden;
        }
        .vg-cta-wm {
          position: absolute; inset: 0; display: flex;
          align-items: center; justify-content: center;
          font-size: 110px; font-weight: 900;
          color: rgba(255,255,255,0.04); user-select: none; pointer-events: none;
          white-space: nowrap;
        }
        .vg-cta-inner { position: relative; z-index: 2; }
        .vg-cta h2 {
          font-size: 28px !important; font-weight: 800 !important;
          color: #fff !important; margin: 0 0 10px !important;
        }
        .vg-cta p { font-size: 15px; color: rgba(255,255,255,0.7); margin: 0 0 28px; }
        .vg-cta-btn {
          display: inline-block; background: #fff; color: #1a5276;
          padding: 14px 32px; border-radius: 10px; text-decoration: none;
          font-size: 15px; font-weight: 800;
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .vg-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }

        /* ── HOUSE FOOTER BANNER ── */
        .vg-footer-strip {
          background: linear-gradient(180deg, #1a3a5c 0%, #0d1b2a 100%);
          padding: 0 0 0;
          margin-top: 48px;
          overflow: hidden;
        }
        .vg-footer-text {
          text-align: center; padding: 36px 24px 0; color: rgba(255,255,255,0.85);
        }
        .vg-footer-text h3 {
          font-size: 22px; font-weight: 800; margin: 0 0 8px; color: #fff;
        }
        .vg-footer-text p { font-size: 14px; color: rgba(255,255,255,0.55); margin: 0 0 24px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .vg-hero h1 { font-size: 30px !important; }
          .vg-stat-row { grid-template-columns: 1fr; gap: 0; }
          .vg-stat-cell { padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .vg-metrics-grid { grid-template-columns: 1fr; }
          .vg-region-row { grid-template-columns: 36px 1fr 100px; }
          .vg-region-stat.right { display: none; }
          .vg-cta { padding: 36px 24px; }
          .vg-cta h2 { font-size: 22px !important; }
        }
        @media (max-width: 480px) {
          .vg-hero { padding: 40px 16px 0; }
          .vg-body { padding: 0 12px 40px; }
          .vg-region-row { grid-template-columns: 36px 1fr; padding: 14px 16px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div className="vg-hero">
        <div className="vg-hero-grid" />
        <div className="vg-hero-watermark">VASTGOED</div>
        <div className="vg-hero-inner">
          <div className="vg-hero-tag">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            </svg>
            Briskala – Vastgoed Aanbod
          </div>
          <h1>Vastgoed<br/>overal in Nederland</h1>
          <p className="vg-hero-sub">
            Wij begeleiden u bij de aan- en verkoop van woningen, bedrijfspanden en investeringsvastgoed — professioneel, transparant en persoonlijk.
          </p>
        </div>

        {/* Big stat row */}
        <div className="vg-stat-row">
          <div className="vg-stat-cell">
            <div className="vg-stat-label">Totaal aanbod</div>
            <div className="vg-stat-value">{totalDocs}</div>
            <div className="vg-stat-sub">objecten beschikbaar</div>
          </div>
          <div className="vg-stat-cell">
            <div className="vg-stat-label">Gemiddelde vraagprijs</div>
            <div className="vg-stat-value">
              {avgPrice > 0 ? `€ ${avgPrice.toLocaleString('nl-NL')}` : '—'}
            </div>
            <div className="vg-stat-sub">per object</div>
          </div>
          <div className="vg-stat-cell">
            <div className="vg-stat-label">Hoogste waarde</div>
            <div className="vg-stat-value">
              {maxPrice > 0 ? `€ ${maxPrice.toLocaleString('nl-NL')}` : '—'}
            </div>
            <div className="vg-stat-sub">topobject in portfolio</div>
          </div>
        </div>
      </div>

      {/* ── SKYLINE divider ── */}
      <div className="vg-skyline">
        <HouseSkyline color="#1a3a5c" opacity={0.18} />
      </div>

      <div className="vg-body">
        <div className="vg-center">

          {/* ── TOP REGIO'S ── */}
          {topCities.length > 0 && (
            <>
              <div className="vg-section-head">
                <div className="vg-section-head-wm">Top regio's</div>
                <h2>Top {topCities.length} regio's</h2>
                <div className="vg-section-divider" />
              </div>
              <div className="vg-regions">
                {topCities.map(([city, data], i) => {
                  const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : 'bronze';
                  return (
                    <div key={city} className="vg-region-row">
                      <div className={`vg-region-rank ${rankClass}`}>{i + 1}</div>
                      <div>
                        <div className="vg-region-name">{city}</div>
                        <div className="vg-region-meta">{data.count} object{data.count !== 1 ? 'en' : ''}</div>
                      </div>
                      <div className="vg-region-stat">
                        <strong>{data.count}</strong>
                        <span>Objecten</span>
                      </div>
                      <div className="vg-region-stat right">
                        <strong>
                          {data.total > 0 ? `€ ${Math.round(data.total / data.count).toLocaleString('nl-NL')}` : '—'}
                        </strong>
                        <span>Gem. prijs</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ── MARKTCIJFERS ── */}
          <div className="vg-section-head" style={{ marginTop: 12 }}>
            <div className="vg-section-head-wm">Marktcijfers</div>
            <h2>Marktcijfers</h2>
            <div className="vg-section-divider" />
          </div>
          <div className="vg-metrics-grid">

            {/* Card 1: Reactietijd */}
            <div className="vg-metric-card">
              <div className="vg-metric-title">Reactietijd bezichtiging</div>
              <div className="vg-metric-big"><span>~</span> 2</div>
              <div className="vg-metric-desc">
                Gemiddeld aantal werkdagen voordat een bezichtiging wordt ingepland.
              </div>
              <div style={{ height: 16 }} />
              <div className="vg-bar-row">
                <div className="vg-bar-label"><strong>Op tijd</strong><span>91%</span></div>
                <div className="vg-bar-track"><div className="vg-bar-fill" style={{ width: '91%' }} /></div>
              </div>
              <div className="vg-bar-row">
                <div className="vg-bar-label"><strong>Verlengd</strong><span>9%</span></div>
                <div className="vg-bar-track"><div className="vg-bar-fill" style={{ width: '9%', background: 'linear-gradient(90deg, #94a3b8, #cbd5e1)' }} /></div>
              </div>
            </div>

            {/* Card 2: Verkoop */}
            <div className="vg-metric-card">
              <div className="vg-metric-title">Succesvolle transacties</div>
              <div className="vg-metric-big">87<span>%</span></div>
              <div className="vg-metric-desc">
                Van alle ingediende aanvragen leidt tot een succesvolle overeenkomst binnen 60 dagen.
              </div>
              <div style={{ height: 16 }} />
              <div className="vg-bar-row">
                <div className="vg-bar-label"><strong>Verkoop</strong><span>57%</span></div>
                <div className="vg-bar-track"><div className="vg-bar-fill" style={{ width: '57%' }} /></div>
              </div>
              <div className="vg-bar-row">
                <div className="vg-bar-label"><strong>Verhuur</strong><span>30%</span></div>
                <div className="vg-bar-track"><div className="vg-bar-fill" style={{ width: '30%', background: 'linear-gradient(90deg, #2471a3, #3498db)' }} /></div>
              </div>
            </div>

            {/* Card 3: Ministatistiek */}
            <div className="vg-metric-card">
              <div className="vg-metric-title">Objecten in portfolio</div>
              <div className="vg-metric-big">{totalDocs}<span> obj.</span></div>
              <div className="vg-metric-desc">
                Actief beheerd in ons systeem — woningen, appartementen en bedrijfspanden.
              </div>
              {typeEntries.length > 0 && (
                <>
                  <div style={{ height: 16 }} />
                  {typeEntries.map(([type, count]) => (
                    <div key={type} className="vg-bar-row">
                      <div className="vg-bar-label">
                        <strong>{type}</strong>
                        <span>{totalDocs > 0 ? Math.round((count / totalDocs) * 100) : 0}%</span>
                      </div>
                      <div className="vg-bar-track">
                        <div className="vg-bar-fill" style={{ width: `${totalDocs > 0 ? (count / totalDocs) * 100 : 0}%` }} />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Card 4: Klanttevredenheid */}
            <div className="vg-metric-card">
              <div className="vg-metric-title">Klanttevredenheid</div>
              <div className="vg-metric-big">9.2<span>/10</span></div>
              <div className="vg-metric-desc">
                Gemiddelde beoordeling door klanten na afsluiting van een vastgoedtransactie.
              </div>
              <div style={{ height: 16 }} />
              <div className="vg-bar-row">
                <div className="vg-bar-label"><strong>Excellent (9–10)</strong><span>68%</span></div>
                <div className="vg-bar-track"><div className="vg-bar-fill" style={{ width: '68%' }} /></div>
              </div>
              <div className="vg-bar-row">
                <div className="vg-bar-label"><strong>Goed (7–8)</strong><span>27%</span></div>
                <div className="vg-bar-track"><div className="vg-bar-fill" style={{ width: '27%', background: 'linear-gradient(90deg, #2471a3, #3498db)' }} /></div>
              </div>
            </div>
          </div>

          {/* ── PROPERTY LISTING ── */}
          <div className="vg-section-head" style={{ marginTop: 12 }}>
            <div className="vg-section-head-wm">Aanbod</div>
            <h2>Actueel aanbod</h2>
            <div className="vg-section-divider" />
          </div>

          {docs.length === 0 ? (
            <div className="vg-empty">
              <div className="vg-empty-icon">🏠</div>
              <h3>Geen objecten beschikbaar</h3>
              <p>Op dit moment is er geen vastgoed beschikbaar in onze portefeuille. Kom later terug of neem contact op.</p>
              <Link href="/contact" className="vg-empty-btn">Neem contact op</Link>
            </div>
          ) : (
            <div className="vg-prop-grid">
              {docs.map((property: any) => (
                <div key={property.id} className="vg-prop-card">
                  <div className="vg-prop-img">
                    {property.type && <div className="vg-prop-type-tag">{property.type}</div>}
                    {property.images && property.images.length > 0 && property.images[0].image?.url ? (
                      <img src={property.images[0].image.url} alt={property.title} />
                    ) : (
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    )}
                  </div>
                  <div className="vg-prop-body">
                    <div className="vg-prop-title">{property.title}</div>
                    <div className="vg-prop-loc">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {property.location || 'Locatie onbekend'}
                    </div>
                    <div className="vg-prop-price">
                      {property.price ? `€ ${property.price.toLocaleString('nl-NL')}` : 'Prijs op aanvraag'}
                      {property.price && <span> v.o.n.</span>}
                    </div>
                    <Link href={`/vastgoed/${property.id}`} className="vg-prop-btn">
                      Bekijk details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── CTA BANNER ── */}
          <div className="vg-cta">
            <div className="vg-cta-wm">BRISKALA</div>
            <div className="vg-cta-inner">
              <h2>Heeft u een object te verkopen of te verhuren?</h2>
              <p>Ons team van vastgoedexperts staat klaar om u te begeleiden. Vraag vandaag nog een gratis waardebepaling aan.</p>
              <Link href="/contact" className="vg-cta-btn">Plan een gesprek →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── HOUSE FOOTER STRIP ── */}
      <div className="vg-footer-strip">
        <div className="vg-footer-text">
          <h3>Bedankt voor uw vertrouwen in Briskala</h3>
          <p>— Uw partner in vastgoed, autofinanciering &amp; woningbouw</p>
        </div>
        <HouseSkyline color="#ffffff" opacity={0.13} />
      </div>
    </>
  );
}
