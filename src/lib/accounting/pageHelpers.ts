import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getAccountingSession } from './session'
import { resolveCompanyAccess, type CompanyAccess } from './access'

export async function requireCompanyAccess(
  companySlug: string,
  publicHash: string,
): Promise<CompanyAccess> {
  const session = await getAccountingSession()
  if (!session) redirect('/accounting')

  const payload = await getPayload({ config: await config })
  const access = await resolveCompanyAccess(payload, companySlug, publicHash, session.firebaseUid)
  if (!access) redirect('/accounting')
  return access
}
