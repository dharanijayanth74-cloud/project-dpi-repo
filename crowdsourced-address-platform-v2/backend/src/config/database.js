// Database configuration
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'address_platform',
  user: process.env.DB_USER || 'address_user',
  password: process.env.DB_PASSWORD || 'address_password',
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
  } else {
    console.log('✅ Database connected successfully');
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};