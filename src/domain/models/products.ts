import { Request } from 'express';
export interface Product {
    productName?: string;
    price?: number ;
    productImage?: string;
    brand?: string;
    categoryId ?: number |string
 
  }
  
 export interface Category {
    categoryId ?: number ;
    categoryName ?: string ;
    products ?: Product[] | [];
  }

 export interface Status {
   Items?: never[];
    status : number;
     categoryData ?: Category[] | null;
     productData ?: Category[] | null;
     message ?: string;
  }
  export interface RequestBody {
   categoryName: string;
   products: Product[];
   productName: string;
   price: number;
   productImage: string;
   brand: string;
   categoryId: number;
 }
 