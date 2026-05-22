import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';

export const dynamic = 'force-dynamic';

export default async function WalletPage(props: { params: Promise<{ uid: string }> }) {
  const { uid } = await props.params;

  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  let transactions: any[] = [];
  let balance = 0;
  
  try {
    const userResult = await payload.find({
      collection: 'users',
      where: { firebaseUid: { equals: uid } },
    });
    
    if (userResult.docs.length > 0) {
      const u = userResult.docs[0] as any;
      balance = u.balance || 0;
      
      const result = await payload.find({
        collection: 'transactions',
        where: { user: { equals: u.id } },
        sort: '-transactionDate',
      });
      transactions = result.docs;
    }
  } catch (e) {}

  return (
    <div>
      <div className="wallet-header">
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a5276', margin: 0 }}>
          Portemonnee
        </h2>
        <div style={{ background: '#f7f9fb', padding: '12px 20px', borderRadius: '8px', border: '1px solid #e0e0e0', textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actueel Saldo</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#1a5276' }}>€ {balance.toFixed(2)}</div>
        </div>
      </div>
      
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333', marginBottom: '16px' }}>Transactiegeschiedenis</h3>
      
      {transactions.length === 0 ? (
        <div style={{ padding: '32px', textAlign: 'center', background: '#f7f9fb', borderRadius: '8px', border: '1px dashed #ccc' }}>
          <p style={{ color: '#666', margin: 0 }}>Er zijn nog geen transacties gevonden in uw portemonnee.</p>
        </div>
      ) : (
        <div className="account-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead style={{ background: '#f0f4f8' }}>
              <tr>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', color: '#1a5276' }}>Datum</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', color: '#1a5276' }}>Omschrijving</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', color: '#1a5276', textAlign: 'right' }}>Bedrag</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item: any) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f0f4f8' }}>
                  <td style={{ padding: '12px 16px', color: '#666' }}>{new Date(item.transactionDate).toLocaleDateString('nl-NL')}</td>
                  <td style={{ padding: '12px 16px', color: '#333', fontWeight: 500 }}>{item.description}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: item.type === 'credit' ? '#065f46' : '#991b1b' }}>
                    {item.type === 'credit' ? '+' : '-'} € {item.amount.toFixed(2)}
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
