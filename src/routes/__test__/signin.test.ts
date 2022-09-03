import request from 'supertest';
import app from '../../app';

it('fails if mail does not exists', async() => {
	await request(app)
	.post('/api/users/signin')
	.send({
		email: 'test@test.com',
		password: 'password'
	})
	.expect(400);
});

it('fails when an incorrect password is supplied', async() => {
	const response = await request(app)
	.post('/api/users/signup')
	.send({
		email: 'test@test.com',
		password: 'password'
	})
	.expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
    
    await request(app)
	.post('/api/users/signin')
	.send({
		email: 'test@test.com',
		password: 'wrong_password'
	})
	.expect(400);


    await request(app)
	.post('/api/users/signin')
	.send({
		email: 'test@test.com',
		password: 'password'
	})
	.expect(200);

});
