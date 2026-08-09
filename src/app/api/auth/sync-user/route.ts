import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { attachSessionCookie } from '@/lib/accounting/session';

export async function POST(req: NextRequest) {
  try {
    const { uid, email, displayName, photoURL } = await req.json();

    if (!uid || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });

    // Check if user already exists by firebaseUid
    const existing = await payload.find({
      collection: 'users',
      where: { firebaseUid: { equals: uid } },
    });

    if (existing.docs.length === 0) {
      // Generate a random customer number
      const customerNumber = `BRISK-${Math.floor(100000 + Math.random() * 900000)}`;
      // Create new user in Payload (Turso)
      await payload.create({
        collection: 'users',
        data: {
          email,
          password: `firebase_${uid}_${Date.now()}`, // placeholder password, login is via Firebase
          displayName: displayName || email.split('@')[0],
          firebaseUid: uid,
          photoURL: photoURL || '',
          customerNumber,
          balance: 0,
          messageCount: 0,
          profileType: 'particulier',
        },
      });
    } else {
      // Update existing user info
      const existingUser = existing.docs[0];
      await payload.update({
        collection: 'users',
        id: existingUser.id,
        data: {
          displayName: displayName || existingUser.displayName,
          photoURL: photoURL || existingUser.photoURL,
        },
      });
    }

    const res = NextResponse.json({ success: true });
    return attachSessionCookie(res, uid, email);
  } catch (err) {
    console.error('Sync user error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
