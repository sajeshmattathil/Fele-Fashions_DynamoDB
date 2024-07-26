import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION || "us-east-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing AWS credentials in environment variables");
}

const client = new DynamoDBClient({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

const db = DynamoDBDocumentClient.from(client);

const Table = 'products';

export {
    db,
    Table
};
