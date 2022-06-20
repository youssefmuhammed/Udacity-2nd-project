"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.app);
describe('Test server endpoints response', () => {
    it('Gets the main endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});
