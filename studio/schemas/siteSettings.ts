const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'siteName', title: 'Site Name', type: 'string' },
    { name: 'logo', title: 'Logo', type: 'image' },
    { name: 'primaryColor', title: 'Primary Color', type: 'string' },
    { name: 'contactEmail', title: 'Contact Email', type: 'string' },
    { name: 'contactPhone', title: 'Contact Phone', type: 'string' },
    { name: 'socialLinks', title: 'Social Links', type: 'array', of: [{ type: 'url' }] }
  ]
};
export default siteSettings;
