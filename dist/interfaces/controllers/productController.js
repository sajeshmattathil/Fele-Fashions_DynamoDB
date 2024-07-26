"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProduct = exports.getProduct = exports.getCategories = void 0;
const productUseCase_1 = require("../../application/useCases/productUseCase");
const getCategories = async (req, res) => {
    try {
        const response = await (0, productUseCase_1.getCategorieData)();
        if (response.status === 200 && response?.categoryData) {
            res.status(200).json({
                totalCategories: response?.categoryData.length,
                categories: response?.categoryData,
            });
        }
    }
    catch (error) { }
    res.json({ message: "Get all products" });
};
exports.getCategories = getCategories;
const getProduct = async (req, res) => {
    try {
        let categoryId = req.query.categoryId;
        console.log(categoryId, "id");
        const response = await (0, productUseCase_1.getProductData)(categoryId = '1');
        if (response.status === 200 && response.productData)
            res.status(200).json(response?.productData);
        else if (response.status === 400)
            res.status(400).json({ message: "Bad request" });
        else
            res.status(404).json({ message: "Not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Interval server error, try again" });
    }
};
exports.getProduct = getProduct;
const saveProduct = async (req, res) => {
    try {
        const response = await (0, productUseCase_1.savepdt)(req.body);
        if (response.status === 200)
            res.json({ message: response.message });
        else if (response.status === 400)
            res.status(400).json({ message: response.message });
        else
            res.status(404).json({ message: response.message });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.saveProduct = saveProduct;
