import decks from '../models/decks.js'

export const createDeck = async (req, res) => {
  try {
    const result = await decks.create({
      name: req.body.name,
      description: req.body.description,
      playstyle: req.body.playstyle,
      decklogic: req.body.decklogic,
      image: req.file?.path || '',
      article: req.body.article
    })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 抓上架
export const getDecks = async (req, res) => {
  try {
    const result = await decks.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 抓全部卡片
export const getAllDecks = async (req, res) => {
  try {
    const result = await decks.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 抓單個卡片
export const getDeck = async (req, res) => {
  try {
    const result = await decks.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 編輯新卡
export const editDeck = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      playstyle: req.body.playstyle,
      decklogic: req.body.decklogic,
      article: req.body.article
    }
    if (req.file) data.image = req.file.path
    const result = await decks.findByIdAndUpdate(req.params.id, data, { new: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 刪除新卡
export const deleteDecks = async (req, res) => {
  try {
    await decks.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
