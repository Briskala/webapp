import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'
import { ROLE_LABELS } from '@/lib/accounting/types'

export const dynamic = 'force-dynamic'

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ companySlug: string; publicHash: string }>
}) {
  const { companySlug, publicHash } = await params
  const access = await requireCompanyAccess(companySlug, publicHash)

  return (
    <div className="acc-panel">
      <h2>Bedrijfsinstellingen</h2>
      <p className="lead">Administratiegegevens en toegangsrol voor deze omgeving.</p>
      <table className="acc-table">
        <tbody>
          <tr><th>Bedrijf</th><td>{access.company.name}</td></tr>
          <tr><th>Slug</th><td>{access.company.slug}</td></tr>
          <tr><th>Omgeving</th><td><code>{publicHash}</code></td></tr>
          <tr><th>Valuta</th><td>{access.company.currency}</td></tr>
          <tr><th>Land</th><td>{access.company.country}</td></tr>
          <tr><th>BTW-nummer</th><td>{access.company.vatNumber || '—'}</td></tr>
          <tr><th>Uw rol</th><td>{ROLE_LABELS[access.role]}</td></tr>
          <tr><th>URL</th><td><code>/accounting/{companySlug}/{publicHash}</code></td></tr>
        </tbody>
      </table>
      <p className="lead" style={{ marginTop: 18, marginBottom: 0 }}>
        Rollen: Owner, Administrator, Accountant, Manager, Employee, Viewer.
        Alleen geautoriseerde Briskala-gebruikers met een actief lidmaatschap hebben toegang.
      </p>
    </div>
  )
}
