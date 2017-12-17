module.exports = {
  content: [
    [
      'lab',
      {
        page: '/lab/_slug',
        generate: ['getAll'],
        isPost: false
      }
    ],
    [
      'open-source',
      {
        page: '/open-source/_slug',
        generate: ['getAll'],
        isPost: true
      }
    ],
    [
      'projects',
      {
        page: '/projects/_slug',
        generate: ['getAll'],
        isPost: true
      }
    ]
  ]
}
