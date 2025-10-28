const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 64 } },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    { name: 'heroImage', title: 'Hero Image', type: 'image' }
  ]
};
export default page;
