const request = require('supertest');
const app = require('../app'); // the Express app

describe('User API regression tests', () => {
  let createdUserId;

  it('should list all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
  });

  it('should create a new user and redirect', async () => {
    await request(app)
      .post('/users/create')
      .send({ name: 'Test', password: 'pass', phone: '1234567890' })
      .expect(302)
      .expect('Location', '/login');

    // Find the created user by checking possible IDs
    for (let id = 1; id < 100; id++) {
      const userRes = await request(app).get(`/users/${id}`);
      if (userRes.statusCode === 200 && userRes.body.name === 'Test') {
        createdUserId = id;
        break;
      }
    }
    expect(createdUserId).toBeDefined();
  });

  it('should edit an existing user and redirect', async () => {
    await request(app)
      .post(`/users/${createdUserId}/edit`)
      .send({ name: 'TestUpdated', password: 'newpass', phone: '0987654321' })
      .expect(302)
      .expect('Location', '/users');
  });

  it('should delete an existing user and redirect', async () => {
    await request(app)
      .get(`/users/${createdUserId}/delete`)
      .expect(302)
      .expect('Location', '/users');
  });

  it('should not find deleted user', async () => {
    const res = await request(app)
      .get(`/users/${createdUserId}`);
    expect(res.statusCode).toBe(404);
  });
});