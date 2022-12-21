"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes_1 = __importDefault(require("./routes/routes"));
var mainRouter = (0, express_1.Router)();
mainRouter.get('/', function (_req, res) {
    res.status(200).send('Welcome to my Resize App Project');
});
mainRouter.use('/api', routes_1.default);
exports.default = mainRouter;
