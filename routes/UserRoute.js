import express from "express";
import { getUser, Register} from "../controllers/Users.js";

const router = express.Router();

router.get('/users', getUser);
router.post('/register', Register);

export default router;