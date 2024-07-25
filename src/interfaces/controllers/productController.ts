import { Request,Response } from "express";

export const getCategories = (req: Request, res: Response): void => {
    res.json({ message: 'Get all products' });
  };

 export const getProduct = (req: Request, res: Response): void => {
    // Logic to get products
    res.json({ message: 'Get all products' });
  }; 

  export const saveProduct = (req: Request, res: Response): void => {
    // Logic to get products
    res.json({ message: 'Get all products' });
  };