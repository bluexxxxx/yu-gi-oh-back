import express from 'express'
import admin from '../middleware/admin.js'
import * as auth from '../middleware/auth.js'
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  deleteOrders
} from '../controllers/orders.js'

const router = express.Router()

router.post('/', auth.jwt, createOrder)
// 一個自己的
router.get('/', auth.jwt, getMyOrders)
// 一個全部的
router.get('/all', auth.jwt, admin, getAllOrders)
// 刪除
router.delete('/:id', auth.jwt, admin, deleteOrders)

export default router
