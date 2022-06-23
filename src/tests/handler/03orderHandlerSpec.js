"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
const request = (0, supertest_1.default)(server_1.app);
describe('order Handler', () => {
    const newUser = {
        firstName: 'user5 ',
        lastName: 'user5',
        userName: 'user 5',
        password: '1234'
    };
    const newProduct = {
        name: 'product2',
        price: 30,
        id: 2
    };
    let token = '';
    beforeAll(async () => {
        const response = await request.post('/user').send(newUser);
        request.post('/product').send(newProduct);
        token = response.body;
    });
    console.log(token);
    it('create order ', async () => {
        const newOrder = {
            user_id: 4,
            quantity: 50,
            id: 1
        };
        const response = await request.post('/order').send(newOrder).expect(200);
    });
    it('dont show all orders without authonitication ', async () => {
        const response = await request.get('/orders').expect(401);
    });
    it('show all orders with authonitication ', async () => {
        const response = await request.get('/orders').auth(token, { type: 'bearer' }).expect(200);
    });
    it('update order', async () => {
        const updateOrder = {
            user_id: 4,
            quantity: 200,
            id: 5
        };
        const response = await request.put('/updateOrder/5').send(updateOrder).auth(token, { type: 'bearer' }).expect(200);
    });
    it('delete order  ', async () => {
        const response = await request.delete('/deleteOrder/1').auth(token, { type: 'bearer' }).expect(200);
    });
});
