import 'dotenv/config'
import axios from 'axios'
import cheerio from 'cheerio'
import opencc from 'node-opencc'
import newcard from './models/newcards.js'
import mongoose from 'mongoose';
// const fs = require('fs')
const main = async () => {
  mongoose.connect(process.env.DB_URL)
  const output = []
  const { data } = await axios.get('https://ygocdb.com/pack/1000000885000')
  const $ = cheerio.load(data)
  const cards = $('.row.card.result')
  cards.each(async function (i, elem) {
    const img = $(this).find('img').attr('data-original').replace('!half', '')

    const cnName = $(this).find('.names h2').eq(0).text()
    const twName = opencc.simplifiedToTaiwan($(this).find('.names h2').eq(0).text())
    // const twName = opencc.simplifiedToTaiwanWithPhrases($(this).find('.names h2').eq(0).text())
    const jpName = $(this).find('.names h3').eq(0).text()
    $(this).find('.desc strong').remove()

    const desc = $(this).find('.desc').html().split('<hr>')
    const cnDescText = desc[1].replace(/<br>/g, '\n').trim()
    const twDescText = opencc.simplifiedToTaiwan(cnDescText)

    // Find
    // [魔法|速攻]
    // [怪兽|效果] 恶魔/暗
    // [怪兽|效果] 爬虫类/暗
    // [怪兽|效果|调整] 恶魔/光
    // [魔法|速攻]
    // [魔法]
    const attr = desc[0].trim().split('<br>')
    // Find
    // [魔法|速攻]
    // [怪兽|效果]
    // [怪兽|效果|调整]
    const typesRegexp = /\[(.*)\]/g
    const types = typesRegexp.exec(attr[0])[1]
    const cnTypes = types.split('|')
    const twTypes = opencc.simplifiedToTaiwan(types).split('|')

    const data = {
      name: jpName,
      description: twDescText
    }

    if (types.includes('怪兽')) {
      // Find
      // 恶魔/暗
      // 爬虫类/暗
      const attrs = attr[0].replace(typesRegexp, '').trim()
      const cnAttrs = attrs.split('/')
      const twAttrs = opencc.simplifiedToTaiwan(attrs).split('/')
      data.attrs = {
        cn: cnAttrs,
        tw: twAttrs
      }
      // Link monsters
      if (types.includes('连接')) {
        // Find
        // [LINK-2] 1400/- [↑][←]
        const linkRegex = /\[LINK-([0-9])+\]\s([0-9]+)\/-\s\[(.*)\]/g
        const link = linkRegex.exec(attr[1])
        data.link = parseInt(link[1])
        data.atk = parseInt(link[2])
        data.arrows = link[3].split('][')
      }

      // Normal
      else {
        // Find
        // [★10] 3200/2300
        const monsterRegex = /\[★([0-9]+)\]\s([0-9]+)\/([0-9]+)/g
        const monster = monsterRegex.exec(attr[1])
        data.level = parseInt(monster[1])
        data.atk = parseInt(monster[2])
        data.def = parseInt(monster[3])
      }
    }
    output.push(data)
  })
  try{
    await newcard.insertMany(output)
  }catch(err) {
    console.log(err)
  }
  // fs.writeFileSync('output.json', JSON.stringify(output, null, 2))
}

main()
