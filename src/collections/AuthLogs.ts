import type { CollectionConfig } from 'payload'

export const AuthLogs: CollectionConfig = {
  slug: 'auth-logs',
  admin: {
    useAsTitle: 'token',
    defaultColumns: ['token', 'status', 'ipAddress', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user), // Only admins can read
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'token',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Verified', value: 'verified' },
        { label: 'Failed', value: 'failed' },
        { label: 'Expired', value: 'expired' },
      ],
      required: true,
    },
    {
      name: 'ipAddress',
      type: 'text',
      required: false,
    },
    {
      name: 'userAgent',
      type: 'text',
      required: false,
    },
  ],
}
