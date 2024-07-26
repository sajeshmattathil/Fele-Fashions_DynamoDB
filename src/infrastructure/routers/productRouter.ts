import { validator } from './../../interfaces/middleware/validator';
import express from "express"
import { getCategories, getProduct, saveProduct } from "../../interfaces/controllers/productController"
const router = express.Router()

router.get('/categories',validator,getCategories)
router.get('/list',validator,getProduct)
router.post('/save',validator,saveProduct)

export default router