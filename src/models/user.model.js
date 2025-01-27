const { query } = require('../config/db');

// Create the users table if it doesn't exist
const createTable = async () => {
    await query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM('user', 'admin') DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

// Create a new user
const create = async (userData) => {
    const { name, email, password, role } = userData;
    const sql = `
        INSERT INTO users (name, email, password, role)
        VALUES (?, ?, ?, ?)
    `;
    const result = await query(sql, [name, email, password, role]);
    return { id: result.insertId, name, email, role };
};

// Find all users
const findAll = async () => {
    const sql = `SELECT id, name, email, role, created_at FROM users`;
    return query(sql);
};

// Find a user by ID
const findByPk = async (id) => {
    const sql = `SELECT id, name, email, role, created_at FROM users WHERE id = ?`;
    const rows = await query(sql, [id]);
    return rows[0] || null;
};

// Update a user
const update = async (id, updatedData) => {
    const fields = Object.keys(updatedData)
        .map((field) => `${field} = ?`)
        .join(', ');
    const values = Object.values(updatedData);
    values.push(id);

    const sql = `UPDATE users SET ${fields} WHERE id = ?`;
    await query(sql, values);
};

// Delete a user
const destroy = async (id) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    await query(sql, [id]);
};

module.exports = {
    createTable,
    create,
    findAll,
    findByPk,
    update,
    destroy,
};
