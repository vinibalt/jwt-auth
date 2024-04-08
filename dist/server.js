"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
app.use(express_1.default.json());
route.get('/', (req, res) => {
    res.json({
        message: 'Welcome to jwt_auth app!'
    });
});
app.listen('8080', () => {
    console.log('Server listening on port 8080');
});
