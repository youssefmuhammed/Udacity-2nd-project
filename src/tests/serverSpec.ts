import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { app } from '../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Test server endpoints response', () => {
  it('Gets the main endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
