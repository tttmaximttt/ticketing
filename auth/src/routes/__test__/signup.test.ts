import request from 'supertest';
import app from '../../app';

describe('signup route', () => {
  it('should return a 201 on success signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '123456324dsf',
      })
      .expect(201);
  });

  it('should return a 400 when email invalid', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test',
        password: '123456324dsf',
      })
      .expect(400, {'errors':[{'message':'Email is required','field':'email'}]});
  });

  it('should set cookie on successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@gmail.com',
        password: '123456324dsf',
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });

  it('should throw error with existing email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@gmail.com',
        password: '123456324dsf',
      })
      .expect(201);

    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@gmail.com',
        password: '123456324dsf',
      })
      .expect(400, {errors:[{message:'Email exist.'}]});
  });
})
