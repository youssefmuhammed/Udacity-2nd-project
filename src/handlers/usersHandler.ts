import express, { Request, Response } from 'express';
import { user, userDatabase } from '../models/users';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import client from '../database';
import bcrypt from 'bcrypt';
import { authintication, verifyAuthToken } from '../authorization';
const BCRYPT_PASSWORD = process.env.BCRYPT_PASSWORD as unknown as string;

dotenv.config();

const database = new userDatabase();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await database.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const users = await database.show(req.params.id as unknown as number);
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// const createUser = async (req: Request, res: Response) => {
//     try {
//         const newUser = await database.createUser(req.body)
//         res.json(newUser);
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// }
const SECRET_TOKEN = process.env.SECRET_TOKEN as Secret;
const createUser = async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const password = req.body.password;
  try {
    const newUser = await database.createUser({
      firstName,
      lastName,
      userName,
      password
    });
    var token = jwt.sign({ user: newUser }, SECRET_TOKEN);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await database.deleteUser(
      req.params.id as unknown as number
    );
    res.json(deletedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const updateUser: user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password
    };
    const UpdatedUser = await database.updateUser(req.body.id, updateUser);
    res.json(UpdatedUser);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};
// const authintication = async (userName : user , password : user) : Promise <user | null> => {
//     const connection = await client.connect()
//     const sql = 'SELECT password FROM users WHERE username = ($1)'
//     const data = await connection.query(sql , [userName])
//     if (data.rows.length) {
//         const user = data.rows[0]
//     console.log(user)
//         if (bcrypt.compareSync(password+ BCRYPT_PASSWORD , user.password)) {
//             return user
//         }
//         return null
//     }
//     connection.release()
//     return null
// }
// function grabToken (newUser: user) {
//     return jwt.sign({newUser}, SECRET_TOKEN)
// }
// const authintication = async (req :Request , res:Response) => {
// try {
//     const userName = req.body.userName
//     const password = req.body.password
//     if (userName === undefined || password === undefined) {
//     res.status(400)
//     res.send('please provide the Username and Password')
//     return false
//     }
//     const newUser : user | null =await database.authintication(userName , password)
//     if (newUser === null ) {
//     res.send ( ' Authorization Refused')
//     return false
//     }
//   res.json(grabToken)

// } catch (err) {
//     res.json(err)
// }
// }

// const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
//     const authHead = req.headers.authorization as unknown as string
//     const token = authHead
//     try {
//         jwt.verify(token, process.env.TOKEN_SECRET as Secret)
//         next()
//     } catch (error) {
//         res.status(401)
//     }
// }
const userHandler = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/user/:id', verifyAuthToken, show);
  app.post('/user', createUser);
  app.delete('/deleteUser/:id', verifyAuthToken, deleteUser);
  app.put('/updateUser', verifyAuthToken, updateUser);
};

export default userHandler;
