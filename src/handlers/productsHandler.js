"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const database = new products_1.productDatabase();
const index = async (_req, res) => {
    try {
        const product = await database.index();
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const showProduct = async (req, res) => {
    try {
        const product = await database.showProduct(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const createProduct = async (req, res) => {
    try {
        const newProduct = await database.createProduct(req.body);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await database.deleteProduct(req.params.id);
        res.json(deletedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const updateProduct = async (req, res) => {
    try {
        const updateProduct = {
            name: req.body.name,
            price: req.body.price,
            id: req.body.id,
        };
        const Updatedproduct = await database.updateProduct(req.body.id, updateProduct);
        res.json(Updatedproduct);
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const productHandler = (app) => {
    app.get('/products', index);
    app.get('/product/:id', showProduct);
    app.post('/product', createProduct);
    app.delete('/deleteProduct/:id', deleteProduct);
    app.put('/updateProduct', updateProduct);
};
exports.default = productHandler;
