import express from "express";
import { getUser, Register, Login} from "../controllers/Users.js";

const router = express.Router();

router.get('/users', getUser);
router.post('/register', Register);
router.post('/login', Login);


export default router;