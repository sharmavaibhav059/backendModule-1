import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from '../models/user'
import Faculty from "../models/faculty";
import { validationResult } from "express-validator";


export const userRegister=async(req:Request, res:Response):Promise<Response>=>{
    const username:string = req.body.username
    const email:string = req.body.email
    const password:string = req.body.password
    const cpassword:string = req.body.cpassword

    try {
        const err = validationResult(req)
        if(!err.isEmpty()){
            return res.status(400).json({success:false,errorType:"array",error:err.array()})
        }
        let user = await User.findOne({
            where:{email:req.body.email}
        });
        if(user){
            return res.status(400).json({success:false,errorType:"msg",error:"User already exists. Please Login"})
        }
        // if(password!==cpassword){
        //     return res.status(400).json({success:false,errorType:"msg",error:"Password did not match"})
        // }
        const haspass = bcrypt.hashSync(password,10);
        user = await User.create({
            username,
            email,
            password:haspass
        })
        const data = {
            user:{id:user.dataValues.id,username,email}
        }
        const token = jwt.sign(data,"supersecretkey")
        return res.json({success:true,token})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({success:false,errorType:"msg",error:"Internal Server Error"})
    }
    
}
export const userLogin=async(req:Request, res:Response):Promise<Response>=>{
    const email:string = req.body.email
    const password:string = req.body.password

    try {
        const err = validationResult(req)
        if(!err.isEmpty()){
            return res.status(400).json({success:false,errors:err.array()})
        }
        const user = await User.findOne({
            where:{
                email:req.body.email
            }
        })
        if(!user){
            return res.status(401).json({success:false,error:"Invalid credentials"});
        }
        // console.log(user);
        
        
        const passCheck = await bcrypt.compare(password,user.dataValues.password)
        if(!passCheck){
            return res.status(401).json({success:false,error:"Invalid credentials"});
        }
        const faculty = await Faculty.findOne({
            where:{
                userId:user.dataValues.id
            }
        })
        const data = {
            user:{id:user.dataValues.id,username:user.dataValues.username,email,faculty}
        }
        const token = jwt.sign(data,"supersecretkey")
        return res.json({success:true,token})
    } catch (error) {
        return res.status(500).json({success:false,error:"Internal Server Error"})
    }
    
}


export const getUser = async (req:Request, res:Response) => {

    try {
        let userid = res.locals.user.id
        const user = await User.findOne({
            where:{
                id:userid,
            },
            attributes:{exclude:["password"]}
        })
        if(!user){
            return res.status(401).json({success:false,error:"User not found"});
        }
        return res.json({success:true,user})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: 'Internal server error' })
    }

}