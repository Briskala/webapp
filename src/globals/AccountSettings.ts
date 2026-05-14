import type { GlobalConfig } from 'payload'

export const AccountSettings: GlobalConfig = {
  slug: 'account-settings',
  label: 'Account Instellingen',
  fields: [
    { name: 'title', type: 'text', label: 'Mijn Account Titel', defaultValue: 'Mijn Account' },
    { name: 'welcomeText', type: 'text', label: 'Welkom tekst', defaultValue: 'Welkom' },
    { name: 'customerNumberLabel', type: 'text', label: 'Klantnummer Label', defaultValue: 'Klantnr' },
    { name: 'profileLabel', type: 'text', label: 'Profiel Label', defaultValue: 'Profiel' },
    { name: 'menuGegevens', type: 'text', label: 'Menu: Mijn Gegevens', defaultValue: 'Mijn gegevens' },
    { name: 'menuAanvragen', type: 'text', label: 'Menu: Mijn Aanvragen', defaultValue: 'Mijn aanvragen' },
    { name: 'menuDiensten', type: 'text', label: 'Menu: Mijn Diensten', defaultValue: 'Mijn diensten' },
    { name: 'menuBerichten', type: 'text', label: 'Menu: Berichten', defaultValue: 'Berichten' },
    { name: 'menuUitloggen', type: 'text', label: 'Menu: Uitloggen', defaultValue: 'Uitloggen' },
  ],
}
