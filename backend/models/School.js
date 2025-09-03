import pool from '../db.js';

export async function initSchema(){
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      contact VARCHAR(20),
      image TEXT,
      email_id TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  const conn = await pool.getConnection();
  try {
    await conn.query(createTableSQL);
  } finally {
    conn.release();
  }
}

export async function createSchool({ name, address, city, state, contact, image, email_id }){
  const sql = `INSERT INTO schools (name, address, city, state, contact, image, email_id)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [name, address, city, state, contact, image, email_id];
  const [result] = await pool.execute(sql, params);
  return { id: result.insertId };
}

export async function listSchools(){
  const sql = `SELECT id, name, address, city, image FROM schools ORDER BY id DESC`;
  const [rows] = await pool.query(sql);
  return rows;
}
