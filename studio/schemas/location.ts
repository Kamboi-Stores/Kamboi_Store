const location = {
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 64 } },
    { name: 'address', title: 'Address', type: 'string' },
    { name: 'city', title: 'City', type: 'string' },
    { name: 'state', title: 'State', type: 'string' },
    { name: 'zip', title: 'ZIP', type: 'string' },
    { name: 'lat', title: 'Latitude', type: 'number' },
    { name: 'lng', title: 'Longitude', type: 'number' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'hours', title: 'Hours', type: 'array', of: [{ type: 'object', fields: [
      { name: 'day', title: 'Day', type: 'string' },
      { name: 'open', title: 'Open', type: 'string' },
      { name: 'close', title: 'Close', type: 'string' },
    ]}]},
    { name: 'parkingNotes', title: 'Parking Notes', type: 'text' },
    { name: 'orderUrl', title: 'Order URL (Toast)', type: 'url' },
    { name: 'heroImage', title: 'Hero Image', type: 'image' },
    { name: 'isActive', title: 'Active', type: 'boolean', initialValue: true }
  ]
};
export default location;
