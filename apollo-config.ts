module.exports = {
    client: {
      service: {
        name: 'exam-app',
        url: process.env.VITE_API_URL,
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
        'src/**/*.ts'
      ],
    },
  }