const request = require('supertest');
const app = require('../app'); // the Express app

describe('User API regression tests', () => {
  let createdUserId;

  // The 'get all users' route now renders a view, so we check for a successful response code.
  it('should list all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
  });

  // The 'create user' route redirects to '/login' after successful submission.
  it('should create a new user and redirect', async () => {
    const res = await request(app)
      .post('/users/create')
      .send({ name: 'Test', password: 'pass', phone: '1234567890' })
      .expect(302) // Expect a redirect status code
      .expect('Location', '/login'); // Expect a redirect to the login page

    // You would typically get the created user ID from a database query for follow-on tests.
    // For this test, we'll assume the user is created and rely on the database for the next test.
    const createdUserRes = await request(app).get('/users/getTestUser').expect(200);
    createdUserId = createdUserRes.body.id;
  });

  // The 'edit user' route redirects to '/users' after a successful update.
  it('should edit an existing user and redirect', async () => {
    const res = await request(app)
      .post(`/users/${createdUserId}/edit`)
      .send({ name: 'TestUpdated', password: 'newpass', phone: '0987654321' })
      .expect(302) // Expect a redirect status code
      .expect('Location', '/users'); // Expect a redirect to the users page
  });

  // The 'delete user' route redirects to '/users' after deletion.
  it('should delete an existing user and redirect', async () => {
    const res = await request(app)
      .get(`/users/${createdUserId}/delete`)
      .expect(302) // Expect a redirect status code
      .expect('Location', '/users'); // Expect a redirect to the users page
  });

  // This test still checks for a 404 from the API endpoint.
  it('should not find deleted user', async () => {
    const res = await request(app)
      .get(`/users/${createdUserId}`);
    expect(res.statusCode).toBe(404);
  });
});
