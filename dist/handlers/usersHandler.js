"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var users_1 = require("../models/users");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var authorization_1 = require("../authorization");
var BCRYPT_PASSWORD = process.env.BCRYPT_PASSWORD;
dotenv_1["default"].config();
var database = new users_1.userDatabase();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, database.index()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, database.show(req.params.id)];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// const createUser = async (req: Request, res: Response) => {
//     try {
//         const newUser = await database.createUser(req.body)
//         res.json(newUser);
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// }
var SECRET_TOKEN = process.env.SECRET_TOKEN;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var firstName, lastName, userName, password, newUser, token, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                firstName = req.body.firstName;
                lastName = req.body.lastName;
                userName = req.body.userName;
                password = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, database.createUser({ firstName: firstName, lastName: lastName, userName: userName, password: password })];
            case 2:
                newUser = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: newUser }, SECRET_TOKEN);
                res.json(token);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedUser, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, database.deleteUser(req.params.id)];
            case 1:
                deletedUser = _a.sent();
                res.json(deletedUser);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400);
                res.json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updateUser_1, UpdatedUser, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                updateUser_1 = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    password: req.body.password
                };
                return [4 /*yield*/, database.updateUser(req.body.id, updateUser_1)];
            case 1:
                UpdatedUser = _a.sent();
                res.json(UpdatedUser);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400);
                res.json(err_5.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
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
var userHandler = function (app) {
    app.get('/users', authorization_1.verifyAuthToken, index);
    app.get('/user/:id', authorization_1.verifyAuthToken, show);
    app.post('/user', createUser);
    app["delete"]('/deleteUser/:id', authorization_1.verifyAuthToken, deleteUser);
    app.put('/updateUser', authorization_1.verifyAuthToken, updateUser);
};
exports["default"] = userHandler;
