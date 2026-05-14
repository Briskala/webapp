import { redirect } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@/payload.config';

export const dynamic = 'force-dynamic';

function generateRandomToken(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export default async function LoginPage() {
  const token = generateRandomToken(12);
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  
  await payload.create({
    collection: 'auth-logs',
    data: { token, status: 'pending' },
  });

  redirect(`/auth/${token}`);
}
