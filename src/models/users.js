"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDatabase = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class userDatabase {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const data = await connection.query(sql);
            connection.release();
            return data.rows;
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const data = await connection.query(sql, [id]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }
    async createUser(newUser) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstName, lastName, userName , password ) VALUES ($1, $2, $3,$4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(newUser.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS, 10));
            const data = await connection.query(sql, [newUser.firstName, newUser.lastName, newUser.userName, hash]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot Create user ${err}`);
        }
    }
    async authintication(userName, password) {
        const connection = await database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE username = ($1)';
        const data = await connection.query(sql, [userName]);
        if (data.rows.length) {
            const user = data.rows[0];
            console.log(user);
            if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                return user;
            }
            return null;
        }
        connection.release();
        return null;
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
    async updateUser(id, newUser) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'UPDATE users SET firstName = $1, lastName = $2, userName = $3 WHERE id = ($4) RETURNING *';
            const data = await connection.query(sql, [newUser.firstName, newUser.lastName, newUser.userName, id]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot Update user ${err}`);
        }
    }
    async deleteUser(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id= ($1)';
            const data = await connection.query(sql, [id]);
            connection.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot Delete user ${err}`);
        }
    }
}
exports.userDatabase = userDatabase;
