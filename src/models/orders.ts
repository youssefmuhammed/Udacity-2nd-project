import client from '../database';

export type order = {
  productID: number;
  userID: number;
  quantity: number;
  id: number;
};

export class orderDatabase {
  async index(): Promise<order[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders';
      const data = await connection.query(sql);
      connection.release();
      return data.rows;
    } catch (err) {
      throw new Error(`Cannot get orders ${err}`);
    }
  }
  async showOrder(id: number): Promise<order> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id = ($1)';
      const data = await connection.query(sql, [id]);
      connection.release();
      return data.rows[0];
    } catch (err) {
      throw new Error(`Cannot get order ${err}`);
    }
  }
  async createOrder(newOrder: order): Promise<order> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO orders (productID, userID, quantity) VALUES ($1, $2, $3) RETURNING *';
      const data = await connection.query(sql, [
        newOrder.productID,
        newOrder.userID,
        newOrder.quantity
      ]);
      connection.release();
      return data.rows[0];
    } catch (err) {
      throw new Error(`Cannot Create order ${err}`);
    }
  }
  async updateOrder(id: number, newOrder: order): Promise<order> {
    try {
      const connection = await client.connect();
      const sql =
        'UPDATE orders SET productID = $1, userID = $2, quantity = $3 WHERE id = ($3) RETURNING *';
      const data = await connection.query(sql, [
        newOrder.productID,
        newOrder.userID,
        newOrder.quantity,
        id
      ]);
      connection.release();
      return data.rows[0];
    } catch (err) {
      throw new Error(`Cannot Update order ${err}`);
    }
  }
  async deleteOrder(id: number): Promise<order> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM orders WHERE id= ($1)';
      const data = await connection.query(sql, [id]);
      connection.release();
      return data.rows[0];
    } catch (err) {
      throw new Error(`Cannot Delete order ${err}`);
    }
  }
}
