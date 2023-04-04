import { Request, Response } from "express";
// import Faculty from "../models/faculty";
import Research from "../models/research";


export const addResearch=async(req:Request, res:Response):Promise<Response>=>{
    const {journalISBNNo,authorsName,researchTitle,journalName,publishedYear,volNo,pageNo,researchlink} = req.body

    try {
        let research= await Research.findOne({where:{journalISBNNo:journalISBNNo}});
        if(research){
            return res.status(401).json({error:"Research deatils already exists"})
        }
        research=await Research.create({journalISBNNo,authorsName,researchTitle,journalName,publishedYear,volNo,pageNo,researchlink,facultyId:res.locals.user.faculty.id})
        return res.status(200).json({research:"research"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({error:"Internal server error"})
    }
    
}
// export const getFaculty=async(req:Request, res:Response):Promise<Response>=>{

//     try {
//         const user = await Faculty.findAll({where:{
//             userId:res.locals.user.id
//         },include:[{model:User,as:"users",attributes:{exclude:["password"]}}]})
//         if(!user){
//             return res.status(402).json({error:"Invalid credentials"});
//         }
//         // console.log(user);
//         return res.json({user})
//     } catch (error) {
//         console.log(error);
        
//         return res.status(500).json({error:"Internal Server Error"})
//     }
    
// }