'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ApplicationFormProps {
  title: string;
  type: string;
}

export function ApplicationForm({ title, type }: ApplicationFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type,
          ...formData,
          uid: user?.uid,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', description: '' });
      } else {
        setError(data.error || 'Er is een fout opgetreden.');
      }
    } catch (err) {
      setError('Er is een fout opgetreden bij het verzenden.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ padding: '24px', background: '#d4edda', color: '#155724', borderRadius: '8px', border: '1px solid #c3e6cb' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Aanvraag succesvol verzonden!</h3>
        <p style={{ margin: 0 }}>Bedankt voor uw aanvraag. We nemen zo spoedig mogelijk contact met u op.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#1a5276' }}>{title} Aanvragen</h3>
      
      {error && <div style={{ color: '#721c24', background: '#f8d7da', padding: '12px', borderRadius: '4px' }}>{error}</div>}

      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>Naam</label>
        <input name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>E-mailadres</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>Telefoonnummer</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>Project / Aanvraag Details</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required rows={5} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>

      <button type="submit" disabled={loading} style={{ background: '#1a5276', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
        {loading ? 'Bezig met verzenden...' : 'Aanvraag indienen'}
      </button>
    </form>
  );
}
