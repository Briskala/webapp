import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { News } from './collections/News'
import { Services } from './collections/Services'
import { Properties } from './collections/Properties'
import { Vehicles } from './collections/Vehicles'
import { HolidayParks } from './collections/HolidayParks'
import { Customers } from './collections/Customers'
import { ContactRequests } from './collections/ContactRequests'
import { Downloads } from './collections/Downloads'
import { Branches } from './collections/Branches'
import { Languages } from './collections/Languages'
import { AuthLogs } from './collections/AuthLogs'
import { Aanvragen } from './collections/Aanvragen'
import { UserServices } from './collections/UserServices'
import { Messages } from './collections/Messages'
import { Transactions } from './collections/Transactions'
import { ProblemReports } from './collections/ProblemReports'
import { LeaseRequests } from './collections/LeaseRequests'
import { Documents } from './collections/Documents'
import { AdminNotes } from './collections/AdminNotes'

import { Footer } from './globals/Footer'
import { DienstenSection } from './globals/DienstenSection'
import { SidebarCards } from './globals/SidebarCards'
import { Hero } from './globals/Hero'
import { Accessibility } from './globals/Accessibility'
import { AccountSettings } from './globals/AccountSettings'
import { SiteDesign } from './globals/SiteDesign'
import { SiteNavigation } from './globals/SiteNavigation'
import { LegalTexts } from './globals/LegalTexts'
import { NewsSettings } from './globals/NewsSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '@/components/admin/BriskalaLogo#BriskalaLogo',
        Icon: '@/components/admin/BriskalaLogo#BriskalaLogo',
      },
    },
    meta: {
      titleSuffix: '— Briskala Admin',
    },

  },
  collections: [
    Users, Media, Pages, News, Services, Properties, Vehicles, HolidayParks, 
    Customers, ContactRequests, Downloads, Branches, Languages, AuthLogs,
    Aanvragen, UserServices, Messages, Transactions, ProblemReports, LeaseRequests,
    Documents, AdminNotes
  ],

  globals: [Footer, DienstenSection, SidebarCards, Hero, Accessibility, AccountSettings, SiteDesign, SiteNavigation, LegalTexts, NewsSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
      authToken: process.env.DATABASE_AUTH_TOKEN || '',
    },
  }),
  sharp,
  plugins: [],
})
