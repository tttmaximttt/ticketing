import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from '../app'
import {Collection} from "mongodb";
import request from "supertest";

let mongo: MongoMemoryServer;
let collections: Collection[];

declare global {
  var signup: () => Promise<string>;
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create() ;
  const mongoUri = mongo.getUri();

  await mongoose.connect (mongoUri, {});
  process.env.JWT_KEY = 'test';
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

beforeEach(async () => {
  collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

global.signup = async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456324dsf',
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie?.[0] ?? '';
}
