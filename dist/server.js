"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// import dbConnect from "./Config/dbconnect";
// dbConnect();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const productRouter_1 = __importDefault(require("./infrastructure/routers/productRouter"));
app.use((0, cors_1.default)({
    origin: '*',
    credentials: false,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/product', productRouter_1.default);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
