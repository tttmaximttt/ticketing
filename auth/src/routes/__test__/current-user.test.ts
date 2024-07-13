import request from "supertest";
import app from '../../app';

describe('CurrentUser', () => {
  it('should return details with current user', async () => {
    const authResponse = await signup()

    const response = await request(app)
      .get('/api/users/currentUser')
      .set('Cookie', authResponse)
      .send()
      .expect(200)

    expect(response.body.user.email).toStrictEqual('test@test.com');
  });
})
