const homepage = {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    { 
      name: 'title', 
      title: 'Main Title', 
      type: 'string', 
      validation: Rule => Rule.required() 
    },
    { 
      name: 'subtitle', 
      title: 'Subtitle', 
      type: 'string' 
    },
    { 
      name: 'description', 
      title: 'Description', 
      type: 'text' 
    },
    { 
      name: 'ctaText', 
      title: 'Call to Action Text', 
      type: 'string',
      description: 'Text for the main action button (e.g., "Order Online")'
    },
    { 
      name: 'ctaLink', 
      title: 'Call to Action Link', 
      type: 'string',
      description: 'URL for the main action button (e.g., "/order")'
    },
    { 
      name: 'heroImage', 
      title: 'Hero Image', 
      type: 'image',
      description: 'Optional hero image for the homepage'
    },
    { 
      name: 'locationTitle', 
      title: 'Location Finder Title', 
      type: 'string',
      description: 'Title for the location finder section (e.g., "Find a Location")'
    }
  ]
};

export default homepage;
