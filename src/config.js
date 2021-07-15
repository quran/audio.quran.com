require('babel-polyfill');

const API_URL = 'https://api.quran.com/api/v4/audio';

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    apiURL: API_URL || process.env.API_URL,
    app: {
      title: 'Quran Mp3 and Audio Downloads in High Quality - QuranicAudio.com',
      description:
        'QuranicAudio is your source for high quality recitations of the Quran. Stream or download all the Quran recitations',
      head: {
        titleTemplate: '%s - QuranicAudio.com',
        title: 'Quran Mp3 and Audio Downloads in High Quality',
        meta: [
          {
            name: 'description',
            content:
              'QuranicAudio is your source for high quality recitations of the Quran. Stream or download all the Quran recitations'
          },
          {
            name: 'keyword',
            content:
              'quran, quran mp3, quran audio, quranic audio, islam audio, quran play, quran recitation, islam'
          },
          { charset: 'utf-8' },
          {
            property: 'og:site_name',
            content:
              'Quran Mp3 and Audio Downloads in High Quality - QuranicAudio.com'
          },
          { property: 'og:image', content: '/images/QuranicAudio.png' },
          { property: 'og:locale', content: 'en_US' },
          {
            property: 'og:title',
            content: 'Quran Mp3 and Audio Downloads in High Quality'
          },
          {
            property: 'og:description',
            content:
              'QuranicAudio is your source for high quality recitations of the Quran. Stream or download all the Quran recitations'
          },
          { property: 'og:card', content: 'summary' },
          { property: 'og:site', content: '@quran' },
          { property: 'og:creator', content: '@quran' },
          { property: 'og:image:width', content: '200' },
          { property: 'og:image:height', content: '200' }
        ]
      }
    }
  },
  environment
);
