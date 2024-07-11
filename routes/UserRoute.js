import express from "express";
import { getUser, Register, Login} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUser);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);

export default router;