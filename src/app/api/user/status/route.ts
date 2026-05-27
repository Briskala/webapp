import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');

  if (!uid) {
    return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
  }

  try {
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });

    const userResult = await payload.find({
      collection: 'users',
      where: { firebaseUid: { equals: uid } },
    });

    if (userResult.docs.length > 0) {
      const user = userResult.docs[0];
      return NextResponse.json({
        messageCount: user.messageCount || 0,
        customerNumber: user.customerNumber || 'Niet toegewezen'
      });
    }

    return NextResponse.json({ messageCount: 0, customerNumber: 'Niet toegewezen' });
  } catch (error) {
    console.error('Error fetching user status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
