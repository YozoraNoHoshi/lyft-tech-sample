const request = require('supertest');
const app = require('./app');

describe('POST /test', function() {
  test('it should return every third character', async function() {
    let dataObj = {
      string_to_cut: 'iamyourlyftdriver'
    };
    const response = await request(app)
      .post('/test')
      .send(dataObj);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('return_string', 'muydv');
  });
  test('it should return every third character part 2', async function() {
    let dataObj = {
      string_to_cut: 'iamyourlyftdrivertodayhi'
    };
    const response = await request(app)
      .post('/test')
      .send(dataObj);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('return_string', 'muydvtai');
  });
  test('it should return an empty string for an empty string', async function() {
    let dataObj = {
      string_to_cut: ''
    };
    const response = await request(app)
      .post('/test')
      .send(dataObj);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('return_string', '');
  });
  test('it should return every third character for a number', async function() {
    let dataObj = {
      string_to_cut: 123456789
    };
    const response = await request(app)
      .post('/test')
      .send(dataObj);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('return_string', '369');
  });
  test('it should error if no string_to_cut is provided', async function() {
    const response = await request(app).post('/test');
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty(
      'message',
      "Missing required property 'string_to_cut'"
    );
  });
});
