# Audio.quran.com

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
Assuming you already have user/role `quran_dev`, just run
```
psql -c 'create database audio_quran;' -U quran_dev
psql audio_quran < audio_quran.psql
psql -c 'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO quran_dev;' -d audio_quran
```
