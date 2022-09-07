import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';
import app from '../app';

let mongo: any;

beforeAll(async() => {  
	const mongo = await MongoMemoryServer.create();
	const uri = mongo.getUri();

	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as ConnectOptions);
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
})

afterAll(async () => {  
    // await mongo.stop();
    await mongoose.connection.close();
});

export const signin = async () => {
	const email = "test@test.com";
	const password = "password";

	const response = await request(app)
		.post('/api/users/signup')
		.send({ email, password })
		.expect(201)

	const cookie = response.get('Cookie');

	return cookie;
}