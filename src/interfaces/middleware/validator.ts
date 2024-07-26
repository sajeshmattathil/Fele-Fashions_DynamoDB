import { NextFunction, Request, Response } from "express";


export const validator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const api_key = req.headers["x-api-key"];
    console.log(api_key,'api_key')

    if (!api_key || api_key !== process.env.API_KEY) {
        res.status(401).json({ message: "Api key validation failed" });
        return  
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server failed" });
  }
};
