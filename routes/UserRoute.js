import express from "express";
import { getUser, Register, Login, getCurrentUser, Logout} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUser);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.get('/currentUser', verifyToken, getCurrentUser);
router.delete('/logout', Logout);

export default router;