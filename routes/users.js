import express from 'express'
import * as auth from '../middleware/auth.js'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import {
  register,
  login,
  logout,
  extend,
  getUser,
  getAlluser,
  deleteUsers,
  addCart,
  editCart,
  getCart
} from '../controllers/users.js'

const router = express.Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.post('/extend', auth.jwt, extend)
router.get('/', auth.jwt, getUser)
router.get('/all', auth.jwt, admin, getAlluser)
router.delete('/:id', auth.jwt, admin, deleteUsers)
router.post('/cart', content('application/json'), auth.jwt, addCart)
router.patch('/cart', content('application/json'), auth.jwt, editCart)
router.get('/cart', auth.jwt, getCart)
export default router
