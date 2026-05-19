import mysql from 'mysql2/promise';

// Configuración básica para conectar a tu MySQL local
// Asegúrate de que los datos coinciden con los de tu HeidiSQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rebo3d_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
