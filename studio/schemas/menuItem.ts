const menuItem = {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'dietaryTags', title: 'Dietary Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'isFeatured', title: 'Featured', type: 'boolean' },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'menuCategory' }], validation: Rule => Rule.required() },
    { name: 'isActive', title: 'Active', type: 'boolean', initialValue: true }
  ]
};
export default menuItem;
