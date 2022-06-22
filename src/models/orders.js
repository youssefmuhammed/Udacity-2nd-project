"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDatabase = void 0;
const database_1 = __importDefault(require("../database"));
class orderDatabase {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const data = await connection.query(sql);
            connection.release();
            return data.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders ${err}`);
        }
    }
    async showOrder(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id = ($1)';
            const data = await connection.query(sql, [id]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get order ${err}`);
        }
    }
    async createOrder(newOrder) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO orders (user_id, quantity) VALUES ($1, $2) RETURNING *';
            const data = await connection.query(sql, [newOrder.user_id, newOrder.quantity]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot Create order ${err}`);
        }
    }
    async updateOrder(id, newOrder) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'UPDATE orders SET user_id = $1,  quantity= $2, WHERE id = ($3) RETURNING *';
            const data = await connection.query(sql, [
                newOrder.user_id,
                newOrder.quantity,
                id
            ]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot Update order ${err}`);
        }
    }
    async deleteOrder(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'DELETE FROM orders WHERE id= ($1)';
            const data = await connection.query(sql, [id]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot Delete order ${err}`);
        }
    }
}
exports.orderDatabase = orderDatabase;
