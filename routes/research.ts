import { Router } from "express";
import { addResearch } from "../controllers/research";
import authentication from "../middleware/authentication";
const router = Router();
router.post("/addResearch",authentication,addResearch)

export default router