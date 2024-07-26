"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("./../../interfaces/middleware/validator");
const express_1 = __importDefault(require("express"));
const productController_1 = require("../../interfaces/controllers/productController");
const router = express_1.default.Router();
router.get('/categories', validator_1.validator, productController_1.getCategories);
router.get('/list', validator_1.validator, productController_1.getProduct);
router.post('/save', validator_1.validator, productController_1.saveProduct);
exports.default = router;
