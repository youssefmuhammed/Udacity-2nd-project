import client from '../database'
import bcrypt from 'bcrypt'
import { Request , Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken';
const {BCRYPT_PASSWORD , SALT_ROUNDS} = process.env

export type user = {
    firstName: string;
    lastName: string;
    userName: string;
    password:string;
}
export interface userID extends user {
    id: number;
}

export class userDatabase{
    async index(): Promise<user[]> {
        try{
            const connection = await client.connect()
            const sql = "SELECT * FROM users"
            
            const data = await connection.query(sql)
            connection.release()
            return data.rows
        } catch(err){
            throw new Error(`Cannot get users ${err}`)
        }
    }
    async show(id: number): Promise<userID> {
        try{
            const connection = await client.connect()
            const sql = 'SELECT * FROM users WHERE id = ($1)'
            const data = await connection.query(sql,[id])
            connection.release()
            return data.rows[0]
        } catch(err){
            throw new Error(`Cannot get users ${err}`)
        }
    }
    async createUser(newUser:user): Promise<user> {     
        try{
            const connection = await client.connect()
            const sql = 'INSERT INTO users (firstName, lastName, userName , password ) VALUES ($1, $2, $3,$4) RETURNING *'
            const hash = bcrypt.hashSync(newUser.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string, 10))
            const data = await connection.query(sql, [newUser.firstName,newUser.lastName,newUser.userName, hash])
            connection.release()
            return data.rows[0]
        } catch(err){
            throw new Error(`Cannot Create user ${err}`)
        }
    }

async authintication (userName : string , password : string) : Promise <user | null>  {
            const connection = await client.connect()
            const sql = 'SELECT password FROM users WHERE username = ($1)'
            const data = await connection.query(sql , [userName])
            if (data.rows.length) {
                const user = data.rows[0]
            console.log(user)
                if (bcrypt.compareSync(password+ BCRYPT_PASSWORD , user.password)) {
                    return user 
                }
                return null 
            }
            connection.release()
            return null    
}
// verifyAuthToken = (req: Request, res: Response, next: () => void) => {
//     try {
//         const authorizationHeader = req.headers.authorization as string
//         const token = authorizationHeader.split(' ')[1]
//         const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret)
//         next()
//     } catch (error) {
//         res.status(401)
//     }
// }
    async updateUser(id: number, newUser:user): Promise<user> {
        try{
            const connection = await client.connect()
            const sql = 'UPDATE users SET firstName = $1, lastName = $2, userName = $3 WHERE id = ($4) RETURNING *'
            const data = await connection.query(sql, [newUser.firstName, newUser.lastName, newUser.userName, id])
            connection.release()
            return data.rows[0]
        } catch(err){
            throw new Error(`Cannot Update user ${err}`)
        }
    }
    async deleteUser(id: number): Promise<userID> {
        try{
            const connection = await client.connect()
            const sql = 'DELETE FROM users WHERE id= ($1)'
            const data = await connection.query(sql, [id])
            connection.release()
            return data.rows[0]
        } catch(err){
            throw new Error(`Cannot Delete user ${err}`)
        }
    }
}