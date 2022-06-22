"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("../../server");
dotenv_1.default.config();
const request = (0, supertest_1.default)(server_1.app);
let token = '';
describe('user Handler', () => {
    const newUser = {
        firstName: 'youssef',
        lastName: 'muhammed',
        userName: 'youssefmuhammed',
        password: '1234'
    };
    let token = '';
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
        const newUser2 = {
            firstName: 'user 2 ',
            lastName: 'user 2 ',
            userName: 'user2',
            password: '1111'
        };
        const response = await request.post('/user').send(newUser2);
        request.delete('deleteUser/2').auth(token, { type: 'bearer' }).expect(200);
    });
    it('update user by id ', async () => {
        const newUser3 = {
            firstName: 'user 2 ',
            lastName: 'user 2 ',
            userName: 'user2',
            password: '1111'
        };
        const userID = {
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
});
