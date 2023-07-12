import express from 'express';
import UserService from './service/userService.js';
import 'dotenv/config'
import {authMiddleware} from './middleware/authMiddleware.js';
import  Jwt  from 'jsonwebtoken';


const app = express()
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


app.post('/users', async (req, res) => {
   const { name, email, password } = req.body
   const user = { name, email, password }
   const userService = new UserService()
   await userService.create(user)


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