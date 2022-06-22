import express, { response } from 'express';
import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { product, productDatabase } from '../../models/products';
import dotenv from 'dotenv';
import { app } from '../../server';
import { user } from '../../models/users';


dotenv.config();


const request = supertest(app);
let token: string = '';

describe('products Handler', () => {
  const newProduct: product = {
    name: 'product 1 ',
    price: 10,
    id: 1
  };
  beforeAll(async () => {
   const newUser : user = {
       firstName: 'user4 ',
       lastName: 'user4',
       userName: 'user 4',
       password: '1234'
   }
   const response = await request.post('/user').send (newUser)
   token = response.body
  });

  it('create new product', async () => {
    const response = await request
      .post('/product')
      .send(newProduct)
      .expect(200);
  });
  it('dont show all products without authorization', async () => {
    const response = await request.get('/products').expect(401);
  });
  it('show all products', async () => {
    const response = await request
      .get('/products')
      .auth(token, { type: 'bearer' })
      .expect(200);
  });
  it ('update product by id ' ,async () => {
    const product : product = {
        name: 'product 2',
        price: 20,
        id: 1
    }
    const response = await request.put('/updateProduct').auth(token, { type: 'bearer' }).expect(200)
    
  })
});
