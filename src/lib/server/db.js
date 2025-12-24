import pg from 'pg'

const { Pool } = pg

const config = {
	host: process.env.DB_HOST || 'postgres',
	port: Number(process.env.DB_PORT || 5432),
	user: process.env.DB_USER || 'quran_dev',
	password: process.env.DB_PASSWORD || 'dev_quran',
	database: process.env.DB_NAME || 'audio_quran',
	max: Number(process.env.DB_POOL_SIZE || 10)
}

const pool = globalThis.__qaudioPool ?? new Pool(config)
if (process.env.NODE_ENV !== 'production') {
	globalThis.__qaudioPool = pool
}

export const query = (text, params) => pool.query(text, params)
