import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
import { user, userDatabase } from '../src/models/users';

dotenv.config();

const SECRET_TOKEN = process.env.SECRET_TOKEN;
const database = new userDatabase();

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const authHead = req.headers.authorization as string;
  const token = authHead?.split(' ')[1];
  try {
    jwt.verify(token, SECRET_TOKEN as Secret);
    next();
  } catch (error) {
    res.status(401);
    res.json(token);
    return false;
  }
};

function grabToken(newUser: user) {
  return jwt.sign({ newUser }, SECRET_TOKEN as Secret);
}

export const authintication = async (req: Request, res: Response) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    if (userName === undefined || password === undefined) {
      res.status(400);
      res.send('please provide the Username and Password');
      return false;
    }
    const newUser: user | null = await database.authintication(
      userName,
      password
    );
    if (newUser === null) {
      res.send(' Authorization Refused');
      return false;
    }
    res.send('access granted');
    res.json(grabToken);
    res.send(newUser);
  } catch (err) {
    res.json(err);
  }
};
