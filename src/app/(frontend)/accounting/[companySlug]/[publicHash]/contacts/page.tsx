import { ResourceClient } from '@/components/accounting/ResourceClient'
import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'

export const dynamic = 'force-dynamic'

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ companySlug: string; publicHash: string }>
}) {
  const { companySlug, publicHash } = await params
  const access = await requireCompanyAccess(companySlug, publicHash)
  return (
    <ResourceClient
      companySlug={companySlug}
      publicHash={publicHash}
      type="contacts"
      createType="contact"
      title="Relaties"
      lead="Klanten en leveranciers voor facturatie, inkoop en rapportages."
      canWrite={access.canWrite}
      currency={access.company.currency}
    />
  )
}
