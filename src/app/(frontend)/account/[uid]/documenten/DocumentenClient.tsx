'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadCustomerDocument } from '@/app/(frontend)/actions/documentActions';
import { FileText, Upload, CheckCircle, AlertTriangle, Clock, Download, ArrowUp, AlertCircle } from 'lucide-react';

interface DocumentInfo {
  id: string;
  title: string;
  status: string;
  uploadedAt: string;
  feedback?: string;
  file?: {
    url: string;
    filename: string;
  } | string | any;
}

interface Props {
  uid: string;
  uploadedDocs: DocumentInfo[];
  requestedDocs: DocumentInfo[];
}

export function DocumentenClient({ uid, uploadedDocs, requestedDocs }: Props) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fulfilling direct requests
  const [selectedRequestFile, setSelectedRequestFile] = useState<{ [key: string]: File }>({});
  const [requestUploadingId, setRequestUploadingId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (!title) {
        // Pre-fill title with filename without extension
        const name = e.target.files[0].name.replace(/\.[^/.]+$/, "");
        setTitle(name);
      }
    }
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Selecteer a.u.b. een bestand.');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('firebaseUid', uid);

    try {
      const result = await uploadCustomerDocument(formData);
      if (result.success) {
        setSuccess('Document succesvol geüpload! De administratie zal dit beoordelen.');
        setFile(null);
        setTitle('');
        router.refresh();
      } else {
        setError(result.error || 'Er is een fout opgetreden.');
      }
    } catch (e: any) {
      setError(e?.message || 'Netwerkfout bij het uploaden.');
    } finally {
      setUploading(false);
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent, docId: string) => {
    e.preventDefault();
    const reqFile = selectedRequestFile[docId];
    if (!reqFile) {
      alert('Selecteer a.u.b. een bestand om te uploaden.');
      return;
    }

    setRequestUploadingId(docId);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('file', reqFile);
    formData.append('documentId', docId);
    formData.append('firebaseUid', uid);

    try {
      const result = await uploadCustomerDocument(formData);
      if (result.success) {
        setSuccess('Aangevraagd document succesvol ingediend!');
        setSelectedRequestFile(prev => {
          const next = { ...prev };
          delete next[docId];
          return next;
        });
        router.refresh();
      } else {
        setError(result.error || 'Er is een fout opgetreden.');
      }
    } catch (e: any) {
      setError(e?.message || 'Netwerkfout bij het uploaden.');
    } finally {
      setRequestUploadingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_behandeling':
        return (
          <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} /> In beoordeling
          </span>
        );
      case 'goedgekeurd':
        return (
          <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={12} /> Goedgekeurd
          </span>
        );
      case 'afgekeurd':
        return (
          <span style={{ background: '#fee2e2', color: '#991b1b', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <AlertTriangle size={12} /> Afgekeurd
          </span>
        );
      default:
        return <span style={{ background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>{status}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Alert boxes */}
      {error && (
        <div style={{ padding: '16px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '6px', color: '#991b1b', fontSize: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}
      {success && (
        <div style={{ padding: '16px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '6px', color: '#065f46', fontSize: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <CheckCircle size={18} />
          {success}
        </div>
      )}

      {/* Admin requested documents list */}
      {requestedDocs.length > 0 && (
        <div style={{ padding: '24px', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#92400e', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} />
            Vereiste documenten van de administratie
          </h3>
          <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#b45309' }}>
            De beheerder heeft verzocht om de volgende documenten aan te leveren. Upload deze om uw aanvragen te verwerken:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {requestedDocs.map((req) => (
              <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#fff', border: '1px solid #fde68a', borderRadius: '6px' }}>
                <span style={{ fontWeight: 600, color: '#78350f', fontSize: '14px' }}>
                  📌 {req.title}
                </span>
                <form onSubmit={(e) => handleRequestSubmit(e, req.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="file"
                    required
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const fileSelected = e.target.files[0];
                        setSelectedRequestFile(prev => ({ ...prev, [req.id]: fileSelected }));
                      }
                    }}
                    style={{ fontSize: '12px', maxWidth: '200px' }}
                  />
                  <button
                    type="submit"
                    disabled={requestUploadingId === req.id || !selectedRequestFile[req.id]}
                    style={{
                      padding: '6px 12px',
                      background: '#d97706',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      opacity: (!selectedRequestFile[req.id] || requestUploadingId === req.id) ? 0.6 : 1,
                    }}
                  >
                    {requestUploadingId === req.id ? 'Uploaden...' : 'Verzenden'}
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form and Upload grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        
        {/* Upload Form */}
        <div style={{ background: '#fff', border: '1px solid #e0e0e0', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#1a5276', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Upload size={18} />
            Document uploaden
          </h3>
          <form onSubmit={handleGeneralSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '6px' }}>Document Titel</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Bijvoorbeeld: Loonstrook Mei 2026"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '6px' }}>Selecteer bestand (PDF, JPG, PNG)</label>
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '32px 16px', textAlign: 'center', background: '#f8fafc', cursor: 'pointer', position: 'relative' }}>
                <input
                  type="file"
                  required
                  onChange={handleFileChange}
                  style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                />
                <ArrowUp size={32} style={{ color: '#64748b', margin: '0 auto 12px' }} />
                <span style={{ display: 'block', fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                  {file ? `Geselecteerd: ${file.name}` : 'Klik hier of sleep uw bestand om te uploaden'}
                </span>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                  Max 10MB (pdf, png, jpg)
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading || !file}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#1a5276',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                opacity: (!file || uploading) ? 0.6 : 1,
              }}
            >
              {uploading ? 'Uploaden...' : 'Document Uploaden'}
            </button>
          </form>
        </div>

        {/* Uploaded Documents List */}
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#1a5276', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} />
            Mijn documentenarchief
          </h3>

          {uploadedDocs.length === 0 ? (
            <div style={{ padding: '40px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', textAlign: 'center', color: '#64748b' }}>
              <p style={{ margin: 0, fontSize: '14px' }}>U heeft nog geen documenten geüpload.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
              {uploadedDocs.map((doc) => {
                const isRejected = doc.status === 'afgekeurd';
                const fileUrl = doc.file && typeof doc.file === 'object' ? doc.file.url : '';
                
                return (
                  <div key={doc.id} style={{ padding: '16px', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#333' }}>{doc.title}</h4>
                        <span style={{ fontSize: '11px', color: '#888' }}>Geüpload op: {new Date(doc.uploadedAt).toLocaleDateString('nl-NL')}</span>
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>

                    {fileUrl && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', borderRadius: '4px', marginBottom: isRejected ? '10px' : '0' }}>
                        <span style={{ fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                          📄 {typeof doc.file === 'object' ? doc.file.filename : 'Bekijk bestand'}
                        </span>
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1a5276', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>
                          <Download size={13} /> download
                        </a>
                      </div>
                    )}

                    {isRejected && doc.feedback && (
                      <div style={{ padding: '8px 12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', fontSize: '12px', marginTop: '8px', borderLeft: '3px solid #ef4444' }}>
                        <strong>Reden afkeuring:</strong> {doc.feedback}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
