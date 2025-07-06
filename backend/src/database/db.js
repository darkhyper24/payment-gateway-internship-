const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected successfully');
  }
});

// Custom query function with simplified logging
const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    console.log('Query executed successfully');
    return result;
  } catch (error) {
    console.error('Query failed:', error.message);
    throw error;
  }
};

module.exports = {
  query,
  pool,
};