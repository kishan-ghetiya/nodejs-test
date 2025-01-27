const db = require('../src/config/db');
const bcrypt = require('bcrypt');

async function seed() {
  const seedData = [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'admin', password: 'admin123' },
    { name: 'Jane Doe 2', email: 'jane.doe2@example.com', role: 'user', password: 'user123' },
  ];

  // Start a transaction
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    for (const user of seedData) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Insert user into the database
      await connection.query(
        `INSERT INTO Users (name, email, role, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`,
        [user.name, user.email, user.role, hashedPassword]
      );
    }

    // Commit transaction
    await connection.commit();
    console.log('Database seeded successfully!');
  } catch (err) {
    // Rollback in case of an error
    await connection.rollback();
    console.error('Error seeding database:', err.message);
  } finally {
    connection.release();
  }
}

// Execute the seed script
seed().catch((err) => console.error('Unexpected error:', err.message));
