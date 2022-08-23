import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  createNewcard,
  getNewcards,
  getAllNewcards,
  getNewcard,
  editNewcard,
  deleteNewcards
} from '../controllers/newcards.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, admin, upload, createNewcard)
router.get('/', getNewcards)
router.get('/all', auth.jwt, admin, getAllNewcards)
// 這邊做抓單個卡片
router.get('/:id', getNewcard)
// 更新
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload, editNewcard)
// 刪除
router.delete('/:id', auth.jwt, admin, deleteNewcards)
export default router
