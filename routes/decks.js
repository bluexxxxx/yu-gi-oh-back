import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  createDeck,
  getDecks,
  getAllDecks,
  getDeck,
  editDeck,
  deleteDecks
} from '../controllers/decks.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, admin, upload, createDeck)
router.get('/', getDecks)
router.get('/all', auth.jwt, admin, getAllDecks)
// 這邊做抓單個卡片
router.get('/:id', getDeck)
// 更新
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload, editDeck)
// 刪除
router.delete('/:id', auth.jwt, admin, deleteDecks)

export default router
