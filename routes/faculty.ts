import { Router } from "express";
import {addFacultyDetails,getFaculty} from "../controllers/faculty"
import researchApi from "./research"
import authentication from "../middleware/authentication";
import { body } from "express-validator";
const router = Router();
router.get("/research",researchApi)
router.post("/addDetails",[
    body("phone","enter a valid phone number").isNumeric().isLength({min:10,max:10}),
    body("designation","enter valid desigantion").isAlpha(),
],authentication,addFacultyDetails)
router.get("/:facultyId",authentication,getFaculty)

export default router