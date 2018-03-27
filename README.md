# Quranic Audio [![SLACK](http://i.imgur.com/Lk5HsBo.png)](https://quranslack.herokuapp.com)

The source code for the upcoming version of [quranicaudio.com](http://quranicaudio.com).

---

## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

## Building and Running Production Server

```bash
npm run build
npm run start
```

## Database
This project uses a Postgres database. Assuming you have Postgres installed create a user/role `quran_dev` then run the commands belo
```
psql -c 'create database audio_quran;' -U quran_dev
psql audio_quran < audio_quran.psql
psql -c 'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO quran_dev;' -d audio_quran
```

## Latest Build
http://beta.quranicaudio.com
