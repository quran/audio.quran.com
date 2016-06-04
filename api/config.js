export default {
  development: {
    username: 'quran_dev',
    password: 'quran_dev',
    database: 'audio_quran',
    host: '127.0.0.1',
    dialect: 'postgres',
    apiUrl: process.env.API_URL
  },
  test: {
    username: 'quran_dev',
    password: 'quran_dev',
    database: 'audio_quran',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'quran_dev',
    password: 'quran_dev',
    database: 'audio_quran',
    host: 'db',
    dialect: 'postgres',
    apiUrl: process.env.API_URL
  }
}[process.env.NODE_ENV];
