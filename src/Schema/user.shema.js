import Mongoose from '../database/db.js'

const userShema=new Mongoose.Schema({
  name:String,
  email:String,
  password: String
},{
  collection:'users',
  timestamp:true
})


export default Mongoose.model('users',userShema,'users')