import newcards from '../models/newcards.js'

export const createNewcard = async (req, res) => {
  try {
    const result = await newcards.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file?.path || '',
      type: req.body.type,
      attr: req.body.attr
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
export const getNewcards = async (req, res) => {
  try {
    const result = await newcards.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 抓全部卡片
export const getAllNewcards = async (req, res) => {
  try {
    const result = await newcards.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 抓單個卡片
export const getNewcard = async (req, res) => {
  try {
    const result = await newcards.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 編輯新卡
export const editNewcard = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      attr: req.body.attr
    }
    if (req.file) data.image = req.file.path
    const result = await newcards.findByIdAndUpdate(req.params.id, data, { new: true })
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
export const deleteNewcards = async (req, res) => {
  try {
    await newcards.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
