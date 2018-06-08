/**
 * 地址模型
 */
const mongoose = require('mongoose')
const { Schema } = mongoose
const { Mixed,ObjectId}= Schema.Types

const AddressSchema =new Schema({
    _id:ObjectId,
    sex:String,
    addressName:String,
    addressState:Number,
    user:{
        type:ObjectId,
        ref:'user'
    },
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
})

AddressSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt =this.meta.updatedAt =Date.now()
    }else {
        this.updatedAt =Date.now()
    }
    
    next()
})

mongoose.model('address',AddressSchema)
