export interface Product {
    productId: number;
    productName: string;
    price: number;
    productImage: string;
    brand: string;
  }
  
 export interface Category {
    categoryId: number;
    categoryName: string;
    products: Product[];
  }

 export interface Status {
    status : number
  }