"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savepdt = exports.getProductData = exports.getCategorieData = void 0;
const repository_1 = require("../../infrastructure/routers/database/repository");
const getCategorieData = async () => {
    try {
        const getData = await (0, repository_1.getCategories)();
        if (getData.status === 200)
            return {
                status: 200,
                categoryData: getData.categoryData
            };
        else
            return {
                status: 400,
                categoryData: null
            };
    }
    catch (error) {
        return {
            status: 500,
            categoryData: null
        };
    }
};
exports.getCategorieData = getCategorieData;
const getProductData = async (id) => {
    try {
        console.log(id, 'id2');
        const data = await (0, repository_1.getProduct)(id);
        console.log(data, 'data');
        if (data.status === 200)
            return {
                status: 200,
                productData: data.productData
            };
        else
            return {
                status: 400,
                productData: null
            };
    }
    catch (error) {
        return {
            status: 500,
            productData: null
        };
    }
};
exports.getProductData = getProductData;
const savepdt = async (data) => {
    try {
        data.categoryName = data.brand;
        data.products = [];
        const product = {
            price: data.price,
            productName: data.productName,
            productImage: data.productImage
        };
        data.products.push(product);
        const response = await (0, repository_1.saveProduct)(data);
        if (response.status === 200)
            return {
                status: 200,
                message: response.message
            };
        else
            return {
                status: 400,
                message: response.message
            };
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal server error"
        };
    }
};
exports.savepdt = savepdt;
