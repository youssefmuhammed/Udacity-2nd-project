import express, { response } from 'express';
import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { user, userDatabase, userID } from '../../models/users';
import dotenv from 'dotenv';
import { app } from '../../server';

dotenv.config();

const request = supertest(app);
let token: string = '';

describe('user Handler', () => {
  const newUser: user = {
    firstName: 'youssef',
    lastName: 'muhammed',
    userName: 'youssefmuhammed',
    password: '1234'
  };
  let token: string = '';

  it('create new user ', async () => {
    const response = await request.post('/user').send(newUser).expect(200);
    token = response.body;
  });

  it('dont show all users without authorization', async () => {
    const response = await request.get('/users').expect(401);
  });

  it('show all users', async () => {
    const response = await request
      .get('/users')
      .auth(token, { type: 'bearer' })
      .expect(200);
  });

  it('get user by id ', async () => {
    const response = await request
      .get('/user/1')
      .auth(token, { type: 'bearer' })
      .expect(200);
  });

  it('delete user by id ', async () => {
    const newUser2: user = {
      firstName: 'user 2 ',
      lastName: 'user 2 ',
      userName: 'user2',
      password: '1111'
    };
    const response = await request.post('/user').send(newUser2);
    request.delete('deleteUser/2').auth(token, { type: 'bearer' }).expect(200);
  });
  it('update user by id ', async () => {
    const newUser3: user = {
      firstName: 'user 2 ',
      lastName: 'user 2 ',
      userName: 'user2',
      password: '1111'
    };

    const userID: userID = {
      firstName: 'user 3',
      lastName: 'user3',
      userName: 'user3',
      id: 2,
      password: ''
    };
    const response = await request.post('/user').send(newUser3);
    request
      .put('/updateUser')
      .auth(token, { type: 'bearer' })
      .send(userID)
      .expect(200);
      
  });
}
)



