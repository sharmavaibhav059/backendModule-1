import { Router } from "express";
import {addFacultyDetails,getAllFaculty,getFaculty} from "../controllers/faculty"
import researchApi from "./research"
import authentication from "../middleware/authentication";
import { body } from "express-validator";
const router = Router();
router.get("/research",researchApi)
router.post("/addDetails",[
    body("phone","Enter a valid phone number").isLength({min:10,max:10})
],authentication,addFacultyDetails)
router.get("/:facultyId",authentication,getFaculty)
router.get("/getAllfaculty",authentication,getAllFaculty)

export default router