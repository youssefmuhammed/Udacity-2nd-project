import client from '../database'

export type product = {
    name:string;
    price:number;
    id:number;
}

export class productDatabase{
    async index(): Promise<product[]> {
        try{
            const connection = await client.connect()
            const sql = 'SELECT * FROM products'
            const data = await connection.query(sql)
            connection.release()
            return data.rows
        } catch(err){
            throw new Error(`Cannot get products ${err}`)
        }
    }
    async showProduct(id: number): Promise<product> {
        try{
            const connection = await client.connect()
            const sql = 'SELECT * FROM products WHERE id = ($1)'
            const data = await connection.query(sql,[id])
            connection.release()
            return data.rows[0]
        } catch(err){
            throw new Error(`Cannot get product ${err}`)
        }
    }
    async createProduct(product:product): Promise<product> {
        try{
            const connection = await client.connect()
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'
            const data = await connection.query(sql, [product.name, product.price])
            connection.release()
            return data.rows[0]
        } catch(err){
            throw new Error(`Cannot Create product ${err}`)
        }
    }
    async updateProduct(id: number, product:product): Promise<product> {
        try{
            const connection = await client.connect()
            const sql = 'UPDATE products SET name = $1, price = $2 WHERE id = ($3) RETURNING *'
            const data = await connection.query(sql, [product.name, product.price, id])
            connection.release()
            return data.rows[0]
        } catch(err){
            throw new Error(`Cannot Update product ${err}`)
        }
    }
    async deleteProduct(id: number): Promise<product> {
        try{
            const connection = await client.connect()
            const sql = 'DELETE FROM products WHERE id= ($1)'
            const data = await connection.query(sql, [id])
            connection.release()
            return data.rows[0]
        } catch(err){
            throw new Error(`Cannot Delete product ${err}`)
        }
    }
}