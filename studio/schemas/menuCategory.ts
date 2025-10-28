const menuCategory = {
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 64 } },
    { name: 'displayOrder', title: 'Display Order', type: 'number' }
  ]
};
export default menuCategory;
