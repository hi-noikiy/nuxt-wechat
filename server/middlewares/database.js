import fs from 'fs'
import { resolve } from 'path'
import mongoose from 'mongoose'
import config from '../config'
import R from 'ramda'

const models = resolve(__dirname, '../database/schema')

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*js$/))
  .forEach(file => require(resolve(models, file)))


const formatData = R.map(i => {
  i._id = i.nmId

  return i
})

let wikiCharacters = require(resolve(__dirname, '../database/json/completeCharacters.json'))
let wikiHouses = require(resolve(__dirname, '../database/json/completeHouses.json'))
let exProduct =require(resolve(__dirname,'../crawler/garage.json'))
let exHouse =require(resolve(__dirname,'../crawler/houses.json'))

wikiCharacters = formatData(wikiCharacters)

export const database = app => {
  mongoose.set('debug', true)

  mongoose.connect(config.db)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db)
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB ', config.db)

    const WikiHouse = mongoose.model('WikiHouse')
    const WikiCharacter = mongoose.model('WikiCharacter')
    const User = mongoose.model('User')
    const Product =mongoose.model('Product')

    const existWikiHouses = await WikiHouse.find({}).exec()
    const existWikiCharacters = await WikiCharacter.find({}).exec()
    const existProduct =await Product.find({}).exec()

    if (!existWikiHouses.length) WikiHouse.insertMany(wikiHouses)
      if (!existWikiCharacters.length) WikiCharacter.insertMany(wikiCharacters)


    if(!existProduct.length){
      for(let i =0;i<exProduct.length;i++){
         let p =exProduct[i]
         let product =new Product({
           price:p.price,
           title:p.title, 
           intro:p.summary,
           images:p.imgs,
           post:p.image
         })

        await product.save()
      }
    }

    if(!exHouse.length){
      for(let i=0;i<exHouse.length;i++){
        let h =exHouse[i]
        let house =new WikiHouse({
           name:h.name,
           intro:h.info,
           cover:h.detailImg
        })

        await house.save()
        for(let i=0;i<house.cater;i++){
          let cater =house.cater[i]
          let caters =new WikiCharacter({
             name:cater.name,
             profile:cater.img,
             images:cater.imgs,
             playedBy:cater.detail,
             sections:cater.sections,
             house:house._id 

          })
         await caters.save()
          if(!house.swornMembers){
             house.swornMembers.push(caters._id)
          }else {
            if(house.swornMembers.indexOf(caters._id)===-1){
              house.swornMembers.push(caters._id)
            }
          }

          await house.save()
        }
      }
    }

    let user = await User.findOne({
      email: '252517584@qq.com'
    }).exec()

    if (!user) {
      console.log('写入管理员数据')
      user = new User({
        email: '252517584@qq.com',
        password: 'lbzsuai',
        role: 'admin'
      })

      await user.save()
    }
  })
}