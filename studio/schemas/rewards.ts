const rewards = {
  name: 'rewards',
  title: 'Rewards',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'rewardsPdf',
      title: 'Rewards PDF',
      type: 'file',
      options: {
        accept: 'application/pdf'
      },
      description: 'Upload a PDF for rewards information.'
    }
  ]
};

export default rewards;
