import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getAccountingSession } from '@/lib/accounting/session'
import { findUserByFirebaseUid, listUserCompanies } from '@/lib/accounting/access'
import { createCompanyWithDefaults } from '@/lib/accounting/companyService'

export async function GET() {
  const session = await getAccountingSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const payload = await getPayload({ config: await config })
  const companies = await listUserCompanies(payload, session.firebaseUid)
  return NextResponse.json({ companies })
}

export async function POST(req: NextRequest) {
  const session = await getAccountingSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const name = String(body?.name || '').trim()
    if (!name) return NextResponse.json({ error: 'Company name is required' }, { status: 400 })

    const payload = await getPayload({ config: await config })
    const user = await findUserByFirebaseUid(payload, session.firebaseUid)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const company = await createCompanyWithDefaults(payload, {
      name,
      ownerUserId: user.id,
      currency: body.currency || 'EUR',
      country: body.country || 'NL',
      vatNumber: body.vatNumber || '',
    })

    return NextResponse.json({
      company: {
        id: company.id,
        name: company.name,
        slug: company.slug,
        publicHash: company.publicHash,
        href: `/accounting/${company.slug}/${company.publicHash}`,
      },
    })
  } catch (err) {
    console.error('create company error', err)
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 })
  }
}
