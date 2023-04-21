import { Router } from "express";
import { body,validationResult } from "express-validator";
import {userRegister,userLogin, getUser} from "../controllers/auth"
import authentication from "../middleware/authentication";
const router = Router();
router.post("/register",[
    body("email","Provide a valid email address").isEmail(),
    body("username","invalid name atleast 3 characters").isLength({min:3}),
    body("password","Password should be atleast 6 characters long and must contain numbers, lowercase, uppercase and special characters").isStrongPassword({
        minLength:6,
        minUppercase:1,
        minLowercase:1,
        minNumbers:1,
        minSymbols:1,
    })
],userRegister)
router.post("/login",[
    body("email","Provide a valid email address").isEmail(),
],userLogin)

router.get('/getUser',authentication,getUser)

export default router