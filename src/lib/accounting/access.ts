import type { Payload } from 'payload'
import type { AccountingRole } from './types'
import { ADMIN_ROLES, WRITE_ROLES } from './types'
import { getAccountingSession } from './session'

export type CompanyAccess = {
  company: any
  membership: any
  user: any
  role: AccountingRole
  canWrite: boolean
  canAdmin: boolean
}

export async function findUserByFirebaseUid(payload: Payload, firebaseUid: string) {
  const result = await payload.find({
    collection: 'users',
    where: { firebaseUid: { equals: firebaseUid } },
    limit: 1,
    overrideAccess: true,
  })
  return result.docs[0] || null
}

export async function getCompanyBySlugAndHash(
  payload: Payload,
  companySlug: string,
  publicHash: string,
) {
  const result = await payload.find({
    collection: 'accounting-companies',
    where: {
      and: [
        { slug: { equals: companySlug } },
        { publicHash: { equals: publicHash } },
        { status: { equals: 'active' } },
      ],
    },
    limit: 1,
    overrideAccess: true,
  })
  return result.docs[0] || null
}

export async function getMembership(payload: Payload, companyId: string | number, userId: string | number) {
  const result = await payload.find({
    collection: 'accounting-memberships',
    where: {
      and: [
        { company: { equals: companyId } },
        { user: { equals: userId } },
        { status: { equals: 'active' } },
      ],
    },
    limit: 1,
    overrideAccess: true,
  })
  return result.docs[0] || null
}

export async function resolveCompanyAccess(
  payload: Payload,
  companySlug: string,
  publicHash: string,
  firebaseUid?: string | null,
): Promise<CompanyAccess | null> {
  const session = firebaseUid
    ? { firebaseUid, email: '' }
    : await getAccountingSession()

  if (!session?.firebaseUid) return null

  const user = await findUserByFirebaseUid(payload, session.firebaseUid)
  if (!user) return null

  const company = await getCompanyBySlugAndHash(payload, companySlug, publicHash)
  if (!company) return null

  const membership = await getMembership(payload, company.id, user.id)
  if (!membership) return null

  const role = membership.role as AccountingRole
  return {
    company,
    membership,
    user,
    role,
    canWrite: WRITE_ROLES.includes(role),
    canAdmin: ADMIN_ROLES.includes(role),
  }
}

export async function listUserCompanies(payload: Payload, firebaseUid: string) {
  const user = await findUserByFirebaseUid(payload, firebaseUid)
  if (!user) return []

  const memberships = await payload.find({
    collection: 'accounting-memberships',
    where: {
      and: [
        { user: { equals: user.id } },
        { status: { equals: 'active' } },
      ],
    },
    depth: 1,
    limit: 100,
    overrideAccess: true,
  })

  return memberships.docs
    .map((m: any) => {
      const company = typeof m.company === 'object' ? m.company : null
      if (!company || company.status !== 'active') return null
      return {
        id: company.id,
        name: company.name,
        slug: company.slug,
        publicHash: company.publicHash,
        currency: company.currency,
        role: m.role as AccountingRole,
        href: `/accounting/${company.slug}/${company.publicHash}`,
      }
    })
    .filter(Boolean)
}
