require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
