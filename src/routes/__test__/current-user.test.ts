import request from 'supertest';
import app from '../../app';
import { signin } from '../../test/setup';

it('responds the current user correctly', async () => {

	const cookie = await signin();

	const response = await request(app)
		.get('/api/users/currentuser')
		.set('Cookie', cookie)
		.send()
		.expect(200);

	expect(response.body.currentUser.email).toEqual('test@test.com')
});