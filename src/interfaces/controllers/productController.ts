import { Request, Response } from "express";
import {
  getCategorieData,
  getProductData,
  savepdt,
} from "../../application/useCases/productUseCase";



export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await getCategorieData();
    if (response.status === 200 && response?.categoryData) {
      res.status(200).json({
        totalCategories: response?.categoryData.length,
        categories: response?.categoryData,
      });
    }
  } catch (error) {}
  res.json({ message: "Get all products" });
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let categoryId = req.query.categoryId;

    console.log(categoryId, "id");

    const response = await getProductData(categoryId = '1');

    if (response.status === 200 && response.productData) res.status(200).json(response?.productData);
    else if (response.status === 400)
      res.status(400).json({ message: "Bad request" });
    else res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: "Interval server error, try again" });
  }
};

export const saveProduct = async (
  req: Request,
  res: Response

): Promise<void> => {
  try {
    const response = await savepdt(req.body);
    if (response.status === 200) res.json({ message: response.message });
    else if (response.status === 400)
      res.status(400).json({ message: response.message });
    else res.status(404).json({ message: response.message });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
