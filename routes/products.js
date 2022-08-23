import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  createProduct,
  getProducts,
  getAllProducts,
  getProduct,
  editProduct
} from '../controllers/products.js'

const router = express.Router()

// 類型是auth.jwt 要admin才能看
router.post('/', content('multipart/form-data'), auth.jwt, admin, upload, createProduct)
// 商品只做下架不做刪除 這邊只顯示已上架的
router.get('/', getProducts)
// 這邊做顯示全部 給管理員看的
// 他跟下面的:id的順序有差
router.get('/all', auth.jwt, admin, getAllProducts)
// 這邊做抓單個商品
router.get('/:id', getProduct)
// 更新
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload, editProduct)

export default router
