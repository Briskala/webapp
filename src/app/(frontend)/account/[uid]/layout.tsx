import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { AccountLayoutClient } from '@/components/auth/AccountLayoutClient';

export const dynamic = 'force-dynamic';

const defaultLabels = {
  title: 'Mijn Briskala',
  welcomeText: 'Welkom bij uw financiële dashboard',
  customerNumberLabel: 'Accountnr',
  profileLabel: 'Profiel',
  menuGegevens: 'Mijn gegevens',
  menuAanvragen: 'Facturen & aanvragen',
  menuDiensten: 'Mijn abonnement',
  menuBerichten: 'Berichten',
  menuUitloggen: 'Uitloggen',
};

export default async function AccountLayout(props: { params: Promise<{ uid: string }>; children: React.ReactNode }) {
  const { uid } = await props.params;
  const { children } = props;

  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  // Fetch CMS labels
  let labels = defaultLabels;
  try {
    const cmsLabels = await payload.findGlobal({ slug: 'account-settings' as any }) as any;
    if (cmsLabels) {
      labels = {
        title: cmsLabels.title || defaultLabels.title,
        welcomeText: cmsLabels.welcomeText || defaultLabels.welcomeText,
        customerNumberLabel: cmsLabels.customerNumberLabel || defaultLabels.customerNumberLabel,
        profileLabel: cmsLabels.profileLabel || defaultLabels.profileLabel,
        menuGegevens: cmsLabels.menuGegevens || defaultLabels.menuGegevens,
        menuAanvragen: cmsLabels.menuAanvragen || defaultLabels.menuAanvragen,
        menuDiensten: cmsLabels.menuDiensten || defaultLabels.menuDiensten,
        menuBerichten: cmsLabels.menuBerichten || defaultLabels.menuBerichten,
        menuUitloggen: cmsLabels.menuUitloggen || defaultLabels.menuUitloggen,
      };
    }
  } catch (e) {
    // Fall back to defaults
  }

  // Fetch user DB data by firebaseUid
  let dbUser = null;
  try {
    const userResult = await payload.find({
      collection: 'users',
      where: { firebaseUid: { equals: uid } },
    });
    if (userResult.docs.length > 0) {
      const u = userResult.docs[0] as any;
      dbUser = {
        customerNumber: u.customerNumber,
        balance: u.balance,
        messageCount: u.messageCount,
        profileType: u.profileType,
      };
    }
  } catch (e) {
    // User not found yet
  }

  return (
    <AccountLayoutClient
      uid={uid}
      labels={labels}
      dbUser={dbUser}
    >
      {children}
    </AccountLayoutClient>
  );
}
