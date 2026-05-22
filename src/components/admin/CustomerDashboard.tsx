'use client'
import React, { useState, useEffect } from 'react'
import { useFormFields } from '@payloadcms/ui'
import { FileText, Briefcase, MessageSquare, FolderOpen, ClipboardList, Send, Plus, Check, X, Download, AlertCircle } from 'lucide-react'

export function CustomerDashboard() {
  // Read customerNumber from the current form fields in Payload Admin
  const customerNumberField = useFormFields(([fields]) => fields.customerNumber)
  const customerNumber = customerNumberField?.value as string

  const [activeTab, setActiveTab] = useState<'aanvragen' | 'diensten' | 'berichten' | 'documenten' | 'notities'>('aanvragen')
  
  // States for data
  const [aanvragen, setAanvragen] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Quick action states
  const [newNote, setNewNote] = useState('')
  const [msgSubject, setMsgSubject] = useState('')
  const [msgContent, setMsgContent] = useState('')
  const [msgType, setMsgType] = useState('normal')
  const [reqDocTitle, setReqDocTitle] = useState('')

  // Modal or editing states for document feedback / status update
  const [editingDocId, setEditingDocId] = useState<string | null>(null)
  const [docFeedback, setDocFeedback] = useState('')
  const [docInternalNotes, setDocInternalNotes] = useState('')

  // Fetch all related customer data from Payload REST API
  const fetchData = async () => {
    if (!customerNumber) return
    setLoading(true)
    setError(null)
    try {
      // 1. Fetch Aanvragen (Applications)
      const rAanvragen = await fetch(`/api/aanvragen?where[customerNumber][equals]=${customerNumber}&limit=100`)
      const dAanvragen = await rAanvragen.json()
      setAanvragen(dAanvragen.docs || [])

      // 2. Fetch UserServices (Services)
      const rServices = await fetch(`/api/user-services?where[customerNumber][equals]=${customerNumber}&limit=100`)
      const dServices = await rServices.json()
      setServices(dServices.docs || [])

      // 3. Fetch Messages
      const rMessages = await fetch(`/api/messages?where[customerNumber][equals]=${customerNumber}&limit=100&sort=-sentDate`)
      const dMessages = await rMessages.json()
      setMessages(dMessages.docs || [])

      // 4. Fetch Documents
      const rDocuments = await fetch(`/api/documents?where[customerNumber][equals]=${customerNumber}&limit=100&sort=-uploadedAt`)
      const dDocuments = await rDocuments.json()
      setDocuments(dDocuments.docs || [])

      // 5. Fetch AdminNotes
      const rNotes = await fetch(`/api/admin-notes?where[customerNumber][equals]=${customerNumber}&limit=100&sort=-createdAt`)
      const dNotes = await rNotes.json()
      setNotes(dNotes.docs || [])
    } catch (err: any) {
      setError(err?.message || 'Fout bij het ophalen van gegevens.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (customerNumber) {
      fetchData()
    }
  }, [customerNumber])

  if (!customerNumber) {
    return (
      <div style={{ padding: '24px', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '8px', color: '#b45309', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <AlertCircle size={20} />
        <div>
          <strong style={{ display: 'block', fontSize: '15px' }}>Geen Klantnummer Actief</strong>
          <span style={{ fontSize: '13px' }}>Vul een klantnummer in of sla deze klant op om het dashboard en digitale dossier te laden.</span>
        </div>
      </div>
    )
  }

  // Handle application status updates
  const handleUpdateAanvraagStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/aanvragen/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        // Refresh local data
        fetchData()
      } else {
        alert('Kan status niet updaten.')
      }
    } catch (e) {
      alert('Fout bij updaten status.')
    }
  }

  // Handle document approval / rejection
  const handleUpdateDocument = async (id: string, status: 'goedgekeurd' | 'afgekeurd', feedbackText?: string, internalNotesText?: string) => {
    try {
      const bodyData: any = { status }
      if (feedbackText !== undefined) bodyData.feedback = feedbackText
      if (internalNotesText !== undefined) bodyData.internalNotes = internalNotesText

      const response = await fetch(`/api/documents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      })
      if (response.ok) {
        setEditingDocId(null)
        setDocFeedback('')
        setDocInternalNotes('')
        fetchData()
      } else {
        alert('Kan document niet bijwerken.')
      }
    } catch (e) {
      alert('Fout bij bijwerken document.')
    }
  }

  // Create document request placeholder
  const handleRequestDocument = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reqDocTitle.trim()) return

    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: reqDocTitle,
          customerNumber,
          status: 'requested',
        }),
      })

      if (response.ok) {
        setReqDocTitle('')
        fetchData()
        
        // Auto send matching notice message
        await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: `Document vereist: ${reqDocTitle}`,
            content: {
              root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'paragraph',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        text: `Er is een nieuw document aangevraagd: ${reqDocTitle}. Upload deze a.u.b. in uw account onder Mijn Documenten.`,
                        version: 1
                      }
                    ]
                  }
                ]
              }
            },
            customerNumber,
            messageType: 'document_request',
          }),
        })
      } else {
        alert('Kan documentverzoek niet aanmaken.')
      }
    } catch (e) {
      alert('Fout bij aanmaken documentverzoek.')
    }
  }

  // Send message directly to customer
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!msgSubject.trim() || !msgContent.trim()) return

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: msgSubject,
          content: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: msgContent,
                      version: 1
                    }
                  ]
                }
              ]
            }
          },
          customerNumber,
          messageType: msgType,
        }),
      })

      if (response.ok) {
        setMsgSubject('')
        setMsgContent('')
        setMsgType('normal')
        fetchData()
        alert('Bericht succesvol verzonden naar klant!')
      } else {
        alert('Fout bij verzenden bericht.')
      }
    } catch (e) {
      alert('Fout bij verzenden bericht.')
    }
  }

  // Add internal admin note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return

    try {
      const response = await fetch('/api/admin-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerNumber,
          note: newNote,
          author: 'Admin',
        }),
      })

      if (response.ok) {
        setNewNote('')
        fetchData()
      } else {
        alert('Fout bij toevoegen notitie.')
      }
    } catch (e) {
      alert('Fout bij toevoegen notitie.')
    }
  }

  return (
    <div style={{ marginTop: '28px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      {/* Dashboard Header Banner */}
      <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>Klant Dossier & Portal Beheer</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Centraal beheer voor klantnr: <strong style={{ color: '#38bdf8' }}>{customerNumber}</strong></p>
        </div>
        <button onClick={fetchData} style={{ padding: '6px 12px', background: '#334155', color: '#f8fafc', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
          {loading ? 'Laden...' : 'Verversen'}
        </button>
      </div>

      {/* Tabs Menu */}
      <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 8px' }}>
        {[
          { id: 'aanvragen', label: 'Aanvragen', count: aanvragen.length, icon: <FileText size={16} /> },
          { id: 'diensten', label: 'Diensten', count: services.length, icon: <Briefcase size={16} /> },
          { id: 'berichten', label: 'Berichten', count: messages.length, icon: <MessageSquare size={16} /> },
          { id: 'documenten', label: 'Digitaal Dossier', count: documents.length, icon: <FolderOpen size={16} /> },
          { id: 'notities', label: 'Interne Notities', count: notes.length, icon: <ClipboardList size={16} /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 16px',
                border: 'none',
                background: 'none',
                borderBottom: isActive ? '3px solid #0284c7' : '3px solid transparent',
                color: isActive ? '#0284c7' : '#64748b',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 500,
                outline: 'none',
              }}
            >
              {tab.icon}
              {tab.label}
              <span style={{ background: isActive ? '#e0f2fe' : '#f1f5f9', color: isActive ? '#0369a1' : '#475569', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', fontWeight: 700 }}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Content Container */}
      <div style={{ padding: '24px' }}>
        {error && (
          <div style={{ padding: '12px 16px', background: '#fee2e2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: '6px', fontSize: '13px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {/* 1. Aanvragen Tab */}
        {activeTab === 'aanvragen' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>Klant Aanvragen</h3>
            {aanvragen.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '14px' }}>Geen aanvragen gevonden voor deze klant.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {aanvragen.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>{item.title}</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>{item.description || 'Geen beschrijving'}</p>
                      <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '11px', color: '#94a3b8' }}>Ingediend op: {new Date(item.requestDate).toLocaleDateString('nl-NL')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateAanvraagStatus(item.id, e.target.value)}
                        style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: 500, background: '#fff', cursor: 'pointer' }}
                      >
                        <option value="in_behandeling">In behandeling</option>
                        <option value="goedgekeurd">Goedgekeurd</option>
                        <option value="afgekeurd">Afgekeurd</option>
                        <option value="meer_info_vereist">Meer info vereist</option>
                        <option value="on_hold">On hold</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. Diensten Tab */}
        {activeTab === 'diensten' && (
          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>Actieve Diensten (Mijn diensten)</h3>
            {services.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '14px' }}>Geen actieve diensten gevonden voor deze klant.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {services.map((item) => (
                  <div key={item.id} style={{ padding: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '24px', background: '#f0fdf4', padding: '8px', borderRadius: '8px' }}>
                      {typeof item.service === 'object' ? item.service.icon || '💼' : '💼'}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
                        {typeof item.service === 'object' ? item.service.title : `Dienst #${item.service}`}
                      </h4>
                      <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#64748b' }}>
                        {typeof item.service === 'object' ? item.service.shortDescription : ''}
                      </p>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ padding: '2px 8px', background: '#d1fae5', color: '#065f46', borderRadius: '10px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
                          {item.status}
                        </span>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                          Sinds {new Date(item.startDate).toLocaleDateString('nl-NL')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Berichten Tab */}
        {activeTab === 'berichten' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
            {/* Direct Message history */}
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>Berichtengeschiedenis</h3>
              {messages.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '14px' }}>Nog geen berichten verstuurd.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '450px', overflowY: 'auto' }}>
                  {messages.map((msg) => (
                    <div key={msg.id} style={{ padding: '12px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <strong style={{ fontSize: '14px', color: '#0f172a' }}>{msg.subject}</strong>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                          {new Date(msg.sentDate).toLocaleString('nl-NL', { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                      </div>
                      {/* Plain-text display or fall back safely */}
                      <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#475569', whiteSpace: 'pre-line' }}>
                        {msg.content?.root?.children?.[0]?.children?.[0]?.text || 
                         (typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content))}
                      </p>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', fontWeight: 600, background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px', textTransform: 'capitalize' }}>
                          Type: {msg.messageType || 'normal'}
                        </span>
                        <span style={{ fontSize: '11px', color: msg.isRead ? '#10b981' : '#f59e0b', fontWeight: 500 }}>
                          {msg.isRead ? 'Gelezen' : 'Ongelezen'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick send form */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={16} />
                Snel Bericht Sturen
              </h3>
              <form onSubmit={handleSendMessage}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Onderwerp</label>
                  <input
                    type="text"
                    required
                    value={msgSubject}
                    onChange={(e) => setMsgSubject(e.target.value)}
                    placeholder="bijv. Documenten goedgekeurd"
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Bericht Type</label>
                  <select
                    value={msgType}
                    onChange={(e) => setMsgType(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', background: '#fff' }}
                  >
                    <option value="normal">Normaal bericht</option>
                    <option value="automatic">Automatisch bericht</option>
                    <option value="document_request">Documentverzoek</option>
                    <option value="warning">Waarschuwing</option>
                    <option value="update">Update</option>
                  </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Inhoud</label>
                  <textarea
                    required
                    rows={4}
                    value={msgContent}
                    onChange={(e) => setMsgContent(e.target.value)}
                    placeholder="Typ uw bericht hier..."
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px 16px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                  Bericht Verzenden
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 4. Documenten Tab */}
        {activeTab === 'documenten' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
            {/* Digital Folder Directory */}
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>Digitaal Dossier</h3>
              {documents.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '14px' }}>Nog geen documenten aanwezig.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {documents.map((doc) => {
                    const hasFile = !!doc.file
                    const fileUrl = hasFile && typeof doc.file === 'object' ? doc.file.url : ''
                    const isRequested = doc.status === 'requested'
                    
                    return (
                      <div key={doc.id} style={{ padding: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{doc.title}</h4>
                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Aangevraagd/Geüpload op: {new Date(doc.uploadedAt).toLocaleDateString('nl-NL')}</span>
                          </div>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: 700,
                            background: 
                              doc.status === 'goedgekeurd' ? '#d1fae5' :
                              doc.status === 'afgekeurd' ? '#fee2e2' :
                              doc.status === 'requested' ? '#fef3c7' : '#f1f5f9',
                            color:
                              doc.status === 'goedgekeurd' ? '#065f46' :
                              doc.status === 'afgekeurd' ? '#991b1b' :
                              doc.status === 'requested' ? '#b45309' : '#475569',
                          }}>
                            {doc.status === 'requested' ? 'Aangevraagd' : 
                             doc.status === 'in_behandeling' ? 'Beoordelen' :
                             doc.status === 'goedgekeurd' ? 'Goedgekeurd' :
                             doc.status === 'afgekeurd' ? 'Afgekeurd' : doc.status}
                          </span>
                        </div>

                        {/* File details & interaction */}
                        {hasFile ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: '6px', marginBottom: '12px', border: '1px solid #f1f5f9' }}>
                            <span style={{ fontSize: '12px', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                              📄 {typeof doc.file === 'object' ? doc.file.filename : 'Bestand'}
                            </span>
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0284c7', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>
                              <Download size={14} /> download
                            </a>
                          </div>
                        ) : (
                          <p style={{ margin: '0 0 12px 0', fontSize: '12px', fontStyle: 'italic', color: '#94a3b8' }}>
                            Klant moet bestand nog uploaden.
                          </p>
                        )}

                        {doc.feedback && (
                          <div style={{ marginBottom: '8px', padding: '8px 12px', background: '#fffbeb', borderRadius: '4px', fontSize: '12px', color: '#b45309', borderLeft: '3px solid #f59e0b' }}>
                            <strong>Feedback:</strong> {doc.feedback}
                          </div>
                        )}

                        {doc.internalNotes && (
                          <div style={{ marginBottom: '12px', padding: '8px 12px', background: '#f1f5f9', borderRadius: '4px', fontSize: '12px', color: '#475569', borderLeft: '3px solid #cbd5e1' }}>
                            <strong>Interne Notitie:</strong> {doc.internalNotes}
                          </div>
                        )}

                        {/* Review actions console */}
                        {editingDocId === doc.id ? (
                          <div style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#f8fafc' }}>
                            <div style={{ marginBottom: '8px' }}>
                              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '2px' }}>Feedback voor klant</label>
                              <input
                                type="text"
                                value={docFeedback}
                                onChange={(e) => setDocFeedback(e.target.value)}
                                placeholder="Reden van afkeuring of opmerking..."
                                style={{ width: '100%', padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                              />
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '2px' }}>Interne notitie (alleen admin)</label>
                              <textarea
                                rows={2}
                                value={docInternalNotes}
                                onChange={(e) => setDocInternalNotes(e.target.value)}
                                placeholder="Interne opmerkingen voor admin..."
                                style={{ width: '100%', padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', resize: 'vertical' }}
                              />
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button onClick={() => setEditingDocId(null)} style={{ padding: '4px 10px', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Annuleer</button>
                              <button onClick={() => handleUpdateDocument(doc.id, 'afgekeurd', docFeedback, docInternalNotes)} style={{ padding: '4px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Afkeuren</button>
                              <button onClick={() => handleUpdateDocument(doc.id, 'goedgekeurd', docFeedback, docInternalNotes)} style={{ padding: '4px 10px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Goedkeuren</button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            {doc.status !== 'goedgekeurd' && (
                              <button onClick={() => { setEditingDocId(doc.id); setDocFeedback(doc.feedback || ''); setDocInternalNotes(doc.internalNotes || '') }} style={{ padding: '6px 12px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                Evalueer document
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Request new document */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={16} />
                Document Aanvragen
              </h3>
              <form onSubmit={handleRequestDocument}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Document Naam / Type</label>
                  <input
                    type="text"
                    required
                    value={reqDocTitle}
                    onChange={(e) => setReqDocTitle(e.target.value)}
                    placeholder="bijv. Kopie ID / Jaaropgave 2025"
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px 16px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                  Vraag Document Aan
                </button>
              </form>
              <div style={{ marginTop: '16px', background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Veelgevraagde documenten:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['Kopie ID kaart', 'Jaaropgave 2025', 'Werkgeversverklaring', 'Salarisstrook (3x)', 'Uittreksel KvK'].map((title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => setReqDocTitle(title)}
                      style={{ padding: '4px 8px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', color: '#475569', cursor: 'pointer' }}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. Admin Notes Tab */}
        {activeTab === 'notities' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
            {/* Feed of internal notes */}
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>Interne Notities Feed</h3>
              {notes.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '14px' }}>Geen interne notities vastgelegd.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {notes.map((note) => (
                    <div key={note.id} style={{ padding: '12px 16px', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                      <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#451a03', whiteSpace: 'pre-line' }}>{note.note}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#b45309' }}>
                        <span>Geschreven door: <strong>{note.author || 'Admin'}</strong></span>
                        <span>{new Date(note.createdAt).toLocaleString('nl-NL')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Note composer */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={16} />
                Notitie Toevoegen
              </h3>
              <form onSubmit={handleAddNote}>
                <div style={{ marginBottom: '16px' }}>
                  <textarea
                    required
                    rows={5}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Typ uw interne notitie hier..."
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px 16px', background: '#d97706', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                  Notitie Bewaren
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerDashboard
