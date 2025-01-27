const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'user_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection()
    .then(() => console.log('MySQL connected'))
    .catch((err) => {
        console.error('MySQL connection error:', err.message);
        process.exit(1); // Exit the application if the DB connection fails
    });

const query = async (sql, params) => {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (err) {
        console.error('Query error:', err.message);
        throw err;
    }
};

module.exports = { pool, query };
