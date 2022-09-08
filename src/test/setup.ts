import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';
import jwt from 'jsonwebtoken';

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

// Works in monolithic context
export const signin = async () => {
	const email = "test@test.com";
	const password = "password";

	const response = await request(app)
		.post('/api/users/signup')
		.send({ email, password })
		.expect(201)

	const cookie = response.get('Set-Cookie');

	return cookie;
}

// For micro services context, since every services
// does not access to auth service
export const signinMicro = () => {
	
	// Build a JWT payload. { id, email }
	const payload = {
		id : '151deczd5s21d5',
		email : 'test@test.com'
	};

	// Create JWT
	const token = jwt.sign(payload, process.env.JWT_KEY!);
	
	// Build session object
	const session = { jwt: token };
	const sessionJSON = JSON.stringify(session);

	// Take JSON and encode it as base64
	const base64 = Buffer.from(sessionJSON).toString('base64');

	// returns a string which is the cookie + encoded data
	// but super test prefers array
	return [`express:sess=${base64}`];
}