import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '缺少名稱欄位']
  },
  description: {
    type: String,
    required: [true, '缺少描述欄位']
  },
  image: {
    type: String
  },
  type: {
    type: String,
    enum: {
      values: ['通常怪獸', '效果怪獸', '儀式怪獸', '融合怪獸', '同步怪獸', '超量怪獸', '連結怪獸', '魔法', '陷阱'],
      message: '卡片分類錯誤'
    }
  },
  attr: {
    type: String,
    enum: {
      values: ['光', '暗', '水', '炎', '地', '風', '神', '魔', '罠'],
      message: '種類分類錯誤'
    }
  }
}, { versionKey: false })

export default mongoose.model('newcards', schema)
