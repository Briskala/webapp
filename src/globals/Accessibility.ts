import type { GlobalConfig } from 'payload'

export const Accessibility: GlobalConfig = {
  slug: 'accessibility',
  label: 'Accessibility / Toegankelijkheid',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'active',
      type: 'checkbox',
      label: 'Enable Accessibility Widget',
      defaultValue: true,
    },
    {
      name: 'dropdownLabel',
      type: 'text',
      label: 'Dropdown Label',
      defaultValue: '♿ Toegankelijkheid ▾',
    },
    {
      name: 'increaseLabel',
      type: 'text',
      label: 'Increase Text Label',
      defaultValue: 'A+ Tekst vergroten',
    },
    {
      name: 'decreaseLabel',
      type: 'text',
      label: 'Decrease Text Label',
      defaultValue: 'A- Tekst verkleinen',
    },
    {
      name: 'resetLabel',
      type: 'text',
      label: 'Reset Text Label',
      defaultValue: 'A Reset tekstgrootte',
    },
  ],
}
