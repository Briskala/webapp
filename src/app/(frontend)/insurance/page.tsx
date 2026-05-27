'use client';
import React, { useState } from 'react';
import { ApplicationForm } from '@/components/ApplicationForm';

const INSURANCE_CATEGORIES = [
  {
    name: 'Voertuigverzekeringen',
    items: [
      'Autoverzekering', 'Motorverzekering', 'Scooterverzekering', 'Brommerverzekering', 
      'Camperverzekering', 'Bestelautoverzekering', 'Vrachtwagenverzekering', 
      'Bootverzekering', 'Fietsverzekering', 'E-bikeverzekering'
    ]
  },
  {
    name: 'Persoonlijke verzekeringen',
    items: [
      'Aansprakelijkheidsverzekering', 'Zorgverzekering', 'Reisverzekering', 
      'Annuleringsverzekering', 'Ongevallenverzekering', 'Rechtsbijstandverzekering', 
      'Uitvaartverzekering', 'Levensverzekering', 'Arbeidsongeschiktheidsverzekering'
    ]
  },
  {
    name: 'Woningverzekeringen',
    items: [
      'Inboedelverzekering', 'Opstalverzekering', 'Glasverzekering', 
      'Woonverzekering', 'Huurdersverzekering'
    ]
  },
  {
    name: 'Zakelijke verzekeringen',
    items: [
      'Bedrijfsaansprakelijkheidsverzekering', 'Beroepsaansprakelijkheidsverzekering', 
      'Zakelijke autoverzekering', 'Inventarisverzekering', 'Goederenverzekering', 
      'Transportverzekering', 'Cyberverzekering', 'Verzuimverzekering', 
      'AOV voor ondernemers', 'Bedrijfsrechtsbijstandverzekering'
    ]
  }
];

export default function InsurancePage() {
  const [selectedCategory, setSelectedCategory] = useState(INSURANCE_CATEGORIES[0].name);
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);

  const activeCategory = INSURANCE_CATEGORIES.find(c => c.name === selectedCategory);

  return (
    <div className="page-wrapper" style={{ background: '#f7f9fb', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section style={{ background: '#1a5276', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Verzekeringen</h1>
        <p style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', color: '#aad4ef' }}>
          Bij BPAG bieden we een compleet aanbod aan verzekeringen. Kies de verzekering die bij u past en vraag direct een voorstel op maat aan.
        </p>
      </section>

      {/* Main Content */}
      <section style={{ maxWidth: '1200px', margin: '-30px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px', alignItems: 'flex-start' }}>
          
          {/* Sidebar - Categories */}
          <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ padding: '16px', background: '#f0f4f8', borderBottom: '1px solid #e0e0e0', fontWeight: 700, color: '#1a5276', textTransform: 'uppercase', fontSize: '13px' }}>
              Categorieën
            </div>
            {INSURANCE_CATEGORIES.map(category => (
              <button
                key={category.name}
                onClick={() => { setSelectedCategory(category.name); setSelectedInsurance(null); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '16px',
                  background: selectedCategory === category.name ? '#eaf2f8' : 'none',
                  border: 'none', borderBottom: '1px solid #f0f4f8', cursor: 'pointer',
                  color: selectedCategory === category.name ? '#1a5276' : '#555',
                  fontWeight: selectedCategory === category.name ? 700 : 500,
                  fontSize: '15px'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Main Area */}
          <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            {!selectedInsurance ? (
              <>
                <h2 style={{ color: '#1a5276', fontSize: '24px', marginBottom: '24px' }}>{activeCategory?.name}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                  {activeCategory?.items.map(item => (
                    <button
                      key={item}
                      onClick={() => setSelectedInsurance(item)}
                      style={{
                        padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0',
                        borderRadius: '6px', textAlign: 'left', cursor: 'pointer',
                        color: '#334155', fontWeight: 600, fontSize: '14px',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.background = '#eaf2f8'}
                      onMouseOut={e => e.currentTarget.style.background = '#f8fafc'}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedInsurance(null)}
                  style={{
                    background: 'none', border: 'none', color: '#1a5276', cursor: 'pointer',
                    fontWeight: 600, fontSize: '14px', marginBottom: '24px', padding: 0,
                    display: 'flex', alignItems: 'center', gap: '8px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Terug naar overzicht
                </button>
                
                {/* Reusable Form Component connects seamlessly to the backend */}
                <ApplicationForm title={selectedInsurance} type={`Verzekering: ${selectedInsurance}`} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
