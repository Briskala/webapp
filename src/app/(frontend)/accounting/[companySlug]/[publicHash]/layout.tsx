import React from 'react'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { resolveCompanyAccess } from '@/lib/accounting/access'
import { getAccountingSession } from '@/lib/accounting/session'
import { AccountingNav } from '@/components/accounting/AccountingNav'
import { ROLE_LABELS } from '@/lib/accounting/types'
import '@/components/accounting/accounting.css'

export const dynamic = 'force-dynamic'

export default async function AccountingCompanyLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ companySlug: string; publicHash: string }>
}) {
  const { companySlug, publicHash } = await params
  const session = await getAccountingSession()
  if (!session) redirect('/accounting')

  const payload = await getPayload({ config: await config })
  const access = await resolveCompanyAccess(payload, companySlug, publicHash, session.firebaseUid)

  if (!access) {
    redirect('/accounting')
  }

  const basePath = `/accounting/${companySlug}/${publicHash}`

  return (
    <div className="acc-shell">
      <div className="acc-topbar">
        <div className="acc-topbar-inner acc-topbar-row">
          <div>
            <h1 className="acc-company-title">{access.company.name}</h1>
            <p className="acc-company-meta">
              Briskala Accounting · {access.company.currency} · {access.company.country}
            </p>
          </div>
          <div className="acc-role-pill">
            {ROLE_LABELS[access.role]} · {access.canWrite ? 'Schrijven' : 'Alleen-lezen'}
          </div>
        </div>
      </div>
      <div className="acc-body-inner">
        <div className="acc-layout">
          <AccountingNav basePath={basePath} />
          <div className="acc-main">{children}</div>
        </div>
      </div>
    </div>
  )
}
