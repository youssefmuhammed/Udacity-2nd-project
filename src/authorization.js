"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authintication = exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = require("../src/models/users");
dotenv_1.default.config();
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const database = new users_1.userDatabase();
const verifyAuthToken = (req, res, next) => {
    const authHead = req.headers.authorization;
    const token = authHead.split('')[1];
    try {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401);
        res.json("Access denied, invalid token");
        return false;
    }
};
exports.verifyAuthToken = verifyAuthToken;
function grabToken(newUser) {
    return jsonwebtoken_1.default.sign({ newUser }, SECRET_TOKEN);
}
const authintication = async (req, res) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;
        if (userName === undefined || password === undefined) {
            res.status(400);
            res.send('please provide the Username and Password');
            return false;
        }
        const newUser = await database.authintication(userName, password);
        if (newUser === null) {
            res.send(' Authorization Refused');
            return false;
        }
        res.json(grabToken);
    }
    catch (err) {
        res.json(err);
    }
};
exports.authintication = authintication;
