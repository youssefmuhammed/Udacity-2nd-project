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
describe('products Handler', () => {
    const newProduct = {
        name: 'product 1 ',
        price: 10,
        id: 1
    };
    beforeAll(async () => {
        const newUser = {
            firstName: 'user4 ',
            lastName: 'user4',
            userName: 'user 4',
            password: '1234'
        };
        const response = await request.post('/user').send(newUser);
        token = response.body;
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
    it('update product by id ', async () => {
        const product = {
            name: 'product 2',
            price: 20,
            id: 1
        };
        const response = await request.put('/updateProduct').auth(token, { type: 'bearer' }).expect(200);
    });
});
