import Mongoose from '../database/db.js'

const productsShema=new Mongoose.Schema({
  name:String,
  description:String,
  price: Number,
  summary:String,
  stock:Number,
  fileName:String
},{
  collection:'products',
  timestamp:true
})


export default Mongoose.model('products',productsShema,'products')