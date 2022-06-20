"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const authorization_1 = require("../authorization");
const database = new orders_1.orderDatabase();
const index = async (_req, res) => {
    try {
        const order = await database.index();
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const showOrder = async (req, res) => {
    try {
        const order = await database.showOrder(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const createOrder = async (req, res) => {
    try {
        const newOrder = await database.createOrder(req.body);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const deleteOrder = async (req, res) => {
    try {
        const deleteOrder = await database.deleteOrder(req.params.id);
        res.json(deleteOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const updateOrder = async (req, res) => {
    try {
        const updateOrder = {
            productID: req.body.productID,
            userID: req.body.userID,
            quantity: req.body.quantity,
            id: req.body.id
        };
        const Updatedorder = await database.updateOrder(req.body.id, updateOrder);
        res.json(Updatedorder);
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const orderHandler = (app) => {
    app.get('/orders', authorization_1.verifyAuthToken, index);
    app.get('/order/:id', authorization_1.verifyAuthToken, showOrder);
    app.post('/order', createOrder);
    app.delete('/deleteOrder/:id', authorization_1.verifyAuthToken, deleteOrder);
    app.put('/updateOrder', authorization_1.verifyAuthToken, updateOrder);
};
exports.default = orderHandler;
