import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../server.js';

let mongod;

describe('Auth API', () => {
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongod.stop();
  });

  it('registers and logs in', async () => {
    const reg = await request(app).post('/api/register').send({
      name: 'Test', email: 't@example.com', password: 'secret123'
    });
    expect(reg.status).toBe(201);

    const login = await request(app).post('/api/login').send({
      email: 't@example.com', password: 'secret123'
    });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});
