"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProduct = exports.getProduct = exports.getCategories = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const dbConfig_1 = require("./dbConfig");
const getCategories = async () => {
    try {
        const command = new client_dynamodb_1.ScanCommand({
            TableName: "products",
            ProjectionExpression: "categoryId, categoryName"
        });
        const response = await dbConfig_1.db.send(command);
        if (response.Items?.length) {
            console.log(response.Items, 'items');
            const filteredData = response.Items.map(item => ({
                categoryId: item.categoryId.N ? parseInt(item.categoryId.N, 10) : 0,
                categoryName: item.categoryName.S
            }));
            if (filteredData.length)
                return {
                    status: 200,
                    categoryData: filteredData
                };
            else
                return {
                    status: 200,
                    categoryData: []
                };
        }
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
exports.getCategories = getCategories;
const getProduct = async (categoryId) => {
    try {
        console.log(typeof (categoryId), 'id3');
        // categoryId = Number(categoryId)
        const command = new client_dynamodb_1.QueryCommand({
            TableName: "products",
            KeyConditionExpression: "categoryId = :categoryId",
            ExpressionAttributeValues: {
                ":categoryId": { N: categoryId.toString() },
            },
        });
        const response = await dbConfig_1.db.send(command);
        console.log(response, 'res by id');
        let filteredData = [];
        filteredData = (response.Items || []).map((item) => ({
            categoryId: Number(item.categoryId?.N),
            categoryName: item.categoryName?.S || '',
            products: (item.products?.L || []).map((product) => {
                const productMap = product.M || {};
                return {
                    price: parseFloat(productMap.price?.N || '0'),
                    productName: productMap.productName?.S || '',
                    productImage: productMap.productImage?.S || ''
                };
            })
        }));
        if (Object.keys(response))
            return {
                status: 200,
                productData: filteredData
            };
        else
            return {
                status: 400,
                productData: null
            };
    }
    catch (error) {
        console.log(error?.message, 'msg');
        return {
            status: 500,
            productData: null
        };
    }
};
exports.getProduct = getProduct;
const saveProduct = async (data) => {
    try {
        console.log(data, 'data');
        if (!data || !data.categoryId || !data.products || !data.categoryName) {
            throw new Error("Invalid data provided");
        }
        let params;
        if (data && data.categoryId && data.products && data.categoryName) {
            params = {
                TableName: "products",
                Item: {
                    categoryId: { N: data.categoryId.toString() },
                    categoryName: { S: data.categoryName },
                    products: { L: data.products.map(product => ({
                            M: {
                                price: { N: product.price?.toString() || '0' },
                                productName: { S: product.productName || '' },
                                productImage: { S: product.productImage || '' }
                            }
                        }))
                    }
                }
            };
            const command = new client_dynamodb_1.PutItemCommand(params);
            const response = await dbConfig_1.db.send(command);
            console.log(response, 'data stored');
            if (response?.$metadata?.httpStatusCode === 200) {
                return {
                    status: 200,
                    message: "Product added successfully"
                };
            }
            else {
                return {
                    status: 400,
                    message: "Product adding failed"
                };
            }
        }
        else
            return {
                status: 400,
                message: "Product adding failed"
            };
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal server error"
        };
    }
};
exports.saveProduct = saveProduct;
