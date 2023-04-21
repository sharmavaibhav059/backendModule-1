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
            return res.status(400).json({success:false,errorType:"array",error:err.array()})
        }
        let faculty= await Faculty.findOne({where:{email:res.locals.user.email}})
        if(faculty){
            return res.status(401).json({success:false,errorType:"msg",error:"faculty deatils already exists"})
        }
        faculty=await Faculty.create({phone,designation,department,email:res.locals.user.email,userId:res.locals.user.id})
        console.log(faculty);
        
        return res.status(200).json({success:true,faculty})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({success:false,errorType:"msg",error:"Internal server error"})
    }
    
}
export const getFaculty=async(req:Request, res:Response):Promise<Response>=>{
    
    try {
        const user = await Faculty.findOne({where:{
            userId:req.params.facultyId
        },include:{model:User,as:"users",attributes:{exclude:["password"]}}})
        if(!user){
            return res.status(401).json({success:false,error:"Faculty not found"});
        }
        // console.log(user);
        return res.json({success:true,user})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({error:"Internal Server Error"})
    }
    
}

export const getAllFaculty=async(req:Request, res:Response):Promise<Response>=>{
    
    try {
        const faculties = await Faculty.findAll({include:[{model:User,as:"users",attributes:{exclude:["password"]}},{model:Research,as:"researches"}]})
        // console.log(user);
        return res.json({faculties})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({error:"Internal Server Error"})
    }
    
}