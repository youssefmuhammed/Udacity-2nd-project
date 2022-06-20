import express, { Request, Response } from 'express';
import { product, productDatabase } from '../models/products';
import { authintication, verifyAuthToken } from '../authorization';

const database = new productDatabase();

const index = async (_req: Request, res: Response) => {
  try {
    const product = await database.index();
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const showProduct = async (req: Request, res: Response) => {
  try {
    const product = await database.showProduct(
      req.params.id as unknown as number
    );
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await database.createProduct(req.body);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await database.deleteProduct(
      req.params.id as unknown as number
    );
    res.json(deletedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const updateProduct: product = {
      name: req.body.name,
      price: req.body.price,
      id: req.body.id
    };
    const Updatedproduct = await database.updateProduct(
      req.body.id,
      updateProduct
    );
    res.json(Updatedproduct);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

const productHandler = (app: express.Application) => {
  app.get('/products', verifyAuthToken, index);
  app.get('/product/:id', verifyAuthToken, showProduct);
  app.post('/product', createProduct);
  app.delete('/deleteProduct/:id', verifyAuthToken, deleteProduct);
  app.put('/updateProduct', verifyAuthToken, updateProduct);
};

export default productHandler;
