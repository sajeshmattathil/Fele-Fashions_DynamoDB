import express from "express"
import { getCategories, getProduct, saveProduct } from "../../interfaces/controllers/productController"
const router = express.Router()

router.get('/categories',getCategories)
router.get('/list',getProduct)
router.post('/save',saveProduct)

export default router