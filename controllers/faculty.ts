import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Faculty from "../models/faculty";
import Research from "../models/research";
import User from "../models/user";


export const addFacultyDetails=async(req:Request, res:Response):Promise<Response>=>{
    const {phone,designation,department} = req.body

    try {
        const err = validationResult(req)
        if(!err.isEmpty()){
            return res.status(400).json({error:err.array()})
        }
        let faculty= await Faculty.findOne({where:{email:res.locals.user.email}})
        if(faculty){
            return res.status(401).json({error:"faculty deatils already exists"})
        }
        faculty=await Faculty.create({phone,designation,department,email:res.locals.user.email,userId:res.locals.user.id})
        return res.status(200).json({faculty})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({error:"Internal server error"})
    }
    
}
export const getFaculty=async(req:Request, res:Response):Promise<Response>=>{
    
    try {
        const user = await Faculty.findAll({where:{
            userId:req.params.facultyId
        },include:[{model:User,as:"users",attributes:{exclude:["password"]}},{model:Research,as:"researches"}]})
        if(!user){
            return res.status(401).json({error:"Invalid credentials"});
        }
        // console.log(user);
        return res.json({user})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({error:"Internal Server Error"})
    }
    
}