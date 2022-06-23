"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../models/users");
const model = new users_1.userDatabase();
describe('User Model', () => {
    it('should have an index method', () => {
        expect(model.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(model.showUser).toBeDefined();
    });
    it('should have a create method', () => {
        expect(model.createUser).toBeDefined();
    });
    it('should have an update method', () => {
        expect(model.updateUser).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(model.deleteUser).toBeDefined();
    });
});
//-------------------------------------------------------------
describe('test user model methods', () => {
    it('create user and fetch all users', async () => {
        const user = {
            firstName: 'test-user',
            lastName: 'test-user',
            userName: 'test-user',
            password: '1111'
        };
        await model.createUser(user);
        const users = await model.index();
        expect(users.length).toBeGreaterThan(0);
    });
    it('update user by id ', async () => {
        const newUser = {
            firstName: 'updated-user',
            lastName: 'updated-user',
            userName: 'updated-user',
            password: '2222'
        };
        const id = 1;
        await model.updateUser(id, newUser);
        const users = await model.index();
        expect(users.length).toBeGreaterThan(0);
    });
    it('delete user by id ', async () => {
        const id = 1;
        await model.deleteUser(id);
        const result = await model.index();
        expect(result[0].firstName).not.toEqual('updated-user');
    });
});
