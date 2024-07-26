"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.db = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const region = process.env.AWS_REGION || "us-east-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing AWS credentials in environment variables");
}
const client = new client_dynamodb_1.DynamoDBClient({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});
const db = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
exports.db = db;
const Table = 'products';
exports.Table = Table;
