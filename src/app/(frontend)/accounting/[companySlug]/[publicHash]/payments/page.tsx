import { ResourceClient } from '@/components/accounting/ResourceClient'
import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'

export const dynamic = 'force-dynamic'

export default async function PaymentsPage({
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
      type="payments"
      createType="payment"
      title="Betalingen"
      lead="Registreer inkomende en uitgaande betalingen en houd cashflow bij."
      canWrite={access.canWrite}
      currency={access.company.currency}
    />
  )
}
