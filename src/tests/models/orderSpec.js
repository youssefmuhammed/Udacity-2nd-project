"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const model = new orders_1.orderDatabase();
describe('Order Model', () => {
    it('should have an index method', () => {
        expect(model.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(model.showOrder).toBeDefined();
    });
    it('should have a create method', () => {
        expect(model.createOrder).toBeDefined();
    });
    it('should have an update method', () => {
        expect(model.updateOrder).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(model.deleteOrder).toBeDefined();
    });
});
