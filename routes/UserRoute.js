/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary:
 *     description:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               confPassword:
 *                 type: string
 *             example:
 *               fullname: "Yulinar Nur Rahmawati"
 *               username: "yulinarnr"
 *               password: "password123"
 *               confPassword: "password123"
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: 
 *     description:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: "yulinarnr"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/auth/token:
 *   get:
 *     summary: 
 *     description: 
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *   delete:
 *     summary:
 *     description: 
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary:
 *     description: s
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/users/currentUser:
 *   get:
 *     summary: 
 *     description: 
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

import express from "express";
import { getUser, Register, Login, getCurrentUser, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.post('/api/v1/auth/register', Register);
router.post('/api/v1/auth/login', Login);
router.get('/api/v1/auth/token', refreshToken);
router.delete('/api/v1/auth/logout', Logout);
router.get('/api/v1/users', verifyToken, getUser);
router.get('/api/v1/users/currentUser', verifyToken, getCurrentUser);

export default router;
