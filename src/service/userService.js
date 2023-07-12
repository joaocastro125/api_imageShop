
import { ObjectId } from 'mongodb';
import UserModel from '../Schema/user.shema.js'


export default class UserService {

  constructor() { }

  //   async add(user) {
  //  await UserModel.create(user)

  //   }

  async create(user) {
    await UserModel.create(user)
  }

  async findAll() {
    return await UserModel.find({})
  }
  async findById(id) {

    return await UserModel.findById(new ObjectId(id));

  }

  async update(id, user) {

    return await UserModel.updateOne({ _id: new ObjectId(id) }, user);

  }

  async delete(id) {

    return await UserModel.deleteOne(new ObjectId(id));

  }

  async loginEmail(email) {
    return await UserModel.findOne({ email })
  }

  async login(email, password) {
    if (email, password) {
      const user = await this.loginEmail(email)
      if (user) {
        const auth = user.password === password

        if (auth) {
          return user
        }
        return null
      }
      return null

    }

    return null

  }


};

