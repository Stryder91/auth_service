import request from "supertest"
import app from "../../app"
import { signinMicro } from "../../test/setup";

it('has a route handler listening to /api/products for posts request', async () => {
    const response = await request(app).post('/api/products').send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed in user is sign in', async () => {
    await request(app)
    .post('/api/products')
    .send({})
    .expect(401);
});


it('can only be accessed in user is sign in', async () => {
    const res = await request(app)
    .post('/api/products')
    .set('Cookie', signinMicro())
    .send({})

    expect(res).not.toEqual(401);
});

it('returns error if no title for product', async () => {
    await request(app)
    .post('/api/products')
    .set('Cookie', signinMicro())
    .send({
        title: '',
        price: 10
    })
    .expect(400);
});

it('returns error if no price for product', async () => {
    await request(app)
    .post('/api/products')
    .set('Cookie', signinMicro())
    .send({
        title: 'title_of_product',
    })
    .expect(400);

    await request(app)
    .post('/api/products')
    .set('Cookie', signinMicro())
    .send({
        title: 'title_of_product',
        price: -10
    })
    .expect(400);
});

it('creates product with valid inputs', async () => {
    await request(app)
    .post('/api/products')
    .send({
        title: 'first_product',
        price: 10
    })
    .expect(201);
});



