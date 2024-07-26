import { ScanCommand , QueryCommand, UpdateItemCommand, GetItemCommand,PutItemCommand,AttributeValue} from "@aws-sdk/client-dynamodb";
import {  Category, Product, Status } from '../../../domain/models/products';
import { db } from "./dbConfig";

export const getCategories = async ():Promise<Status> =>{
    try {
        const command = new ScanCommand({
            TableName: "products",
            ProjectionExpression: "categoryId, categoryName"
          });
         const response = await db.send(command);
          if(response.Items?.length){
            console.log(response.Items,'items')

            const filteredData = response.Items.map(item => ({
                categoryId:item.categoryId.N ? parseInt(item.categoryId.N, 10) :0,
                categoryName: item.categoryName.S
             }))

             if(filteredData.length) return {
                status : 200,
                categoryData : filteredData
             }
             else return{
                status : 200,
                categoryData : []
             }
            } else return{
            status : 400,
            categoryData : null
          }
    } catch (error) {
        return {
            status : 500,
            categoryData : null
        }
    }
}

export const getProduct = async (categoryId :  number | string) :Promise<Status> =>{
    try {
        console.log(typeof(categoryId),'id3')
        // categoryId = Number(categoryId)
        const command = new QueryCommand({
            TableName: "products",
            KeyConditionExpression: "categoryId = :categoryId",
            ExpressionAttributeValues: {
              ":categoryId": { N: categoryId.toString()}, 
            },
          });
        
          
            const response = await db.send(command);
            console.log(response,'res by id')
            let filteredData : Category[] = []

           
               filteredData = (response.Items || []).map((item: { [key: string]: AttributeValue }) => ({
                categoryId: Number(item.categoryId?.N), 
                categoryName: item.categoryName?.S || '',
                products: (item.products?.L || []).map((product: AttributeValue) => {
                  const productMap = product.M || {};
                  return {
                    price: parseFloat(productMap.price?.N || '0'), 
                    productName: productMap.productName?.S || '',
                    productImage: productMap.productImage?.S || ''
                  };
                })
              }));
            
            if(Object.keys(response)) return {
                status : 200,
                productData : filteredData
            }
           else return{
                status:400,
                productData : null
            }
    } catch (error : any) {
        console.log(error?.message,'msg')
        return{
            status:500,
            productData : null
        }
    }
}
export const saveProduct = async (data: Category): Promise<Status> => {
    try {
        console.log(data,'data')
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
                  productName: { S: product.productName  || ''},
                  productImage: { S: product.productImage || '' }
                }
              })) 
          }
        }};
  
        const command = new PutItemCommand(params);
       const response = await db.send(command);
        console.log(response,'data stored')
    if(response?.$metadata?.httpStatusCode === 200) {
        return {
            status : 200,
            message : "Product added successfully"
        }
    }
       else {
        return{
              status : 400,
            message : "Product adding failed"
        }
      }
    }else return{
           status : 400,
            message : "Product adding failed"
    }
    } catch (error) {
        return{
            status : 500,
          message : "Internal server error"
      }
    }
  };

