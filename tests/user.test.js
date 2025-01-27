const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const db = require('../src/config/db');

chai.use(chaiHttp);
const { expect } = chai;

describe('User API Endpoints', () => {
  let userId;

  before(async () => {
    // Clear users table before tests
    await db.query('DELETE FROM users');
    
    // Insert a test user
    const result = await db.query(
      'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
      ['Test User', 'test.user@example.com', 'user']
    );

    // Store the user id for later use
    userId = result.insertId;
  });

  after(async () => {
    // Clear users table after tests
    await db.query('DELETE FROM users');
  });

  it('should retrieve all users', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should update a user', (done) => {
    chai
      .request(app)
      .put(`/api/v1/users/${userId}`)
      .send({ name: 'Updated User', email: 'updated.email@example.com', role: 'admin' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'User updated');
        done();
      });
  });

  it('should delete a user', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/users/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'User deleted');
        done();
      });
  });
});
