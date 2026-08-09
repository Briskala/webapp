import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import {
  attachSessionCookie,
  clearSessionCookie,
  getAccountingSession,
} from '@/lib/accounting/session'
import { findUserByFirebaseUid } from '@/lib/accounting/access'

/** Establish accounting session from Firebase identity (same account as Briskala). */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { uid, email, displayName } = body || {}
    if (!uid || !email) {
      return NextResponse.json({ error: 'uid and email are required' }, { status: 400 })
    }

    const payload = await getPayload({ config: await config })
    let user = await findUserByFirebaseUid(payload, uid)
    if (!user) {
      user = await payload.create({
        collection: 'users',
        data: {
          email,
          password: `firebase_${uid}_${Date.now()}`,
          displayName: displayName || email.split('@')[0],
          firebaseUid: uid,
          customerNumber: `BRISK-${Math.floor(100000 + Math.random() * 900000)}`,
          balance: 0,
          messageCount: 0,
          profileType: 'zakelijk',
        },
        overrideAccess: true,
      })
    }

    const res = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, firebaseUid: uid },
    })
    return attachSessionCookie(res, uid, email)
  } catch (err) {
    console.error('accounting session error', err)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getAccountingSession()
  if (!session) return NextResponse.json({ authenticated: false }, { status: 401 })
  return NextResponse.json({ authenticated: true, session })
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  return clearSessionCookie(res)
}
