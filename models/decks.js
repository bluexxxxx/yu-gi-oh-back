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
  playstyle: {
    type: String
  },
  decklogic: {
    type: String
  },
  image: {
    type: String
  },
  article: {
    type: String
  }
}, { versionKey: false })

export default mongoose.model('decks', schema)
