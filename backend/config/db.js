const { Pool } = require('pg');
require('dotenv').config();

// Use SSL only in production, but allow self-signed certificates
// The "rejectUnauthorized: false" is useful for some cloud providers like Neon.
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

module.exports = pool;