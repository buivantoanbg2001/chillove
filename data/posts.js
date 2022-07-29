const posts = [
  {
    caption:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    image_urls: [
      'https://i.imgur.com/nBUbNNq.png',
      'https://i.imgur.com/A44J0tz.jpg',
      'https://i.imgur.com/nBUbNNq.png',
      'https://i.imgur.com/A44J0tz.jpg',
      'https://i.imgur.com/nBUbNNq.png',
      'https://i.imgur.com/A44J0tz.jpg',
    ],
    private: true,
    owner_email: 'buivantoanbg2001@gmail.com',
    created_at: 'Sep 25, 2020',
    comments: [
      {
        comment:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        commented_at: '23:07 Sep 25, 2020',
        owner_email: 'buivantoanbg2001@gmail.com',
      },
      {
        comment:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        commented_at: '23:07 Sep 25, 2020',
        owner_email: 'linhngocbh2001@gmail.com',
      },
    ],
    hashtags: ['#birthday', '#halloween'],
  },
  {
    caption: 'Hello hello',
    image_urls: [
      'https://i.imgur.com/A44J0tz.jpg',
      'https://i.imgur.com/nBUbNNq.png',
    ],
    private: false,
    owner_email: 'linhngocbh2001@gmail.com',
    created_at: 'Sep 25, 2020',
    comments: [
      {
        comment: 'This is a comment',
        commented_at: '23:07 Sep 25, 2020',
        owner_email: 'buivantoanbg2001@gmail.com',
      },
      {
        comment: 'This is a comment',
        commented_at: '23:07 Sep 25, 2020',
        owner_email: 'buivantoanbg2001@gmail.com',
      },
    ],
    hashtags: ['#christmas', '#valentine', '#christmas', '#valentine'],
  },
  {
    caption: 'Hello hello',
    image_urls: [
      'https://i.imgur.com/nBUbNNq.png',
      'https://i.imgur.com/A44J0tz.jpg',
    ],
    private: false,
    owner_email: 'buivantoanbg2001@gmail.com',
    created_at: 'Sep 25, 2020',
    comments: [
      {
        comment: 'This is a comment',
        commented_at: '23:07 Sep 25, 2020',
        owner_email: 'buivantoanbg2001@gmail.com',
      },
      {
        comment: 'This is a comment',
        commented_at: '23:07 Sep 25, 2020',
        owner_email: 'buivantoanbg2001@gmail.com',
      },
    ],
    hashtags: ['#christmas', '#valentine'],
  },
];

export default posts;
