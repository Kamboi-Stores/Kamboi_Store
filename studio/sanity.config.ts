import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { deskTool } from 'sanity/desk';
import location from './schemas/location';
import menuCategory from './schemas/menuCategory';
import menuItem from './schemas/menuItem';
import page from './schemas/page';
import siteSettings from './schemas/siteSettings';
import homepage from './schemas/homepage';
import rewards from './schemas/rewards';

export default defineConfig({
  name: 'default',
  title: 'Kamboi Stores Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'qxbunha1',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
  types: [location, menuCategory, menuItem, page, siteSettings, homepage, rewards]
  }
});