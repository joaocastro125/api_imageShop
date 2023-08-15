
import { ObjectId } from 'mongodb';
import ProductsModel from '../Schema/products.shema.js'


export default class UserService {

  constructor() { }

   async add(product) {
   await ProductsModel.create(product)
   }

  
  async findAll() {
    return await ProductsModel.find({})
  }
  async findById(id) {

    return await ProductsModel.findById(new ObjectId(id));

  }

  async update(id, user) {

    return await ProductsModel.updateOne({ _id: new ObjectId(id) }, user);

  }

  async delete(id) {

    return await ProductsModel.deleteOne(new ObjectId(id));

  }

}
  