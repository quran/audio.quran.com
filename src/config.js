require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Quran Mp3 and Audio Downloads in High Quality - QuranicAudio.com',
    description: "All the Quran recitations on this site are in high quality and are free for download and streaming as mp3s. Please enjoy your stay, contact us with your suggestions, tell your friends about the site, and don't forget us in your prayers!",
    head: {
      titleTemplate: '%s - QuranicAudio.com',
      title: 'Quran Mp3 and Audio Downloads in High Quality',
      meta: [
        {name: 'description', content: "All the Quran recitations on this site are in high quality and are free for download and streaming as mp3s. Please enjoy your stay, contact us with your suggestions, tell your friends about the site, and don't forget us in your prayers!"},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Quran Mp3 and Audio Downloads in High Quality - QuranicAudio.com'},
        {property: 'og:image', content: '/images/QuranicAudio.png'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Quran Mp3 and Audio Downloads in High Quality'},
        {property: 'og:description', content: "All the Quran recitations on this site are in high quality and are free for download and streaming as mp3s. Please enjoy your stay, contact us with your suggestions, tell your friends about the site, and don't forget us in your prayers!"},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@quran'},
        {property: 'og:creator', content: '@quran'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
