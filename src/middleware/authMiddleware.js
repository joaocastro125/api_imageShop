import jwt from 'jsonwebtoken'
import UserService from '../service/userService.js'

export const authMiddleware=(req,res,next)=>{
   const authorization = req.headers.authorization;
   const Token=authorization?authorization.split(" ")[1] : undefined
   if(!Token) return res.status(401).json({message:"falha no login"})
   const secretKey=process.env.SECRET_KEY
    jwt.verify(Token,secretKey,{ignoreExpiration:false},async(err,decodedToken)=>{
      if(err) return res.status(401).json({message:"falha no login"})
      console.log(decodedToken)
      const isValid=decodedToken && decodedToken.user
      if(!isValid) return res.status(401).json({message:"falha no login"})
       const userService=new UserService()
       const user=await userService.loginEmail(decodedToken.user.email)
      if(!user) return res.status(401).json({message:"falha no login"})
      return next()

    })
   //  return next()

 
}