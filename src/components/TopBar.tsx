import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { TopBarClient } from './TopBarClient';

export async function TopBar() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const [branchesResult, languagesResult, a11yGlobal] = await Promise.all([
    payload.find({ collection: 'branches', limit: 100, sort: 'name' }),
    payload.find({ collection: 'languages', limit: 20, sort: 'sortOrder' }),
    payload.findGlobal({ slug: 'accessibility' }),
  ]);

  const branches = branchesResult?.docs || [];
  const languages = languagesResult?.docs || [];

  // Fallbacks if db is empty
  const defaultLangs = languages.length > 0 ? languages : [
    { id: 'nl', name: 'Nederlands', code: 'NL', icon: '🌐', url: '/nl', status: 'active' },
    { id: 'fr', name: 'Français', code: 'FR', icon: '🌐', url: '/fr', status: 'active' },
    { id: 'en', name: 'English', code: 'EN', icon: '🌐', url: '/en', status: 'active' },
  ];

  return (
    <TopBarClient
      branches={branches as any}
      languages={defaultLangs as any}
      accessibility={a11yGlobal as any}
    />
  );
}
