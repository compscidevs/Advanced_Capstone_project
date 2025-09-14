const request = require('supertest');
const app = require('../app'); // Your Express app

describe('User API regression tests', () => {
  let createdUserId;

  it('should list all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users/create')
      .send({ name: 'Test', password: 'pass', phone: '1234567890' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test');
    createdUserId = res.body.id;
  });

  it('should edit an existing user', async () => {
    const res = await request(app)
      .post(`/users/${createdUserId}/edit`)
      .send({ name: 'TestUpdated', password: 'newpass', phone: '0987654321' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('TestUpdated');
    expect(res.body.phone).toBe('256987654321');
  });

  it('should delete an existing user', async () => {
    const res = await request(app)
      .get(`/users/${createdUserId}/delete`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  // Optionally, test that deleted user no longer exists
  it('should not find deleted user', async () => {
    const res = await request(app)
      .get(`/users/${createdUserId}`);
    expect(res.statusCode).toBe(404);
    });
});