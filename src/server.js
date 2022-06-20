"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const usersHandler_1 = __importDefault(require("./handlers/usersHandler"));
const productsHandler_1 = __importDefault(require("./handlers/productsHandler"));
const ordersHandlers_1 = __importDefault(require("./handlers/ordersHandlers"));
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
const address = '0.0.0.0:3000';
const corsOptions = {
    origin: 'htt://someotherdomain.com',
    optionsSuccessStatus: 200
};
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use(body_parser_1.default.json());
exports.app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname + '/index.html'));
});
(0, usersHandler_1.default)(exports.app);
(0, productsHandler_1.default)(exports.app);
(0, ordersHandlers_1.default)(exports.app);
exports.app.listen(3000, function () {
    console.log(`start at ${address}`);
});
