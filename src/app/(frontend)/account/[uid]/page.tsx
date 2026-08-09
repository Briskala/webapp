import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function AccountOverviewPage(props: { params: Promise<{ uid: string }> }) {
  const { uid } = await props.params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let dbUser = null
  try {
    const userResult = await payload.find({
      collection: 'users',
      where: { firebaseUid: { equals: uid } },
    })
    if (userResult.docs.length > 0) {
      dbUser = userResult.docs[0] as any
    }
  } catch (e) {
    // Ignore
  }

  let accountSettings = null
  try {
    accountSettings = (await payload.findGlobal({ slug: 'account-settings' as any })) as any
  } catch (e) {}

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a5276', marginBottom: '20px' }}>
        Overzicht
      </h2>
      <div className="account-overview-grid">
        {[
          { label: 'E-mail', value: dbUser?.email || '—' },
          { label: accountSettings?.customerNumberLabel || 'Accountnr', value: dbUser?.customerNumber || '—' },
          { label: accountSettings?.profileLabel || 'Profiel', value: dbUser?.profileType || 'Particulier' },
          { label: 'Saldo', value: `€ ${(dbUser?.balance ?? 0).toFixed(2)}` },
        ].map((item, i) => (
          <div key={i} style={{ padding: '16px', background: '#f7f9fb', borderRadius: '4px', border: '1px solid #e8edf2' }}>
            <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{item.label}</div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#333' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a5276', margin: '28px 0 12px' }}>
        Modules
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        <Link
          href="/accounting"
          style={{
            display: 'block',
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #1a5276 0%, #2471a3 100%)',
            borderRadius: 12,
            padding: 20,
            color: '#fff',
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Primair
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, margin: '8px 0 6px' }}>Accounting</div>
          <div style={{ fontSize: 13, opacity: 0.92, lineHeight: 1.5 }}>
            Open boekhouding per bedrijf: facturen, uitgaven, btw, grootboek en rapporten.
          </div>
        </Link>
        <Link
          href={`/account/${uid}/documenten`}
          style={{
            display: 'block',
            textDecoration: 'none',
            color: 'inherit',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Archief
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, margin: '8px 0 6px', color: '#1a5276' }}>Documenten</div>
          <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
            Bonnen, contracten en financiële bestanden.
          </div>
        </Link>
        <Link
          href={`/account/${uid}/wallet`}
          style={{
            display: 'block',
            textDecoration: 'none',
            color: 'inherit',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Overzicht
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, margin: '8px 0 6px', color: '#1a5276' }}>Financieel</div>
          <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
            Saldo en transactiegeschiedenis in Briskala.
          </div>
        </Link>
      </div>
    </div>
  )
}
