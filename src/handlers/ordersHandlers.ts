import express, { Request, Response } from 'express';
import { order, orderDatabase } from '../models/orders';
import { authintication, verifyAuthToken } from '../authorization';

const database = new orderDatabase();

const index = async (_req: Request, res: Response) => {
  try {
    const order = await database.index();
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const showOrder = async (req: Request, res: Response) => {
  try {
    const order = await database.showOrder(req.params.id as unknown as number);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await database.createOrder(req.body);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleteOrder = await database.deleteOrder(
      req.params.id as unknown as number
    );
    res.json(deleteOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const updateOrder: order = {
      user_id: req.body.user_id,
      quantity: req.body.quantity,
      id: req.body.id
    };
    const Updatedorder = await database.updateOrder(req.body.id, updateOrder);
    res.json(Updatedorder);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

const orderHandler = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/order/:id', verifyAuthToken, showOrder);
  app.post('/order', createOrder);
  app.delete('/deleteOrder/:id', verifyAuthToken, deleteOrder);
  app.put('/updateOrder/:id', verifyAuthToken, updateOrder);
};

export default orderHandler;
