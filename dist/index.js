"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = __importDefault(require("./api"));
var app = (0, express_1.default)();
var port = 4000;
app.use('/', api_1.default);
app.listen(port, function () {
    console.log("app is connected successfully to localhost:".concat(port));
});
exports.default = app;
