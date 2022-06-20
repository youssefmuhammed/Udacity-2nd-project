"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authorization_1 = require("../authorization");
const BCRYPT_PASSWORD = process.env.BCRYPT_PASSWORD;
dotenv_1.default.config();
const database = new users_1.userDatabase();
const index = async (_req, res) => {
    try {
        const users = await database.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const users = await database.show(req.params.id);
        res.json(users);
    }
    catch (err) {
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
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const createUser = async (req, res) => {
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
        var token = jsonwebtoken_1.default.sign({ user: newUser }, SECRET_TOKEN);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await database.deleteUser(req.params.id);
        res.json(deletedUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const updateUser = async (req, res) => {
    try {
        const updateUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password
        };
        const UpdatedUser = await database.updateUser(req.body.id, updateUser);
        res.json(UpdatedUser);
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
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
const userHandler = (app) => {
    app.get('/users', authorization_1.verifyAuthToken, index);
    app.get('/user/:id', authorization_1.verifyAuthToken, show);
    app.post('/user', createUser);
    app.delete('/deleteUser/:id', authorization_1.verifyAuthToken, deleteUser);
    app.put('/updateUser', authorization_1.verifyAuthToken, updateUser);
};
exports.default = userHandler;
