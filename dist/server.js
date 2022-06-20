"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var usersHandler_1 = __importDefault(require("./handlers/usersHandler"));
var productsHandler_1 = __importDefault(require("./handlers/productsHandler"));
var ordersHandlers_1 = __importDefault(require("./handlers/ordersHandlers"));
var path_1 = __importDefault(require("path"));
exports.app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
var corsOptions = {
    origin: 'htt://someotherdomain.com',
    optionsSuccessStatus: 200
};
exports.app.use((0, cors_1["default"])(corsOptions));
exports.app.use(body_parser_1["default"].json());
exports.app.get('/', function (req, res) {
    res.sendFile(path_1["default"].join(__dirname + '/index.html'));
});
(0, usersHandler_1["default"])(exports.app);
(0, productsHandler_1["default"])(exports.app);
(0, ordersHandlers_1["default"])(exports.app);
exports.app.listen(3000, function () {
    console.log("start at ".concat(address));
});
