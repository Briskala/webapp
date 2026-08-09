import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'
import type { NextResponse } from 'next/server'

const COOKIE_NAME = 'briskala_accounting_session'
const MAX_AGE = 60 * 60 * 24 * 14 // 14 days

type SessionPayload = {
  firebaseUid: string
  email: string
  exp: number
}

function secret(): string {
  return process.env.PAYLOAD_SECRET || 'dev-insecure-secret'
}

function sign(data: string): string {
  return createHmac('sha256', secret()).update(data).digest('base64url')
}

export function createSessionToken(firebaseUid: string, email: string): string {
  const payload: SessionPayload = {
    firebaseUid,
    email,
    exp: Date.now() + MAX_AGE * 1000,
  }
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${body}.${sign(body)}`
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token || !token.includes('.')) return null
  const [body, sig] = token.split('.')
  if (!body || !sig) return null
  const expected = sign(body)
  try {
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  } catch {
    return null
  }
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload
    if (!payload.firebaseUid || !payload.email || payload.exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

export function attachSessionCookie(res: NextResponse, firebaseUid: string, email: string) {
  const token = createSessionToken(firebaseUid, email)
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  })
  return res
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return res
}

export async function getAccountingSession(): Promise<SessionPayload | null> {
  const jar = await cookies()
  return verifySessionToken(jar.get(COOKIE_NAME)?.value)
}

export { COOKIE_NAME }
