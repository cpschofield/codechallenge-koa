import request from 'supertest';
import fs from 'fs';
import { app } from '../src/index';

// define request and response objects
const requestJSON = fs.readFileSync(`${__dirname}/request.json`, { encoding: 'utf8' });
const responseJSON = fs.readFileSync(`${__dirname}/response.json`, { encoding: 'utf8' });

// close the server after all tests are completed
afterAll(() => {
  app.close();
});

// run tests against the available routes
describe('API route tests', async () => {
  test("calls /ping route expects 404 response & respone to contain 'Not Found'", async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toEqual(404);
    expect(response.text).toContain('Not Found');
  });
  test("calls /hello route expects 200 response & respone to contain 'hello world'", async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('hello world');
  });
  test('calls / route with valid json expects 200 response & correct response format', async () => {
    const response = await request(app)
      .post('/')
      .send(requestJSON)
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(200);
    expect(typeof response.text).toBe('string');
    expect(typeof JSON.parse(response.text)).toBe('object');
    expect(JSON.parse(response.text)).toEqual(JSON.parse(responseJSON));
  });
  test('calls / route with invalid json expects 400 response & correct response', async () => {
    const response = await request(app)
      .post('/')
      .send('{"}')
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(400);
    expect(typeof response.text).toBe('string');
    expect(typeof JSON.parse(response.text)).toBe('object');
  });
});
