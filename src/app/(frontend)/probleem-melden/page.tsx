'use client';

import React, { useState } from 'react';
import { submitProblemReport } from '../actions/submitForms';

export default function ProbleemMeldenPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const result = await submitProblemReport(formData);
    
    if (result.success) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
    }
  };

  return (
    <div style={{ minHeight: '60vh', padding: '60px 16px', background: '#f7f9fb' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '8px', border: '1px solid #e0e0e0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '28px', color: '#c0392b', marginBottom: '8px', fontWeight: 700 }}>
          Probleem Melden
        </h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Ervaart u een technisch probleem of loopt u vast op de website? Geef dit hieronder aan, zodat ons supportteam het direct kan oppakken.
        </p>

        {status === 'success' && (
          <div style={{ background: '#d1fae5', color: '#065f46', padding: '16px', borderRadius: '6px', marginBottom: '24px', fontWeight: 500 }}>
            Uw melding is succesvol ontvangen. Ons technisch team gaat er direct mee aan de slag!
          </div>
        )}
        
        {status === 'error' && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '16px', borderRadius: '6px', marginBottom: '24px', fontWeight: 500 }}>
            Er is een fout opgetreden bij het verzenden van uw melding. Probeer het later opnieuw.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>Uw Naam</label>
            <input type="text" name="name" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>E-mailadres</label>
            <input type="email" name="email" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>Beschrijf het probleem</label>
            <textarea name="problem" rows={6} placeholder="Wat ging er mis? Waar liep u tegenaan?" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px', resize: 'vertical' }}></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            style={{ 
              background: '#c0392b', color: '#fff', border: 'none', padding: '14px', borderRadius: '4px', fontSize: '16px', fontWeight: 600, cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 
            }}
          >
            {status === 'loading' ? 'Verzenden...' : 'Meld Probleem'}
          </button>
        </form>
      </div>
    </div>
  );
}
