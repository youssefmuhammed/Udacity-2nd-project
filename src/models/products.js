"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDatabase = void 0;
const database_1 = __importDefault(require("../database"));
class productDatabase {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const data = await connection.query(sql);
            connection.release();
            return data.rows;
        }
        catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }
    async showProduct(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id = ($1)';
            const data = await connection.query(sql, [id]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get product ${err}`);
        }
    }
    async createProduct(product) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
            const data = await connection.query(sql, [product.name, product.price]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot Create product ${err}`);
        }
    }
    async updateProduct(id, product) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'UPDATE products SET name = $1, price = $2 WHERE id = ($3) RETURNING *';
            const data = await connection.query(sql, [product.name, product.price, id]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot Update product ${err}`);
        }
    }
    async deleteProduct(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id= ($1)';
            const data = await connection.query(sql, [id]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot Delete product ${err}`);
        }
    }
}
exports.productDatabase = productDatabase;
