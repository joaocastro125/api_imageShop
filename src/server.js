import express from 'express';
import UserService from './service/userService.js';
import 'dotenv/config'
import {authMiddleware} from './middleware/authMiddleware.js';
import productsService from './service/product.serve.js'
import  Jwt  from 'jsonwebtoken';
// upload de imagens
import multer from 'multer';
// fazendo o rech 
import crypto from 'crypto'
// EXTENSÃO
import { extname } from 'path';


const app = express()
app.use(express.urlencoded({extended:true}))
app.use('/uploads',express.static('uploads'))
const storageConfig=multer.diskStorage({
   destination:(req,file,cb)=>{
      cb(null,'uploads/')

   },
   filename:(req,file,cb)=>{
      const newFileName=crypto.randomBytes(32).toString('hex')
      const filenameExtension=extname(file.originalname)
      cb(null,`${newFileName} ${filenameExtension}`)

   }
})

 const uploadWiddleware=multer({storage:storageConfig})

app.use(express.json())

app.post("/login",async(req,res)=>{
   const{email,password}=req.body
   const user=new UserService()
   const Userlogged= await user.login(email,password)

   if(Userlogged){
      const secretKey=process.env.SECRET_KEY
      const token=Jwt.sign({user:Userlogged},secretKey,{expiresIn:'60s'})
      return res.status(200).json({token:token})
   }
   return res.status(401).json({message:'E-mail ou seja Invalida'})

})


app.post('/products',uploadWiddleware.single('image'), async (req, res) => {
   const {name,description,price,summary,stock } = req.body
   const userService = new productsService()
const product={name,description,price,summary,stock,fileName:req.file.filename}
await userService.add(product)
   return res.status(201).json({message:"success"})


})

app.get('/products', async (req, res) => {
   const products = new productsService()

   const product = await products.findAll()
   return res.status(200).json(product)

})

app.post('/users', async (req, res) => {
   const { name, email, password } = req.body
   const user = { name, email, password }
   const productService = new UserService()
   await productService.create(user)


   return res.status(201).json(user)
})

app.get('/users',authMiddleware, async (req, res) => {
   const userService = new UserService()

   const users = await userService.findAll()
   return res.status(200).json(users)

})

app.get('/users/:id', async (req, res) => {
   const id = req.params.id;
   const userService = new UserService();
   const user = await userService.findById(id);
   if (user) {
      return res.status(200).json(user);
   }
   return res.status(404).json({ message: "usuario não encontrado" })


});

app.put('/users/:id', async (req, res) => {
   const id = req.params.id;
   const { name, email, password } = req.body
   const user = { name, email, password }
   const userService = new UserService();
   const userUpdate = await userService.findById(id);
   if (userUpdate) {
      await userService.update(id, user)
      console.log(userUpdate)
      return res.status(200).json({ message: "atualizado com sucesso" });
   }
   return res.status(404).json({ message: "usuario não encontrado" })


});

app.delete('/users/:id', async (req, res) => {
   const id = req.params;
   const userService = new UserService();
   const user = await userService.findById(id);
   if (user) {
      await userService.delete(id)
      return res.status(200).json({ message: "excluido com sucesso" });
   }
   return res.status(404).json({ message: "usuario não encontrado" })


});




app.listen(3000, () => console.log("carregando"));