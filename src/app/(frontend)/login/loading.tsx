import React from 'react';

export default function LoginLoading() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f7f9fb', padding: '40px 16px' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', border: '1px solid #e0e0e0', textAlign: 'center', maxWidth: '400px', width: '100%', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '24px' }}>
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem', color: '#1a5276' }}>
            {/* removed visually-hidden text that was showing on mobile */}
          </div>
        </div>
        <h2 style={{ fontSize: '20px', color: '#1a5276', marginBottom: '12px', fontWeight: 600 }}>
          Even geduld aub
        </h2>
        <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.5, margin: 0 }}>
          U wordt momenteel doorgestuurd naar de veilige inlogomgeving...
        </p>
      </div>
    </div>
  );
}
