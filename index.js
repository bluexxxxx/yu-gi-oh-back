import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
// cors用來跨域請求
import cors from 'cors'

import './passport/passport.js'
import userRouter from './routes/users.js'
import productRouter from './routes/products.js'
import ordersRouter from './routes/orders.js'
import newcardRouter from './routes/newcards.js'
import deckRouter from './routes/decks.js'

mongoose.connect(process.env.DB_URL)

const app = express()

app.use(cors({
  // origin代表進來的網址 callback代表要不要讓他過
  origin (origin, callback) {
    // 這邊console.log()出來會是前台網址
    // console.log(origin)
    // 如果我的請求有包含github跟localhost的話
    if (origin === undefined || origin.includes('github') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      // callback前面要放錯誤 放null
      callback(null, true)
    } else {
      callback(new Error('Not Allowed'), false)
    }
  }
}))
// 上面有錯的話回傳400 請求被拒
app.use((_, req, res, next) => {
  res.status(400).send({ success: false, message: '請求被拒' })
})

app.use(express.json())
// 錯誤處理 app.use((err, req, res, next) => {}) 不要的可以用底線_忽略掉
app.use((_, req, res, next) => {
  res.status(400).send({ success: false, message: '請求格式錯誤' })
})

// 引用使用者路由
app.use('/users', userRouter)
// 引用商品路由
app.use('/products', productRouter)
// 引用訂單路由
app.use('/orders', ordersRouter)
// 引用新卡路由
app.use('/newcards', newcardRouter)
// 引用專欄路由
app.use('/decks', deckRouter)

// 所有路徑
app.all('*', (req, res) => {
  res.status(404).send({ success: false, message: '找不到' })
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running')
})
