import { Product, RequestBody, Status } from '../../domain/models/products';
import { getCategories, getProduct, saveProduct } from '../../infrastructure/routers/database/repository';

export const getCategorieData = async ():Promise<Status> =>{
try {
    const getData = await getCategories()
    if(getData.status === 200)return{
        status : 200,
        categoryData : getData.categoryData
    }
    else return {
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

export const getProductData = async (id : string):Promise<Status> =>{
    try {
        console.log(id,'id2')
        const data = await getProduct(id)
console.log(data,'data')
        if(data.status === 200) return{
            status : 200,
            productData : data.productData
        }
        else return{
            status : 400,
            productData : null
        }
    } catch (error) {
        return {
            status : 500,
            productData : null
        }
    }
   
}
export const savepdt = async (data : RequestBody)=>{
    try {
        data.categoryName = data.brand
        data.products = []
        const product ={
            price : data.price,
            productName : data.productName,
            productImage : data.productImage
        } 
        data.products.push(product)

        const response = await saveProduct(data)
        if(response.status === 200) return{
            status : 200,
            message : response.message
        }
        else return{
            status : 400,
            message : response.message
        }
        
    } catch (error) {
        return{
            status : 500,
            message : "Internal server error"
        }
    }
}
