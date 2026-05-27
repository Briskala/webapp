'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface DocumentInfo {
  id: string;
  title: string;
  status: string;
  uploadedAt: string;
  file?: { url?: string };
}

export function CustomerDocuments({ initialDocuments }: { initialDocuments: DocumentInfo[] }) {
  const { user } = useAuth();
  const [documents, setDocuments] = useState(initialDocuments);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleUpload = async (documentId: string, file: File) => {
    if (!user) return;
    setUploadingId(documentId);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentId', documentId);
    formData.append('uid', user.uid);

    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        // Update local state
        setDocuments(docs => docs.map(d => d.id === documentId ? { ...d, status: 'in_behandeling', uploadedAt: new Date().toISOString(), file: { url: '#' } } : d));
        alert('Document succesvol geüpload!');
      } else {
        alert('Upload mislukt: ' + (data.error || 'Onbekende fout'));
      }
    } catch (err) {
      alert('Er is een netwerkfout opgetreden.');
    } finally {
      setUploadingId(null);
    }
  };

  const requestedDocs = documents.filter(d => d.status === 'requested');
  const otherDocs = documents.filter(d => d.status !== 'requested');

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a5276', marginBottom: '16px' }}>Documenten & Polissen</h3>

      {requestedDocs.length > 0 && (
        <div style={{ marginBottom: '24px', padding: '16px', background: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '8px' }}>
          <h4 style={{ color: '#856404', margin: '0 0 12px 0' }}>Aanvullende documenten vereist</h4>
          {requestedDocs.map(doc => (
            <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '12px', borderRadius: '4px', marginBottom: '8px' }}>
              <div>
                <strong>{doc.title}</strong>
                <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0 0' }}>Graag dit document uploaden om uw aanvraag te voltooien.</p>
              </div>
              <div>
                <input
                  type="file"
                  id={`file-${doc.id}`}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUpload(doc.id, e.target.files[0]);
                    }
                  }}
                />
                <label
                  htmlFor={`file-${doc.id}`}
                  style={{ background: '#1a5276', color: '#fff', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'inline-block' }}
                >
                  {uploadingId === doc.id ? 'Bezig...' : 'Uploaden'}
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {otherDocs.length === 0 ? (
        <p style={{ color: '#666', fontSize: '14px' }}>U heeft nog geen documenten of polissen.</p>
      ) : (
        <div className="account-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead style={{ background: '#f0f4f8' }}>
              <tr>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', color: '#1a5276' }}>Document</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', color: '#1a5276' }}>Datum</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', color: '#1a5276' }}>Status</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', color: '#1a5276' }}>Actie</th>
              </tr>
            </thead>
            <tbody>
              {otherDocs.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: '1px solid #f0f4f8' }}>
                  <td style={{ padding: '12px 16px', color: '#333', fontWeight: 500 }}>{doc.title}</td>
                  <td style={{ padding: '12px 16px', color: '#666' }}>{new Date(doc.uploadedAt).toLocaleDateString('nl-NL')}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ 
                      background: doc.status === 'goedgekeurd' ? '#d1fae5' : doc.status === 'afgekeurd' ? '#fee2e2' : '#eaf2f8', 
                      color: doc.status === 'goedgekeurd' ? '#065f46' : doc.status === 'afgekeurd' ? '#991b1b' : '#1a5276', 
                      padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 
                    }}>
                      {doc.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {doc.file?.url ? (
                      <a href={doc.file.url} target="_blank" rel="noreferrer" style={{ color: '#1a5276', textDecoration: 'none', fontWeight: 500 }}>Downloaden</a>
                    ) : (
                      <span style={{ color: '#999' }}>N.v.t.</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
